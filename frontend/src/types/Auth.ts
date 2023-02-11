import User from "./User";

type Auth = {
    accessToken: string;
	user: User | null;
}

export default Auth;