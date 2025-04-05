import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {sign,verify} from 'hono/jwt'
import { signinInput,signupInput } from '@shreyasahu/blog-hive-common'


export const userRouter=new Hono<{
    Bindings:{
      DATABASE_URL:string,
      JWT_SECRET:string
    }
  }>  


  userRouter.post('/signup', async (c) => {  
    const body=await c.req.json()
    const {success}=signupInput.safeParse(body)
    if(!success) 
      { c.status(411);
        return c.json({error:'Invalid inputs'})}
    const prisma = new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
  
  try{
    
  const user=await prisma.user.create({
    data: {
      username:body.username,
     password:body.password,
     name:body.name 
    }
  })
  
  const token=await sign({id:user.id},c.env.JWT_SECRET);
  
  c.text("hello")
    return c.json({
      jwt:token
    })}
    catch (e) {
      console.log("Signup body:", body);

      console.error("Signup error:", e);  // 🔍 Shows exact Prisma or DB error
      c.status(403);
      return c.json({ error: "Error while signup" });
    }
  }
  );
  
  
  
  userRouter.post('/signin', async(c) => {
    const prisma=new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body=await c.req.json()
    const {success}=signinInput.safeParse(body)
    if(!success) 
      { c.status(411);
        return c.json({error:'Invalid inputs'})}
   
    const user=await prisma.user.findFirst({where:{username:body.username,
      password:body.password}})
    
    if(user){
    const token=await sign({id:user.id},c.env.JWT_SECRET);
    return c.json({
      jwt:token
    })}
    else{
     
        c.status(403);
        return c.json({ error: "user not found" });
      
    }
  
  }
  );