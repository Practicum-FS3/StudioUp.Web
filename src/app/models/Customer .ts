export class Customer {
  id?: number;
  firstName?: string;
  lastName?: string;
  customerTypeId?: number;
  hmoId?: number;
  paymentOptionId?: number;
  subscriptionTypeId?: number;
  isActive?: boolean;
  tel?: string;
  address?: string;
  email?: string;
  constructor(
    firstName: string,
    lastName: string,
    customerTypeId: number,
    hmoId: number,
    paymentOptionId: number,
    subscriptionTypeId: number,
    isActive: boolean,
    tel: string,
    address: string,
    email: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.customerTypeId = customerTypeId;
    this.hmoId = hmoId;
    this.paymentOptionId = paymentOptionId;
    this.subscriptionTypeId = subscriptionTypeId;
    this.isActive = isActive;
    this.tel = tel;
    this.address = address;
    this.email = email;
  }
}
