export interface UserLogin { 
    email: string;
    password: string;
}

export interface RegisterUser extends UserLogin {
    name: string;
}