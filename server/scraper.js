const puppeteer = require('puppeteer');

const calcAvarage = () => {}

const filterJunk = (el) => {
  el.filter(item => item !== null && item > 1)
}

// Scrapper Logic

scraper = async (name) => {
  const search = name
  
  const getPrices = async (url) => {

    const page = await browser.newPage();
    await page.goto(url);
        
    const pricesOnPage = await page.evaluate(() => {
      prices = []
      Array
      .from(document.querySelectorAll('.result-row'))
      .map((val) => {
        const price = val.querySelector('.result-price')
        if (price !== null) {
          prices.push([
            parseInt(price.innerHTML.slice(1)),
            parseInt(val.dataset.pid)
          ])
        }
      })
      return prices
    })
    await browser.close();
   
    // Scrapper Recursion for multipage results 
    
    if(pricesOnPage.length < 1){
      return pricesOnPage
    }
    else{
      let pageNum = parseInt(url.match(/s=(\d+)/))

      pageNum?(pageNum += 120):(pageNum = 120);

      const newUrl = url+`&s=${pageNum}`

      console.log('going to ',newUrl);
      
      return await pricesOnPage.concat(getPrices(newUrl))
    }
  }
  
  const browser = await puppeteer.launch();
  const initalUrl = `https://phoenix.craigslist.org/search/sss?query=${search}&sort=rel`
  const prices = await getPrices(initalUrl)

  return prices

}

module.exports = scraper