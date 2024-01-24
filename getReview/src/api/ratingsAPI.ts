export type EstablishmentsType = {
  establishments: {}[];
  meta: {
    dataSource: string;
    extractDate: string;
    itemCount: number;
    returncode: string;
    totalCount: number;
    totalPages: number;
    pageSize: number;
    pageNumber: number;
  };
  links: [
    {
      rel: string;
      href: string;
    }
  ];
};

type EstablishmentRatings = {
  establishments: {
    FHRSID: string;
    RatingValue: string;
    AddressLine1: string;
    AddressLine2: string;
    AddressLine3: string;
    AddressLine4: string;
  }[];
  links: {}[];
  meta: {};
};

type Authorities = {
  authorities: {
    LocalAuthorityID: string;
    Name: string;
  }[];
};

export async function getEstablishmentDetail(id?: string, name?: string) {
  var ratingsList = await getEstablishmentRatingsDetails(name);
  var rating = ratingsList.establishments.find(
    (establishment) => establishment.FHRSID === id
  );
  return rating;
}

export function getEstablishmentRatings(
  pageNum: number
): Promise<EstablishmentsType> {
  return fetch(
    `http://api.ratings.food.gov.uk/Establishments/basic/${pageNum}/10`,
    { headers: { "x-api-version": "2" } }
  ).then((res) => res.json());
}

export function getEstablishmentRatingsDetails(
  name?: string
): Promise<EstablishmentRatings> {
  return fetch(`http://api.ratings.food.gov.uk/Establishments?name=${name}`, {
    headers: { "x-api-version": "2" },
  }).then((res) => res.json());
}

export function getEstablishmentRatingsFiltered(
  localAuthorityId?: string
): Promise<EstablishmentsType> {
  return fetch(
    `http://api.ratings.food.gov.uk/Establishments?localAuthorityId=${localAuthorityId}&pageSize=10`,
    { headers: { "x-api-version": "2" } }
  ).then((res) => res.json());
}

export function getAuthorities(): Promise<Authorities> {
  return fetch(`http://api.ratings.food.gov.uk/Authorities/basic`, {
    headers: { "x-api-version": "2" },
  }).then((res) => res.json());
}
