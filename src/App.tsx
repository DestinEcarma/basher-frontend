import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<Suspense fallback={<div>Loading...</div>}>
				<Routes>
					<Route path="/" element={<div>hello</div>} />
					<Route path="/login" element={<div>Login</div>} />
					<Route path="/signup" element={<div>Signup</div>} />
					<Route path="/forum" element={<div>Forum</div>} />
					<Route path="/topic/:id" element={<div>Topics</div>} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
};

export default App;
