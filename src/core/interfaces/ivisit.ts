import {ILookUp} from './ilookup'

export interface IVisit {
    id: number;
    doctorName: string;
    visitRepName: string;
    visitDate: Date;
    visitTime: Date;
    notes: string;
    clinicProductSamples: IGetProductSample[];
}
  
export interface IVisitFormData {
    doctors: ILookUp<string>[];
    products: IAddProductSample[];
    organizations : ILookUp<string>[];
}

export interface IAddVisit {
    doctorId: Number;
    productsSamples: IAddProductSample[];
    visitDate: string;
    notes?: string;
    hasSupervisor : boolean;
    organizationId : Number;
    visitTime: string;
}

export interface IAddProductSample {
    productId: Number;
    amount: Number;
    messageId? : Number | null;
}

export interface IGetProductSample {
    name: string;
    amount?: Number;
    messageId? : Number | null;
}