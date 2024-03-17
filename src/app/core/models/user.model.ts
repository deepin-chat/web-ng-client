export interface UserModel {
    id: string;
    userName: string;
    profile: UserProfile;
}
export interface UserProfile {
    name: string;
    firstName: string
    lastName: string;
    nickName: string;
    picture: string;
    gender: string;
    birthDate: string;
    bio: string;
    zoneInfo: string;
    local: string;
    title: string;
}
export interface ProfileRequest {
    name: string;
    nickName: string;
    firstName: string
    lastName: string;
    pictureId: string;
    gender: string;
    birthDate: string;
    bio: string;
    zoneInfo: string;
    local: string;
    title: string;
}