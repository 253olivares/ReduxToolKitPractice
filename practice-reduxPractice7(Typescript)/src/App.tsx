import React from "react"
// importing components
import Layout from "./components/Layout.tsx"
import PostList from "./features/post/PostList"
import AddPostForm from "./features/post/AddPostForm"
import SinglePost from "./features/post/SinglePost.tsx"
import NotFound from "./components/NotFound.tsx"
import UserList from "./features/users/UserList.tsx"
import UserPage from "./features/users/UserPage.tsx"
import { Routes, Route } from "react-router-dom"
import EditPostForm from "./features/post/EditPostForm.tsx"
// our main app component that houses our entire project
function App():JSX.Element {

  // this is our store dispatch that fetches our users
  // when the component unmounts we abort our request
  React.useEffect(()=> {

   
  
  },[])


  return (
    <React.Fragment>
      <Routes>
        {/* our base route / this will make sure out layout renders on top of all our other components */}
        <Route path="/" element={<Layout />}>
          {/* when our link is empty and just has / then we will render postList */}
          {/* locahost/ */}
          <Route index element={<PostList />}/>

          {/* when our link has /post at the start it will render our post form */}
          {/* localhost/post */}
          <Route path="post" >
            <Route index element={<AddPostForm />} />
            {/* localhost/post/1 */}
            <Route path=":postId" element={<SinglePost />}/>
            {/* our edit page will take us a edit form for the selected id*/}
            {/* localhost/post/edit/1 *not actually 1 can be any number as long as it exists in our api and state */}
            <Route path="edit/:postId" element={<EditPostForm />}/>
          </Route>

          <Route path="user">
            <Route index element={<UserList />}/>
            <Route path=":userId" element={<UserPage />}/>
          </Route>
          {/* error handling for pages that dont exist */}
          {/* sits at the bottom of our route tree wrapped inside / so we can allow the user to navigate elsewhere */}
          <Route path="*" element={<NotFound />}/>
        </Route>
      </Routes>
      {/* import our components */}
      {/* Our form */}
      {/* <AddPostForm /> */}
      {/* our posts lists */}
      {/* <PostList /> */}
    </React.Fragment>
  )
}

export default App
