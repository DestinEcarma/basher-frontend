import { ApolloClient, from, HttpLink, InMemoryCache } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { GraphQLFormattedError } from "graphql";

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

	INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
}

export const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: from([
		// Temporary error handling
		onError(({ graphQLErrors, networkError }) => {
			if (graphQLErrors) {
				graphQLErrors.map(({ message, locations, path }) => {
					console.error(`Graphql error ${message} ${locations} ${path}`);
				});
			}

			if (networkError) {
				alert(`Network error ${networkError}`);
			}
		}),

		new HttpLink({ uri: "http://10.147.18.25:3000/graphql" }),
	]),
});
