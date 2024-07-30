import { ApolloClient, from, HttpLink, InMemoryCache } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { GraphQLFormattedError } from "graphql";

export interface GraphqlError extends GraphQLFormattedError {
	readonly extensions?: {
		readonly code?: string;
		readonly reason?: string;
	};
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
