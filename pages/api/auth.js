import chromium from 'chrome-aws-lambda';
import puppeteer from 'puppeteer-core';

export default async function handler(req, res) {

    const {email, password} = req.body;

    if(!email || !password) {
        res.send({message: 'email ou senha invalidos'})
    }

    try {
        const isDev = !process.env.AWS_REGION;
        let options;

        if (isDev) {
            options = {
                args: [],
                executablePath: "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
                headless: true,
                ignoreHTTPSErrors: true,
            }
        } else {
            options = {
                args: chromium.args,
                executablePath: await chromium.executablePath,
                headless: true,
                ignoreHTTPSErrors: true,
            }
        }

        const browser = await puppeteer.launch(options);
        
        let page = await browser.newPage();

        // page.on('request', request => {
        //     const url = request.url();

        //     if(request.method() === 'GET' && url.match('api/aluno/curso')) {

        //         const {authorization: token = ''} = request.headers()

        //         res.send({token})
        //     }

        //     if(url.match('loja/entrar')) {
        //         res.send({message: 'email ou senha invalidos'})
        //     }
        // })

        await page.goto('https://www.estrategiaconcursos.com.br/');

        await page.click('.button-header');
        await page.type('[name=email]', email)
        await page.type('[name=senha]', password)

        await page.click('.ui-control [type=submit]')
        
        await page.waitForNavigation();
       
        await page.goto('https://www.estrategiaconcursos.com.br/oauth/token/')

        await page.screenshot({path: 'screenshot.png', type: 'png'});

        const body = await page.evaluate(() => {
            return {
                body: document.body.textContent
            }
        })

        res.send(body.body)

    } catch (error) {
        console.log(error)
        res.send(JSON.stringify(error))
    }


}