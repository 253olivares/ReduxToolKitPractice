import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { increaseCount, getCounter } from "../features/post/postSlice";

const Header =() => {

    const dispatch = useAppDispatch();
    const count: number= useAppSelector(getCounter);



    return (
        <header className="z-5 w-full flex flex-row justify-between items-center shadow-3xl bg-skyBlue  px-8 py-6 mb-8 ">
            <h1 className="text-5xl text-white font-bold">Redux Blog</h1>
            <nav className="flex flex-row space-x-8 text-2xl text-white">
                <ul className="flex flex-row space-x-5 ">
                    <li><Link to="/" >Home</Link></li>
                    <li><Link to="post">Post</Link></li>
                    <li><Link to="user">Users</Link></li>
                </ul>
                <button
                    onClick={()=> dispatch(increaseCount())}>
                    {count}
                </button>
            </nav>
        </header>
    )
}

export default Header