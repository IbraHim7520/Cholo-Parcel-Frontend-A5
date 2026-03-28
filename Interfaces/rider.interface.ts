import { IUser, RiderRequestStatus, VehicleType } from "./interfaces";

export interface IGetRiderData {
    id: string;
    userId: string;
    isBanned: boolean;
    joinDate: string;

    nid: string;
    dob: string;
    status: RiderRequestStatus;

    bloodGrouph?: string; // optional
    contact: string;
    address: string;
    deliveryArea: string;
    experience: string;

    vehicleType: VehicleType;
    vehicleNumber: string;

    isAvailable: boolean;
    assignedAt: string | null;

    user: IUser;
}