import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SearchBar = ({ history }) => {
	const [keyword, setKeyword] = useState('');

	const submitHandler = (e) => {
		e.preventDefault();
		if (keyword.trim()) {
			history.push(`/search/${keyword}`);
		} else {
			history.push('/');
		}
	};

	return (
		<Form onSubmit={submitHandler} inline>
			<Form.Control
				type="text"
				name="q"
				onChange={(e) => setKeyword(e.target.value)}
				placeholder="Search Blogs"
				className="mr-sm-4 ml-sm-5"
			></Form.Control>
			<Button type="submit" className="p-1">
				Search
			</Button>
		</Form>
	);
};

export default SearchBar;
