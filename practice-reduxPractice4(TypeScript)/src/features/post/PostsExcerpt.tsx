import { initialPostStateType } from './postSlice'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'
import { Link } from 'react-router-dom'

const PostsExcerpt = ({posts}: {posts: initialPostStateType}) => {
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