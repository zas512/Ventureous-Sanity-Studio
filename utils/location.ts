import {defineLocations} from 'sanity/presentation'

export const locations = {
  blog: defineLocations({
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    resolve: (doc) => ({
      locations: [
        {
          title: doc?.title || 'Untitled',
          href: `${doc?.slug}`,
        },
        {
          title: 'Blog',
          href: '/blog',
        },
      ],
    }),
  }),
  homePage: defineLocations({
    select: {
      title: 'title',
    },
    resolve: () => ({
      locations: [
        {
          title: 'Home',
          href: '/',
        },
      ],
    }),
  }),
  page: defineLocations({
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    resolve: (doc) => ({
      locations: [
        {
          title: doc?.title || 'Untitled',
          href: `${doc?.slug}`,
        },
      ],
    }),
  }),
}
