import { Spinner } from "../component/Spinner";
import { Fullblog } from "../component/Fullblog";
import { useBlog } from "../hooks"
import { useParams } from "react-router-dom";
import { Appbar } from "../component/Appbar";

export const Blog=()=>{
const {id}=useParams();
const {loading,blog}=useBlog({id:id || ""});
if(loading || !blog){
    return <div><Appbar></Appbar><div className="flex flex-col justify-center h-screen"><div className="flex justify-center pb-10 "><Spinner></Spinner></div></div></div>
    }else{
        return <div>
            {blog ? <Fullblog blog={blog} /> : <p>Blog not found</p>}
            </div>
}}