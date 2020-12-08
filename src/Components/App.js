import React from 'react';
import PostForm from './PostForm';
// import SinglePost from './SinglePost.js';
import Axios from 'axios';
import PostList from './PostList';

const posts = [
  { text: 'baskdfjasdfasfsd', subject: 'funny', upvotes: 4, replies: [] },
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { posts: [] };
  }
  async componentDidMount() {
    const posts = (await Axios.get('/api/posts')).data;
    console.log(posts, 'posts');
    if (posts) {
      this.setState({ posts: posts });
    }
  }
  render() {
    return (
      <div id="main">
        <button onClick={this.createPost}>+ Add New Post</button>
        <PostForm />
        <PostList posts={this.state.posts} />
      </div>
    );
  }
}

export default App;
