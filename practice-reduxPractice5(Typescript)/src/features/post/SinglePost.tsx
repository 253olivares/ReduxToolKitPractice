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
            <section >
                <h2 className="text-center text-3xl font-bold mt-[6.25rem]">Post not found!</h2>
            </section>
        )
    }

    // otherwise we display our post
    return (
        <article className="card-solo">
            {/* title */}
            <h2 className='text-2xl font-semibold tracking-tight text-slate-900'>{post.title}</h2>
            {/* body */}
            <p className='mt-8 text-xl text-slate-500 '>{post.body}</p>
            {/* our author and time ago components where we are passing our userId and Date */}
            <p className="postCredit-solo">
                {/* creating a link that allows the user to navigate to the edit page */}
                <Link to={`/post/edit/${post.id}`}><span className='postCredit_span py-3 px-3 text-lg'>Edit Post</span></Link>
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>
            {/* reaction button components where we are passing our whole post */}
            <ReactionButtons post={post} cl={"buttonHolder space-x-5 text-lg"} cln={"reactionButton p-2"} />
        </article>
    )
}
export default SinglePost;