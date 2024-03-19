import React from 'react'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'
import { Link } from 'react-router-dom'

import { useAppSelector } from '../../app/hook'
import { selectPostById } from './postSlice'

const PostsExcerpt: React.FC<{postId:number}> = ({postId}) => {

  const posts = useAppSelector(state => selectPostById(state, postId))


  return (
   <article>
    <h3>{posts.title}</h3>
    <p >{posts.body.substring(0,75)}...</p>
    <p className='postCredit'>
        <Link to={`post/${posts.id}`}>View Post</Link>
        <PostAuthor userId={posts.userId}/>
        <TimeAgo timestamp={posts.date}/>
    </p>
    <ReactionButtons post={posts}/>
   </article>
  )
}

export default PostsExcerpt 