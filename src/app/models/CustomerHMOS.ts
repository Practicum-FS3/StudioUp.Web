import { Customer } from "./Customer";

export interface CustomerHMOS {
    id: number;
    customerID: number;
    customer?: Customer;
    hmoId: number;
    freeFitId: string;
    filedId: number; 
}   