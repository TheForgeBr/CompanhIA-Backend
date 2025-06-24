import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { conversationRouter } from './routes/ConversationRoutes';
import { userRouter } from './routes/UserRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/api/conversations', conversationRouter);
app.use('/api/users', userRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
