import Logo from "@components/Logo";
import CreatePost from "@components/create-post";
import ForumPage from "@pages/forum";
import LoginPage from "@pages/login";
import SignUpPage from "@pages/sign-up";
import TopicPage from "@pages/topic";
import React, { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

const App: React.FC = () => {
	return (
		<div className="flex h-dvh flex-col">
			<Logo />
			<Toaster richColors duration={5000} closeButton position="top-right" />
			<BrowserRouter>
				<Suspense fallback={<div>Loading...</div>}>
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
					</Routes>
				</Suspense>
			</BrowserRouter>
		</div>
	);
};

export default App;
