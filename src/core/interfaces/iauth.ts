
export interface ILoginUser {
    userName: string;
    password: string;
    token?: string;
}

export class Roles
{
    static Developer = "0";
    static MedRep = "1";
    static MedSup = "2";
    static SalesRep = "3";
    static SalesSup = "4";
    static OrdersOfficer = "5";
    static FinancialOfficer = "6";
    static FinancialManager = "7";
    static GeneralManager = "8";
    static Assistant = "9";
    static Admin = "10";
}

  export interface IUserInfo {
    Id: number;
    UserName : string;
    Name: string;
    Role: string;
}