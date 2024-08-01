import { Customer } from "./Customer";

export interface CustomerHMOS {
    id: number;
    customerId: number;
    customer?: Customer;
    hmoId: number;
    freeFitId: string;
    filedId: number; 
}   