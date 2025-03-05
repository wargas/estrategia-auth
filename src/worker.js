import { Worker } from "bullmq";
import { auth } from './auth.js';
import { bodyEmail } from "./body.js";
import { sendEmail } from './email.js';
import { connection } from "./redis.js";

const worker = new Worker('auth',
    async (job,) => {
        try {

            job.updateProgress('starting')
            const token = await auth(process.env.ESTRATEGIA_EMAIL, process.env.ESTRATEGIA_PASSWORD)

            job.updateProgress('sending email')
            await sendEmail(process.env.EMAIL_AUTH, bodyEmail(token))

            job.updateProgress('done')

            return token
        } catch (error) {
            throw error
        }
    },
    {
        connection,
        autorun: false
    }
);

worker.on('progress', (_, progress) => console.log(`fila: ${progress}`))
worker.on('failed', () => console.log('fila: failed'))
worker.on('ready', () => console.log('fila: ready'))

export { worker };
