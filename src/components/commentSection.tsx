import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { API } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { listComments } from '../graphql/queries';
import { createComment as createCommentMutation } from '../graphql/mutations';
import { Comment, ListCommentsQuery } from '../API';

const useStyles = makeStyles({
    root: {
      height: '500px',
      width: '400px',
      margin: 'auto',
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: 'column',
      padding: '15px',
    },
  });

type CommentSectionProps = {
  itemID: string,
};

const CommentSection = ({itemID} : CommentSectionProps) => {

  const classes = useStyles();
  const [comments, setComments] = useState<Comment[]>([]);
 
  useEffect(() => {
    fetchComments();
  }, []);

  async function fetchComments() {
    const apiData = await API.graphql({ query: listComments, variables: { filter: { itemID: { eq: itemID } }} }) as GraphQLResult<ListCommentsQuery>;
    if(apiData?.data?.listComments){
      setComments(apiData.data.listComments.items as Array<Comment>);
    }
  }
  
  async function createComment(content: string) {
    await API.graphql({query: createCommentMutation, variables: { input: { itemID, content} }});
    await fetchComments();
  }


  const [newComment, setNewComment] = useState('');

  return (
    <div className={classes.root}>
      {
        comments.map(comment => {
          return (
            <>
              <span>{comment.owner}</span>
              <span>{comment.content}</span>
            </>
          )
        })
      }
      <input
          onChange={e => setNewComment(e.target.value)}
          placeholder="Add comment"
          value={newComment}
        />
        <button onClick={() => createComment(newComment)}>Comment</button>
    </div>
  );
}

export default CommentSection;
