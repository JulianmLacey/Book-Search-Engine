import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
	mutation Mutation($username: String!, $email: String!, $password: String!) {
		addUser(username: $username, email: $email, password: $password) {
			token
		}
	}
`;

export const ADD_USER = gql`
	mutation addUser($username: String!, $email: String!, $password: String!) {
		addUser(username: $username, email: $email, password: $password) {
			_id
			email
			username
			bookCount
			savedBooks
		}
	}
`;

export const SAVE_BOOK = gql`
	mutation saveBook($newBook: savebook!) {
		saveBook(newBook: $newBook) {
			_id
			username
			email
			savedBooks
		}
	}
`;

export const REMOVE_BOOK = gql`
	mutation loginUser($email: String!, $password: String!) {
		loginUser(email: $email, password: $password) {
			_id
			email
			password
		}
	}
`;
