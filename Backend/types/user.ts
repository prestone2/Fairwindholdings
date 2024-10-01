// /Backend/types/user.ts

export interface UserRegistrationData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  country: string;
  currency: string;
  promoCode?: string;
}

export interface UserData {
  balance: number;
  leverage: string;
  credit: number;
  totalDeposits: number;
  fullName: string;
  email: string;
  profileImage: string;
}

export interface Stats {
  pnl: number;
  profit: number;
  loss: number;
  profitableOrders: string;
}
export interface User {
  id: string;
  email: string;
  fullName: string;
  profileImage: string;
  balance: number;
  leverage: string;
  credit: number;
  totalDeposits: number;  
}

export interface UserResponse {
  user: User;
  stats: Stats;             
}
export interface UserLoginData {
  email: string;
  password: string; 
}
export interface AccountPanelProps {
  userData: {
    balance: number;
    leverage: number;
    credit: number;
  } | undefined;
}