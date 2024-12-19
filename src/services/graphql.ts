import { ApolloClient, from, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { GraphQLFormattedError } from "graphql";
import { toast } from "sonner";

export interface GraphqlError extends GraphQLFormattedError {
	readonly extensions?: {
		readonly code?: string;
	};
}

export enum GraphqlErrorType {
	// General errors
	BAD_REQUEST = "BAD_REQUEST",

	// Login errors
	EMAIL_NOT_FOUND = "EMAIL_NOT_FOUND",
	INVALID_PASSWORD = "INVALID_PASSWORD",

	// Sign up errors
	EMAIL_TAKEN = "EMAIL_TAKEN",

	// Authorization errors
	UNAUTHORIZED = "UNAUTHORIZED",

	INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
}

const authLink = setContext((_, { headers }) => {
	const token = sessionStorage.getItem("connect.sid");

	return {
		headers: {
			...headers,
			Authorization: token ? `Bearer ${token}` : "",
		},
	};
});

const errorHandler = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors) {
		graphQLErrors.map(({ message }: GraphqlError) => {
			console.log(message);
			switch (message) {
				case GraphqlErrorType.BAD_REQUEST:
					toast.error("An error occurred: Bad Request");
					break;
				case GraphqlErrorType.INTERNAL_SERVER_ERROR:
					toast.error("An error occurred: Internal Server Error");
					break;
				default:
					if (Object.values(GraphqlErrorType).includes(message as GraphqlErrorType)) {
						break;
					}

					toast.error("An error occurred: Unknown Error");
					break;
			}
		});
	}

	if (networkError) {
		toast.error("An error occurred: Network Error");
	}
});

const httpLink = new HttpLink({ uri: "/graphql" });

export const client = new ApolloClient({
	cache: new InMemoryCache(),
	credentials: "include",
	link: from([authLink, errorHandler, httpLink]),
});
