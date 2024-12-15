import { ApolloClient, from, HttpLink, InMemoryCache } from "@apollo/client";
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

	INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
}

export const client = new ApolloClient({
	cache: new InMemoryCache(),
	credentials: "include",
	link: from([
		onError(({ graphQLErrors, networkError }) => {
			if (graphQLErrors) {
				graphQLErrors.map(({ message }: GraphqlError) => {
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
		}),

		new HttpLink({ uri: "/graphql" }),
	]),
});
