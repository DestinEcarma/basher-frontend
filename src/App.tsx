import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TopicPage from "./pages/TopicPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignupPage";
import ForumPage from "./pages/ForumPage";
import Logo from "./components/Logo";

const App: React.FC = () => {
	return (
		<div className="min-h-screen bg-[#F6F6F9]">
			<Logo />
			<BrowserRouter>
				<Suspense fallback={<div>Loading...</div>}>
					<Routes>
						<Route
							path="/"
							element={
								<a href="/forum" className="text-blue-500 underline">
									Forum
								</a>
							}
						/>
						<Route path="/login" element={<LoginPage />} />
						<Route path="/sign-up" element={<SignUpPage />} />
						<Route path="/forum" element={<ForumPage />} />
						<Route path="/topic/:id" element={<TopicPage />} />
					</Routes>
				</Suspense>
			</BrowserRouter>
		</div>
	);
};

export default App;
