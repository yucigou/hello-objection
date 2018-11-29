import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

class AddTodoView extends Component {
  // inputEl;

  handleSubmit(e) {
    // console.log('this.props: ', this.props)
    e.preventDefault();
    const { addTodo } = this.props;
    const text = 'Test' // this.inputEl.value.trim();
    if (!text) return;
    addTodo({ variables: { text } });
    this.inputEl.value = '';
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <button type="submit">Add Todo</button>
        </form>
      </div>
    );
  }
}

AddTodoView.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

const ADD_TODO = gql`
  mutation postMessage ($text: String!) {
    postMessage(text: $text) @client {
      id
    }
  }
`;

const AddTodo = () => (
  <Mutation mutation={ADD_TODO}>
    {addTodo => (<AddTodoView addTodo={addTodo} />)}
  </Mutation>
);

export default AddTodo;
