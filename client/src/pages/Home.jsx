import { useLoaderData } from 'react-router';
import Hero from '../components/Hero';
import Gardeners from '../components/Gardeners';
import Testimonials from '../components/Testimonials';
import BlogSection from '../components/BlogSection';
import TopTrendingTips from '../components/TopTrendingTips';
import { useStaticTitle } from '../lib/utils';

const Home = () => {
	const activeGardeners = useLoaderData();

	useStaticTitle();

	return (
		<div>
			<Hero />
			<Gardeners activeGardeners={activeGardeners} />
			<TopTrendingTips />
			<Testimonials />
			<BlogSection />
		</div>
	);
};

export default Home;
