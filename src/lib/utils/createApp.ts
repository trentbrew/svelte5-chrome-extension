import { mount, type Component } from 'svelte';
import { mountInShadow, type ShadowMountResult } from './shadowDOM';
import { injectCSS, getBundledCSSUrl } from './cssInjector';

export interface AppMountOptions {
  target: HTMLElement | string;
  useShadowDOM?: boolean;
  shadowMode?: 'open' | 'closed';
  injectStyles?: boolean;
  cssUrls?: string[];
  props?: Record<string, any>;
}

export interface AppInstance {
  component: any;
  shadowRoot?: ShadowRoot;
  cleanup: () => void;
}

/**
 * Creates and mounts a Svelte 5 app with optional shadow DOM support
 *
 * This utility provides a unified way to mount Svelte components with or without
 * shadow DOM, handling all the CSS injection complexity automatically.
 *
 * @param Component - The Svelte component to mount
 * @param options - Configuration options
 * @returns AppInstance with cleanup function
 *
 * @example
 * ```typescript
 * // Standard mounting (no shadow DOM)
 * const app = createApp(App, { target: '#app' });
 *
 * // With shadow DOM and automatic CSS injection
 * const app = createApp(App, {
 *   target: '#app',
 *   useShadowDOM: true,
 *   injectStyles: true
 * });
 *
 * // Cleanup when done
 * app.cleanup();
 * ```
 */
export function createApp(
  Component: Component<any>,
  options: AppMountOptions
): AppInstance {
  // Resolve target element
  const target = typeof options.target === 'string'
    ? document.querySelector(options.target) as HTMLElement
    : options.target;

  if (!target) {
    throw new Error(`Target element not found: ${options.target}`);
  }

  // Mount with shadow DOM if requested
  if (options.useShadowDOM) {
    return mountWithShadowDOM(Component, target, options);
  }

  // Standard mounting without shadow DOM
  return mountStandard(Component, target, options);
}

/**
 * Mounts a component in shadow DOM with full CSS isolation
 */
function mountWithShadowDOM(
  Component: Component<any>,
  target: HTMLElement,
  options: AppMountOptions
): AppInstance {
  const { shadowMode = 'open', injectStyles = true, cssUrls = [], props = {} } = options;

  // Create shadow root
  const shadowRoot = target.attachShadow({ mode: shadowMode });

  // Create container for Svelte component
  const container = document.createElement('div');
  container.id = 'svelte-root';
  container.className = 'w-full h-full';
  shadowRoot.appendChild(container);

  // Inject styles if requested
  if (injectStyles) {
    const bundledCSS = getBundledCSSUrl();
    const stylesToInject = bundledCSS ? [bundledCSS, ...cssUrls] : cssUrls;

    injectCSS({
      shadowRoot,
      cssUrls: stylesToInject,
      adoptedStyleSheets: true,
    }).catch((error) => {
      console.error('Failed to inject styles into shadow root:', error);
    });
  }

  // Mount the component
  const component = mount(Component, {
    target: container,
    props,
  });

  // Cleanup function
  const cleanup = () => {
    container.remove();
  };

  return {
    component,
    shadowRoot,
    cleanup,
  };
}

/**
 * Mounts a component in standard DOM (no shadow DOM)
 */
function mountStandard(
  Component: Component<any>,
  target: HTMLElement,
  options: AppMountOptions
): AppInstance {
  const { props = {} } = options;

  // Mount directly to target
  const component = mount(Component, {
    target,
    props,
  });

  // Cleanup function
  const cleanup = () => {
    target.innerHTML = '';
  };

  return {
    component,
    cleanup,
  };
}

/**
 * Helper to create multiple app instances
 * Useful for mounting the same component in multiple locations
 */
export function createApps(
  Component: Component<any>,
  targets: AppMountOptions[]
): AppInstance[] {
  return targets.map((options) => createApp(Component, options));
}

/**
 * Cleanup helper to unmount multiple app instances
 */
export function cleanupApps(apps: AppInstance[]): void {
  apps.forEach((app) => app.cleanup());
}
