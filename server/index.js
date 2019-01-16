const express = require('express')
const {ApolloServer,gql} = require('apollo-server-express')
const cors = require('cors')
const port = 3001
const app = express()

const scraper = require('./scraper')


const schema = gql`
type Query {
    Product:Product
}

type Mutation {
  search(name:String): Product
}

type Product {
  prices: [String]!,
  id:[String]!,
  avgSell:String,
  buy:String,
  sell:String
}
`;

const resolvers = {
    Mutation: {
     async search(obj,{name}){
          
          const scrapeData = await scraper(name)
          const prices = [];
          const ID =[] ;
          let avgSell = 0
          let buy = 0
          let sell = 0

          const getAvgPrice = (val)=>{
            let num = 0
            val.forEach(element => {
                
                num = num+element                
            });
                console.log(num);
                
            return num/val.length
        }

          scrapeData.map((val)=>{ 
            prices.push(val[0]);
            ID.push(val[1])
        })

        avgSell = getAvgPrice(prices)
        
        buy = avgSell-(avgSell*.3)
        sell = avgSell
        
        return {
          prices: prices,
          id:ID,
          avgSell:avgSell,
          buy:buy,
          sell:sell,
        };
      },
    },
  };


const server = new ApolloServer({
    typeDefs:schema,resolvers
})


app.use(cors())



server.applyMiddleware({ app, path: '/graphql' });


app.listen(port,() => {
    console.log(`running on ${port}`);
    
})