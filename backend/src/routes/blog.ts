import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {sign,verify} from 'hono/jwt'
import { createBlogInput,updateBlogInput } from '@shreyasahu/blog-hive-common'

export const blogRouter=new Hono<{
    Bindings:{
      DATABASE_URL:string,
      JWT_SECRET:string
    },
    Variables:{
      userId:string
    }
  }>  



  blogRouter.use('/*', async (c,next)=>{


    const header = await c.req.header("authorization")||"";
   
    if(!header){
      c.status(403);
      return c.json({error:"Unauthorized"})
    }
    try{
      
    const user =await verify(header, c.env.JWT_SECRET) as {id:string};
      if(user){
      c.set("userId",user.id);
        return  next()
    
    
      }
      else{ c.status(401);
        return c.json({error:"Error you are not logged in"});
      }
    }
      catch(e:any){
       console.log(e.name)
          if (e.name === 'TokenExpiredError') {
            c.status(401);
            return c.json({ error: 'Token has expired' });
          }
        
          if (e.name === 'JsonWebTokenError') {
            c.status(401);
            return c.json({ error: 'Invalid token' });
          }
        
       
        c.status(411);
        return c.json({error:"Error you are not logged in"});}
     
    
      
  })

  blogRouter.post('/', async(c) => {
  
    const body=await c.req.json()
    const {success}=createBlogInput.safeParse(body)
    if(!success) 
      { c.status(411);
        return c.json({error:'Invalid inputs'})}
    
  const authorId=c.get("userId");
  console.log("Author ID:", authorId);
  if (!authorId || isNaN(Number(authorId))) {
    c.status(400);
    return c.json({ error: "Invalid author ID" }); // Check if authorId is valid
  }
    const prisma = new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL,
  }).$extends(withAccelerate())


 const blog=await prisma.blog.create({data:{

    title:body.title,
    content:body.content,
    authorId:Number(authorId)
}})
    return c.json({id:blog.id});
  }
  );
  
  
  blogRouter.put('/', async(c) => {
    const body=await c.req.json()
    const {success}=updateBlogInput.safeParse(body)
    if(!success) 
      { c.status(411);
        return c.json({error:'Invalid inputs'})}

    const prisma = new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL,
  }).$extends(withAccelerate())

 const blog=await prisma.blog.update({
  where:{
    id:body.id,
  },
  
  data:{

    title:body.title,
    content:body.content,
    
}})
    return c.json({id:blog.id});
  }
  
  );
  
  blogRouter.get('/bulk', async(c) => {

    const prisma = new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL,
  }).$extends(withAccelerate())

const blogs=await prisma.blog.findMany({
  select:{
    id:true,
    title:true,
    content:true,
    author:{
      select:{
        name:true
    }
  }
}});
return c.json({blogs});
  
  }
  );
  
  blogRouter.get('/:id', async(c) => {
    const id=await c.req.param("id")
    const prisma = new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL,
  }).$extends(withAccelerate())
try{
 const blog=await prisma.blog.findFirst({
  where:{
      id:Number(id),
 },
 select:{
  id:true,
  title:true,
  content:true,
  author:{
    select:{
      name:true
    }
 }}
})
    return c.json({blog});
  }
  catch(e){
   c.status(411)
   return  c.json({message:"Error while fetching blog post"})
    } 
    }
  );
  
  
  
  