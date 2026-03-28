import { PercelStatus, PercelType } from "./interfaces";

    
export interface ICreateParcel {
    name: string;
    notes: string;
    weight: number;
    price: number;
    status: PercelStatus;
    pickupLocation: string;
    isSelfPickup: boolean;
    percelType: PercelType;
    reciverName: string;
    reciverContact: string;
    reciverAddress: string;
    pickupTime: string;
    deliveryTime: string;
}


export interface IParcel {
    id: string;
    name: string;
    notes: string;

    weight: number;
    price: number;

    status: PercelStatus;
    percelType: PercelType;

    pickupLocation: string;
    pickupTime: string;
    deliveryTime: string;

    isSelfPickup: boolean;

    reciverName: string;
    reciverContact: string;
    reciverAddress: string;

    merchentId: string;
    riderId: string | null;
}
export interface IParcelGroup {
    status: PercelStatus;
    _count: number;
}
export interface IParcelResponse {
    parcelGroup: IParcelGroup[];
    parcels: IParcel[];
}