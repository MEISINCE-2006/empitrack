import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRouter from './routes/auth.js'
import departmentRouter from './routes/department.js'
import employeeRouter from './routes/employee.js'
import leaveRouter from './routes/leave.js'
import salaryRouter from './routes/salary.js'
import connectToDatabase from './db/db.js'

connectToDatabase()
dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/department', departmentRouter)
app.use('/api/employee', employeeRouter)
app.use('/api/leave', leaveRouter)
app.use('/api/salary', salaryRouter)

const PORT = process.env.PORT || 5000;

// Only start the server if we're not in a Vercel environment (or if running directly)
// Vercel expects the app to be exported
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}

export default app;
