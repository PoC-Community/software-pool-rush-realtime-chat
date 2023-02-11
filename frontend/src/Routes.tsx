import Login from './pages/Login';
import SignUp from './pages/SignUp';
import About from './pages/About'
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
				<Route path="/aboutus" element={<About />} />
				<Route path="/home" element={<DefaultPage />} />
			</RouterRoute>
		</BrowserRouter>
	);
}
