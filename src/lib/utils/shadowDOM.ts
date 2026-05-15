import { mount, type Component } from 'svelte';

export interface ShadowMountOptions {
  target: HTMLElement;
  mode?: 'open' | 'closed';
  injectStyles?: boolean;
  styleSheets?: string[];
}

export interface ShadowMountResult {
  shadowRoot: ShadowRoot;
  component: any;
  cleanup: () => void;
}

/**
 * Mounts a Svelte 5 component in a shadow DOM with proper style isolation
 *
 * This solves the CSS isolation challenge mentioned in sveltejs/svelte#5869
 * by extracting and injecting all necessary styles into the shadow root.
 *
 * @param component - The Svelte component to mount
 * @param options - Shadow DOM configuration options
 * @returns Object containing shadowRoot, mounted component, and cleanup function
 *
 * @example
 * ```typescript
 * const { shadowRoot, component, cleanup } = mountInShadow(MyComponent, {
 *   target: document.getElementById('app'),
 *   mode: 'open',
 *   injectStyles: true
 * });
 *
 * // Later, to cleanup:
 * cleanup();
 * ```
 */
export function mountInShadow(
  component: Component<any>,
  options: ShadowMountOptions
): ShadowMountResult {
  const { target, mode = 'open', injectStyles = true, styleSheets = [] } = options;

  // Create shadow root
  const shadowRoot = target.attachShadow({ mode });

  // Create a container div inside shadow root for the Svelte component
  const container = document.createElement('div');
  container.id = 'svelte-shadow-root';
  shadowRoot.appendChild(container);

  // Inject styles into shadow root
  if (injectStyles) {
    injectStylesIntoShadow(shadowRoot, styleSheets);
  }

  // Mount the Svelte component
  const instance = mount(component, { target: container });

  // Return cleanup function
  const cleanup = () => {
    // Svelte 5 components automatically cleanup when removed from DOM
    container.remove();
  };

  return {
    shadowRoot,
    component: instance,
    cleanup,
  };
}

/**
 * Injects CSS styles into a shadow root
 * This ensures Tailwind, DaisyUI, and all component styles work inside shadow DOM
 *
 * @param shadowRoot - The shadow root to inject styles into
 * @param additionalStyleSheets - Optional array of CSS URLs or paths to inject
 */
export function injectStylesIntoShadow(
  shadowRoot: ShadowRoot,
  additionalStyleSheets: string[] = []
): void {
  // Method 1: Clone all existing stylesheets from the document
  const styleSheets = Array.from(document.styleSheets);

  styleSheets.forEach((styleSheet) => {
    try {
      // Try to access and clone the stylesheet
      if (styleSheet.href) {
        // External stylesheet - create a link element
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = styleSheet.href;
        shadowRoot.appendChild(link);
      } else if (styleSheet.cssRules) {
        // Inline stylesheet - extract CSS rules
        const css = Array.from(styleSheet.cssRules)
          .map((rule) => rule.cssText)
          .join('\n');

        const style = document.createElement('style');
        style.textContent = css;
        shadowRoot.appendChild(style);
      }
    } catch (e) {
      // CORS or access issues - log and continue
      console.warn('Could not clone stylesheet:', styleSheet, e);
    }
  });

  // Method 2: Inject additional stylesheets if provided
  additionalStyleSheets.forEach((href) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    shadowRoot.appendChild(link);
  });

  // Method 3: Inject inline styles from <style> tags
  const inlineStyles = document.querySelectorAll('style');
  inlineStyles.forEach((styleTag) => {
    const clonedStyle = styleTag.cloneNode(true) as HTMLStyleElement;
    shadowRoot.appendChild(clonedStyle);
  });
}

/**
 * Helper to get all CSS as a single string
 * Useful for custom injection strategies
 */
export function extractAllCSS(): string {
  const styles: string[] = [];

  // Get all inline styles
  document.querySelectorAll('style').forEach((style) => {
    styles.push(style.textContent || '');
  });

  // Get all external stylesheet rules (if accessible)
  Array.from(document.styleSheets).forEach((sheet) => {
    try {
      if (sheet.cssRules) {
        const css = Array.from(sheet.cssRules)
          .map((rule) => rule.cssText)
          .join('\n');
        styles.push(css);
      }
    } catch (e) {
      // CORS or access issues
      console.warn('Could not access stylesheet:', sheet);
    }
  });

  return styles.join('\n\n');
}

/**
 * Creates a shadow root with Tailwind/DaisyUI theme support
 * Ensures the data-theme attribute works inside shadow DOM
 */
export function createThemedShadowRoot(
  target: HTMLElement,
  theme: string = 'light',
  mode: 'open' | 'closed' = 'open'
): ShadowRoot {
  const shadowRoot = target.attachShadow({ mode });

  // Create a themed container
  const container = document.createElement('div');
  container.setAttribute('data-theme', theme);
  container.className = 'w-full h-full';

  shadowRoot.appendChild(container);

  return shadowRoot;
}
