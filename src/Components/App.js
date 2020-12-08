import React from 'react';
import PostForm from './PostForm';
// import SinglePost from './SinglePost.js';
import Axios from 'axios';
import PostList from './PostList';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      postInfo: { userName: '', title: '', category: '', text: '' },
    };
    this.submitPost = this.submitPost.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.upvote = this.upvote.bind(this);
    this.downvote = this.downvote.bind(this);
  }
  async componentDidMount() {
    const posts = (await Axios.get('/api/posts')).data;
    console.log(posts, 'posts');
    if (posts) {
      posts.sort((a, b) => b.upvotes - a.upvotes);
      this.setState({ posts: posts });
    }
  }
  handleInputChange(e) {
    const { value, name } = e.target;
    const postInfo = { ...this.state.postInfo, ...{ [name]: value } };
    this.setState({ postInfo: postInfo });
  }
  async submitPost() {
    const body = this.state.postInfo;
    const post = (await Axios.post('/api/posts', body)).data;
    this.setState({ formActive: false });
  }
  toggleForm() {
    this.setState({ formActive: true });
  }
  async upvote(post) {
    const updatedValues = { upvotes: post.upvotes + 1 };
    const updatedPosts = (
      await Axios.put(`/api/posts/${post.id}`, updatedValues)
    ).data;
    this.setState({ posts: updatedPosts });
  }
  async downvote(post) {
    const updatedValues = { upvotes: post.upvotes - 1 };
    const updatedPosts = (
      await Axios.put(`/api/posts/${post.id}`, updatedValues)
    ).data;
    this.setState({ posts: updatedPosts });
  }
  render() {
    return (
      <div id="main">
        <button onClick={this.toggleForm}>+ Add New Post</button>
        {this.state.formActive ? (
          <PostForm
            active={this.state.formActive}
            handleChange={this.handleInputChange}
            onClick={this.submitPost}
          />
        ) : (
          ''
        )}
        <PostList
          downvote={this.downvote}
          upvote={this.upvote}
          posts={this.state.posts}
        />
      </div>
    );
  }
}

export default App;
