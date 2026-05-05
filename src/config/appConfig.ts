// App-wide constants

export const APP_CONFIG = {
  name: 'ማርት ሱቅ',
  nameEn: 'Mart Supermarket',
  minOrderAmount: 500,
  deliveryFee: 50,
  freeDeliveryThreshold: 5000,
  currency: 'ETB',
  currencySymbol: 'ብር',
  contactPhone: '+251-XXX-XXX-XXX',
  contactEmail: 'info@martsupermarket.com',
  address: 'አዲስ አበባ, ኢትዮጵያ',
  deliveryRadius: 15, // km
} as const

export const ROUTES = {
  home: '/',
  products: '/products',
  productDetails: (id: string) => `/products/${id}`,
  category: (slug: string) => `/category/${slug}`,
  cart: '/cart',
  checkout: '/checkout',
  orders: '/orders',
  orderDetails: (id: string) => `/orders/${id}`,
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password',
  profile: '/profile',
  about: '/about',
  contact: '/contact',
  help: '/help-faqs',
  terms: '/terms',
  privacy: '/privacy-policy',
} as const

export const STORAGE_KEYS = {
  cart: 'grocery_cart',
  authToken: 'grocery_auth_token',
  user: 'grocery_user',
  theme: 'grocery_theme',
} as const

export const QUERY_KEYS = {
  products: 'products',
  product: 'product',
  categories: 'categories',
  banners: 'banners',
  cart: 'cart',
  orders: 'orders',
  order: 'order',
  user: 'user',
} as const

export const API_CONFIG = {
  retryCount: 2,
  retryDelay: 1000,
  staleTime: 5 * 60 * 1000, // 5 minutes
  cacheTime: 10 * 60 * 1000, // 10 minutes
} as const

