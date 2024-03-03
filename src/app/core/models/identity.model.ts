export interface TokenResponse {
    tokenType: string;
    accessToken: string;
    expireIn: number;
    refreshToken: string;
}
export interface LoginModel {
    username: string;
    password: string;
    twoFactorCode?: string;
    twoFactorRecoveryCode?: string;
}