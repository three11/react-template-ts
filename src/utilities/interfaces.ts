export interface AuthRequest {
	email: string;
	password: string;
}

export interface SignupRequest extends AuthRequest {
	gender: string;
	username: string;
	image_url: string;
	last_name: string;
	first_name: string;
}
