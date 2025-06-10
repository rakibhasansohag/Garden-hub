import { useContext, useEffect, useRef } from 'react';

import { Navigate, useLocation } from 'react-router';
import Loading from '../components/Loading';
import Swal from 'sweetalert2';
import { AuthContext } from './AuthContext';

const PrivateRoute = ({ children }) => {
	const { user, loading } = useContext(AuthContext);

	const location = useLocation();

	const ref = useRef(false);

	useEffect(() => {
		if (!loading && !user) {
			Swal.fire({
				title: 'You are not logged in!',
				icon: 'warning',
				timer: 1500,
			});
			ref.current = true;
		}
	}, [loading, user]);

	if (loading) {
		return <Loading />;
	}

	if (!user) {
		return <Navigate to='/auth/login' state={{ from: location }} replace />;
	}

	return children;
};

export default PrivateRoute;
