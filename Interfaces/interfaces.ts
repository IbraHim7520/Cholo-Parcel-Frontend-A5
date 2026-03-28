export enum ComphanyType {
  ONLINE = "ONLINE",
  PHYSICAL = "PHYSICAL",
  BOTH = "BOTH",
}




export enum VehicleType {
  BIKE = "BIKE",
  CYCLE = "CYCLE",
  VAN = "VAN",
}

export enum NotificationTarget {
  ALL = "ALL",
    USER = "USER",
    MERCHENT = "MERCHENT",
    RIDER = "RIDER",
    ADMIN = "ADMIN",

}

export enum PaymentStatus {
  PAID = "PAID",
    UNPAID = "UNPAID",
    PENDING = "PENDING",
    CANCELLED = "CANCELLED",
}

export enum PaymentMethode {
  CASH = "CASH",
    MOBILE_BANKING = "MOBILE_BANKING",
    BANK_TRANSFER = "BANK_TRANSFER",
    CARD = "CARD",
}

export enum PercelStatus {
  REQUESTED = "REQUESTED",
    CONFIRMED = "CONFIRMED",
    PICKED = "PICKED",
    SHIPPED = "SHIPPED",
    ARRIVED_WARHOUSE = "ARRIVED_WARHOUSE",
    IN_TRANSIT = "IN_TRANSIT",
    DRIVER_ASSIGNED = "DRIVER_ASSIGNED",
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED",
    RETURNED = "RETURNED",
}

export enum PercelType {
  DOCUMENT = "DOCUMENT",
    GLASS = "GLASS",
    PAKAGE = "PAKAGE",
    FOOD = "FOOD",
    OTHERS = "OTHERS",
}


export enum RiderRequestStatus {
  PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
}

export enum MarchentStatus {
  PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
}

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
  RIDER = "RIDER",
  MERCHENT = "MERCHENT",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  DEACTIVE = "DEACTIVE",
  DELETED = "DELETED",
}

export interface IUser {
  data:{
    id: string;
    name: string;
    email: string;
    image: string;
    role: UserRole// extend if needed
    status: UserStatus;
    isDeleted: boolean;
    emailVerified: boolean;

    createdAt: string;   // ISO date string
    updatedAt: string;
    deletedAt: string | null;

    // JWT fields (optional, because sometimes you may not include them)
    iat?: number;
    exp?: number;
  }
}


export interface IUser {
  id: string;
  name: string;
  email: string;
  image: string;

  role: UserRole;
  status: UserStatus;

  isDeleted: boolean;
  emailVerified: boolean;

  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}


export interface IGetAllMarchentData {
  id: string;

  ComphanyName: string;
  ComphanyAddress: string;
  ComphanyPhone: string;
  ComphanyEmail: string;
  ComphanyLogo: string;
  ComphanyDescription: string;
  ComphanyWebsite: string;
  ComphanyType: ComphanyType;

  CreatedAt: string;
  UpdatedAt: string;

  ownerId: string;
  status: MarchentStatus;

  user: IUser;
}



export interface IDashboardStats {
  activeUser: number;
  approvedRiders: number;
  cancelledParcels: number;
  deletedUser: number;
  deliveredParcels: number;
  inactiveUser: number;
  pendingRiders: number;
  rejectedRiders: number;
  returnedParcels: number;
  totalMarchent: number;
  totalParcels: number;
  totalRider: number;
  totalUser: number;
}