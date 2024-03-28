import { useAppSelector } from "../../app/hook"
// our select queries are still being used to get our users
import { selectUserById } from "./usersSlice"
import { Link,useParams } from "react-router-dom"
import { useGetPostsByUserIdQuery } from "../post/postSlice"

const UserPage = () => {
    const {userId}  = useParams<{userId:string}>();

    const user = useAppSelector(state => selectUserById(state, Number(userId)))

    const {
      data: postsForUser,
      isLoading,
      isSuccess,
      isError,
      error
    } = useGetPostsByUserIdQuery(Number(userId));


    let content;
    if(isLoading) {
      content = <p>Loading...</p>
    } else if (isSuccess) {
      // get our id and posts entities
      const {ids, entities} = postsForUser;
      content = ids.map( (id:number)=> (
        <li key={id} className="my-2 text-lg font-semibold text-slate-500 hover:text-slate-800 flex after:content-['>'] after:hidden hover:after:block after:ml-5">
          {/* display our entities title based on id the map is on */}
          <Link to={`/post/${id}`}>{entities[id].title}</Link>
        </li>
      ));
      if(content.length < 1 ) {
        content = <p className="text-center text-lg">No posts for this user were found!</p>;
      }
    } else  if (isError) {
      console.log(error);
      content = <p className="text-center text-lg">An error has ocurred please reference console.log</p>
    }

    // const postTitles = postsForUser.map( post => (
    //     <li key={post.id} className="my-2 text-lg font-semibold text-slate-500 hover:text-slate-800 flex after:content-['>'] after:hidden hover:after:block after:ml-5">
    //         <Link to={`/post/${post.id}`}>{post.title}</Link>
    //     </li>
    // ))

  if(!user) {
    return <p className="text-center mt-[6rem] font-bold text-xl">No user was found</p>
  }

  return (
    <section>
        <h2 className="font-semibold text-2xl my-8">{user.name}</h2> 
        {content}
    </section>
  )
}

export default UserPage