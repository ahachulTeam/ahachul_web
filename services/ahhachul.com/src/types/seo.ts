export interface DetailLdJsonProps {
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

export interface BreadCrumbLdJsonProps {
  position: number;
  item: {
    url: string;
    name: string;
  };
}

export interface BreadCrumbListLdJsonProps {
  list: BreadCrumbLdJsonProps[];
}

export interface LocationInfoLdJson {
  name: string;
  description: string;
  image: string;
  telephone: number;
  address: string;
  lat: number;
  lng: number;
}

export interface CarouselLdJsonProps {
  name: string;
  image: string;
  url: string;
}

export interface CarouselListLdJsonProps {
  itemType: 'Person' | 'Organization';
  list: CarouselLdJsonProps[];
}
