import { IMetaData, IBreadCrumbListLdJson, IDetailLdJson } from '@/src/types/seo';

export const defaultMetadata: IMetaData = {
  type: 'website',
  locale: 'ko_KR',
  site_name: '',
  description: '',
  url: 'https://ahhachul.com/',
  image: '',
  keywords: '',
};

export const ldJsonData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: '',
  description: '',
  url: 'https://ahhachul.com/',
  logo: '',
  sameAs: ['', '', '', '', '', '', '', ''],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '',
      email: '',
      contactType: 'customer service',
    },
  ],
};

export const searchLdJsonData = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: '',
  url: 'https://ahhachul.com/',
  logo: '',
  potentialAction: [
    {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://ahhachul.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  ],
};

export const detailLdJson = ({ name, description, offers, brandName, image, review, rating }: IDetailLdJson) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  image: image || defaultMetadata.image,
  name,
  description,
  ...(offers && {
    offers: {
      '@type': 'Offer',
      url: offers.url,
      priceCurrency: 'KRW',
      price: offers.price,
    },
  }),
  ...(brandName && { brand: { '@type': 'Brand', name: brandName } }),
  ...(review && {
    review: review?.map(({ author, datePublished, reviewBody, reviewRating }) => ({
      '@type': 'Review',
      name: reviewBody.slice(0, 10),
      datePublished,
      reviewBody,
      reviewRating: {
        '@type': 'Rating',
        worstRating: reviewRating?.worstRating,
        ratingValue: reviewRating?.ratingValue,
        bestRating: reviewRating?.bestRating,
      },
      author: { '@type': 'Person', name: author },
    })),
  }),
  ...(rating && {
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: rating?.ratingValue,
      bestRating: rating?.bestRating,
      reviewCount: rating?.reviewCount,
    },
  }),
});

export const breadCrumbLdJson = ({ list }: IBreadCrumbListLdJson) => ({
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
