export interface UserInfo {
  id: number;
  email: string;
  createDate: string;
  withdrawalDate?: string;
  socialType: string;
  socialId: string;
  userType: string;
  withdrawalGroundsType?: string;
}

export interface WithDrawl {
  userId: string;
  withdrawalGroundsType: string;
}
