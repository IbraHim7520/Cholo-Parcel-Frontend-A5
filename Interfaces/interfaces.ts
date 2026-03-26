export interface IUser {
  id: string;
  name: string;
  email: string;
  image: string;
  role: "USER" | "ADMIN" | "RIDER"; // extend if needed
  status: "ACTIVE" | "INACTIVE" | "BLOCKED";
  isDeleted: boolean;
  emailVerified: boolean;

  createdAt: string;   // ISO date string
  updatedAt: string;
  deletedAt: string | null;

  // JWT fields (optional, because sometimes you may not include them)
  iat?: number;
  exp?: number;
}