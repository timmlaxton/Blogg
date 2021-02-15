import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import BlogScreen from './screens/BlogScreen';

const App = () => {
	return (
		<Router>
			<Header />
			<main>
				<Container>
					<Route path="/" component={HomeScreen} exact />
					<Route path="/blog/:id" component={BlogScreen} />
				</Container>
			</main>
			<Footer />
		</Router>
	);
};

export default App;
