import { Link } from "react-router-dom"

interface BlogCardProps{
    id: number|string,
    title: string,
    content:string,
    authorName:string,
    publishedDate:string
}





export const BlogCard=({
    id,
   title,
   content,
   authorName,
   publishedDate
}:BlogCardProps)=>{
    return(<Link to={`/blog/${id}`}>
        <div className="w-screen max-w-screen-md p-4 pb-4 border-b cursor-pointer border-slate-200">
            <div className="flex ">
                <div className="flex flex-col justify-center">
              <Avatar name={authorName} size="small"></Avatar>
              </div> 
                <div className="flex flex-col justify-center pl-2 text-sm font-light">
                {authorName}
                </div> 
                <div className="flex flex-col justify-center pl-2">
                 <Circle></Circle>
                </div>
                <div className="flex flex-col justify-center pl-2 text-sm font-extralight text-slate-400"> 
                {publishedDate}
                </div>
            </div>
            <div className="pt-2 text-xl font-bold">
                {title}
            </div>
            <div className="font-thin text-md">
                {content.slice(0,100) + "..."}
            </div>
            <div className="text-sm font-thin text-slate-500">
                {`${Math.ceil(content.length/100)} minutes(s) read`}
            </div>
            
        </div>
        </Link>)
}
function Circle(){
    return <div className="w-1 h-1 rounded-full bg-slate-400"/>
}

export function Avatar({name,size="small"}:{name :string,size?:"small" | "big"}){
    return <>
    
<div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full ${size==="small" ? "h-5 w-5":"h-10 w-10" } dark:bg-gray-600`}>
    <span className={`${size==="small"?"text-sm" :"text-lg"} text-gray-600 dark:text-gray-300`}>{name[0]}</span>
</div>

    </>
}