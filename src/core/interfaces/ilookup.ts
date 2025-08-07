import { IAddProductSample } from "./ivisit";

export interface ILookUp<T> {
  id: number;
  value: T;
}

export interface IClinicVisitFormLookup {
    doctors: ILookUp<string>[];
    products: IClinicProductLookup[];
    organizations : ILookUp<string>[];
}

export interface IPharmacyVisitFormLookup {
    organizations : ILookUp<string>[];
    products: IPharmacyProductLookup[];
}

export interface IPharmacyProductLookup {
    id: number;
    name: string;
    price: number;
}

export interface IClinicProductLookup {
    id: number;
    name: string;
    messages: ILookUp<string>[];
}

export interface ILocation {
  id: number;
  city: string;
  area: string;
  district: string;
}