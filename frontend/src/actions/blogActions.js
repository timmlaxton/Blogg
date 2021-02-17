import axios from 'axios';

import {
	BLOG_LIST_REQUEST,
	BLOG_LIST_SUCCESS,
	BLOG_LIST_FAIL,
	BLOG_DETAILS_FAIL,
	BLOG_DETAILS_SUCCESS,
	BLOG_DETAILS_REQUEST,
	BLOG_DELETE_REQUEST,
	BLOG_DELETE_SUCCESS,
	BLOG_DELETE_FAIL
} from '../constants/blogConstants';

export const listBlogs = () => async (dispatch) => {
	try {
		dispatch({ type: BLOG_LIST_REQUEST });

		const { data } = await axios.get('/api/blogs');

		dispatch({
			type: BLOG_LIST_SUCCESS,
			payload: data
		});
	} catch (error) {
		dispatch({
			type: BLOG_LIST_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		});
	}
};

export const listBlogDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: BLOG_DETAILS_REQUEST });

		const { data } = await axios.get(`/api/blogs/${id}`);

		dispatch({
			type: BLOG_DETAILS_SUCCESS,
			payload: data
		});
	} catch (error) {
		dispatch({
			type: BLOG_DETAILS_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		});
	}
};

export const deleteBlog = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: BLOG_DELETE_REQUEST
		});

		const {
			userLogin: { userInfo }
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`
			}
		};

		await axios.delete(`/api/blogs/${id}`, config);

		dispatch({
			type: BLOG_DELETE_SUCCESS
		});
	} catch (error) {
		dispatch({
			type: BLOG_DELETE_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		});
	}
};
