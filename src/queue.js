import { Queue } from 'bullmq';
import { connection } from './redis.js';



export const authQueue = new Queue('auth', { connection });

