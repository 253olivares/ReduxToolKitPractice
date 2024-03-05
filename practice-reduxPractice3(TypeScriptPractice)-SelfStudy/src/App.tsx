import React from "react"
import PostList from "./features/post/PostList"
import AddPostForm from "./features/post/AddPostForm"

function App():JSX.Element {

  return (
    <React.Fragment>
      <AddPostForm />
      <PostList />
    </React.Fragment>
  )
}

export default App
