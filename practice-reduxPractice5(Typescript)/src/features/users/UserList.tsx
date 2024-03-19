import { useAppSelector } from "../../app/hook"
import { selectAllUsers, usersType } from "./usersSlice"
import { Link } from "react-router-dom"

const UserList = () => {

    const users = useAppSelector(selectAllUsers)

    const renderedUsers:JSX.Element[] = users.map((user:usersType)=> (
        <li key={user.id} >    
            <Link to={`/user/${user.id}`}>{user.name}</Link>
        </li>
    ))  


  return (
    <section>
        <h2>Users</h2>

        <ul>{renderedUsers}</ul>
    </section>  
  )
}

export default UserList