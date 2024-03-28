// import our api functions that fets our base todos
import {
    useGetTodosQuery,
    useAddTodoMutation,
    useUpdateTodoMutation,
    useDeleteTodoMutation
} from '../api/apiSlice';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import React from "react";

// create type for our todos 
export type todo = {
    id: string
    userId: number,
    title: string,
    completed:boolean
}



const TodoList = () => {
    const [newTodo, setNewTodo] = React.useState<string>('');

    // need to specify this data
    // data we are deconstructing with our query
    const  {
        data: todos,
        isLoading,
        isSuccess,
        isError,
        error
        // all this comes from rtk query
    }  = useGetTodosQuery();

    // to see what we get back when we call use get todos query
    const test = useGetTodosQuery();
    console.log("useGetTodosQuery:",test);

    // rename our mutations
    const [addTodo] = useAddTodoMutation();
    const [updateTodo] = useUpdateTodoMutation();
    const  [deleteTodo] = useDeleteTodoMutation();

    // our handle submit for when we end our input
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        // prevent reload
        e.preventDefault();
        // make sure we have data
        if (todos) {
            // provide an id
            const id = todos?.length+5;
            // pass our todo to add todo which then will post to the endpoint
            addTodo({id: String(id),userId:1, title:newTodo, completed:false});
            // reset our todo field
            setNewTodo('');
        }
    }
    
    // create a section form
    const newItemSection: JSX.Element = 
    (
        // create a form and trigger our handle submit function
        <form onSubmit={handleSubmit}>
            {/* enter todo */}
            <label htmlFor="new-todo">Enter a new todo item</label>
            <div className="new-todo">
                {/* input to house our todo name and allows user to enter it */}
                <input 
                type="text"
                id="new-todo"
                // bind our state
                value={newTodo}
                onChange={(e:React.ChangeEvent<HTMLInputElement>)=> setNewTodo(e.target.value)}
                placeholder="Enter new todo"
                />
            </div>
            <button className="submit">
                {/* calling our font awesome */}
                <FontAwesomeIcon icon={faUpload} />
            </button>
        </form>
    )

    // our content car
    let content;
    if(isLoading) {
        // create a loading screen
        content = <p>Loading ... </p>
    } else  if (isSuccess) {
        // if successful we take our todos and map through
        content = todos.map((todo:todo) =>{
            return (
                // for each map we print an article with our todo
                <article key={todo.id}>
                    <div className='todo'>
                        <input 
                        type="checkbox" 
                        // asign our check box true or false based on what our current completed is
                        checked={todo.completed}
                        // give an id
                        id={todo.id}
                        // trigger update todo when our input box changes
                        // spread our todo and pass our oposite value of todo when triggers
                        onChange={()=> updateTodo({...todo, completed:!todo.completed})}
                        />
                        <label htmlFor={todo.id}>{todo.title}</label>
                    </div>
                    {/* trash will trigger our delete and pass an id so rtk knows where to target */}
                    <button className='trash' onClick={()=> deleteTodo({id: todo.id})}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </article>
            )
        })
    } else if (isError) {
        // if error
        // log our error
        console.log(error);
        content = <div>An error has occurred!</div>
    }


    return (
        <main>
            {/* display everything */}
            <h1>Redux Todo List</h1>
            {newItemSection}
            {content}
        </main>
    )
};

export default TodoList;