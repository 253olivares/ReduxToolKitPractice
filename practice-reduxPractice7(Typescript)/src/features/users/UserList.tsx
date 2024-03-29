import { useGetUsersQuery } from "./userSliceAPI"
import { Link } from "react-router-dom"
import { user } from "./userSliceAPI"

const UserList = () => {

    const {data:users} = useGetUsersQuery();

    const renderedUsers:JSX.Element[] = users.map((user:user)=> (
        <li key={user.id}  className="my-2 font-semibold text-lg text-slate-500 hover:text-slate-800 flex after:content-['>'] after:hidden hover:after:block after:ml-5">    
            <Link to={`/user/${user.id}`}>{user.name}</Link>
        </li>
    ))  


  return (
    <section>
        <h2 className="font-bold text-3xl mb-8">Users</h2>

        <ul>{renderedUsers}</ul>
    </section>  
  )
}

export default UserList