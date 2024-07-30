export interface Children {
	children?: React.ReactNode;
}

export type ReactInputAttributes = React.InputHTMLAttributes<HTMLInputElement>;
export type ReactLabelAttributes = React.LabelHTMLAttributes<HTMLLabelElement>;
export type ReactButtonAttributes = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const EMAIL_REGEX =
	// eslint-disable-next-line no-useless-escape
	/(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@[*[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+]*/;
