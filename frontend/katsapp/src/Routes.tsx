import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { BrowserRouter, Route, Routes as RouterRoute } from 'react-router-dom';
import { default as Welcome } from './pages/Welcome';

export default function Routes() {
	return (
		<BrowserRouter>
			<RouterRoute>
				<Route path="/" element={<Welcome />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/login" element={<Login />} />
			</RouterRoute>
		</BrowserRouter>
	);
}
