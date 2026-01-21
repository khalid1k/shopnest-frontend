import { apiClient } from "../apiClient/apiClient";

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    fullName: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    id: string;
    fullName: string;
    email: string;
    accessToken: string;
}


class AuthService {
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const { data } = await apiClient.post<AuthResponse>('/auth/login', credentials);
        localStorage.setItem("accessToken", data.accessToken);
        return data;
    }

    async registerUser( registerData: RegisterData): Promise<AuthResponse> {
        const { data } = await apiClient.post<AuthResponse>("/auth/register", registerData);
        localStorage.setItem("accessToken", data.accessToken);
        return data;
    }
}

export const authService = new AuthService();