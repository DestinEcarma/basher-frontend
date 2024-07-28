import { GRAPHQL_PATH, API } from "../../../services/api";

export enum LoginResults {
	SUCCESS,
	EMAIL_NOT_FOUND,
	INVALID_PASSWORD,
	BAD_REQUEST,
	INTERNAL_SERVER_ERROR,
}

export async function login(email: string, password: string, rememberMe: boolean): Promise<LoginResults | void> {
	const LOGIN_QUERY = `
		mutation ($input: LoginInput!) {
			user {
				login(input: $input)
			}
		}`;

	const response = await API.post(GRAPHQL_PATH, {
		query: LOGIN_QUERY,
		variables: {
			input: {
				email,
				password,
				rememberMe,
			},
		},
	});

	const result = response.data;

	if (result.data === null && typeof result.errors === "object") {
		const code = result.errors[0].extensions.code;

		if (code) {
			switch (code) {
				case "EMAIL_TAKEN":
					return LoginResults.EMAIL_NOT_FOUND;
				case "INVALID_PASSWORD":
					return LoginResults.INVALID_PASSWORD;
				case "BAD_REQUEST":
					return LoginResults.BAD_REQUEST;
				case "INTERNAL_SERVER_ERROR":
					return LoginResults.INTERNAL_SERVER_ERROR;
				default:
					alert("Unidentified Error");
			}
		} else {
			alert("Unidentifies Error");
		}
	} else {
		return LoginResults.SUCCESS;
	}
}
