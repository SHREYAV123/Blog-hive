import { Hono } from 'hono'
import { cors } from 'hono/cors'

// Routers
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'

const app = new Hono()

// 🌐 CORS Middleware (Prod + Local Dev)
app.use('/*', cors({
  origin: (origin) => {
    const allowedOrigins = [
      'https://blog-hive.vercel.app',
      'http://localhost:5173',
    ]
    if (!origin) return null // Important: block requests with no origin (e.g. curl)
    return allowedOrigins.includes(origin) ? origin : null
  },
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}))

// ✅ Optional: Helps with preflight debugging
app.options('/*', (c) => c.text('OK', 204))

// ✅ Mount routers
app.route('/api/v1/user', userRouter)
app.route('/api/v1/blog', blogRouter)

export default app
