import { useEffect } from 'react';
import { useLocation } from 'react-router';

export const getDifficultyBadge = (difficulty) => {
	switch (difficulty) {
		case 'Easy':
			return 'badge-success';
		case 'Medium':
			return 'badge-warning';
		case 'Hard':
			return 'badge-error';
		default:
			return 'badge-info';
	}
};

const baseTitle = 'Garden Hub';

export const useStaticTitle = () => {
	const location = useLocation();

	useEffect(() => {
		let pageTitle = '';

		switch (location.pathname) {
			case '/':
				pageTitle = 'Home';
				break;
			case '/explore-gardeners':
				pageTitle = 'Explore Gardeners';
				break;
			case '/share-tips':
				pageTitle = 'Share a Garden Tip';
				break;
			case '/tips':
				pageTitle = 'Browse Tips';
				break;
			case '/my-tips':
				pageTitle = 'My Tips';
				break;
			case '/profile':
				pageTitle = 'My Profile';
				break;
			case '/profile/edit':
				pageTitle = 'Edit Profile';
				break;
			case '/auth/register':
				pageTitle = 'Register';
				break;
			case '/auth/login':
				pageTitle = 'Login';
				break;
			case '/auth/forget-password':
				pageTitle = 'Forgot Password';
				break;
			default:
				pageTitle = 'Page Not Found';
		}

		document.title = `${pageTitle} | ${baseTitle}`;
	}, [location]);
};
