
// call our select all users function from our user slice of state
import { selectAllUsers } from "../users/usersSlice";
// import our app select
import { useAppSelector } from "../../app/hook";

const PostAuthor = ({userId}: {userId:string}) => {
  // use ourapp selector to call our users from our state manager
    const users = useAppSelector(selectAllUsers);

    // loop through our users to fund a data entery where id matches user id of the post
    const author = users.find(user => user.id === userId);

  return (
    // we check to see if our author var id filled if it is then we display the name our find returned
    // otherwise we display unknown author
    <span>by {author ? author.name : 'Unknown author'}</span>
  )
}

export default PostAuthor