const puppeteer = require('puppeteer');

const calcAvarage = ()=>{}

const filterJunk = (el)=>{


      el.filter(item=>item !== null && item > 1)
}


scraper = async (name) => {
  const search = name
  const browser = await puppeteer.launch();
  const url = `https://phoenix.craigslist.org/search/sss?query=${search}&sort=rel`

  console.log(name);

  getPrices = async (url) => {
    const page = await browser.newPage();
    await page.goto(url);
    const val = await page.evaluate(() => {      
      
      prices = []
       Array.from(document.querySelectorAll('.result-row'))
            .map((val)=>{
              const price = val.querySelector('.result-price')
              if(price !== null){
                prices.push([parseInt(price.innerHTML.slice(1)),parseInt(val.dataset.pid)])
              }
            })
            return prices
          })
          return val
        }
        
        const prices = await getPrices(url)
        
        return prices
        
  await browser.close();
}

module.exports = scraper