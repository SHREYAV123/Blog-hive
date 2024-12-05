import { Hono } from 'hono'
import {cors} from 'hono/cors'
const app = new Hono() 

import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'


app.use('/*',cors());


app.route("/api/v1/user",userRouter);
app.route("/api/v1/blog",blogRouter);








export default app
