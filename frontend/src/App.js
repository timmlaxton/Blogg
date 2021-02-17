import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import BlogScreen from './screens/BlogScreen.js';
import LoginScreen from './screens/LoginScreen';
import BlogListScreen from './screens/BlogListScreen';

const App = () => {
	return (
		<Router>
			<Header />
			<main>
				<Container>
					<Route path="/" component={HomeScreen} exact />
					<Route path="/blog/:id" component={BlogScreen} />
					<Route path="/admin/bloglist" component={BlogListScreen} exact />

					<Route path="/login" component={LoginScreen} />
				</Container>
			</main>
			<Footer />
		</Router>
	);
};

export default App;
