import React from 'react'
import { useAppSelector } from '../../app/hook'
import { selectPostById} from './postSlice'
import { useParams, useNavigate } from 'react-router-dom'
import { useUpdatePostMutation, useDeletePostMutation } from './postSlice'
import { useGetUsersQuery } from '../users/userSliceAPI'
import { user } from '../users/userSliceAPI'

import { RootState } from '../../app/store'

const EditPostForm = () => {
  const {postId} = useParams();

  const navigate = useNavigate();

  const controllerRef = React.useRef<any>();
  
  React.useEffect(()=> {
    ()=> {
      if(controllerRef.current) {
        controllerRef.current.abort();
      }
    }
  },[])

  // calling in our update posts
  const [updatePost, {isLoading}] = useUpdatePostMutation();

  // calling in our delete posts
  const [deletePost] = useDeletePostMutation();

  const post = useAppSelector((state: RootState)=> selectPostById(state,Number(postId)));
  const {data:users} = useGetUsersQuery();

  // we will exist if there is not post to be found let it if a user just types in an id in th url for a post that doesn't exist
  if(!post) {
    return (
      <section>
        <h2 className='font-bold text-center mt-[6rem] text-2xl'>Post not found!</h2>
      </section>
    )
  }
  
// states to track items on page
  const [title,setTitle] = React.useState<string>(post.title);
  const [content, setContent] = React.useState<string>(post.body);
  const [userId, setUserId] = React.useState<number>(post.userId);

  const canSave: boolean = [title,content,userId].every(Boolean) && !isLoading;


  const usersOptions = users.map((user:user) => (
    <option
      key={user.id}
      value={user.id}
    >
      {user.name} 
    </option>
  ));

  const onSavePostClicked =  async () => {
    if(canSave) {
      try {

        // Passing our post to our update post function and the values within are our payload
        // unwrap takes our return and takes takes the payload our of our fulfill or rejects  
        // This mostly exists for our try and catch so we can get the errors returned in thunk otherwise our try catch will not recognize 
        // any reject errors
        controllerRef.current = await updatePost({id:Number(post.id), title, body:content, userId, reactions: post.reactions}).unwrap()

        setTitle('');
        setContent('');
        setUserId(0);
        navigate(`/post/${postId}`);
      } catch (err) {
        console.error('Failed to save the post', err);
      } 
    }
  };

  const onDeletePostClicked = async () => {
    try {
      controllerRef.current = await deletePost({id:post.id}).unwrap();
      
      setTitle('');
      setContent('');
      setUserId(0);
      navigate('/')
    } catch (err) {
      console.log(`Failed to delete the post`, err)
    } 
  };

  return (
    <section>
      <h2 className='font-bold text-3xl'>Edit Post</h2>
      <form onSubmit={e => e.preventDefault()} className='w-full flex flex-col p-10 justify-center mb-8'>
        <label htmlFor="postTitle" className='font-semibold text-xl'>Post Title:</label>
        <input 
        type="text" 
        id='postTitle'
        name='postTitle'
        className='block bg-slate-200 my-6 py-2 px-4 text-lg rounded-lg focus:bg-slate-50 focus:outline focus:outline-blue-400 focus:outline-4'
        value={title}
        onChange={e=>setTitle(e.target.value)}
        />
      <label htmlFor="postAuthor" className='font-semibold text-xl'>Author:</label>
      <select id="postAuthor" 
                className='block bg-slate-200 my-6 py-2 px-4 text-lg rounded-lg border-r-[20px] border-transparent px-4outline outline-neutral-700 focus:bg-slate-50 focus:outline focus:outline-blue-400 focus:outline-4 '
                value={userId} onChange={e=> setUserId(Number(e.target.value))}>
        <option value={0}></option>
        {usersOptions}
      </select>
      <label htmlFor="postContent" className='font-semibold text-xl'>Content:</label>
      <textarea name="postContent" 
      id="postContent"
      value={content}
      rows={4}
      className='block bg-slate-200 my-6 py-2 px-4 text-lg rounded-lg resize-none focus:bg-slate-50 focus:outline focus:outline-blue-400 focus:outline-4'
      onChange={e=> setContent(e.target.value)} 
      />
      <button
        type='button'
        onClick={onSavePostClicked}
        // we disable our button when are cansave is false
        // otherwise when its true we allow the button to be functional
        disabled={!canSave}
        className='w-[300px] mx-auto text-lg mt-8 py-3 rounded-md text-slate-800 font-bold bg-slate-300 disabled:text-slate-300 disabled:bg-slate-200 hover:bg-blue-400 hover:text-white'
      >
        Save Post
      </button>
      <button
      className='w-[300px] mx-auto text-lg mt-8 py-3 rounded-md text-white font-bold bg-red-400 hover:bg-red-700'
        type='button'
        onClick={onDeletePostClicked}
      >
        Delete Post
      </button>
      </form>
    </section>
  )
}

export default EditPostForm