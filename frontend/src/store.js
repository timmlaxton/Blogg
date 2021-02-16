import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { blogListReducer, blogDetailsReducer } from './reducers/blogReducers';
import { userLoginReducer } from './reducers/userReducers';

const reducer = combineReducers({
	blogList: blogListReducer,
	blogDetails: blogDetailsReducer,
	userLogin: userLoginReducer
});

const initialState = {};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
