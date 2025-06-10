import { useContext, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import { FaLeaf, FaHeart, FaClock } from 'react-icons/fa';
import { getDifficultyBadge } from '../lib/utils';
import { AuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';
import moment from 'moment';
import TipNotFound from '../components/TipNotFound';

const TipsDetails = () => {
	const tip = useLoaderData();
	const [likes, setLikes] = useState(tip?.totalLiked);
	const { user } = useContext(AuthContext);
	const [hasLiked, setHasLiked] = useState(tip?.likedBy?.includes(user?.uid));

	useEffect(() => {
		document.title = tip
			? `${tip?.title || 'Tip'} | Garden Hub`
			: 'Tip | Garden Hub';
	}, [tip]);

	const handleLike = async () => {
		if (hasLiked) {
			Swal.fire({
				title: 'You have already liked this tip!',
				icon: 'error',
				timer: 1500,
			});
			return;
		}

		const response = await fetch(
			`${import.meta.env.VITE_BASE_URL}/tips/${tip._id}/like`,
			{
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ userId: user.uid }),
			},
		);

		if (response.ok) {
			setLikes((prev) => prev + Number(1));
			setHasLiked(true);
		} else {
			Swal.fire({
				title: tip?.error,
				icon: 'error',
				timer: 1500,
			});
		}
	};

	if (!tip || tip.error || !tip._id) {
		return <TipNotFound />;
	}

	return (
		<section className='section p-8'>
			<div className='max-w-4xl mx-auto'>
				<div className='card bg-base-100 shadow-xl'>
					<figure className='px-4 pt-4'>
						<img
							src={tip.imageUrl}
							alt={tip.title}
							className='rounded-xl h-64 w-full object-cover'
						/>
					</figure>

					<div className='card-body'>
						<h1 className='card-title text-3xl'>{tip.title}</h1>

						<div className='flex flex-wrap gap-4 mb-4'>
							<div className='badge badge-outline'>
								<FaLeaf className='mr-2' /> {tip.category}
							</div>
							<div className={`badge ${getDifficultyBadge(tip.difficulty)}`}>
								{tip.difficulty}
							</div>
							<div className='badge badge-info'>
								<FaClock className='mr-0.5' />
								{moment(tip.createdAt).format('LLL')}
							</div>
						</div>

						<div className='prose max-w-none'>
							<h3 className='text-xl font-semibold mb-2'>🌱 Plant Type</h3>
							<p className='mb-4'>{tip.plantType}</p>

							<h3 className='text-xl font-semibold mb-2'>📖 Detailed Guide</h3>
							<p className='whitespace-pre-wrap'>{tip.description}</p>
						</div>

						<div className='flex items-center justify-between mt-4 gap-2'>
							<button
								onClick={handleLike}
								className='btn btn-primary'
								disabled={hasLiked}
							>
								<FaHeart className='mr-2' /> Like ({likes})
							</button>
							<div className='flex items-center gap-2'>
								<img
									src={tip?.userAvatar}
									alt={tip?.userName}
									className='w-10 h-10 rounded-full'
								/>
								<div className='text-sm text-gray-500'>
									Shared by {tip.userName}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default TipsDetails;
