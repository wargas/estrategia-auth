import puppeteer from "puppeteer-core"
import { redis } from "./redis.js";



export function auth(email, pass) {
    return new Promise(async (acc, rej) => {
        const browser = await puppeteer.connect({
            browserWSEndpoint: 'wss://browser.deltex.com.br?token=6e88ebf3f086e25d'
        })

        const page = await browser.newPage();

        await page.goto('https://perfil.estrategia.com/login?source=legado-polvo&target=https%3A%2F%2Fwww.estrategiaconcursos.com.br%2Faccounts%2Flogin%2F%3Fgoto%3Dhttps%3A%2F%2Fwww.estrategiaconcursos.com.br%2Fapp%2Fdashboard%2Fcursos')

        page.on('response', async res => {
          if(res.url().includes('oauth/token')) {
            const token = await res.json()

            token.data = (new Date()).toJSON()
            acc(token)
            await redis.set('auth:'+email, JSON.stringify(token))
          }
        })
      
        await page.waitForSelector('[type=email]')
      
        await page.type('[type=email]', email)
      
        await page.type('[type=password]', pass)
        
        await page.click('[data-cy=registerButton]')
      
        await page.waitForSelector('.Sidebar');
    })
}