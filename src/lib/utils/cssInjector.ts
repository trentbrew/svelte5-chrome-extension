/**
 * CSS Injection utilities for Shadow DOM
 * Handles injection of bundled CSS (Tailwind, DaisyUI, component styles)
 * into shadow roots for proper style isolation
 */

export interface CSSInjectionOptions {
  shadowRoot: ShadowRoot;
  cssUrls?: string[];
  inlineCss?: string;
  adoptedStyleSheets?: boolean; // Use Constructable Stylesheets API (faster)
}

/**
 * Injects CSS into a shadow root using multiple strategies
 * Supports both link tags and Constructable Stylesheets (when available)
 *
 * @param options - CSS injection configuration
 * @returns Promise that resolves when all styles are loaded
 */
export async function injectCSS(options: CSSInjectionOptions): Promise<void> {
  const { shadowRoot, cssUrls = [], inlineCss, adoptedStyleSheets = true } = options;

  // Strategy 1: Use Constructable Stylesheets (fastest, modern browsers)
  if (adoptedStyleSheets && 'adoptedStyleSheets' in Document.prototype) {
    try {
      await injectWithAdoptedStyleSheets(shadowRoot, cssUrls, inlineCss);
      return;
    } catch (e) {
      console.warn('Adopted stylesheets failed, falling back to link tags:', e);
    }
  }

  // Strategy 2: Use traditional <link> and <style> tags
  await injectWithLinkTags(shadowRoot, cssUrls, inlineCss);
}

/**
 * Injects CSS using the Constructable Stylesheets API (modern, performant)
 * See: https://web.dev/constructable-stylesheets/
 */
async function injectWithAdoptedStyleSheets(
  shadowRoot: ShadowRoot,
  cssUrls: string[],
  inlineCss?: string
): Promise<void> {
  const sheets: CSSStyleSheet[] = [];

  // Load external CSS files
  for (const url of cssUrls) {
    const response = await fetch(url);
    const css = await response.text();
    const sheet = new CSSStyleSheet();
    await sheet.replace(css);
    sheets.push(sheet);
  }

  // Add inline CSS if provided
  if (inlineCss) {
    const sheet = new CSSStyleSheet();
    await sheet.replace(inlineCss);
    sheets.push(sheet);
  }

  // Adopt the stylesheets
  shadowRoot.adoptedStyleSheets = sheets;
}

/**
 * Injects CSS using traditional <link> and <style> tags (compatible fallback)
 */
async function injectWithLinkTags(
  shadowRoot: ShadowRoot,
  cssUrls: string[],
  inlineCss?: string
): Promise<void> {
  const promises: Promise<void>[] = [];

  // Inject external CSS files
  cssUrls.forEach((url) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;

    const promise = new Promise<void>((resolve, reject) => {
      link.onload = () => resolve();
      link.onerror = () => reject(new Error(`Failed to load CSS: ${url}`));
    });

    shadowRoot.appendChild(link);
    promises.push(promise);
  });

  // Inject inline CSS
  if (inlineCss) {
    const style = document.createElement('style');
    style.textContent = inlineCss;
    shadowRoot.appendChild(style);
  }

  await Promise.all(promises);
}

/**
 * Gets the URL of the main bundled CSS file from the current page
 * Useful for auto-detecting Vite's bundled CSS output
 */
export function getBundledCSSUrl(): string | null {
  // Look for link tags with rel="stylesheet"
  const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));

  // Find the main CSS bundle (usually in /assets/)
  const mainCssLink = links.find((link) =>
    link.getAttribute('href')?.includes('assets/')
  ) as HTMLLinkElement;

  if (mainCssLink) {
    return mainCssLink.href;
  }

  // Fallback: look for any stylesheet
  if (links.length > 0) {
    return (links[0] as HTMLLinkElement).href;
  }

  return null;
}

/**
 * Extracts all CSS from the current document
 * Useful for capturing all styles including dynamic ones
 */
export function extractDocumentCSS(): string {
  const styles: string[] = [];

  // Get inline <style> tags
  document.querySelectorAll('style').forEach((styleTag) => {
    if (styleTag.textContent) {
      styles.push(styleTag.textContent);
    }
  });

  // Get CSS from accessible stylesheets
  Array.from(document.styleSheets).forEach((sheet) => {
    try {
      if (sheet.cssRules) {
        const rules = Array.from(sheet.cssRules)
          .map((rule) => rule.cssText)
          .join('\n');
        styles.push(rules);
      }
    } catch (e) {
      // CORS restriction - can't access external stylesheet rules
      console.warn('Cannot access stylesheet:', sheet.href);
    }
  });

  return styles.join('\n\n');
}

/**
 * Clones all document styles into a shadow root
 * Handles both external and inline styles
 */
export function cloneDocumentStyles(shadowRoot: ShadowRoot): void {
  // Clone external stylesheets
  document.querySelectorAll('link[rel="stylesheet"]').forEach((link) => {
    const clonedLink = link.cloneNode(true) as HTMLLinkElement;
    shadowRoot.appendChild(clonedLink);
  });

  // Clone inline styles
  document.querySelectorAll('style').forEach((style) => {
    const clonedStyle = style.cloneNode(true) as HTMLStyleElement;
    shadowRoot.appendChild(clonedStyle);
  });
}

/**
 * Creates a CSS injection observer that watches for new styles
 * and automatically injects them into the shadow root
 */
export function createStyleObserver(shadowRoot: ShadowRoot): MutationObserver {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeName === 'STYLE' ||
            (node.nodeName === 'LINK' && (node as HTMLLinkElement).rel === 'stylesheet')) {
          const clonedNode = node.cloneNode(true);
          shadowRoot.appendChild(clonedNode);
        }
      });
    });
  });

  observer.observe(document.head, {
    childList: true,
    subtree: true,
  });

  return observer;
}
