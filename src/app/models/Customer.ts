export class Customer {
  firstName: string;
  lastName?: string;
  phone: string;
  address: string;
  email: string;
  subscriptionTypeId: number;
  paymentOptionId: number;
  hmoId?: number;

  constructor(
    firstName: string,
    lastName: string,
    phone: string,
    address: string,
    email: string,
    subscriptionTypeId: number,
    paymentOptionId: number,
    hmoId: number
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.address = address;
    this.email = email;
    this.subscriptionTypeId = subscriptionTypeId;
    this.paymentOptionId = paymentOptionId;
    this.hmoId = hmoId;
  }
}
