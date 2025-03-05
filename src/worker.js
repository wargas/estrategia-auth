import { Worker } from "bullmq";
import { auth } from './auth.js';
import { sendEmail } from './email.js';
import { connection } from "./redis.js";

const worker = new Worker('auth',
    async (job,) => {
        try {

            job.updateProgress('starting')
            const token = await auth(process.env.ESTRATEGIA_EMAIL, process.env.ESTRATEGIA_PASSWORD)

            job.updateProgress('sending email')
            await sendEmail(process.env.EMAIL_AUTH, `
        <a href="${process.env.URL_AUTH}?acess_token${token.access_token}&id=${token.session_id}">Acessar</a>    
        `)

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
