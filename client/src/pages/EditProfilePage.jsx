import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router';
import {
	FaMapMarkerAlt,
	FaPhone,
	FaSave,
	FaTimes,
	FaUserEdit,
	FaVenusMars,
	FaHome,
	FaSeedling,
} from 'react-icons/fa';
import Loading from '../components/Loading';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import Swal from 'sweetalert2';

const EditProfilePage = () => {
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		location: '',
		age: '',
		gender: '',
		phone: '',
		address: '',
		bio: '',
		experiences: [],
	});
	const [loading, setLoading] = useState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [newExperience, setNewExperience] = useState('');

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const response = await fetch(
					`${import.meta.env.VITE_BASE_URL}/gardeners/${user.uid}`,
				);
				const data = await response.json();
				if (data) {
					setFormData({
						location: data.location || '',
						age: data.age || '',
						gender: data.gender || '',
						phone: data.phone || '',
						address: data.address || '',
						bio: data.bio || '',
						experiences: data.experiences || [],
						status: data.status || '',
					});
				}
			} catch (error) {
				console.error('Error fetching profile:', error);
			} finally {
				setLoading(false);
			}
		};

		if (user) fetchProfile();
	}, [user]);

		useEffect(() => {
			document.title = user
				? `${user.displayName || 'Profile'} | Garden Hub`
				: 'Profile | Garden Hub';
		}, [user]);

	const handleAddExperience = () => {
		if (newExperience.trim()) {
			setFormData({
				...formData,
				experiences: [...formData.experiences, newExperience.trim()],
			});
			setNewExperience('');
		}
	};

	const handleRemoveExperience = (index) => {
		setFormData({
			...formData,
			experiences: formData.experiences.filter((_, i) => i !== index),
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			const response = await fetch(
				`${import.meta.env.VITE_BASE_URL}/gardeners/${user.uid}`,
				{
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(formData),
				},
			);

			if (!response.ok) throw new Error('Update failed');

			Swal.fire({
				title: 'Updated!',
				text: 'Your profile has been updated.',
				icon: 'success',
				timer: 1500,
			});
			navigate('/profile');
		} catch (error) {
			console.error('Update error:', error);
			Swal.fire({
				title: 'Failed to update profile',
				icon: error,
				timer: 1500,
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	if (loading) return <Loading />;

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
			className='max-w-5xl mx-auto p-6'
		>
			<div className='bg-base-200 rounded-2xl shadow-xl p-8'>
				{/* Header */}
				<div className='flex items-center justify-between mb-8 border-b border-base-300 pb-4'>
					<div className='flex items-center gap-4'>
						<FaUserEdit className='text-3xl text-primary' />
						<h1 className='text-3xl font-bold text-primary'>Edit Profile</h1>
					</div>
					<button
						onClick={() => navigate('/profile')}
						className='btn btn-ghost hover:bg-base-300 rounded-full'
					>
						<FaTimes className='text-xl' />
					</button>
				</div>

				{/* Form */}
				<form onSubmit={handleSubmit} className='space-y-8'>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
						{/* Left Column */}
						<div className='space-y-6'>
							{/* Read-only Section */}
							<div className='bg-base-100 p-6 rounded-xl shadow-sm'>
								<h3 className='text-lg font-semibold mb-4 flex items-center gap-2'>
									<span className='text-primary'>Account Info</span>
								</h3>
								<div className='space-y-4'>
									<div className='form-control'>
										<label className='label'>
											<span className='label-text'>Full Name</span>
										</label>
										<div className='flex items-center gap-2'>
											<input
												type='text'
												value={user.displayName || ''}
												className='input input-bordered w-full bg-base-200'
												readOnly
											/>
										</div>
									</div>

									<div className='form-control'>
										<label className='label'>
											<span className='label-text'>Email</span>
										</label>
										<div className='flex items-center gap-2'>
											<input
												type='email'
												value={user.email || ''}
												className='input input-bordered w-full bg-base-200'
												readOnly
											/>
										</div>
									</div>
								</div>
							</div>

							{/* Location Section */}
							<div className='bg-base-100 p-6 rounded-xl shadow-sm'>
								<h3 className='text-lg font-semibold mb-4 flex items-center gap-2'>
									<FaMapMarkerAlt className='text-primary' />
									<span className='text-primary'>Location Details</span>
								</h3>
								<div className='space-y-4'>
									<div className='form-control'>
										<label className='label'>
											<span className='label-text'>Location</span>
										</label>
										<div className='flex items-center gap-2'>
											<input
												type='text'
												name='location'
												value={formData.location}
												onChange={handleChange}
												className='input input-bordered w-full'
												placeholder='City, Country'
											/>
										</div>
									</div>

									<div className='form-control'>
										<label className='label'>
											<span className='label-text'>Address</span>
										</label>
										<div className='flex items-center gap-2'>
											<FaHome className='text-base-content/70' />
											<input
												type='text'
												name='address'
												value={formData.address}
												onChange={handleChange}
												className='input input-bordered w-full'
												placeholder='Street address'
											/>
										</div>
									</div>
								</div>
							</div>
							{/* Experince section */}
							<div className='bg-base-100 p-6 rounded-xl shadow-sm'>
								<h3 className='text-lg font-semibold mb-4 text-primary flex items-center gap-2'>
									<FaSeedling className='text-primary' />
									Gardening Experiences
								</h3>

								{/* Experiences Input */}
								<div className='flex gap-2 mb-4'>
									<input
										type='text'
										value={newExperience}
										onChange={(e) => setNewExperience(e.target.value)}
										placeholder="Add new experience (e.g., 'Organic composting expert')"
										className='input input-bordered flex-1'
										onKeyPress={(e) =>
											e.key === 'Enter' && handleAddExperience()
										}
									/>
									<button
										type='button'
										onClick={handleAddExperience}
										className='btn btn-primary'
									>
										Add
									</button>
								</div>

								{/* Experiences List */}
								<div className='flex flex-wrap gap-2'>
									{formData.experiences.map((exp, index) => (
										<div key={index} className='badge badge-outline  gap-2 p-3'>
											<span>{exp}</span>
											<button
												type='button'
												onClick={() => handleRemoveExperience(index)}
												className='text-error hover:text-error/70 cursor-pointer'
											>
												×
											</button>
										</div>
									))}
								</div>
							</div>
						</div>

						{/* Right Column */}
						<div className='space-y-6'>
							{/* Personal Info */}
							<div className='bg-base-100 p-6 rounded-xl shadow-sm'>
								<h3 className='text-lg font-semibold mb-4 flex items-center gap-2'>
									<FaVenusMars className='text-primary' />
									<span className='text-primary'>Personal Details</span>
								</h3>
								<div className='space-y-4'>
									<div className='grid grid-cols-2 gap-4'>
										<div className='form-control'>
											<label className='label'>
												<span className='label-text'>Age</span>
											</label>
											<input
												type='number'
												name='age'
												value={formData.age}
												onChange={handleChange}
												className='input input-bordered'
												placeholder='Enter age'
											/>
										</div>

										<div className='form-control'>
											<label className='label'>
												<span className='label-text'>Gender</span>
											</label>
											<select
												name='gender'
												value={formData.gender}
												onChange={handleChange}
												className='select select-bordered'
											>
												<option value=''>Select</option>
												<option value='Male'>Male</option>
												<option value='Female'>Female</option>
												<option value='Other'>Other</option>
											</select>
										</div>
									</div>

									<div className='form-control'>
										<label className='label' htmlFor='status'>
											<span className='label-text'>Activity</span>
										</label>
										<div>
											<select
												id='status'
												name='status'
												value={formData.status}
												onChange={handleChange}
												className='select select-bordered w-full'
											>
												<option value=''>Select</option>
												<option value='active'>Active</option>
												<option value='inactive'>inactive</option>
											</select>
										</div>
									</div>
									<div className='form-control'>
										<label className='label'>
											<span className='label-text'>Phone</span>
										</label>
										<div className='flex items-center gap-2'>
											<FaPhone className='text-base-content/70' />
											<input
												type='tel'
												name='phone'
												value={formData.phone}
												onChange={handleChange}
												className='input input-bordered w-full'
												placeholder='Contact number'
											/>
										</div>
									</div>
								</div>
							</div>

							{/* Bio Section */}
							<div className='bg-base-100 p-6 rounded-xl shadow-sm'>
								<h3 className='text-lg font-semibold mb-4 text-primary'>
									Gardener Bio
								</h3>
								<textarea
									name='bio'
									value={formData.bio}
									onChange={handleChange}
									className='textarea textarea-bordered w-full h-32'
									placeholder='Share your gardening story, experience, and specialties...'
								/>
							</div>
						</div>
					</div>

					{/* Submit Button */}
					<div className='flex justify-end gap-4 border-t border-base-300 pt-6'>
						<button
							type='submit'
							className='btn btn-primary gap-2'
							disabled={isSubmitting}
						>
							{isSubmitting ? (
								<span className='loading loading-spinner'></span>
							) : (
								<>
									<FaSave className='text-lg' />
									Save Changes
								</>
							)}
						</button>
					</div>
				</form>
			</div>
		</motion.div>
	);
};

export default EditProfilePage;
