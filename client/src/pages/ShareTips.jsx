import { useContext, useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../context/AuthContext';
import { useStaticTitle } from '../lib/utils';

const ShareTips = () => {
	useStaticTitle();

	const { user } = useContext(AuthContext);
	const [loading, setLoading] = useState(false);
	const [isFormValid, setIsFormValid] = useState(false);
	const formRef = useRef(null);

	// Check form validity whenever inputs change
	useEffect(() => {
		const form = formRef.current;
		const handleInput = () => setIsFormValid(form.checkValidity());
		form.addEventListener('input', handleInput);
		// initial check
		setIsFormValid(form.checkValidity());
		return () => form.removeEventListener('input', handleInput);
	}, []);

	const handleAddTip = (event) => {
		event.preventDefault();
		if (!isFormValid) {
			event.target.reportValidity();
			return;
		}

		setLoading(true);
		const formData = new FormData(event.target);
		const tip = Object.fromEntries(formData.entries());
		tip.userId = user.uid;
		tip.userName = user.displayName;
		tip.userAvatar = user.photoURL;
		tip.totalLiked = 0;
		tip.likedBy = [];

		fetch(`${import.meta.env.VITE_BASE_URL}/tips`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(tip),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.insertedId) {
					Swal.fire({
						title: 'Your gardening wisdom has been shared!',
						text: 'Thank you for contributing to our community green hub 🌱',
						icon: 'success',
						timer: 2000,
					});
					event.target.reset();
					setIsFormValid(false);
				}
			})
			.finally(() => setLoading(false));
	};

	return (
		<section className='section py-12'>
			<div className='max-w-4xl mx-auto bg-base-200 p-8 rounded-2xl shadow-lg'>
				<h2 className='text-4xl font-bold text-center mb-6 text-primary'>
					Share a Garden Tip
				</h2>
				<p className='text-center mb-8'>
					Use your green thumb expertise to help others thrive! Fill out the
					form below to publish your plant care tips, categorized and tagged for
					easy browsing.
				</p>
				<form
					ref={formRef}
					onSubmit={handleAddTip}
					className='grid grid-cols-1 md:grid-cols-2 gap-6'
				>
					<input type='hidden' name='totalLiked' defaultValue='0' />

					{/* Title */}
					<fieldset className='space-y-2'>
						<label className='label' htmlFor='title'>
							Title
						</label>
						<input
							id='title'
							name='title'
							required
							className='input w-full'
							placeholder='How I Grow Tomatoes Indoors'
						/>
					</fieldset>

					{/* Plant Type */}
					<fieldset className='space-y-2'>
						<label className='label' htmlFor='plantType'>
							Plant Type/Topic
						</label>
						<input
							id='plantType'
							name='plantType'
							required
							className='input w-full'
							placeholder='Tomatoes'
						/>
					</fieldset>

					{/* Difficulty */}
					<fieldset className='space-y-2'>
						<label className='label' htmlFor='difficulty'>
							Difficulty Level
						</label>
						<select
							id='difficulty'
							name='difficulty'
							required
							className='select w-full'
						>
							<option value=''>Select difficulty</option>
							<option value='Easy'>Easy</option>
							<option value='Medium'>Medium</option>
							<option value='Hard'>Hard</option>
						</select>
					</fieldset>

					{/* Category */}
					<fieldset className='space-y-2'>
						<label className='label' htmlFor='category'>
							Category
						</label>
						<select
							id='category'
							name='category'
							required
							className='select w-full'
						>
							<option value=''>Select category</option>
							<option>Composting</option>
							<option>Plant Care</option>
							<option>Vertical Gardening</option>
							<option>Hydroponics</option>
							<option>Container Gardening</option>
						</select>
					</fieldset>

					{/* Description */}
					<fieldset className='md:col-span-2 space-y-2'>
						<label className='label' htmlFor='description'>
							Description
						</label>
						<textarea
							id='description'
							name='description'
							required
							rows='4'
							className='textarea w-full'
							placeholder='Describe your step-by-step process...'
						></textarea>
					</fieldset>

					{/* Image URL */}
					<fieldset className='space-y-2'>
						<label className='label' htmlFor='imageUrl'>
							Image URL
						</label>
						<input
							id='imageUrl'
							name='imageUrl'
							required
							className='input w-full'
							placeholder='https://...'
						/>
					</fieldset>

					{/* Availability */}
					<fieldset className='space-y-2'>
						<label className='label' htmlFor='availability'>
							Availability
						</label>
						<select
							id='availability'
							name='availability'
							required
							className='select w-full'
						>
							<option value=''>Select visibility</option>
							<option value='Public'>Public</option>
							<option value='Hidden'>Hidden</option>
						</select>
					</fieldset>

					{/* User Info */}
					<fieldset className='md:col-span-2 grid grid-cols-2 gap-4'>
						<div>
							<label className='label'>Your Name</label>
							<input
								type='text'
								value={user.displayName || ''}
								readOnly
								className='input w-full bg-base-300'
							/>
						</div>
						<div>
							<label className='label'>Your Email</label>
							<input
								type='email'
								value={user.email || ''}
								readOnly
								className='input w-full bg-base-300'
							/>
						</div>
					</fieldset>

					{/* Submit */}
					<button
						type='submit'
						disabled={!isFormValid || loading}
						className='btn btn-primary md:col-span-2 mt-4 opacity-90 disabled:opacity-50'
					>
						{loading ? 'Publishing...' : 'Publish Tip'}
					</button>
				</form>
			</div>
		</section>
	);
};

export default ShareTips;
