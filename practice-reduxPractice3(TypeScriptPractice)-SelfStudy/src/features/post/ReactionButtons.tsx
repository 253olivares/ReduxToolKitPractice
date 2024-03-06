// import our reaction added function from post slice
import { reactionAdded } from "./postSlice";
// import our dispatch
import { useDispatch } from "react-redux";
// import our initial type
import {initialPostStateType} from './postSlice'

// create an array of our emotes we want to bind to our reactions
const reactionEmoji = {
    thumbsUp: '👍',
    wow: '😮',
    heart: '❤️',
    rocket: '🚀',
    coffee: '☕'
}

// our reaction button component
// get our post and bind it to our post state interface
const ReactionButtons = ({post}:{post:initialPostStateType}) => {
  // call our dispatcher
    const dispatch = useDispatch();
    // console.log(post);

    // set our rection butto by taking our object we created and map them to name and emoji
    const reactionButtons = Object.entries(reactionEmoji).map(([name,emoji])=>{
      // then we will return a button with said name and emoji and a onlcick function that calls our dispatcher
      // that adds 1 to our reaction 
        return(
            <button
            key={name}
            type="button"
            className="reactionButton"
            // Pass postId so we know which post is receiving the reaction and the name of the reaction its recieving
            onClick={()=> dispatch(reactionAdded({postId: post.id, reaction: name}))} 
            >
              {/* render our empji and count of its reaction from our post */}
                 {emoji} {post.reactions[name]};
            </button>
        )
    })

  return (
    // render our array of jsx elements
    <div>{reactionButtons}</div>
  )
}

export default ReactionButtons