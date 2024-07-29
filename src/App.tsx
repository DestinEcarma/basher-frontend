import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Topic from "./pages/Topic";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForumPage from "./pages/ForumPage";
import Logo from "./components/Logo";

const App: React.FC = () => {
	return (
		<div className="bg-[#F6F6F9] min-h-screen">
			<Logo />
			<BrowserRouter>
				<Suspense fallback={<div>Loading...</div>}>
					<Routes>
						<Route
							path="/"
							element={
								<a href="/forum" className="underline text-blue-500">
									Forum
								</a>
							}
						/>
						<Route path="/login" element={<LoginPage />} />
						<Route path="/signup" element={<SignupPage />} />
						<Route path="/forum" element={<ForumPage />} />
						<Route path="/topic/:id" element={<Topic />} />
					</Routes>
				</Suspense>
			</BrowserRouter>
		</div>
	);
};

export default App;
