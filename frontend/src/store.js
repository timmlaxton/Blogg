import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
	blogListReducer,
	blogDetailsReducer,
	blogDeleteReducer,
	blogCreateReducer,
	blogUpdateReducer,
	blogCommentCreateReducer
} from './reducers/blogReducers';
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers';

const reducer = combineReducers({
	blogList: blogListReducer,
	blogDetails: blogDetailsReducer,
	blogDelete: blogDeleteReducer,
	blogCreate: blogCreateReducer,
	blogUpdate: blogUpdateReducer,
	blogCommentCreate: blogCommentCreateReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer
});

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const initialState = {
	userLogin: { userInfo: userInfoFromStorage }
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
