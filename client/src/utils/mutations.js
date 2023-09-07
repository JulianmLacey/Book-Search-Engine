import { gql } from "@apollo/client";

export const Login_User = gql`
	mutation loginUser($email: String!, $password: String!) {
		loginUser(email: $email, password: $password) {
			_id
			email
			password
		}
	}
`;
