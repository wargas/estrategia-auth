const chromium = require('chrome-aws-lambda');

(async () => {
    try {
        
        const browser = await chromium.puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath,
            headless: chromium.headless,
            ignoreHTTPSErrors: true,
        })

        let page = await browser.newPage();

        await page.goto('https://www.estrategiaconcursos.com.br/');

        const title = await browser.title();

        console.log(title)

    } catch (error) {
        console.log(error)        
    }
})();