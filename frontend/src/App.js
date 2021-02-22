import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import AllBlogsScreen from './screens/AllBlogsScreen';
import BlogScreen from './screens/BlogScreen.js';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import BlogListScreen from './screens/BlogListScreen';
import BlogEditScreen from './screens/BlogEditScreen';

const App = () => {
	return (
		<Router>
			<Header />
			<main>
				<Container>
					<Route path="/search/:keyword" component={HomeScreen} />
					<Route path="/" component={HomeScreen} exact />
					<Route path="/bloglist" component={AllBlogsScreen} exact />
					<Route path="/blog/:id" component={BlogScreen} />
					<Route path="/admin/bloglist" component={BlogListScreen} exact />
					<Route path="/admin/blog/:id/edit" component={BlogEditScreen} />
					<Route path="/admin/blog/create" component={BlogEditScreen} />
					<Route path="/login" component={LoginScreen} />
					<Route path="/register" component={RegisterScreen} />
				</Container>
			</main>
			<Footer />
		</Router>
	);
};

export default App;
