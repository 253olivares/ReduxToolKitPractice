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
   <article className='card'>
    <h3 className='text-lg font-semibold tracking-tight text-slate-900'>{posts.title}</h3>
    <p className='mt-2 text-base text-slate-500 '>{posts.body.substring(0,75)}...</p>
    <p className='postCredit'>
        <Link to={`post/${posts.id}`}><span className='postCredit_span'>View Post</span></Link>
        <PostAuthor userId={posts.userId}/>
        <TimeAgo timestamp={posts.date}/>
    </p>
    <ReactionButtons post={posts} cl={"buttonHolder"} cln={"reactionButton"}/>
   </article>
  )
}

export default PostsExcerpt 