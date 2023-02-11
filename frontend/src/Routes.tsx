import { BrowserRouter, Route, Routes as RouterRoute } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
<<<<<<< HEAD:frontend/src/Routes.tsx
import About from './pages/About'
import DefaultPage from './pages/DefaultPage';
import { BrowserRouter, Route, Routes as RouterRoute } from 'react-router-dom';
=======
>>>>>>> origin/main_page:frontend/katsapp/src/Routes.tsx
import { default as Welcome } from './pages/Welcome';

export default function Routes() {
	return (
		<BrowserRouter>
			<RouterRoute>
				<Route path="/" element={<Welcome />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/login" element={<Login />} />
<<<<<<< HEAD:frontend/src/Routes.tsx
				<Route path="/aboutus" element={<About />} />
				<Route path="/home" element={<DefaultPage />} />
=======
				<Route path="/home" element={<Home />} />
>>>>>>> origin/main_page:frontend/katsapp/src/Routes.tsx
			</RouterRoute>
		</BrowserRouter>
	);
}
