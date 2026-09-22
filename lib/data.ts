/**
 * lib/data.ts — re-export shim & static fallback layer
 */

export type {
  Book,
  BlogPost,
  Writing,
  PraiseQuote,
  PressItem,
  SiteContent,
  Order,
  Message,
} from './cms/index'

export {
  getBooks,
  getPublishedBooks,
  getBookBySlug,
  getFeaturedBook,
  getRelatedBooks,
  getBlogPosts,
  getPublishedBlogPosts,
  getBlogPostBySlug,
  getFeaturedBlogPost,
  getRelatedBlogPosts,
  getBlogCategories,
  getWritings,
  getPublishedWritings,
  getWritingBySlug,
  getRelatedWritings,
  getPraiseQuotes,
  getPublishedPraiseQuotes,
  getPressItems,
  getPublishedPressItems,
  getPressItemBySlug,
  getSiteContent,
  appendOrder,
  appendMessage,
} from './cms/index'

export const siteContent = {
  authorName: 'Rahul Saini',
  role: 'Author & Novelist',
  tagline: 'Official website of Rahul Saini — Bestselling Novelist, Traveler & Teacher.',
  email: 'rahulsaini258@gmail.com',
  social: [
    { label: 'Instagram', href: 'https://www.instagram.com/rahulsainiofficial/' },
    { label: 'Twitter', href: 'https://twitter.com/rahulsaini' },
    { label: 'Facebook', href: 'https://www.facebook.com/rahulsainiofficial' },
    { label: 'Goodreads', href: 'https://www.goodreads.com/author/show/1502476.Rahul_Saini' },
  ],
  aboutShort:
    'Rahul Saini started his career as an architect before embarking on his writing journey.',
  aboutLong: [
    'Rahul Saini is a high-spirited author who started his professional career as an architect.',
  ],
}
