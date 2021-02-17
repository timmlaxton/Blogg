import {
	BLOG_LIST_REQUEST,
	BLOG_LIST_SUCCESS,
	BLOG_LIST_FAIL,
	BLOG_DETAILS_SUCCESS,
	BLOG_DETAILS_FAIL,
	BLOG_DETAILS_REQUEST,
	BLOG_DELETE_REQUEST,
	BLOG_DELETE_SUCCESS,
	BLOG_DELETE_FAIL
} from '../constants/blogConstants';

export const blogListReducer = (state = { blogs: [] }, action) => {
	switch (action.type) {
		case BLOG_LIST_REQUEST:
			return { loading: true, blogs: [] };
		case BLOG_LIST_SUCCESS:
			return { loading: false, blogs: action.payload };
		case BLOG_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const blogDetailsReducer = (state = { blog: {} }, action) => {
	switch (action.type) {
		case BLOG_DETAILS_REQUEST:
			return { loading: true, ...state };
		case BLOG_DETAILS_SUCCESS:
			return { loading: false, blog: action.payload };
		case BLOG_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const blogDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case BLOG_DELETE_REQUEST:
			return { loading: true };
		case BLOG_DELETE_SUCCESS:
			return { loading: false, success: true };
		case BLOG_DELETE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
