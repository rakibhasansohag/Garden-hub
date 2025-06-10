import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import { FaCheck, FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import Loading from '../components/Loading';
import { getDifficultyBadge, useStaticTitle } from '../lib/utils';
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'motion/react';

const MyTips = () => {
	useStaticTitle();
	const { user } = useContext(AuthContext);

	const [tips, setTips] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedTip, setSelectedTip] = useState(null);
	const [editMode, setEditMode] = useState(false);

	// For getting user's tips
	useEffect(() => {
		setLoading(true);
		if (!user) return;
		const fetchUserTips = async () => {
			const response = await fetch(
				`${import.meta.env.VITE_BASE_URL}/gardeners/${user?.uid}/tips`,
			);
			const data = await response.json();
			setTips(data);
			setLoading(false);
		};

		fetchUserTips();
	}, [user]);

	const handleDelete = async (tipId) => {
		const result = await Swal.fire({
			title: 'Are you sure?',
			text: 'This action cannot be undone.',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes, delete it!',
		});

		if (result.isConfirmed) {
			// user?.uid === userId && tipId === tip._id
			const response = await fetch(
				`${import.meta.env.VITE_BASE_URL}/tips/${tipId}?userId=${user.uid}`,
				{ method: 'DELETE' },
			);

			if (response.ok) {
				setTips(tips.filter((tip) => tip._id !== tipId));

				Swal.fire('Deleted!', 'Your tip has been deleted.', 'success');
			} else {
				Swal.fire('Error!', 'Failed to delete the tip.', 'error');
			}
		}
	};

	// Animation variants
	const overlayVariants = {
		visible: { opacity: 1, transition: { duration: 0.3 } },
		hidden: { opacity: 0 },
	};

	const modalVariants = {
		hidden: { y: '100vh', opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: { type: 'spring', stiffness: 300 },
		},
		exit: { y: '100vh', opacity: 0 },
	};

	const handleUpdate = async (tipId, updatedData) => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_BASE_URL}/tips/${tipId}`,
				{
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(updatedData),
				},
			);

			if (response.ok) {
				setTips(
					tips.map((tip) =>
						tip._id === tipId ? { ...tip, ...updatedData } : tip,
					),
				);
				setEditMode(false);
				setSelectedTip(null);
				Swal.fire({
					title: 'Updated!',
					Text: 'Your tip has been updated.',
					icon: 'success',
					timer: '1500',
				});
			}
		} catch (error) {
			Swal.fire('Error', 'Failed to update tip', error);
		}
	};

	if (loading) {
		return <Loading />;
	}

	return (
		<section className='section py-12'>
			<div className='min-h-[40vh]'>
				<h2 className='text-3xl font-bold text-center mb-6 text-primary'>
					My Gardening Tips
				</h2>
				<div className='overflow-x-auto rounded-box shadow-lg'>
					<table className='table'>
						<thead className='bg-base-200'>
							<tr>
								<th>Title</th>
								<th>Category</th>
								<th>Visibility</th>
								<th>Difficulty</th>
								<th>Total Liked</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{tips?.length === 0 ? (
								<tr className='hover:bg-base-200'>
									<td colSpan='6' className='text-center'>
										No tips found
									</td>
								</tr>
							) : (
								tips?.map((tip) => (
									<tr key={tip._id} className='hover:bg-base-200'>
										<td>{tip.title}</td>
										<td>{tip.category}</td>
										<td>{tip.availability}</td>
										<td>{tip.difficulty}</td>
										<td>{tip.totalLiked}</td>
										<td>
											<Link
												className='btn btn-ghost btn-sm'
												onClick={() => {
													setSelectedTip(tip);
													setEditMode(true);
												}}
											>
												<FaEdit />
											</Link>
											<Link
												to={`/tips/${tip._id}`}
												className='btn btn-ghost btn-sm'
											>
												<FaEye />
											</Link>
											<button
												onClick={() => handleDelete(tip._id)}
												className='btn btn-ghost btn-sm'
											>
												<FaTrash />
											</button>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>

				{/* For Modal part */}
				<AnimatePresence>
					{selectedTip && (
						<motion.div
							className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'
							variants={overlayVariants}
							initial='hidden'
							animate='visible'
							exit='hidden'
							onClick={(e) => {
								!editMode && setSelectedTip(null);
								setEditMode(false);
								e.stopPropagation(); // sometime the modal doesn't close on click
							}}
						>
							<motion.div
								className='bg-base-100 p-6 rounded-xl max-w-2xl w-full mx-4 relative'
								variants={modalVariants}
								onClick={(e) => e.stopPropagation()}
							>
								{editMode ? (
									<UpdateTipForm
										tip={selectedTip}
										onUpdate={handleUpdate}
										onCancel={() => setEditMode(false)}
									/>
								) : (
									<>
										<button
											onClick={() => setSelectedTip(null)}
											className='absolute top-3 right-4 text-2xl hover:text-primary cursor-pointer'
										>
											×
										</button>

										<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
											{/* View mode content */}
											<div className='space-y-4'>
												<img
													src={selectedTip.imageUrl}
													alt={selectedTip.title}
													className='rounded-xl h-48 w-full object-cover'
												/>
												<div className='flex flex-wrap gap-2'>
													<span className='badge badge-primary'>
														{selectedTip.category}
													</span>
													<span
														className={`badge ${getDifficultyBadge(
															selectedTip.difficulty,
														)}`}
													>
														{selectedTip.difficulty}
													</span>
													<span className='badge badge-outline'>
														{selectedTip.availability}
													</span>
												</div>
											</div>

											<div className='space-y-4'>
												<h2 className='text-3xl font-bold text-primary'>
													{selectedTip.title}
												</h2>
												<div className='prose'>
													<p>{selectedTip.description}</p>
												</div>
												<div className='flex flex-col gap-4'>
													<button
														onClick={() => setEditMode(true)}
														className='btn btn-secondary mt-4'
													>
														<FaEdit className='mr-2' /> Edit Tip
													</button>
													<Link
														to={`/tips/${selectedTip._id}`}
														className='btn btn-secondary'
													>
														<FaEye /> View
													</Link>
												</div>
											</div>
										</div>
									</>
								)}
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</section>
	);
};

const UpdateTipForm = ({ tip, onUpdate, onCancel }) => {
	const [formData, setFormData] = useState(tip);
	const { user } = useContext(AuthContext);

	const handleSubmit = (e) => {
		e.preventDefault();
		const updatedData = {
			...formData,
			userId: user.uid,
			userName: user.displayName,
		};
		onUpdate(tip._id, updatedData);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='grid grid-cols-1 md:grid-cols-2 gap-4'
		>
			{/* Title */}
			<div className='md:col-span-2'>
				<label className='label'>Title</label>
				<input
					value={formData.title}
					onChange={(e) => setFormData({ ...formData, title: e.target.value })}
					className='input w-full'
					required
				/>
			</div>

			{/* Plant Type */}
			<div>
				<label className='label'>Plant Type</label>
				<input
					value={formData.plantType}
					onChange={(e) =>
						setFormData({ ...formData, plantType: e.target.value })
					}
					className='input w-full'
					required
				/>
			</div>

			{/* Difficulty */}
			<div>
				<label className='label'>Difficulty</label>
				<select
					value={formData.difficulty}
					onChange={(e) =>
						setFormData({ ...formData, difficulty: e.target.value })
					}
					className='select w-full'
					required
				>
					<option value='Easy'>Easy</option>
					<option value='Medium'>Medium</option>
					<option value='Hard'>Hard</option>
				</select>
			</div>

			{/* Category */}
			<div>
				<label className='label'>Category</label>
				<select
					value={formData.category}
					onChange={(e) =>
						setFormData({ ...formData, category: e.target.value })
					}
					className='select w-full'
					required
				>
					<option>Composting</option>
					<option>Plant Care</option>
					<option>Vertical Gardening</option>
					<option>Hydroponics</option>
				</select>
			</div>

			{/* Availability */}
			<div className=''>
				<label className='label'>Visibility</label>
				<select
					value={formData.availability}
					onChange={(e) =>
						setFormData({ ...formData, availability: e.target.value })
					}
					className='select w-full'
					required
				>
					<option value='Public'>Public</option>
					<option value='Hidden'>Hidden</option>
				</select>
			</div>

			{/* Image URL */}
			<div className='md:col-span-2'>
				<label className='label'>Image URL</label>
				<input
					value={formData.imageUrl}
					onChange={(e) =>
						setFormData({ ...formData, imageUrl: e.target.value })
					}
					className='input w-full'
					required
				/>
			</div>

			{/* Description */}
			<div className='md:col-span-2'>
				<label className='label'>Description</label>
				<textarea
					value={formData.description}
					onChange={(e) =>
						setFormData({ ...formData, description: e.target.value })
					}
					className='textarea w-full h-32'
					required
				/>
			</div>

			{/* User Data  read only */}
			<div className=''>
				<label className='label'>Email:</label>
				<input
					value={user?.email}
					className='input w-full bg-gray-200'
					readOnly
				/>
			</div>
			<div className=''>
				<label className='label'>User Name</label>
				<input
					value={user.displayName}
					className='input w-full bg-gray-200'
					readOnly
				/>
			</div>

			<div className='md:col-span-2 flex justify-end gap-4 mt-4'>
				<button type='button' onClick={onCancel} className='btn btn-ghost'>
					Cancel
				</button>
				<button type='submit' className='btn btn-primary'>
					<FaCheck className='mr-2' /> Update Tip
				</button>
			</div>
		</form>
	);
};


export default MyTips;
