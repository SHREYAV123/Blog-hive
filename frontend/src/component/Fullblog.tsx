import { Appbar } from "./Appbar"
import { Blog } from "../hooks"
import { Avatar } from "./BlogCard"

export const Fullblog=({blog}:{blog:Blog})=>{
    return(<div>
        <Appbar/>
        <div className="flex justify-center">
        <div className="grid w-full grid-cols-12 px-12 pt-5 max-screen-xl">
            <div className="col-span-8 ">
              <div className="text-2xl font-extrabold sm:text-5xl">
                {blog.title}
              </div>
              <div className="pt-5 mt-2 text-xl font-light leading-relaxed text-slate-900 font-handwriting sm:text-2xl ">
          {blog.content}
          </div>



             
            </div>
            
            <div className="hidden col-span-4 lg:block">
                <div className="text-lg text-slate-600">
                Author  
                </div>
           
                <div className="flex w-full">
                    <div className="flex flex-col justify-center pr-4">
                    <Avatar name={blog.author.name} size="big" />
                    </div>
                    <div>
                  
                <div className="text-xl font-bold">{blog.author.name}</div>
            <div className="pt-2 text-slate-500">At Blog-Hive, our authors craft engaging stories and share valuable insights to inspire and inform readers, creating a hive of knowledge for all.</div>
                </div>  
                    </div>
                </div>
                
        </div>
        </div>
        </div>)
}