import App from "./App.tsx";
import "./index.css";
import { ApolloProvider } from "@apollo/client";
import { client } from "@services/graphql.ts";
import React from "react";
import ReactDOM from "react-dom/client";

document.documentElement.setAttribute("data-color-mode", "light");

ReactDOM.createRoot(document.getElementById("root")!).render(
	<ApolloProvider client={client}>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</ApolloProvider>,
);
