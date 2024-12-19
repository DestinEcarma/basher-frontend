import { useLazyQuery } from "@apollo/client";
import { AuthContext } from "@components/auth";
import CreatePost from "@components/create-post";
import { LogoutProvider } from "@hooks/use-logout";
import ForumPage from "@pages/forum";
import LoginPage from "@pages/login";
import SignUpPage from "@pages/sign-up";
import TopicPage from "@pages/topic";
import { AUTH, AuthQuery } from "@utils/defs";
import React, { Suspense, useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "sonner";

const App: React.FC = () => {
	const location = useLocation();

	const [auth, setAuth] = useState(false);

	const [lazyAuth] = useLazyQuery<AuthQuery>(AUTH, { fetchPolicy: "no-cache" });

	useEffect(() => {
		(async () => {
			const { data } = await lazyAuth();

			if (data?.user.auth) {
				setAuth(true);
			}
		})();
	}, [lazyAuth, location.pathname]);

	return (
		<div className="flex h-dvh flex-col">
			<Toaster richColors duration={5000} closeButton position="top-right" />
			<Suspense fallback={<div>Loading...</div>}>
				<AuthContext.Provider value={auth}>
					<LogoutProvider setAuth={setAuth}>
						<Routes>
							<Route path="/" element={<Navigate to="/forum" />} />
							<Route path="/login" element={<LoginPage />} />
							<Route path="/sign-up" element={<SignUpPage />} />
							<Route
								path="/forum"
								element={
									<CreatePost.Display>
										<ForumPage />
									</CreatePost.Display>
								}
							/>
							<Route
								path="/topic/:id"
								element={
									<CreatePost.Display>
										<TopicPage />
									</CreatePost.Display>
								}
							/>
							<Route path="*" element={<Navigate to="/forum" />} />
						</Routes>
					</LogoutProvider>
				</AuthContext.Provider>
			</Suspense>
		</div>
	);
};

export default App;
