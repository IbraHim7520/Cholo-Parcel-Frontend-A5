import { PercelStatus, PercelType } from "./interfaces";

export interface IRiderGetRequestedPercel {
    id: string,
    name: string,
    notes: string,
    weight: number,
    price: number,
    deliveryCharge: number,
    status: PercelStatus,
    pickupLocation: string,
    isSelfPickup: boolean,
    percelType: PercelType,
    reciverName: string,
    reciverContact: string,
    reciverAddress: string,
    pickupTime: string,
    deliveryTime: string,
    merchentId: string,
    riderId: string | null
}