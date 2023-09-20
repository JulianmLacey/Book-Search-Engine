import React from "react";
import { Outlet } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// new
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import Navbar from "./components/Navbar";

// new code
// Construct the main GraphQL API endpoint

const client = new ApolloClient({
	// Set up client to execute the `authLink` middleware prior to making the request to our GraphQL API
	uri: "/graphql",
	cache: new InMemoryCache(),
});

function App() {
	return (
		<ApolloProvider client={client}>
			<Navbar />
			<Outlet />
		</ApolloProvider>
	);
}

export default App;
