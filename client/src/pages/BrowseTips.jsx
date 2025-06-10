import { useLoaderData } from 'react-router';
import { useState, useMemo } from 'react';
import Table from '../components/Table';
import { useStaticTitle } from '../lib/utils';

export default function BrowseTips() {
	useStaticTitle();
	const tips = useLoaderData();
	const [filter, setFilter] = useState('All');

	const filteredTips = useMemo(() => {
		if (filter === 'All') return tips;

		return [
			...tips.filter((t) => t.difficulty === filter),
			...tips.filter((t) => t.difficulty !== filter),
		];
	}, [tips, filter]);

	return (
		<section className='section p-8 min-h-[calc(100vh-350px)]'>
			<h1 className='text-4xl font-bold mb-4'>🌿 Community Gardening Tips</h1>

			<div className='mb-6 flex items-center gap-4'>
				<label htmlFor='difficulty' className='font-medium'>
					Filter by Difficulty:
				</label>
				<select
					id='difficulty'
					value={filter}
					onChange={(e) => setFilter(e.target.value)}
					className='select select-bordered w-auto my-4'
				>
					<option>All</option>
					<option>Easy</option>
					<option>Medium</option>
					<option>Hard</option>
				</select>
			</div>

			<div className='bg-base-100 rounded-box mb-5'>
				<Table data={filteredTips} />
			</div>
		</section>
	);
}
