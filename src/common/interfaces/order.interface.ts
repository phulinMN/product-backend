export enum OrderStatusEnum {
  PENDING = 'pending',
  SUCCESS = 'success',
  CANCEL = 'cancel',
}

export interface IOrderContact {
  addressStreet: string;
  addressProvince: string;
  addressDistrict: string;
  addressCity: string;
  addressZipcode: string;
  phone: string;
}

export interface ICreateOrderItem {
  productId: number;
  quantity: number;
}
export interface ICreateOrder extends IOrderContact {
  status?: OrderStatusEnum;
  products: ICreateOrderItem[];
}

export interface IUpdateOrder {
  status?: OrderStatusEnum;
  products?: ICreateOrderItem[];
  addressStreet?: string;
  addressProvince?: string;
  addressDistrict?: string;
  addressCity?: string;
  addressZipcode?: string;
  phone?: string;
}

export interface IUploadSlipOrder {
  file: Express.Multer.File;
}

export interface IConfirmPaidPrice {
  paidPrice: number;
}