/**
 * Shadow DOM Usage Examples
 *
 * This file demonstrates how to use the shadow DOM utilities
 * to solve CSS isolation challenges mentioned in sveltejs/svelte#5869
 */

import { createApp } from '../lib/utils/createApp';
import { mountInShadow } from '../lib/utils/shadowDOM';
import { injectCSS, getBundledCSSUrl, cloneDocumentStyles } from '../lib/utils/cssInjector';
import ShadowDOMDemo from '../lib/components/ShadowDOMDemo.svelte';

// =============================================================================
// Example 1: Basic Shadow DOM mounting with automatic CSS injection
// =============================================================================
export function example1_basicShadowDOM() {
  const app = createApp(ShadowDOMDemo, {
    target: '#app',
    useShadowDOM: true,
    injectStyles: true, // Automatically injects all CSS including Lucide icons
  });

  console.log('Shadow DOM app mounted:', app);

  // Cleanup when done
  // app.cleanup();
}

// =============================================================================
// Example 2: Manual shadow DOM creation with custom CSS
// =============================================================================
export function example2_manualShadowDOM() {
  const container = document.getElementById('app');
  if (!container) return;

  const result = mountInShadow(ShadowDOMDemo, {
    target: container,
    mode: 'open',
    injectStyles: true,
  });

  console.log('Manually mounted shadow DOM:', result);

  // Access shadow root
  console.log('Shadow root:', result.shadowRoot);

  // Cleanup when done
  // result.cleanup();
}

// =============================================================================
// Example 3: Shadow DOM with custom CSS URLs (for content scripts)
// =============================================================================
export function example3_contentScriptShadowDOM() {
  // Useful when injecting into a web page via content script
  const app = createApp(ShadowDOMDemo, {
    target: '#my-extension-root',
    useShadowDOM: true,
    injectStyles: true,
    cssUrls: [
      // Extension CSS bundle
      chrome.runtime.getURL('assets/main.css'),
      // Additional custom styles
      chrome.runtime.getURL('assets/content.css'),
    ],
  });

  console.log('Content script shadow DOM mounted:', app);
}

// =============================================================================
// Example 4: Advanced CSS injection with Constructable Stylesheets
// =============================================================================
export async function example4_advancedCSSInjection() {
  const container = document.getElementById('app');
  if (!container) return;

  // Create shadow root
  const shadowRoot = container.attachShadow({ mode: 'open' });

  // Create app container
  const appDiv = document.createElement('div');
  appDiv.className = 'w-full h-full';
  shadowRoot.appendChild(appDiv);

  // Inject CSS using Constructable Stylesheets (fastest method)
  await injectCSS({
    shadowRoot,
    cssUrls: [getBundledCSSUrl() || ''],
    adoptedStyleSheets: true, // Use modern API
  });

  // Mount component
  const { mount } = await import('svelte');
  const component = mount(ShadowDOMDemo, { target: appDiv });

  console.log('Component with advanced CSS injection:', component);
}

// =============================================================================
// Example 5: Clone all document styles (simplest method)
// =============================================================================
export function example5_cloneStyles() {
  const container = document.getElementById('app');
  if (!container) return;

  // Create shadow root
  const shadowRoot = container.attachShadow({ mode: 'open' });

  // Clone all document styles (includes Lucide icon styles)
  cloneDocumentStyles(shadowRoot);

  // Create app container
  const appDiv = document.createElement('div');
  appDiv.className = 'w-full h-full';
  shadowRoot.appendChild(appDiv);

  // Mount component
  import('svelte').then(({ mount }) => {
    const component = mount(ShadowDOMDemo, { target: appDiv });
    console.log('Component with cloned styles:', component);
  });
}

// =============================================================================
// Example 6: Multiple shadow DOM instances
// =============================================================================
export function example6_multipleInstances() {
  const { createApps, cleanupApps } = require('../lib/utils/createApp');

  const apps = createApps(ShadowDOMDemo, [
    { target: '#app1', useShadowDOM: true, injectStyles: true },
    { target: '#app2', useShadowDOM: true, injectStyles: true },
    { target: '#app3', useShadowDOM: true, injectStyles: true },
  ]);

  console.log('Multiple shadow DOM instances:', apps);

  // Cleanup all instances
  // cleanupApps(apps);
}

// =============================================================================
// Example 7: Content Script Injection Pattern (Real-world usage)
// =============================================================================
export function example7_realWorldContentScript() {
  // This is how you'd inject your extension UI into any webpage
  // with complete CSS isolation (solving the original issue)

  // 1. Create container in the target page
  const container = document.createElement('div');
  container.id = 'my-extension-widget';
  container.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 999999;
    width: 400px;
    max-height: 600px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  `;
  document.body.appendChild(container);

  // 2. Mount with shadow DOM for complete isolation
  const app = createApp(ShadowDOMDemo, {
    target: container,
    useShadowDOM: true,
    injectStyles: true,
    cssUrls: [
      // Load your extension's bundled CSS from the extension
      chrome.runtime.getURL('assets/main.css'),
    ],
  });

  console.log('Real-world content script injection:', app);

  // 3. The widget is now isolated from the host page's CSS!
  // Lucide icons, Tailwind, DaisyUI all work perfectly inside shadow DOM
}

// =============================================================================
// Export default function to run the basic example
// =============================================================================
export default function runExample() {
  console.log('Running Shadow DOM Example...');
  example1_basicShadowDOM();
}
