import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"


export const Appbar=()=>{
    return(
       
        <div className="z-10 flex justify-between px-10 py-5 border-b">
        <Link className="flex flex-col justify-center cursor-pointer" to={`/blogs`}>Medium </Link>
        <div>
        <Link to={`/publish`}>
        <button type="button" className=" mr-5 text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200
         dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">New</button>
        <Avatar size="big" name="Shreya" />
        </Link>
        </div>
        </div>
       
        )
}