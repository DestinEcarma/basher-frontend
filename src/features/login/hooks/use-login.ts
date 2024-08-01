import { LOGIN, LoginFields } from "../utils/defs";
import { useMutation } from "@apollo/client";
import { GraphqlErrorType } from "@services/graphql";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const useLogin = () => {
	const navigate = useNavigate();
	const apollo = useMutation(LOGIN);
	const form = useForm<LoginFields>({ defaultValues: { rememberMe: false } });

	const data = apollo[1].data;
	const error = apollo[1].error;

	const setError = form.setError;

	useEffect(() => {
		if (!error) return;

		error.graphQLErrors.forEach(({ message }) => {
			switch (message) {
				case GraphqlErrorType.EMAIL_NOT_FOUND:
					setError("email", { message: "Email not found" });
					break;
				case GraphqlErrorType.INVALID_PASSWORD:
					setError("password", { message: "Invalid password" });
					break;
			}
		});
	}, [error, setError]);

	useEffect(() => {
		if (!data) return;

		const onClose = () => navigate("/forum");

		toast.success("Logged in successfully", {
			duration: 3000,
			onDismiss: onClose,
			onAutoClose: onClose,
		});
	}, [data, navigate]);

	return { form, apollo };
};

export default useLogin;
