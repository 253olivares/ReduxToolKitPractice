
// import our initial type
import {initialPostStateType} from './postSlice'

import { useAddReactionMutation } from './postSlice';

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
const ReactionButtons = ({post, cl, cln}:{post:initialPostStateType, cl:string,cln:string}) => {
    const [addReaction] = useAddReactionMutation();
    // console.log(post);

    // set our rection butto by taking our object we created and map them to name and emoji
    const reactionButtons = Object.entries(reactionEmoji).map(([name,emoji])=>{
      // then we will return a button with said name and emoji and a onlcick function that calls our dispatcher
      // that adds 1 to our reaction 
        return(
            <button
            key={name}
            type="button"
            className={cln}
            // Pass postId so we know which post is receiving the reaction and the name of the reaction its recieving
            onClick={()=> {
              const newValue = post.reactions[name] + 1;
              // spread all our reactions and append the reaction with the new value to replace its preexisting value
              addReaction({postId: post.id, reactions: {...post.reactions, [name]:newValue} }
                )} 
            }
            >
              {/* render our empji and count of its reaction from our post */}
                 {emoji} {post.reactions[name]}
            </button>
        )
    })

  return (
    // render our array of jsx elements
    <div className={cl}>{reactionButtons}</div>
  )
}

export default ReactionButtons