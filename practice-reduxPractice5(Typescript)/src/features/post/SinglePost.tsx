// single Post component

// call in our unique selector for typescript
import { useAppSelector } from "../../app/hook";
// import select post by id which is our new function created in slice
// so we can call the state object we ware looking for 
import { selectPostById } from "./postSlice";

// import our post author component
import PostAuthor from "./PostAuthor";
// import our time ago component
import TimeAgo from "./TimeAgo";
// import our reaction buttons
import ReactionButtons from "./ReactionButtons";

// import use params 
// through this we are going to grab the id we are looking for our our nav
import { useParams } from "react-router-dom";
// import link
import { Link } from "react-router-dom";
// import our root state type for type script
import { RootState } from "../../app/store";

// our component
const SinglePost = () => {
    // identify our id for the post we are looking for
    // localhost/post/userId *userID will be seen as a number
    // localhost/post/1
    const {postId} = useParams<{postId?:string}>();

    // use our app select and grab our post by passing our post id and returning the state object of the post we are looking for
    const post = useAppSelector((state:RootState) => selectPostById(state, Number(postId)))

    // if we did not find a post we prevent all our code from running and just 
    // display a error message of post not found
    if(!post) {
        return(
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }

    // otherwise we display our post
    return (
        <article>
            {/* title */}
            <h2>{post.title}</h2>
            {/* body */}
            <p>{post.body}</p>
            {/* our author and time ago components where we are passing our userId and Date */}
            <p className="postCredit">
                {/* creating a link that allows the user to navigate to the edit page */}
                <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>
            {/* reaction button components where we are passing our whole post */}
            <ReactionButtons post={post} />
        </article>
    )
}
export default SinglePost;