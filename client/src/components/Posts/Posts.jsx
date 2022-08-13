import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Post from './Post/Post';
import useStyles from './styles';

function Posts({ setCurrentId }) {
  const posts = useSelector((state) => state.posts);
  const classes = useStyles();

  // console.log(posts);

  return (
    // If there are no posts show the circular progress bar, else populate a grid with the posts
    !posts.length ? (
      <CircularProgress />
    ) : (
      <Grid className={classes.containter} container alignItems="stretch" spacing={3}>
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={6}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
}

export default Posts;
