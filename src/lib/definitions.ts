export type UnsplashPhoto = {
  id: string;
  alt_description: string;
  description: string;
  updated_at: string;
  urls: {
    regular: string;
    full: string;
    small: string;
  };
  user: {
    name: string;
    profile_image: {
      small: string;
    };
    links: {
      html: string;
    };
  };
  likes: number;
  width: number;
  height: number;
};


export type CollectionsType = {
  _id: string;
  name: string;
  total: number;
  thumbnail: string;
};

export type Photo = {
  id: string;
  url: string;
  alt: string;
  createdAt: string;
};

export type Collection = {
  _id: string;
  name: string;
  total: number;
};

export type CollectionDetailsResponse = {
  collection: Collection;
  photos: Photo[];
};