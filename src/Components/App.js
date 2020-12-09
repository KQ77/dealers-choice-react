import React from 'react';
import PostForm from './PostForm.js';
import Axios from 'axios';
import PostList from './PostList.js';
import '../../public/App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      selectedPost: '',
      postInfo: { userName: '', title: '', category: '', text: '' },
    };
    this.submitPost = this.submitPost.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.upvote = this.upvote.bind(this);
    this.downvote = this.downvote.bind(this);
    this.addReply = this.addReply.bind(this);
    this.handleReply = this.handleReply.bind(this);
    this.handleReplyClick = this.handleReplyClick.bind(this);
    this.deletePost = this.deletePost.bind(this);
  }
  async componentDidMount() {
    const posts = (await Axios.get('/api/posts')).data;
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
    const posts = (await Axios.post('/api/posts', body)).data;
    posts.sort((a, b) => b.upvotes - a.upvotes);
    this.setState({ formActive: false });
  }
  toggleForm() {
    this.setState({ formActive: true });
  }
  handleReplyClick(singlePost) {
    if (this.state.selectedPost.id) {
      this.setState({ selectedPost: '' });
    } else {
      this.setState({ selectedPost: singlePost });
    }
  }
  async deletePost(post) {
    const posts = (await Axios.delete(`/api/posts/${post.id}`)).data;
    console.log(posts, 'updated posts after deleting');
    this.setState({ posts: posts });
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
    updatedPosts.sort((a, b) => b.upvotes - a.upvotes);

    this.setState({ posts: updatedPosts });
  }
  handleReply(e) {
    const { value } = e.target;
    this.setState({ currentReply: value });
  }
  async addReply(post) {
    const id = post.id;
    const posts = (
      await Axios.post(`/api/posts/${post.id}/replies`, {
        text: this.state.currentReply,
        postId: id,
      })
    ).data;
    posts.sort((a, b) => b.upvotes - a.upvotes);
    this.setState({ posts: posts, currentReply: '' });
  }
  render() {
    return (
      <div id="main">
        <button className="new-post-button" onClick={this.toggleForm}>
          + Add New Post
        </button>
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
          deletePost={this.deletePost}
          selectedPost={this.state.selectedPost}
          handleReplyClick={this.handleReplyClick}
          addReply={this.addReply}
          handleReplyChange={this.handleReply}
          downvote={this.downvote}
          upvote={this.upvote}
          posts={this.state.posts}
        />
      </div>
    );
  }
}

export default App;
