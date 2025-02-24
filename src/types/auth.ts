
export interface User {
  id: string;
  email: string;
  resetToken?: string;
}

export interface AuthState {
  user: User | null;
  error: string | null;
  loading: boolean;
}

export interface AuthFormData {
  email: string;
  password: string;
}

export interface ResetPasswordFormData {
  email: string;
}
