export class Customer {
  tz: string;
  firstName: string;
  lastName?: string;
  phone: string;
  address: string;
  email: string;
  customerTypeId: number;
  subscriptionTypeId: number;
  paymentOptionId: number;
  hmoId?: number;
  isActive?: boolean;

  constructor(
    tz: string,
    firstName: string,
    lastName: string,
    phone: string,
    address: string,
    email: string,
    customerTypeId: number,
    subscriptionTypeId: number,
    paymentOptionId: number,
    hmoId: number,
    isActive?: boolean
  ) {
    this.tz = tz;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.address = address;
    this.email = email;
    this.customerTypeId = customerTypeId;
    this.subscriptionTypeId = subscriptionTypeId;
    this.paymentOptionId = paymentOptionId;
    this.hmoId = hmoId;
    this.isActive = isActive ? isActive : true;
  }
}
