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



// import { Customer } from "./Customer";

// export class CustomerHMOS {
//     private _id: number | undefined;
//     private _customerID: number | undefined;
//     // private _customer?: Customer;
//     private _hmoid: number | undefined;
//     private _freeFitId: string | undefined;
//     private _filedId: number | undefined;
//     private _isActive:boolean|undefined;

//     constructor(
//         id?: number,
//         customerID?: number,
//         // customer?: Customer,
//         hmoid?: number,
//         freeFitId?: string,
//         filedId?: number,
//         isActive?:boolean
//     ) {
//         this._id = id;
//         this._customerID = customerID;
//         // this._customer = customer;
//         this._hmoid = hmoid;
//         this._freeFitId = freeFitId;
//         this._filedId = filedId;
//         this._isActive=isActive;
//     }
    
//     // Getter and Setter for id
//     get id(): number | undefined {
//         return this._id;
//     }

//     set id(value: number | undefined) {
//         this._id = value;
//     }

//     // Getter and Setter for customerID
//     get customerID(): number | undefined {
//         return this._customerID;
//     }

//     set customerID(value: number | undefined) {
//         this._customerID = value;
//     }

//     // Getter and Setter for customer
//     // get customer(): Customer | undefined {
//     //     return this._customer;
//     // }

//     // set customer(value: Customer | undefined) {
//     //     this._customer = value;
//     // }

//     // Getter and Setter for hmoId
//     get hmoid(): number | undefined {
//         return this._hmoid;
//     }

//     set hmoid(value: number | undefined) {
//         this._hmoid = value;
//     }

//     // Getter and Setter for freeFitId
//     get freeFitId(): string | undefined {
//         return this._freeFitId;
//     }

//     set freeFitId(value: string | undefined) {
//         this._freeFitId = value;
//     }

//     // Getter and Setter for filedId
//     get filedId(): number | undefined {
//         return this._filedId;
//     }

//     set filedId(value: number | undefined) {
//         this._filedId = value;
//     }
// }
