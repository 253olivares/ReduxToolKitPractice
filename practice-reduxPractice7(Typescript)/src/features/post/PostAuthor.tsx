import { useGetUserByIdQuery} from "../users/userSliceAPI";

import {Link} from 'react-router-dom';

const PostAuthor = ({userId}: {userId:number}) => {
  // use ourapp selector to call our users from our state manager
  const {data} = useGetUserByIdQuery(userId);
  return (
    // we check to see if our author var id filled if it is then we display the name our find returned
    // otherwise we display unknown author
    <span className="font-[500]">by {data ? <Link to={`/user/${userId}`}>{data.name}</Link> : 'Unknown author'}</span>
  )
}

export default PostAuthor