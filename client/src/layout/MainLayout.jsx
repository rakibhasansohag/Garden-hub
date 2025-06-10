import { Outlet, useLocation, useNavigation } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useEffect } from 'react';
import Loading from '../components/Loading';

const MainLayout = () => {
	const navigation = useNavigation();
	const location = useLocation();

	const isLoading = navigation.state === 'loading';

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);

	return (
		<section>
			<Header />
			{isLoading && <Loading />}
			<Outlet />

			<Footer />
		</section>
	);
};

export default MainLayout;
