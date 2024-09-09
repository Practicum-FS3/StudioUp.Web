export class Customer {
  Tz: string;
  firstName: string;
  lastName?: string;
  tel: string;
  address: string;
  email: string;
  customerTypeId: number;
  subscriptionTypeId: number;
  paymentOptionId: number;
  hmoId?: number;
  isActive?: boolean;

  constructor(
    Tz: string,
    firstName: string,
    lastName: string,
    tel: string,
    address: string,
    email: string,
    customerTypeId: number,
    subscriptionTypeId: number,
    paymentOptionId: number,
    hmoId: number,
    isActive?: boolean
  ) {
    this.Tz = Tz;
    this.firstName = firstName;
    this.lastName = lastName;
    this.tel = tel;
    this.address = address;
    this.email = email;
    this.customerTypeId = customerTypeId;
    this.subscriptionTypeId = subscriptionTypeId;
    this.paymentOptionId = paymentOptionId;
    this.hmoId = hmoId;
    this.isActive = isActive ? isActive : true;
  }
}
