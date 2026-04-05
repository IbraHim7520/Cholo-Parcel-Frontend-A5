import { ComphanyType, MarchentStatus, PercelType, RiderRequestStatus, UserStatus, VehicleType } from "./interfaces";

export interface IGetMerchantData {
    id: string;
    ComphanyName: string;
    ComphanyAddress: string;
    ComphanyPhone: string;
    ComphanyEmail: string;
    ComphanyLogo: string;
    ComphanyWebsite: string;
    ComphanyDescription: string;
    ComphanyType: ComphanyType;
    CreatedAt: Date;
    UpdatedAt: Date;
    status: MarchentStatus;
    ownerId: string;

    user: {
        name: string;
        email: string;
        image: string | null;
    }
}

export interface IPendingMerchentData {
    id:string;
    ComphanyEmail: string;
    ComphanyLogo: string;
    ComphanyName: string;
    status: MarchentStatus;
    user: {
        email: string;
        name: string;
        image?: string | null // optional if sometimes missing
    };
}


export interface IAdminCreateMerchent {
    ownerName: string;
    ownerEmail: string;
    ownerImage: string;
    ownerPassword: string;
    
    comphanyName: string;
    comphanyAddress: string;
    comphanyPhone: string;
    comphanyEmail: string;
    comphanyLogo: string;
    comphanyWebsite: string;
    comphanyDescription: string;
    comphanyType: ComphanyType;
}

export interface IAdminGetAllRider {
    id: string;
    userId: string;
    nid: string;
    dob: string;
    bloodGrouph: string;
    contact: string;
    address: string;
    deliveryArea: string;
    vehicleType: VehicleType;
    vehicleNumber: string;
    experience?: string;
    status: RiderRequestStatus;
    isAvailable: boolean;
    isBanned: boolean;
    joinDate: string;
    assignedAt: string | null;
    user: {
        name: string;
        email: string;
        image: string;
    };

}


export interface IPendingRiderData {
    id: string;
    address: string;
    bloodGrouph: string;
    contact: string;
    deliveryArea: string;
    dob: string; // ISO date string
    experience: string;
    nid: string;
    status: RiderRequestStatus;
    vehicleNumber: string;
    vehicleType: VehicleType;
    user: {
        name: string;
        email: string;
        image: string;
    };
}


export interface IAdminGetAllPercel {
    id:string
    name: string;
    notes?: string;
    weight: number;
    price: number;
    deliveryCharge: number;
    pickupLocation: string;
    isSelfPickup: boolean;
    percelType: PercelType; // adjust if you have more types
    reciverName: string;
    reciverContact: string;
    reciverAddress: string;
    pickupTime: string; // ISO string
    deliveryTime: string; // ISO string
    merchentId: string;

    rider?: {
        name: string;
        email: string;
        image?: string | null;
    };
}


export interface IAdminGetAllUsers {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image: string;
    role: string;
    status: UserStatus;
    isDeleted: boolean;
    deletedAt: string | null;
    createdAt: string;
    updatedAt: string;
}
