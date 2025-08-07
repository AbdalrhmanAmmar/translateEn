import { ILocation, ILookUp } from './ilookup';

export interface ISearchRequest {
  filter?: {
    startDate?: string;
    endDate?: string;
    doctorId?: number;
    speciality?: string;
    segment?: string;
    area?: string;
    city?: string;
    brand?: string;
    organizationName?: string;
    products?: number[];
    medRepId?: number;
  };
  pageIndex: number;
  pageSize: number;
}

export interface ISearchResponseItems {
  visitId: number;
  doctorId: number;
  organization: ILookUp<string>;
  doctorName: string;
  visitDate: string;
  visitTime: string;
  cities: string[];
  areas: string[];
  ranks: string;
  doctorSpecialization: string;
  brands: string;
}

export interface ISearchResponse {
  items: ISearchResponseItems[];
  counts: ISearchResponseCounts;
  totalCount: number;
  pageCount: number;
  currentPageIndex: number;
}

export interface ISearchResponseCounts {
  doctorVisitsCount: Record<string, number>;
  doctorsCount: number;
  dateVisitsCount: Record<string, number>;
  cityVisitsCount: Record<string, number>;
  areaVisitsCount: Record<string, number>;
  brandVisitsCount: Record<string, number>;
  organizationVisitsCount: number;
  rankVisitsCount: Record<string, number>;
  specializationVisitsCount: Record<string, number>;
  visitsCount: number;
  productsCount: number;
  samplesCount: number;
}

export interface IFilterLookups {
  doctors: ILookUp<string>[];
  specialities: string[];
  segments: string[];
  areas: string[];
  cities: string[];
  brands: string[];
  organizations: string[];
  products: ILookUp<string>[];
  medReps: ILookUp<string>[];
}

export interface IProduct {
  id: number;
  name: string;
  samples: number;
}

export interface IMoreDetails {
  visitDate: string;
  visitTime: string;
  doctor: ILookUp<string>;
  organization: string;
  area: string;
  city: string;
  address: string;
  brands: string[];
  segment: string;
  products: IProduct[];
}



export interface IProductsLookUps {
  firstProducts: ILookUp<string>[];
  secondProducts: ILookUp<string>[];
  thirdProducts: ILookUp<string>[];
}





export interface IDoctorDetails {
  id: number;
  name: string | null;
  phone: string | null;
  organizationName: string | null;
  organizationType: string | null;
  targetFrequency: number;
  keyOpinionLeader: boolean;
  segment: string | null;
  profile: string | null;
  brand: string | null;
  speciality: string | null;
  location: ILocation;
  saleRequestsCount: number;
  sampleRequestsCount: number;
  visitsCount: number;
}

export interface IDoctorExtraDetailsRequest{
  filter :  {
    doctorId: number;
  };
  pageIndex: number;
  pageSize: number;
}


export interface IDoctorVisit {
  medRepName :  string;
  visitDate: Date;
}

export interface IDoctorSample {
  medRepName :  string;
  visitDate: Date;
  deliveryDate : Date;
  product: string;
  quantity: number;
}

export interface IDoctorSale {
  medRepName :  string;
  visitDate: Date;
  activityDate : Date;
  activityType: string;
  cost: number;
}

export interface IDoctorExtraDetailsResponse<T>{
items : T[];
totalCount: number;
pageCount: number;
currentPageIndex: number;
counts: object;
}