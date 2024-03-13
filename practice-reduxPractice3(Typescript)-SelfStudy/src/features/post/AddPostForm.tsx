// add Post form
import React from 'react'
// call our custom hooks
import { useAppDispatch,useAppSelector} from '../../app/hook';

// call our post add function that will run when the user submits our form
import { addNewPost} from './postSlice';
// call our users so that we can select a user our todo is created under
import { selectAllUsers } from '../users/usersSlice';

// create our component
const AddPostForm = () => {

  // create mutliple states that keep track of data changing in our component
  // title keeps track of the title we are setting
  const [title, setTitle] = React.useState<string>('');
  // content keeps track of the content we want to fill
  const [body, setContent] = React.useState<string>('');
  // id keep track of the user we are saying is creating this todo
  const [userId, setUserId] = React.useState<string>('');
  const [addRequestStatus, setRequestStatus] = React.useState<string>('idle')

  // call all our users
  const users = useAppSelector(selectAllUsers);
  const dispatch = useAppDispatch()

  const canSave = [title,body,userId].every(Boolean) && addRequestStatus === 'idle'; 

  // functions that change our states to reflect user input
  const onTitleChanged = (e:React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const onContentChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);
  const onAuthorChanged = (e:React.ChangeEvent<HTMLSelectElement>) => setUserId(e.target.value)

  // we have to call useApp dispatch like this because useAppDispatch returns our dispatch function
  // so we cant call use app dispatch directly

  // this sends our post out to be added to our state
  const onSavePostClicked = ():void => {
    if(canSave) {
      try{
        setRequestStatus('pending');
        dispatch(addNewPost({title,body,userId: Number(userId)}))
  
        // reset our title and content
        setTitle('');
        setContent('');
        setUserId('');
      } catch(err) {
        console.log("Failed to save the post",err)
      } finally {
        setRequestStatus('idle');
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
      <h2>Add a New Post</h2>
      {/* form */}
      <form onSubmit={e=> e.preventDefault()}>
        <label htmlFor="postTitle">Post Title:</label>
        <input 
        type="text" 
        id='postTitle'
        name='postTitle'
        value={title}
        //on change updates title state
        onChange={onTitleChanged}
        
        />

        <label htmlFor="postAuthor">Author:</label>
        <select 
        value={userId} 
        id="postAuthor"
        // onchange changes author state
        onChange={onAuthorChanged}
        >
          <option value=""></option>
          {usersOptions}
        </select>

        <label htmlFor="postContent">Content:</label>
        <textarea 
        name="postContent" 
        id="postContent" 
        value={body}
        // oncontent change changes content state
        onChange={ onContentChange}
        />

        {/* runs our save posts click when our button is enables from can save */}
        <button type='button' onClick={onSavePostClicked} disabled={!canSave} >Save Post</button>
      </form>
    </section>
  )
}

export default AddPostForm