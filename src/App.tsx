import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Topic from "./pages/Topic";
import LoginPage from "./pages/login";
import SignUpPage from "./pages/sign-up";
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
						<Route path="/topic/:id" element={<Topic />} />
					</Routes>
				</Suspense>
			</BrowserRouter>
		</div>
	);
};

export default App;
