import React from 'react'
import { initialPostStateType } from './postSlice'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'

const PostsExcerpt = ({posts}: {posts: initialPostStateType}) => {
  return (
   <article>
    <h3>{posts.title}</h3>
    <p>{posts.body.substring(0,100)}</p>
    <p className='postCredit'>
        <PostAuthor userId ={posts.userId}/>
        <TimeAgo timestamp={posts.date}/>
    </p>
    <ReactionButtons post={posts}/>
   </article>
  )
}

export default PostsExcerpt