import { ApolloClient, from, HttpLink, InMemoryCache } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

export const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: from([
		// Temporary error handling
		onError(({ graphQLErrors, networkError }) => {
			if (graphQLErrors) {
				graphQLErrors.map(({ message, locations, path }) => {
					alert(`Graphql error ${message} ${locations} ${path}`);
				});
			}

			if (networkError) {
				alert(`Network error ${networkError}`);
			}
		}),

		new HttpLink({ uri: "http://10.147.18.25:3000/graphql" }),
	]),
});
