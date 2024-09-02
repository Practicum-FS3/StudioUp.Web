export class CustomerSubscription {
  constructor(
    public id: number, // מזהה מנוי ללקוח (PK)
    public customerId: number, // מזהה לקוח (FK)
    public subscriptionTypeId: number, // מזהה מנוי (FK)
    public startDate: Date // תאריך התחלה
  ) {}
}
