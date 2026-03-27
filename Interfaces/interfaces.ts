enum ComphanyType {
  ONLINE = "ONLINE",
  PHYSICAL = "PHYSICAL",
  BOTH = "BOTH",
}




enum VehicleType {
  BIKE = "BIKE",
  CYCLE = "CYCLE",
  VAN = "VAN",
}

enum NotificationStatus {
  READ = "READ",
  UNREAD = "UNREAD",
}

enum PaymentStatus {
  PAID = "PAID",
    UNPAID = "UNPAID",
    PENDING = "PENDING",
    CANCELLED = "CANCELLED",
}

enum PaymentMethode {
  CASH = "CASH",
    MOBILE_BANKING = "MOBILE_BANKING",
    BANK_TRANSFER = "BANK_TRANSFER",
    CARD = "CARD",
}

enum PercelStatus {
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

enum PercelType {
  DOCUMENT = "DOCUMENT",
    GLASS = "GLASS",
    PAKAGE = "PAKAGE",
    FOOD = "FOOD",
    OTHERS = "OTHERS",
}


enum RiderRequestStatus {
  PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
}

enum MarchentStatus {
  PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
}

enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
  RIDER = "RIDER",
  MERCHENT = "MERCHENT",
}

enum UserStatus {
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