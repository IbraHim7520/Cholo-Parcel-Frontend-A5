import { PercelStatus, PercelType } from "./interfaces";

export interface IMerchentGetOwnPercels {
    id: string;
    merchentId: string;
    riderId: string | null;

    name: string;
    notes?: string;

    weight: number;
    price: number;
    deliveryPrice: number;

    percelType: PercelType;
    status: PercelStatus;

    isSelfPickup: boolean;

    pickupLocation: string;
    pickupTime: string;      // ISO string

    reciverName: string;
    reciverContact: string;
    reciverAddress: string;

    deliveryTime: string;    // ISO string

}