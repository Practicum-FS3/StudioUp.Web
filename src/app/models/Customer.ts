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
    hmoId: number
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
  }
}
