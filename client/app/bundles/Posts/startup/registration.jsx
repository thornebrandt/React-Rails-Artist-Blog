import ReactOnRails from 'react-on-rails';
import PostForm from './PostFormApp';
import PostStore from '../store/postStore';

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.registerStore({
	PostStore
});

ReactOnRails.register({
	PostForm
});