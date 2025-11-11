import { RenderMode, ServerRoute } from '@angular/ssr';

/**
 * Server-side rendering configuration
 * Controls which routes are prerendered (built at compile-time)
 * and which are rendered dynamically on request.
 */

export const serverRoutes: ServerRoute[] = [
  // Static pages — safe to prerender
  {
    path: '',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'about',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'register',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'cart',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'orders',
    renderMode: RenderMode.Prerender
  },

  // Dynamic routes — render on demand (NOT prerendered)
  {
    path: 'product/:id',
    renderMode: RenderMode.Server
  },
  {
    path: '**',
    renderMode: RenderMode.Server // fallback route
  }
];
