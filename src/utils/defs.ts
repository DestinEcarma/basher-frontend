import { gql } from "@apollo/client";

export interface Counter {
	likes: number;
	shares: number;
	replies: number;
	views: number;
}

export interface UserStatus {
	identity: number;
	isOwner: boolean;
	isLiked: boolean;
	isShared: boolean;
}

export interface Children {
	children?: React.ReactNode;
}

export type ReactInputAttributes = React.InputHTMLAttributes<HTMLInputElement>;
export type ReactLabelAttributes = React.LabelHTMLAttributes<HTMLLabelElement>;
export type ReactButtonAttributes = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const EMAIL_REGEX =
	// eslint-disable-next-line no-useless-escape
	/(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@[*[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+]*/;

export const INTERSECTION_OPTIONS = {
	root: null,
	rootMargin: "0px",
	threshold: 0,
};

export interface AuthQuery {
	user: {
		auth: boolean;
	};
}

export const AUTH = gql`
	query Auth {
		user {
			auth
		}
	}
`;

export const LOGOUT = gql`
	mutation Logout {
		user {
			logout
		}
	}
`;
