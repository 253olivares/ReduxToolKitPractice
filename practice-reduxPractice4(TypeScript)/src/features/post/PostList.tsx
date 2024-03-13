// import our custom selector hook
import { useAppDispatch, useAppSelector } from "../../app/hook";
import React from "react";
// import our selectallPost function
import { selectAllPosts, getPostsStatus, getPostsError, fetchPosts, initialPostStateType } from "./postSlice";

import PostsExcerpt from "./PostsExcerpt";

// this is our post list component
function PostList() {
    const dispatch = useAppDispatch();

    // load our posts from our state manager
    const posts = useAppSelector(selectAllPosts)
    const postsStatus = useAppSelector(getPostsStatus);
    const error = useAppSelector(getPostsError);

    console.log("Post List Posts Var:",posts);
    console.log("Post List Post status Var:",postsStatus);
    console.log("Post List Error var:", error);

    // createing an abort controller for our api to abort request if its ongoing and our component unmounts
    const controllerRef = React.useRef<any>();

    // when our page loads if our status is idle fetch our posts
    React.useEffect(()=> {
        if (postsStatus === 'idle') {
            controllerRef.current = dispatch(fetchPosts());
        }

        () => {
            if(controllerRef.current) {
                controllerRef.current.abort();
            }
        }

    },[postsStatus,dispatch])
    
    // user content to keep track our if we are fetching data or if we have our data
    let content;
    switch(postsStatus){
        case 'failed' :
            content = <p>{error}</p>;
            break;
            // if we have our data loop through the state and display each instance in a component
        case 'succeeded' :
            const orderedPosts = posts.slice().sort((a,b)=> b.date.localeCompare(a.date));
            content = orderedPosts.map((post:initialPostStateType) => <PostsExcerpt key={post.id} posts={post} />)
            break;
        default: 
        // otherwise just display a loading message
        content = <p>"Loading..."</p>
            break;

    }

  return (
    // display our content
    <section>
        {/* <h2>Posts</h2> */}
        {/* render our posts */}
        {content}
    </section>
  )
}

export default PostList;