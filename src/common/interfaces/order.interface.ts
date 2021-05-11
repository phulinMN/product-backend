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