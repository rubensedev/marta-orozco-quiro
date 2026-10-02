/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="astro/astro-jsx" />

/**
 * Astro ships JSX types as `astroHTML.JSX`, but the editor TypeScript service
 * often looks for the global `JSX` namespace (TS7026). Bridge them here.
 */
declare namespace JSX {
  type Element = astroHTML.JSX.Element;
  interface ElementChildrenAttribute extends astroHTML.JSX.ElementChildrenAttribute {}
  interface IntrinsicAttributes extends astroHTML.JSX.IntrinsicAttributes {}
  interface IntrinsicElements extends astroHTML.JSX.IntrinsicElements {}
}
