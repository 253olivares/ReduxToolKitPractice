import { useAppDispatch, useAppSelector } from "../../app/hook";
import React from 'react'
import { selectAllPosts } from "./postSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

const PostList:React.FC = () => {
    const posts = useAppSelector(selectAllPosts);
    
    const renderedPosts:JSX.Element[] = posts.map((post) => (
        <article key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content.substring(0,100)}</p>
            <p className="postCredit">
                <PostAuthor  userId={post.userId}/>
                <TimeAgo timestamp={post.date}/>
            </p>
            <ReactionButtons post={post} />
        </article>
    ))

  return (
    <section>
        <h2>Posts</h2>
        {renderedPosts}
    </section>
  )
}

export default PostList