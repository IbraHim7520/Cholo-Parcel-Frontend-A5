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


export interface IReview {
    id: string;
    rating: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    percelId: string;
    user: {
        id: string;
        name: string;
        email: string;
        image: string;
    };
    percel: {
        id: string;
        name: string;
        reciverName: string;
        reciverAddress: string;
    };
}