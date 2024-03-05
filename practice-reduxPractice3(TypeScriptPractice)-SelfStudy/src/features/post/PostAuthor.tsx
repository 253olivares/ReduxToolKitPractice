import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";

import React from 'react'
import { useAppSelector } from "../../app/hook";

const PostAuthor = ({userId}: {userId:string}) => {
    const users = useAppSelector(selectAllUsers);

    const author = users.find(user => user.id === userId);



  return (
    <span>by {author ? author.name : 'Unknown author'}</span>
  )
}

export default PostAuthor