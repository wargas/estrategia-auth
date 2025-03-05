import fastify from "fastify";
import { authQueue } from "./queue.js";
import { worker } from "./worker.js";


const app = fastify()

app.get('/auth', async (_, res) => {
    await authQueue.add('auth', 1);
    res.send({ sucess: true })
})

app.post('/auth', async (_, res) => {
    await authQueue.add('auth', 1);
    res.send({ sucess: true })
})

app.listen({
    port: 3000,
    host: '0.0.0.0',
})


worker.run()

console.log('rodando...')


