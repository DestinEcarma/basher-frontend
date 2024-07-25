import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Topic from "./pages/Topic";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<Suspense fallback={<div>Loading...</div>}>
				<Routes>
					<Route path="/" element={<div>hello</div>} />
					<Route path="/login" element={<LoginPage />} />
					<Route
						path="/signup"
						element={
							<div>
								<SignupPage />
							</div>
						}
					/>
					<Route path="/forum" element={<div>Forum</div>} />
					<Route path="/topic/:id" element={<Topic />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
};

export default App;
