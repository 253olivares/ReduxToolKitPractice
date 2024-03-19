import { useAppSelector } from "../../app/hook"
import { selectUserById } from "./usersSlice"
import {selectPostByUser} from "../post/postSlice"
import { Link,useParams } from "react-router-dom"

const UserPage = () => {
    const {userId}  = useParams<{userId:string}>();

    const user = useAppSelector(state => selectUserById(state, Number(userId)))

    const postsForUser = useAppSelector(state => selectPostByUser(state,Number(userId)));

    const postTitles = postsForUser.map( post => (
        <li key={post.id}>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
        </li>
    ))
    console.log("postTitles:",postTitles)
    console.log(postTitles.length);

  if(!user) {
    return "No user was found"
  }

  return (
    <section>
        <h2>{user.name}</h2> 
        <ol>{postTitles}</ol>
        {postTitles.length > 0 ?  <ol>{postTitles}</ol> : <p>No posts for this user were found!</p>}
    </section>
  )
}

export default UserPage