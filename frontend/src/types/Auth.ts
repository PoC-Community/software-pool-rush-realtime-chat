import User from "./User";

type Auth = {
    accessToken: string;
	user: User | null;
    isAuthed: boolean;
    isLoading: boolean;
}

export default Auth;