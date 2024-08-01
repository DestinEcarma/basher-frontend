import { SIGN_UP, SignUpFields } from "../utils/defs";
import { useMutation } from "@apollo/client";
import { GraphqlErrorType } from "@services/graphql";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const useSignUp = () => {
	const navigate = useNavigate();
	const apollo = useMutation(SIGN_UP);
	const form = useForm<SignUpFields>();

	const data = apollo[1].data;
	const error = apollo[1].error;

	const setError = form.setError;

	useEffect(() => {
		if (!error) return;

		error.graphQLErrors.forEach(({ message }) => {
			if (message !== GraphqlErrorType.EMAIL_TAKEN) return;

			setError("email", { message: "Email is already taken" });
		});
	}, [error, setError]);

	useEffect(() => {
		if (!data) return;

		const onClose = () => navigate("/forum");

		toast.success("Signed up successfully", {
			duration: 3000,
			onDismiss: onClose,
			onAutoClose: onClose,
		});
	}, [data, navigate]);

	return { form, apollo };
};

export default useSignUp;
