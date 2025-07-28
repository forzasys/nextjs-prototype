import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'no', 'sv'],
 
  // Used when no locale matches
  defaultLocale: 'no',
  pathnames: {
    '/matches': {
      en: '/matches',
      no: '/kamper',
      sv: '/matcher'
    },
    '/videos': {
      en: '/videos',
      no: '/videoer',
      sv: '/videor'
    },
    '/statistics': {
      en: '/statistics',
      no: '/statistikk',
      sv: '/statistik'
    },
  } 
});