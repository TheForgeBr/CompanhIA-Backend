import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { conversationRouter } from './routes/ConversationRoutes';
import { userRouter } from './routes/UserRoutes';
import { assistantRouter } from './routes/AssistantRoutes';
import { sessionRouter } from './routes/SessionRoutes';
import { friendRouter } from './routes/FriendRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/api/conversations', conversationRouter);
app.use('/api/users', userRouter);
app.use('/api/assistants', assistantRouter);
app.use('/api/sessions', sessionRouter);
app.use('/api/friends', friendRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
