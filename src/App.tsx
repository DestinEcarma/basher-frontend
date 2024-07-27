import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Topic from "./pages/Topic";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForumPage from "./pages/ForumPage";

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<Suspense fallback={<div>Loading...</div>}>
				<Routes>
					<Route path="/" element={<div>hello</div>} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/signup" element={<SignupPage />} />
					<Route path="/forum" element={<ForumPage />} />
					<Route path="/topic/:id" element={<Topic />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
};

export default App;
