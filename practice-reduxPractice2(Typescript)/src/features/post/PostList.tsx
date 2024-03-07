// import our custom selector hook
import { useAppSelector } from "../../app/hook";
import React from 'react'
// import our selectallPost function
import { selectAllPosts } from "./postSlice";
// import our author component
import PostAuthor from "./PostAuthor";
// import time ago component
import TimeAgo from "./TimeAgo";
// import our reaction buttons
import ReactionButtons from "./ReactionButtons";

// this is our post list component
const PostList:React.FC = () => {
    // load our posts from our state manager
    const posts = useAppSelector(selectAllPosts);
    
    // create a rendered posts variable that holds an array of our posts returned from our map
    const renderedPosts:JSX.Element[] = posts.map((post) => (
        // map through our post and create a unique article for each
        <article key={post.id}>
            {/* h3 display our title */}
            <h3>{post.title}</h3>
            {/* display our content up to 100 characters only */}
            <p>{post.content.substring(0,100)}</p>
            {/* our credit divs */}
            <p className="postCredit">
                <PostAuthor  userId={post.userId}/>
                <TimeAgo timestamp={post.date}/>
            </p>
            {/* reaction buttons */}
            <ReactionButtons post={post} />
        </article>
    ))

  return (
    <section>
        <h2>Posts</h2>
        {/* render our posts */}
        {renderedPosts}
    </section>
  )
}

export default PostList