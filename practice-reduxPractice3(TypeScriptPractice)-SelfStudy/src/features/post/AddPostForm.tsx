import React from 'react'
import { useAppDispatch,useAppSelector} from '../../app/hook';

import { postAdded } from './postSlice';
import { selectAllUsers } from '../users/usersSlice';

const AddPostForm = () => {

  const [title, setTitle] = React.useState<string>('');
  const [content, setContent] = React.useState<string>('');
  const [userId, setUserId] = React.useState<string>('');

  const users = useAppSelector(selectAllUsers);
 
  const onTitleChanged = (e:React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const onContentChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);
  const onAuthorChanged = (e:React.ChangeEvent<HTMLSelectElement>) => setUserId(e.target.value)

  // we have to call useApp dispatch like this because useAppDispatch returns our dispatch function
  // so we cant call use app dispatch directly
  const dispatch = useAppDispatch()

  const onSavePostClicked = ():void => {
    if(title && content) {
      dispatch(
        postAdded(title,content,userId)
      )

      setTitle('');
      setContent('');
    }
  }

  const canSave = Boolean(title) && Boolean(content) && Boolean(userId)

  // mapping all out users we called at the top into an array of options
  const usersOptions:JSX.Element[] = users.map( user => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input 
        type="text" 
        id='postTitle'
        name='postTitle'
        value={title}
        onChange={onTitleChanged}
        />

        <label htmlFor="postAuthor">Author:</label>
        <select 
        value={userId} 
        id="postAuthor"
        onChange={onAuthorChanged}
        >
          <option value=""></option>
          {usersOptions}
        </select>

        <label htmlFor="postContent">Content:</label>
        <textarea 
        name="postContent" 
        id="postContent" 
        value={content}
        onChange={ onContentChange}
        />

        <button type='button' onClick={onSavePostClicked} disabled={!canSave} >Save Post</button>
      </form>
    </section>
  )
}

export default AddPostForm