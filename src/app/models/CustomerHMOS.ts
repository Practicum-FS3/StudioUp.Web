export class CustomerHMOS {
    id?: number;
    customerID?: number;
    hmoid?: number;
    freeFitId?: string;
    filedId?: number;
    isActive?: boolean;

    constructor(
        id?: number,
        customerID?: number,
        hmoid?: number,
        freeFitId?: string,
        filedId?: number,
        isActive?: boolean
    ) {
        this.id = id;
        this.customerID = customerID;
        this.hmoid = hmoid;
        this.freeFitId = freeFitId;
        this.filedId = filedId;
        this.isActive = isActive;
    }
}
