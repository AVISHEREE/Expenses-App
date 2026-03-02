import express from 'express';
import { userRoutes } from './router/user.router.js';
import { expenseRouter } from './router/expense.router.js';
import { refreshRefreshToken } from './controller/user.controller.js';
import dotenv from 'dotenv';
import cors from 'cors';

// BUG FIX #5: path was './env' — should be './.env'
dotenv.config({ path: './.env' });

const app = express();

app.use(express.json());

// BUG FIX #6: cors() with no config allows all origins — fine for dev,
// but add your Vercel URL here for production security.
app.use(cors());

app.get('/', (req, res) => {
    res.send("Expense App API is running ✅");
});

app.use('/v1/user', userRoutes);
app.use('/v1/expense', expenseRouter);
app.post('/v1/refresh', refreshRefreshToken);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`✅ Server listening on port ${PORT}`);
});cd