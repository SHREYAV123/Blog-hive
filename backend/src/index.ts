import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()

import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'


app.use('/*', cors({
  origin: 'https://blog-hive.vercel.app/', // ← Replace this with your actual frontend URL
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}))

app.route("/api/v1/user", userRouter)
app.route("/api/v1/blog", blogRouter)

export default app
