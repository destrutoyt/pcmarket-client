
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  },
  {
    "renderMode": 0,
    "route": "/product/*"
  },
  {
    "renderMode": 2,
    "route": "/about"
  },
  {
    "renderMode": 0,
    "route": "/profile"
  },
  {
    "renderMode": 0,
    "route": "/admin"
  },
  {
    "renderMode": 2,
    "route": "/cart"
  },
  {
    "renderMode": 2,
    "route": "/orders"
  },
  {
    "renderMode": 2,
    "route": "/register"
  },
  {
    "renderMode": 0,
    "route": "/seller-register"
  },
  {
    "renderMode": 0,
    "route": "/success-order"
  },
  {
    "renderMode": 0,
    "route": "/404"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 620, hash: '9ab88dcc261f6e24e5b278a4c5fa2a0165e227103d3789f7e31e1a3275e0cf5c', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 954, hash: '043c5b36ceb50e206cd31c8352fb42816577718968fb0a7f86e8e3cf525a0548', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'cart/index.html': {size: 18084, hash: 'df28ad2ab3226deed9223104dcc2790ebe1e0df739df77b25fe36ca25f5eb20a', text: () => import('./assets-chunks/cart_index_html.mjs').then(m => m.default)},
    'orders/index.html': {size: 15633, hash: 'e24383f1ec4a1197c21aa52287219abf1a8972469198b06c85f7ffea34f9d47a', text: () => import('./assets-chunks/orders_index_html.mjs').then(m => m.default)},
    'about/index.html': {size: 25628, hash: '7fd17dc10567a02530a7d8bfab1ec642d6067454a935ba5e99fb97842f24bfc4', text: () => import('./assets-chunks/about_index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 21992, hash: 'da626e0fcf63a03e6b37efc2c3a39d2e22c6f1f7d5d76affb4c5684d82d49e9e', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'index.html': {size: 20021, hash: 'f439a4eb9039696259d7b2b14936e72750d160b71bcdf7e3a0a2d17c1b33f62a', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-OYWQQUDX.css': {size: 3888, hash: 'fqxBEXHe3j8', text: () => import('./assets-chunks/styles-OYWQQUDX_css.mjs').then(m => m.default)}
  },
};
