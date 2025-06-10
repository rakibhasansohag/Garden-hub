import { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import Loading from '../components/Loading';
import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router';

export default function TopTrendingTips() {
	const [tips, setTips] = useState(null);

	useEffect(() => {
		fetch(`${import.meta.env.VITE_BASE_URL}/tips?limit=100`)
			.then((res) => res.json())
			.then((data) => {
				const top = data
					.sort((a, b) => b.totalLiked - a.totalLiked)
					.slice(0, 6);
				setTips(top);
			});
	}, []);

	if (!tips) return <Loading />;

	const containerVariants = {
		hidden: {},
		visible: {
			transition: {
				staggerChildren: 0.1,
			},
		},
	};
	const cardVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 },
	};

	return (
		<section className='bg-base-300'>
			<div className='section py-12'>
				<h2 className='text-3xl font-bold text-center mb-12 text-secondary'>
					🌟 Top Trending Gardening Tips
				</h2>

				<motion.div
					className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
					variants={containerVariants}
					initial='hidden'
					animate='visible'
				>
					{tips.map((tip) => (
						<motion.div
							key={tip._id}
							variants={cardVariants}
							className='bg-base-100 rounded-2xl shadow-lg overflow-hidden flex flex-col'
						>
							<div className='relative h-40'>
								<img
									src={tip.imageUrl}
									alt={tip.title}
									className='w-full h-full object-cover'
								/>
								<div className='absolute top-2 right-2 bg-white/80 rounded-full p-2 flex items-center'>
									<FaHeart className='text-red-500 mr-1' />
									<span className='font-semibold dark:text-black'>
										{tip.totalLiked}
									</span>
								</div>
							</div>
							<div className='p-4 flex-1 flex flex-col'>
								<h3 className='text-xl font-semibold mb-2 truncate'>
									{tip.title}
								</h3>
								<p className=' text-sm flex-1 whitespace-pre-wrap'>
									{tip.description.slice(0, 100)}...
								</p>
								<Link
									to={`/tips/${tip._id}`}
									className='mt-4 inline-block btn btn-primary self-start py-2 '
								>
									Read More
								</Link>
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
