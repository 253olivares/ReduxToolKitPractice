// add Post form
import React from 'react'
// call our custom hooks
import { useAppSelector} from '../../app/hook';

// call our post add function that will run when the user submits our form
// call our users so that we can select a user our todo is created under
import { selectAllUsers } from '../users/usersSlice';
import { useNavigate } from 'react-router-dom';
import { useAddNewPostMutation } from './postSlice';

// create our component
const AddPostForm = () => {
  // from our hook we are going to deconstruct our isloading and create our add new Post function
  const [addNewPost, {isLoading}] = useAddNewPostMutation();

  // we create this ref to cancel any api requests ongoing if the user wishes to cancel by unmouting the component
  const controllerRef = React.useRef<any>();

  React.useEffect(()=>{
    ()=> {
      if(controllerRef.current) {
        controllerRef.current.abort();
      }
    }
  },[])

  // create mutliple states that keep track of data changing in our component
  // title keeps track of the title we are setting
  const [title, setTitle] = React.useState<string>('');
  // content keeps track of the content we want to fill
  const [body, setContent] = React.useState<string>('');
  // id keep track of the user we are saying is creating this todo
  const [userId, setUserId] = React.useState<string>('');

  const navigate = useNavigate();

  // call all our users
  const users = useAppSelector(selectAllUsers);

  const canSave = [title,body,userId].every(Boolean) && !isLoading; 

  // functions that change our states to reflect user input
  const onTitleChanged = (e:React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const onContentChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);
  const onAuthorChanged = (e:React.ChangeEvent<HTMLSelectElement>) => setUserId(e.target.value)

  // we have to call useApp dispatch like this because useAppDispatch returns our dispatch function
  // so we cant call use app dispatch directly

  // this sends our post out to be added to our state
  const onSavePostClicked = async ():Promise<void> => {
    if(canSave) {
      try{
        // continue to use our ref to abort requests when created
        controllerRef.current = await addNewPost({title,body,userId: Number(userId)}).unwrap();

        // reset our title and content
        setTitle('');
        setContent('');
        setUserId('');
        navigate('/')
      } catch(err) {
        console.log("Failed to save the post",err)
      } 
    }
  }

  // mapping all out users we called at the top into an array of options
  // create a array of options that is each user in our user state
  // maps through and displays our user information in each entry
  const usersOptions:JSX.Element[] = users.map( (user: {id:number, name:string}) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  return (
    // return a section
    <section>
      {/* title */}
      <h2 className='font-bold text-3xl'>Add a New Post</h2>
      {/* form */}
      <form onSubmit={e=> e.preventDefault()} className='w-full flex flex-col p-10 justify-center'>
        <label htmlFor="postTitle" className='font-semibold text-xl'>Post Title:</label>
        <input 
        type="text" 
        id='postTitle'
        name='postTitle'
        className='block bg-slate-200 my-6 py-2 px-4 text-lg rounded-lg focus:bg-slate-50 focus:outline focus:outline-blue-400 focus:outline-4'
        value={title}
        //on change updates title state
        onChange={onTitleChanged}
        
        />

        <label htmlFor="postAuthor" className='font-semibold text-xl'>Author:</label>
        <select 
        value={userId} 
        id="postAuthor"
        className='block bg-slate-200 my-6 py-2 px-4 text-lg rounded-lg border-r-[20px] border-transparent px-4outline outline-neutral-700 focus:bg-slate-50 focus:outline focus:outline-blue-400 focus:outline-4 '
        // onchange changes author state
        onChange={onAuthorChanged}
        >
          <option value=""></option>
          {usersOptions}
        </select>

        <label htmlFor="postContent" className='font-semibold text-xl'>Content:</label>
        <textarea 
        name="postContent" 
        id="postContent" 
        value={body}
         className='block bg-slate-200 my-6 py-2 px-4 text-lg rounded-lg resize-none focus:bg-slate-50 focus:outline focus:outline-blue-400 focus:outline-4'
        // oncontent change changes content state
        rows={4}
        onChange={ onContentChange}
        />

        {/* runs our save posts click when our button is enables from can save */}
        <button type='button' onClick={onSavePostClicked} disabled={!canSave} className='w-[300px] mx-auto text-lg mt-8 py-3 rounded-md text-slate-800 font-bold bg-slate-300 disabled:text-slate-300 disabled:bg-slate-200 hover:bg-blue-400 hover:text-white' >Save Post</button>
      </form>
    </section>
  )
}

export default AddPostForm