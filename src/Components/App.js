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
      filter: 'all',
      formActive: false,
      posts: [],
      selectedPost: '',
      postInfo: { userName: '', title: '', category: '', text: '' },
      categories: [
        'politics',
        'random',
        'animals',
        'funny',
        'movies',
        'coding',
        'Q&A',
      ],
    };
    this.submitPost = this.submitPost.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.upvote = this.upvote.bind(this);
    this.downvote = this.downvote.bind(this);
    this.addReply = this.addReply.bind(this);
    this.handleReplyChange = this.handleReplyChange.bind(this);
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

  //FORM //
  handleInputChange(e) {
    const { value, name } = e.target;
    const postInfo = { ...this.state.postInfo, ...{ [name]: value } };
    this.setState({ postInfo: postInfo });
  }

  async submitPost() {
    const body = this.state.postInfo;
    console.log(body, 'body');
    const { userName, title, text, category } = body;
    if (!category || userName === '' || text === '' || title === '') {
      this.setState({ formError: true, formActive: true });
    } else {
      const updatedPosts = (await Axios.post('/api/posts', body)).data;
      console.log(updatedPosts, 'posts returned from submitting posts');
      updatedPosts.sort((a, b) => b.upvotes - a.upvotes);
      this.setState({
        formError: false,
        formActive: false,
        posts: updatedPosts,
        postInfo: {},
      });
    }
  }

  toggleForm() {
    this.setState({ formActive: !this.state.formActive });
  }

  async deletePost(post) {
    const posts = (await Axios.delete(`/api/posts/${post.id}`)).data;
    console.log(posts, 'updated posts after deleting');
    this.setState({ posts: posts });
  }
  //upvotes and downvotes //
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

  async handleFilterSelect(e) {
    const { value } = e.target;

    this.setState({ filter: value, posts: [...this.state.posts] });
  }

  //handling reply section //
  async removeReply(reply) {
    await Axios.delete(`/api/replies/${reply.id}`);
    const updatedPosts = (await Axios.get('/api/posts')).data;
    console.log(updatedPosts, 'updated posts');
    this.setState({
      posts: updatedPosts,
    });
  }
  handleReplyChange(e) {
    let { value, id } = e.target;

    this.setState({ currentReply: value, selectedPostId: id });
  }
  async addReply(post) {
    const id = post.id;
    const posts = (
      await Axios.post(`/api/posts/${post.id}/replies`, {
        text: this.state.currentReply,
        postId: id,
      })
    ).data;
    this.setState((prevState) => ({
      posts: posts,
      currentReply: '',
      selectedPost: { ...prevState.selectedPost },
      replyDivActive: true,
    }));
  }
  handleReplyClick(singlePost) {
    this.setState({ selectedPost: singlePost });
  }
  collapse() {
    this.setState({ selectedPost: '' });
  }
  render() {
    return (
      <>
        <div id="banner">
          <Banner />
        </div>
        <div id="main">
          <Sidebar
            categories={this.state.categories}
            handleFilterSelect={this.handleFilterSelect}
            submitPost={this.submitPost}
            handleInputChange={this.handleInputChange}
            formActive={this.state.formActive}
            toggleForm={this.toggleForm}
          />
          <div id="post-form">
            {this.state.formActive ? (
              <PostForm
                categories={this.state.categories}
                error={this.state.formError}
                formData={this.state.formData}
                handleChange={this.handleInputChange}
                onClick={this.submitPost}
              />
            ) : (
              ''
            )}
          </div>
          <div id="all-post-container">
            <PostList
              filter={this.state.filter}
              replyFormData={this.state.currentReply}
              selectedPostId={this.state.selectedPostId}
              removeReply={this.removeReply}
              collapse={this.collapse}
              deletePost={this.deletePost}
              selectedPost={this.state.selectedPost}
              handleReplyClick={this.handleReplyClick}
              addReply={this.addReply}
              handleReplyChange={this.handleReplyChange}
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
