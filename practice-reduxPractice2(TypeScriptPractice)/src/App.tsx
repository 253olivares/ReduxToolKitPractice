import React from "react"
// importing components
import PostList from "./features/post/PostList"
import AddPostForm from "./features/post/AddPostForm"

// our main app component that houses our entire project
function App():JSX.Element {
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
