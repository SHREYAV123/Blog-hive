import { ChangeEvent } from "react";
import { Link,useNavigate } from "react-router-dom";
import {  SignupInput } from "@shreyasahu/blog-hive-common";
import { useState } from "react";
import axios  from "axios";
import {BACKEND_URL} from "../config"




export const Auth = ({type}:{type:"signin" | "signup"}) => {
    const navigate=useNavigate()
    const [postInputs,setPostInputs ]= useState<SignupInput>({
         name:"",
        username:"",
        password:"",
    });
    
   

    async function  sendRequest(){
        try{
     const response=  await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup"?"signup":"signin"}`,postInputs)
     const jwt=response.data.jwt;
     localStorage.setItem("token",jwt)
     navigate("/blogs")
    }

catch(e){
    alert("Error while signing up");
    console.log(e);
    
}}



    
    return (
      <>
      
 <div className="flex flex-col justify-center h-screen bg-amber-50 ">
       <div className="flex justify-center">
        <div>
         <div className="px-10">
            <div className="text-4xl font-extrabold text-amber-950">
                Create An Account
            </div>  
            <div className="px-2 mt-2 font-bold text-1xl text-amber-500">{type==="signin"?"Don't have an account?" : "Already have an account? "}
                <Link to={type==="signin"?"/signup":"/signin"} className="pl-2 underline">{type==="signin"?"Sign up" : "Sign in"}</Link></div> 
    </div> 
    <div className="pt-8">
    {type==="signup" ? <LabelledInput label="Name" placeholder="shreya" onChange={(e)=>{
       setPostInputs({
        ...postInputs,
        name:e.target.value
       })
    }}/>:null}

<LabelledInput label="UserName" placeholder="shreya@gmail.com" onChange={(e)=>{
       setPostInputs({
        ...postInputs,
        username:e.target.value
       })
    }}/>
     <LabelledInput label="Password" type={"password"} placeholder="shreya123456" onChange={(e)=>{
       setPostInputs({
        ...postInputs,
        password:e.target.value
       })
    }}/>
    </div>
   
<div className="mt-6">
<button onClick={sendRequest}
  type="button"
  className="text-gray-300 bg-gray-800 font-semibold hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300  rounded-lg text-lg w-full px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
>
  {type==="signup" ? "Sign up" : "Sign in"}
</button>




</div>

    </div>
        
        </div>     
</div>
 </>
 );
}



interface labelledInputType{
    label:string,
    placeholder:string,
    onChange:(e: ChangeEvent<HTMLInputElement>)=>void,
    type?:string
}


function LabelledInput({label,placeholder,onChange,type}:labelledInputType){
    return(
        <div >
            <label  className="block pt-4 mb-2 text-sm font-bold text-gray-900 dark:text-amber-950">{label}</label>
            <input onChange={onChange} className=" text-gray-400 text-sm rounded-lg
             focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-600
              dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
               type={type||"text"} placeholder={placeholder} required />
            
            
            
         
            
            
        </div>);
}