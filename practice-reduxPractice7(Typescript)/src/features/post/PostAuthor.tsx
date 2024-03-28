
// call our select all users function from our user slice of state
import { selectAllUsers, usersType } from "../users/usersSlice";
// import our app select
import { useAppSelector } from "../../app/hook";

import {Link} from 'react-router-dom';

const PostAuthor = ({userId}: {userId:number}) => {
  // use ourapp selector to call our users from our state manager
  const users = useAppSelector(selectAllUsers)

    const author = users.find((user:usersType) => user.id === userId)
  return (
    // we check to see if our author var id filled if it is then we display the name our find returned
    // otherwise we display unknown author
    <span className="font-[500]">by {author ? <Link to={`/user/${userId}`}>{author.name}</Link> : 'Unknown author'}</span>
  )
}

export default PostAuthor