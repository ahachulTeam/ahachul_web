import type {
  BreadCrumbListLdJsonProps,
  DetailLdJsonProps,
  LocationInfoLdJson,
  CarouselListLdJsonProps,
} from 'types/seo';
import { getDomainName } from 'utils/appEnv';

const url = getDomainName();

export const metadata = {
  type: 'website',
  locale: 'ko_KR',
  url,
  image: '',
  keywords: '',
  site_name: '',
  description: '',
};

export const ldJsonData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  url,
  name: '',
  logo: '',
  description: '',
  sameAs: ['', '', '', '', '', '', '', ''],
};

export const searchLdJsonData = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: '',
  url,
  logo: '',
  potentialAction: [
    {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://.../search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  ],
};

export const detailLdJson = ({ name, description, offers, brandName, image, review, rating }: DetailLdJsonProps) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  image: image || metadata.image,
  name,
  description,
  ...(brandName && { brand: { '@type': 'Brand', name: brandName } }),
  ...(offers && {
    offers: {
      '@type': 'Offer',
      url: offers.url,
      price: offers.price,
      priceCurrency: 'KRW',
    },
  }),
  ...(rating && {
    aggregateRating: {
      '@type': 'AggregateRating',
      bestRating: rating?.bestRating,
      reviewCount: rating?.reviewCount,
      ratingValue: rating?.ratingValue,
    },
  }),
  ...(review && {
    review: review?.map(({ author, datePublished, reviewBody, reviewRating }) => ({
      '@type': 'Review',
      name: reviewBody.slice(0, 10),
      datePublished,
      reviewBody,
      reviewRating: {
        '@type': 'Rating',
        bestRating: reviewRating?.bestRating,
        ratingValue: reviewRating?.ratingValue,
        worstRating: reviewRating?.worstRating,
      },
      author: { '@type': 'Person', name: author },
    })),
  }),
});

export const breadCrumbLdJson = ({ list }: BreadCrumbListLdJsonProps) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: list.map((breadCrumb) => ({
    '@type': 'ListItem',
    position: breadCrumb?.position,
    item: {
      '@type': 'Thing',
      '@id': breadCrumb?.item?.url,
      name: breadCrumb?.item?.name,
    },
  })),
});

export const locationInfoLdJson = ({ name, description, image, telephone, address, lat, lng }: LocationInfoLdJson) => ({
  '@context': 'https://schema.org',
  '@type': 'Store',
  name,
  image,
  telephone,
  description,
  address: {
    '@type': 'PostalAddress',
    streetAddress: address,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: lat,
    longitude: lng,
  },
});

export const carouselListLdJson = ({ itemType, list }: CarouselListLdJsonProps) => ({
  '@context': 'http://schema.org',
  '@type': 'ItemList',
  itemListElement: list?.map((item, idx) => ({
    '@type': 'ListItem',
    item: {
      '@type': itemType,
      url: item.url,
      name: item?.name,
      image: item?.image,
    },
    position: idx + 1,
  })),
});
