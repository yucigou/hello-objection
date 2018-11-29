import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

class PostMessageView extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { postMessage } = this.props;
    const text = this.refs.message.value
    if (!text) return;
    postMessage({ variables: { text } });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input ref="message" name="message"/>
          <button type="submit">Add Todo</button>
        </form>
      </div>
    )
  }
}

PostMessageView.propTypes = {
  postMessage: PropTypes.func.isRequired,
};

const POST_MESSAGE = gql`
  mutation postMessage ($text: String!) {
    postMessage(text: $text) @client {
      id
    }
  }
`;

const postMessage = () => (
  <Mutation mutation={POST_MESSAGE}>
    {postMessage => (<PostMessageView postMessage={postMessage} />)}
  </Mutation>
);

export default postMessage;
