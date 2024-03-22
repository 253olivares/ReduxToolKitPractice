import { useAppSelector } from "../../app/hook"
import { selectUserById } from "./usersSlice"
import {selectPostByUser} from "../post/postSlice"
import { Link,useParams } from "react-router-dom"

const UserPage = () => {
    const {userId}  = useParams<{userId:string}>();

    const user = useAppSelector(state => selectUserById(state, Number(userId)))

    const postsForUser = useAppSelector(state => selectPostByUser(state,Number(userId)));

    const postTitles = postsForUser.map( post => (
        <li key={post.id} className="my-2 text-lg font-semibold text-slate-500 hover:text-slate-800 flex after:content-['>'] after:hidden hover:after:block after:ml-5">
            <Link to={`/post/${post.id}`}>{post.title}</Link>
        </li>
    ))
    console.log("postTitles:",postTitles)
    console.log(postTitles.length);

  if(!user) {
    return <p className="text-center mt-[6rem] font-bold text-xl">No user was found</p>
  }

  return (
    <section>
        <h2 className="font-semibold text-2xl my-8">{user.name}</h2> 
        {postTitles.length > 0 ?  <ol>{postTitles}</ol> : <p className="text-center text-lg">No posts for this user were found!</p>}
    </section>
  )
}

export default UserPage