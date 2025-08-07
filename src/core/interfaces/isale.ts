export interface IPharmacy {
  id: number;
  label: string;
  name: string;
}

export interface IOptions {
  label: string;
  value: boolean;
}

export interface IPharmacyVisitProduct {
  productId: number;
  quantity: number;
}

export interface IPharmacyVisit {
  visitDate: string;
  invoiceNumber: string;
  totalCost : number,
  invoiceImageUrl: string;
  isDraftDist: boolean;
  isRequest: boolean;
  isCollection: boolean;
  isIntroductoryVisit: boolean;
  introductoryVisitNotes : string,
  introductoryVisitImageUrl : string,
  pharmacyId: number;
  pharmacyVisitProducts: IPharmacyVisitProduct[];
  collectionAmount: number;
}

export interface IPharmacyProduct {
  id : number,
  name: string;
  price: number;
  amount? : number;
  total? :number;
}

export interface ICollectionRow {
  productId: number | null;
  quantity: number;
}
