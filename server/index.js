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

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))
app.use(express.json())

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

const routes = (app) => {
    app.use('/api/auth', authRouter)
    app.use('/api/department', departmentRouter)
    app.use('/api/employee', employeeRouter)
    app.use('/api/leave', leaveRouter)
    app.use('/api/salary', salaryRouter)

    // Also mount without /api prefix in case Vercel rewrites strip it
    app.use('/auth', authRouter)
    app.use('/department', departmentRouter)
    app.use('/employee', employeeRouter)
    app.use('/leave', leaveRouter)
    app.use('/salary', salaryRouter)
}

routes(app);

app.get(['/api/test', '/test'], (req, res) => {
    res.json({
        message: "Server is running correctly!",
        originalUrl: req.originalUrl,
        url: req.url,
        baseUrl: req.baseUrl,
        path: req.path
    });
});

const PORT = process.env.PORT || 5000;

// Only start the server if we're not in a Vercel environment (or if running directly)
// Vercel expects the app to be exported
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}

export default app;
