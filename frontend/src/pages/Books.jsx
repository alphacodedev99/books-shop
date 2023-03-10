import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { data } from 'autoprefixer';
import { Link } from 'react-router-dom';

function Books() {
	const [books, setBooks] = useState([]);

	useEffect(() => {
		const fetchAllBooks = async () => {
			let data = await axios.get('http://localhost:8800/books');
			setBooks(data.data);
		};
		fetchAllBooks();
	}, []);
	const handleDelete = async (id) => {
		try {
			await axios.delete('http://localhost:8800/books/' + id);
			window.location.reload();
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<div className='container mx-auto'>
			<div className='grid grid-cols-3 gap-5'>
				{books.map((book) => {
					return (
						<div
							key={book.id}
							className='border border-[#ddd] rounded-2xl  flex flex-col items-center justify-between bg-[#063970] p-5'>
							{book.cover && (
								<img
									src={book.cover}
									alt='bookCoverImage'
									className='object-cover rounded-lg'
								/>
							)}
							<h2 className='text-2xl  text-[#eab676] uppercase my-5'>
								{book.title}
							</h2>
							<p className='text-[#ddd] text-center my-4'>
								{book.desc}
							</p>
							<p className='text-[#fff]'>${book.price}</p>

							<div className='flex gap-5'>
								<button
									onClick={() => handleDelete(book.id)}
									className='text-lg text-orange-300 border border-[#ddd] px-6 py-2 rounded-full'>
									Delete
								</button>
								<button className='text-lg text-orange-300 border border-[#ddd] px-6  py-2 rounded-full'>
									<Link to={`/update/${book.id}`}>Update</Link>
								</button>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default Books;
