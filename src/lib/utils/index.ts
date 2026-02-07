/**
 * Utility exports for the Chrome Extension
 * Provides easy access to all utility functions
 */

// Shadow DOM utilities
export {
  mountInShadow,
  injectStylesIntoShadow,
  extractAllCSS,
  createThemedShadowRoot,
  type ShadowMountOptions,
  type ShadowMountResult,
} from './shadowDOM';

// CSS Injection utilities
export {
  injectCSS,
  getBundledCSSUrl,
  extractDocumentCSS,
  cloneDocumentStyles,
  createStyleObserver,
  type CSSInjectionOptions,
} from './cssInjector';

// App creation utilities
export {
  createApp,
  createApps,
  cleanupApps,
  type AppMountOptions,
  type AppInstance,
} from './createApp';
