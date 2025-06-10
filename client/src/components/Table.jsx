import { Link } from 'react-router';
import { FaEye } from 'react-icons/fa';
import { getDifficultyBadge } from '../lib/utils';

const Table = ({ data }) => {
	return (
		<div className='overflow-x-auto rounded-box shadow-lg'>
			<table className='table'>
				<thead className='bg-base-200'>
					<tr>
						<th className='w-[100px] md:w-auto'>Image</th>
						<th>Title</th>
						<th>Category</th>
						<th>Difficulty</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{data.map((tip) => (
						<tr key={tip._id} className='hover:bg-base-200'>
							<td className='avatar'>
								{/* Responsive image sizing */}
								<div className='w-12 md:w-16 rounded-full overflow-hidden'>
									<img
										src={tip.imageUrl}
										alt={tip.title}
										className='object-cover '
									/>
								</div>
							</td>
							<td className='font-medium max-w-[200px] md:max-w-none truncate'>
								{tip.title}
							</td>
							<td className=''>
								<span className='badge badge-outline text-xs md:text-sm'>
									{tip.category}
								</span>
							</td>
							<td>
								<span
									className={`badge ${getDifficultyBadge(
										tip.difficulty,
									)} text-xs md:text-sm`}
								>
									{tip.difficulty}
								</span>
							</td>
							<td>
								<Link to={`/tips/${tip._id}`} className='btn btn-ghost btn-sm'>
									<FaEye className='text-lg' />
								</Link>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};



export default Table;
