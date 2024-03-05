import { reactionAdded } from "./postSlice";
import { useDispatch } from "react-redux";
import {initialPostStateType} from './postSlice'

const reactionEmoji = {
    thumbs: '👍',
    wow: '😮',
    hearts: '❤️',
    rocket: '🚀',
    coffee: '☕'
}

const ReactionButtons = ({post}:{post:initialPostStateType}) => {
    const dispatch = useDispatch();
    console.log(post);

    const reactionButtons = Object.entries(reactionEmoji).map(([name,emoji])=>{
        return(
            <button
            key={name}
            type="button"
            className="reactionButton"
            onClick={()=> dispatch(reactionAdded({postId: post.id, reaction: name}))} 
            >
                 {emoji} {post.reactions[name]};
            </button>
        )
    })

  return (
    <div>{reactionButtons}</div>
  )
}

export default ReactionButtons