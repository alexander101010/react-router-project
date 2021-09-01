import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import NewCommentForm from './NewCommentForm';
import LoadingSpinner from '../UI/LoadingSpinner';
import CommentsList from './CommentsList';

import useHttp from '../../hooks/use-http';
import { getAllComments } from '../../lib/api';

import classes from './Comments.module.css';

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams();
  const { quoteId } = params;

  const {
    sendRequest,
    status,
    data: loadedComments,
    error,
  } = useHttp(getAllComments);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const addCommentHandler = useCallback(() => {
    sendRequest(quoteId);
    setIsAddingComment(false);
  }, [sendRequest, quoteId]);

  let comments; // *************************************************

  if (status === 'completed' && error) {
    comments = (
      <div className='centered'>
        <p>{error.message || 'Something went wrong.'}</p>
      </div>
    );
  }

  if (status === 'pending') {
    comments = (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    );
  }

  if (
    status === 'completed' &&
    (!loadedComments || loadedComments.length === 0)
  ) {
    comments = <p className='centered'>No one has commented yet!</p>;
  }

  if (status === 'completed' && loadedComments.length > 0) {
    comments = <CommentsList comments={loadedComments} />;
  }
  // let comments; // *************************************************

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm onAddComment={addCommentHandler} quoteId={quoteId} />
      )}
      {comments}
    </section>
  );
};

export default Comments;
