const puppeteer = require('puppeteer')
const fs = require('fs')
const lang = require('./lang.json').languageCodes

async function dataCollectors() {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()

  console.log(lang.filter(el => el.code === 'an'))
  const i18n = []

  await page.goto('https://www.freelang.net/expressions/liberty.php')
  const length = await page.$$eval('tbody > tr', el => el.length)
  for (let i = 0; i < length; i++) {
    const actualCont = await page.evaluate(el => el.textContent.split(/\r?\n/), (await page.$$('tbody > tr'))[i])
    const actualObj = lang.filter(el => el.language.toLowerCase() === actualCont[0].toLowerCase())
    if (actualObj.length > 0) {
      actualObj[0].translation = actualCont[2]
      console.log(actualObj[0])
      i18n.push(actualObj[0])
    }
  }

  fs.writeFileSync('dataCollectors/lang_collected.json', JSON.stringify(i18n))

  await browser.close()
}
dataCollectors()
