import { auth } from "./auth.js";
import fastify from "fastify";
import { redis } from "./redis.js";

const app = fastify()

app.post('/auth', async (req, res) => {
    await auth('wargasteixeira@hotmail.com', 'Wrgs2703!');

    res.send({sucess: true})
})

app.get('/get', async (req, res) => {
    const data = await redis.get('auth:wargasteixeira@hotmail.com')

    res.send(data)
})

app.listen({
    port: 3000,
    host: '0.0.0.0',
})

console.log('rodando')