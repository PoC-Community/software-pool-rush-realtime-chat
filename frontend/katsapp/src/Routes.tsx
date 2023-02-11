import Login from './pages/Login';
import SignUp from './pages/SignUp';
import AboutUs from './pages/AboutUs'
import DefaultPage from './pages/DefaultPage';
import { BrowserRouter, Route, Routes as RouterRoute } from 'react-router-dom';
import { default as Welcome } from './pages/Welcome';

export default function Routes() {
	return (
		<BrowserRouter>
			<RouterRoute>
				<Route path="/" element={<Welcome />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/login" element={<Login />} />
				<Route path="/aboutus" element={<AboutUs />} />
				<Route path="/home" element={<DefaultPage />} />
			</RouterRoute>
		</BrowserRouter>
	);
}
