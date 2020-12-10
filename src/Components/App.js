import React from 'react';
import Axios from 'axios';
import PostList from './PostList.js';
import '../../public/App.css';
import Sidebar from './Sidebar.js';
import Banner from './Banner.js';
import PostForm from './PostForm';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formActive: false,
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
    this.collapse = this.collapse.bind(this);
    this.handleFilterSelect = this.handleFilterSelect.bind(this);
    this.removeReply = this.removeReply.bind(this);
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
    const updatedPosts = (await Axios.post('/api/posts', body)).data;
    console.log(updatedPosts, 'posts returned from submitting posts');
    updatedPosts.sort((a, b) => b.upvotes - a.upvotes);
    this.setState({ formActive: false, posts: updatedPosts });
  }
  toggleForm() {
    this.setState({ formActive: !this.state.formActive });
  }
  handleReplyClick(singlePost) {
    this.setState({ selectedPost: singlePost });
  }
  collapse() {
    this.setState({ selectedPost: '' });
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
    updatedPosts.sort((a, b) => b.upvotes - a.upvotes);
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
  handleFilterSelect(e) {
    const { value } = e.target;
    console.log(this.state.posts, 'this.state.posts');
    const { posts } = this.state;
    if (value === 'popular') {
      posts.sort((a, b) => b.upvotes - a.upvotes);
      this.setState({ posts: posts });
    } else if (value === 'latest') {
      posts.sort((a, b) => b.time - a.time);
      this.setState({ posts: posts });
    }
  }
  removeReply(reply) {}
  handleReply(e) {
    let { value } = e.target;
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
      <>
        <div id="banner">
          <Banner />
        </div>
        <div id="main">
          <Sidebar
            handleFilterSelect={this.handleFilterSelect}
            submitPost={this.submitPost}
            handleInputChange={this.handleInputChange}
            formActive={this.state.formActive}
            toggleForm={this.toggleForm}
          />
          <div id="post-form">
            {this.state.formActive ? (
              <PostForm
                handleChange={this.state.handleInputChange}
                onClick={this.state.submitPost}
              />
            ) : (
              ''
            )}
          </div>
          <div id="all-post-container">
            <PostList
              removeReply={this.removeReply}
              collapse={this.collapse}
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
        </div>
      </>
    );
  }
}

export default App;
