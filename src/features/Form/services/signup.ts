import { GRAPHQL_PATH, API } from "../../../services/api";

export enum SignUpResults {
	SUCCESS,
	EMAIL_TAKEN,
	BAD_REQUEST,
	INTERNAL_SERVER_ERROR,
}

export async function signUp(email: string, password: string): Promise<SignUpResults | void> {
	const SIGNUP_QUERY = `
		mutation ($input: SignUpInput!) {
			user {
				signUp(input: $input)
			}
		}`;

	const response = await API.post(`${GRAPHQL_PATH}`, {
		query: SIGNUP_QUERY,
		variables: {
			input: {
				email,
				password,
			},
		},
	});

	const result = response.data;

	if (result.data === null && typeof result.errors === "object") {
		const reason = result.errors[0].extensions.reason;

		if (reason) {
			switch (reason) {
				case "EMAIL_TAKEN":
					return SignUpResults.EMAIL_TAKEN;
				case "BAD_REQUEST":
					return SignUpResults.BAD_REQUEST;
				case "INTERNAL_SERVER_ERROR":
					return SignUpResults.INTERNAL_SERVER_ERROR;
				default:
					alert("Unidentified Error");
			}
		} else {
			alert("Unidentified Error");
		}
	} else {
		return SignUpResults.SUCCESS;
	}
}
