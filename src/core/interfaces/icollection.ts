import { ILookUp } from './ilookup';

export interface ISalesRequest {
  requestDate: string;
  saleDate: string;
  cost: number;
  notes: string;
  doctorId: number;
  saleTypeId: number;
}

export interface ISamplesRequest {
  requestDate: string;
  deliveryDate: string;
  amount: number;
  productId: number;
  doctorId: number;
  notes: string;
}

export interface ISalesResponse {
  saleTypes: ILookUp<string>[];
  doctors: ILookUp<string>[];
}

export interface ISamplesResponse {
  products: ILookUp<string>[];
  doctors: ILookUp<string>[];
}

export interface IDownloadResponse {
  items: IOrderCollectionResponse[];
  totalCount: number;
  pageCount: number;
  currentPageIndex: number;
  counts: Record<string, any>;
}

export interface IOrderCollectionResponse {
  id: number;
  visitDate: string;
  organization: string;
  cost: number;
  invoiceNumber: string;
  statusId: number;
}

export interface IFilter {
  id?: number;
  status?: number;
}

export interface IFilterRequest {
  filter: IFilter;
  pageIndex: number;
  pageSize: number;
}

export interface IOrganizationResponse {
  items: IOrganizationItem[];
  totalCount: number;
  pageCount: number;
  currentPageIndex: number;
  counts: Record<string, any>;
}

export interface IOrganizationItem {
  date: string;
  id: number;
  organizationName: string;
  products: IProduct[];
  status: number;
}

export interface IProduct {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

export enum OrderStatus {
  Pending = 1,
  Approved = 2,
  Rejected = 3,
}

// -----------------------------------------------



//#region Enums;
export enum CollectionStatus {
  Pending = 1,
  Approved = 2,
  Rejected = 3,
}

export enum CollectionStatusTypes {
    PaymentCollectionStatus = 1,
    PharmacyOrderStatus = 2,
    OrderCollectionStatus = 3,
}
//#endregion

//#region  Shared Interfaces
export interface ICollectionProduct 
{
  id: number;
  name: string;
  quantity: number;
  cost: number;
}
//#endregion

//#region Payment Collection
export interface IPaymentCollection {
  id: number;
  date: string;
  organization : string,
  cost: number;
  invoiceNumber: string;
  status: CollectionStatus;
  statusName: string;
}
export interface IPaymentCollectionFilter {}
export interface IPaymentCollectionSearchRequest {
  filter: IPaymentCollectionFilter;
  pageIndex: number;
  pageSize: number;
}
export interface IPaymentCollectionSearchResponse {
  items: IPaymentCollection[];
  totalCount: number;
  pageCount: number;
  currentPageIndex: number;
  counts: Record<string, any>;
}
//#endregion 

//#region Order Collection
export interface IOrderCollection {
  id: number;
  date: string;
  organization: string;
  status : CollectionStatus;
  statusName: string;
  products: ICollectionProduct[];
}
export interface IOrderCollectionFilter {}
export interface IOrderCollectionSearchRequest {
  filter: IOrderCollectionFilter;
  pageIndex: number;
  pageSize: number;
}
export interface IOrderCollectionSearchResponse {
  items: IOrderCollection[];
  totalCount: number;
  pageCount: number;
  currentPageIndex: number;
  counts: Record<string, any>;
}
//#endregion

//#region Pharmacy Order
export interface IPharmacyOrders
{
  id: number;
  date: string;
  organization: string;
  status: CollectionStatus;
  statusName: string;
  products: ICollectionProduct[];
}
export interface IPharmacyOrderFilter {}
export interface IPharmacyOrderSearchRequest {
  filter: IPharmacyOrderFilter;
  pageIndex: number;
  pageSize: number;
}
export interface IPharmacyOrderSearchResponse {
  items: IPharmacyOrders[];
  totalCount: number;
  pageCount: number;
  currentPageIndex: number;
  counts: Record<string, any>;
}
//#endregion


export interface IUpdateCollectionStatus {
  id: number;
  status: CollectionStatus;
  statusType : CollectionStatusTypes;
}

export interface IRequestsPagedSearchRequest {
  filter: string | null;
  pageIndex: number;
  pageSize: number;
}

export interface IRequestsPagedSearchResponse {
  items: IRequest[];
  totalCount: number;
  pageCount: number;
  currentPageIndex: number;
  counts: Record<string, any>;
}

export interface IRequest {
  id: number;
  requestType: RequestType;
  medRepName: string;
  type: string;
  status: statusType;
  requestDate: Date;
  TypeSpecificDate: Date;
  TypeSpecificSelect: string;
  doctorName: string;
  TypeSpecificNumber: number;
  notes?: string;         
}

export interface IManageRequestsFormlookups{
  
}

export interface IUpdateRequestStatus {
  requestId: number;
  requestType: RequestType;
  status: statusType;
}

export enum RequestType {
  Sales = 1,
  Samples = 2,
}

export enum statusType {
  Pending = 1,
  Approved = 2,
  Rejected = 3,
}

export interface IEditRequest{
  requestId: number;
  requestType: RequestType;
  requestDate: Date;
}



