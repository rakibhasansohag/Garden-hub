import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router';

import './index.css';

import Home from './pages/Home.jsx';
import MainLayout from './layout/MainLayout.jsx';
import AuthProvider from './context/AuthProvider.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import ShareTips from './pages/ShareTips.jsx';
import BrowseTips from './pages/BrowseTips.jsx';
import TipsDetails from './pages/TipsDetails.jsx';
import MyTips from './pages/MyTips.jsx';
import ExploreGardeners from './pages/ExploreGardeners.jsx';
import Loading from './components/Loading.jsx';
import NotFound from './pages/NotFound.jsx';
import TipNotFound from './components/TipNotFound.jsx';
import PrivateRoute from './context/PrivateRoute.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import EditProfilePage from './pages/EditProfilePage.jsx';

const baseUrl = import.meta.env.VITE_BASE_URL;

const router = createBrowserRouter([
	{
		path: '/',
		Component: MainLayout,
		children: [
			{
				index: true,
				loader: async () => fetch(`${baseUrl}/gardeners?status=active&limit=6`),
				Component: Home,
				hydrateFallbackElement: (
					<div>
						<Loading />,
					</div>
				),
			},
			{
				path: '/explore-gardeners',
				Component: ExploreGardeners,
				loader: async () => fetch(`${baseUrl}/gardeners`),
				hydrateFallbackElement: (
					<div>
						<Loading />,
					</div>
				),
			},
			{
				path: '/auth/register',
				Component: Register,
			},
			{
				path: '/auth/login',
				Component: Login,
			},
			{
				path: '/share-tips',
				element: (
					<PrivateRoute>
						<ShareTips />,
					</PrivateRoute>
				),
			},
			{
				path: '/tips',
				Component: BrowseTips,
				loader: async () => fetch(`${baseUrl}/tips?limit=20`),
				hydrateFallbackElement: (
					<div>
						<Loading />,
					</div>
				),
			},
			{
				path: '/tips/:id',
				element: (
					<PrivateRoute>
						<TipsDetails />,
					</PrivateRoute>
				),
				loader: async ({ params }) => fetch(`${baseUrl}/tips/${params.id}`),
				hydrateFallbackElement: (
					<div>
						<Loading />,
					</div>
				),
				errorElement: <TipNotFound />,
			},
			{
				path: '/my-tips',
				element: (
					<PrivateRoute>
						<MyTips />,
					</PrivateRoute>
				),
			},
			{
				path: '/auth/forget-password',
				Component: ForgotPassword,
			},
			{
				path: '/profile',
				element: (
					<PrivateRoute>
						<ProfilePage />
					</PrivateRoute>
				),
			},
			{
				path: '/profile/edit',
				element: (
					<PrivateRoute>
						<EditProfilePage />
					</PrivateRoute>
				),
			},
			{
				path: '*',
				Component: NotFound,
			},
		],
	},
]);

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	</StrictMode>,
);
