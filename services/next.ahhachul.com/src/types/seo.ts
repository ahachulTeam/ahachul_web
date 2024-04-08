export interface IMetaData {
  type: string;
  locale: string;
  site_name: string;
  description: string;
  url: string;
  image: string;
  keywords: string;
}

export interface IDetailLdJson {
  name: string;
  description: string;
  offers?: {
    url: string;
    price: number;
  };
  brandName?: string;
  image?: string;
  rating?: {
    ratingValue: number | string;
    bestRating: number;
    reviewCount: number;
  };
  review?: {
    author?: string;
    datePublished: string;
    reviewBody: string;
    reviewRating?: {
      worstRating: number;
      ratingValue: number | string;
      bestRating: number;
    };
  }[];
}

export interface IBreadCrumbLdJson {
  position: number;
  item: {
    url: string;
    name: string;
  };
}

export interface IBreadCrumbListLdJson {
  list: IBreadCrumbLdJson[];
}
