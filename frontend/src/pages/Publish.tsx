import { Appbar } from "../component/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
  const [title,SetTitle]=useState("");
  const [content,SetContent]=useState("");
  const navigate=useNavigate()
  

  return (
    <div>
      <Appbar />
      <div className="flex justify-center w-full pt-8">
        <div className="w-full max-w-screen-lg">
      
    <div className="max-w-4xl p-6 mx-auto rounded-lg shadow-md bg-gray-50">
      <h2 className="mb-4 text-2xl font-bold text-gray-800">Write Your Blog</h2>
      <div className="mb-4">
        <input onChange={(e)=>{
                SetTitle(e.target.value);
        }}
          id="title"
          type="text"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
          placeholder="Enter your blog title"
        />
      </div>
      <div className="mb-6">
        <textarea onChange={(e)=>{
                SetContent(e.target.value);
        }}
          id="content"
          className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:outline-none"
          placeholder="Write your blog content here..."
        />
      </div>
      <button onClick={async()=>{
        const response=await axios.post(`${BACKEND_URL}/api/v1/blog`,{
                title,content},
        {
                headers:{Authorization:localStorage.getItem("token")
        }}
        )
                navigate(`/blog/${response.data.id}`)
        }
      } className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white focus:ring-4 focus:outline-none focus:ring-pink-200">
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
          Publish Post
        </span>
      </button>
    </div>



        </div>
      </div>
    </div>
  );
};

