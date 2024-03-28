// import our custom selector hook
import { useAppSelector } from "../../app/hook";
// import our selectallPost function
import { selectPostIds } from "./postSlice";

import { useGetPostsQuery } from "./postSlice";

import PostsExcerpt from "./PostsExcerpt";

// this is our post list component
function PostList() {

    const {
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetPostsQuery();
 
    // this grabs our index state which should be idx number[]
    // this number is what is mapped through and passed into our posts excerpy
    const orderedPostsByIds = useAppSelector(selectPostIds)

    console.log("Post List Error var:", error);
    
    // user content to keep track our if we are fetching data or if we have our data
    let content;

    if (isLoading) {
        content = <p className="loading">"Loading..."</p>;
    } else if (isSuccess) {
        content = orderedPostsByIds.map(postId => <PostsExcerpt key={postId} postId={postId} />)
    } else if (isError) {
        console.log(error)
        content = <p>you have ran into an issue!</p>;
    }

  return (
    // display our content
    <section className="mb-12">
        {/* <h2>Posts</h2> */}
        {/* render our posts */}
        {content}
    </section>
  )
}

export default PostList;