import { Suspense, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router';
import {
	FaEdit,
	FaMapMarkerAlt,
	FaClock,
	FaVenusMars,
	FaThumbsUp,
	FaPhone,
	FaHome,
	FaInfoCircle,
	FaSeedling,
	FaUserCheck,
} from 'react-icons/fa';
import moment from 'moment';
import Loading from '../components/Loading';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import { useStaticTitle } from '../lib/utils';

export default function ProfilePage() {
	useStaticTitle();

	const { user, loading: authLoading } = useContext(AuthContext);
	const [profile, setProfile] = useState(null);
	const [dbLoading, setDbLoading] = useState(true);

	useEffect(() => {
		document.title = user
			? `${user.displayName || 'Profile'} | Garden Hub`
			: 'Profile | Garden Hub';
	}, [user]);

	useEffect(() => {
		if (!user) return;
		fetch(`${import.meta.env.VITE_BASE_URL}/gardeners/${user?.uid}`)
			.then((res) => (res.ok ? res.json() : null))
			.then((data) => setProfile(data))
			.finally(() => setDbLoading(false));
	}, [user]);

	if (authLoading || dbLoading) return <Loading />;
	if (!user)
		return (
			<div className='flex items-center justify-center h-screen'>
				<p className='text-lg'>No user logged in.</p>
			</div>
		);

	const emailHandle = user.email?.split('@')[0] || 'unknown';
	const firebaseData = [
		{
			icon: <FaClock />,
			label: 'Joined',
			value: moment(user.metadata.creationTime).format('LL'),
		},
		{
			icon: <FaUserCheck />,
			label: 'Last Login',
			value: moment(user.metadata.lastSignInTime).format('LLL'),
		},
		{
			icon: <FaInfoCircle />,
			label: 'Status',
			value: user.emailVerified ? 'Verified ✅' : 'Unverified ❌',
		},
		{
			icon: <FaSeedling />,
			label: 'Sign-in Method',
			value: user.providerData[0].providerId.replace('.com', ''),
		},
	];

	const databaseData = [
		{ icon: <FaMapMarkerAlt />, label: 'Location', value: profile?.location },
		{ icon: <FaVenusMars />, label: 'Gender', value: profile?.gender },
		{
			icon: <FaClock />,
			label: 'Age',
			value: profile?.age ? `${profile.age} years` : null,
		},
		{
			icon: <FaThumbsUp />,
			label: 'Tips Shared',
			value: profile?.totalTipsShared,
		},
		{ icon: <FaPhone />, label: 'Phone', value: profile?.phone },
		{ icon: <FaHome />, label: 'Address', value: profile?.address },
	];

	return (
		<Suspense
			fallback={
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className='fixed inset-0 flex items-center justify-center bg-base-100 z-50'
				>
					<motion.span
						className='loading loading-spinner loading-lg'
						animate={{ rotate: 360 }}
						transition={{ repeat: Infinity, duration: 1 }}
					/>
				</motion.div>
			}
		>
			<div className='max-w-5xl mx-auto p-6 space-y-8'>
				{/* Firebase Data Card */}
				<div className='bg-base-200 rounded-2xl shadow-lg p-6 flex flex-col md:flex-row items-center gap-6'>
					<img
						src={user.photoURL || '/user.png'}
						alt='Avatar'
						className='w-32 h-32 rounded-full object-cover ring-4 ring-primary/20'
					/>
					<div className='flex-1 space-y-2'>
						<h1 className='text-3xl font-bold text-primary'>
							{user.displayName || 'Green Gardener'}
						</h1>
						<p className='text-sm '>@{emailHandle}</p>
						<div className='mt-2 grid grid-cols-1 md:grid-cols-2 gap-4'>
							{firebaseData.map((item, i) => (
								<div key={i} className='flex items-center gap-2 text-sm'>
									<span className='text-primary'>{item.icon}</span>
									<span className='font-medium'>{item.label}:</span>
									<span className=''>{item.value || 'N/A'}</span>
								</div>
							))}
						</div>
					</div>
					<Link to='/profile/edit' className='btn btn-primary'>
						<FaEdit className='mr-2' /> Edit Profile
					</Link>
				</div>

				{/* Database Data Section */}
				<div className='grid md:grid-cols-2 gap-8'>
					{/* Profile Details Card */}
					<div className='bg-base-200 rounded-2xl shadow-md p-6 space-y-6'>
						<h2 className='text-2xl font-semibold text-secondary flex items-center gap-2'>
							<FaInfoCircle className='text-primary' />
							Profile Details
						</h2>
						<div className='space-y-4'>
							{databaseData.map((item, i) => (
								<div key={i} className='flex items-start gap-3'>
									<span className='text-primary mt-1'>{item.icon}</span>
									<div className='flex-1'>
										<p className='font-medium'>{item.label}</p>
										<p className=''>
											{item.value || <span className=''>Not provided</span>}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Bio & Experiences Card */}
					<div className='bg-base-200 rounded-2xl shadow-md p-6 space-y-6'>
						<div className='space-y-4'>
							<h2 className='text-2xl font-semibold text-secondary flex items-center gap-2'>
								<FaSeedling className='text-primary' />
								Gardener Bio
							</h2>
							<p className=' leading-relaxed'>
								{profile?.bio ||
									'No bio added yet. Share your gardening story!'}
							</p>
						</div>

						<div className='space-y-4'>
							<h2 className='text-2xl font-semibold text-secondary flex items-center gap-2'>
								<FaThumbsUp className='text-primary' />
								Experience Highlights
							</h2>
							<div className='flex flex-wrap gap-2'>
								{(profile?.experiences || []).map((exp, i) => (
									<div key={i} className='badge badge-outline gap-2 p-3'>
										{exp}
									</div>
								))}
								{!profile?.experiences?.length && (
									<p className=''>No experiences added yet</p>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</Suspense>
	);
}
