import React from "react"
// importing components
import PostList from "./features/post/PostList"
import AddPostForm from "./features/post/AddPostForm"
import {store} from './app/store.tsx'
import { fetchUsers } from "./features/users/usersSlice"

// our main app component that houses our entire project
function App():JSX.Element {

  // this is our store dispatch that fetches our users
  // when the component unmounts we abort our request
  React.useEffect(()=> {
    const promise = store.dispatch(fetchUsers());
    return () => {
      promise.abort()
    }
  },[])


  return (
    <React.Fragment>
      {/* import our components */}
      {/* Our form */}
      <AddPostForm />
      {/* our posts lists */}
      <PostList />
    </React.Fragment>
  )
}

export default App
