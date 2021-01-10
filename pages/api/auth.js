import chromium from 'chrome-aws-lambda';
import puppeteer from 'puppeteer-core';

export default async function handler(req, res) {
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

        await page.goto('https://www.estrategiaconcursos.com.br/');

        const title = await page.title();

        res.send({ name: title })

    } catch (error) {
        console.log(error)
        res.send(JSON.stringify(error))
    }


}