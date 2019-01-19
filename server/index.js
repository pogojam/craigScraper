const express = require('express')
const {ApolloServer,gql} = require('apollo-server-express')
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient
const port = 3001
const app = express()
const trackedProducts = require('./collections/trackedProducts').trackedProducts
const scraper = require('./scraper')

var exports = module.exports = {}

var db

const schema = gql`
type Query {
    Products:[Product]
}

type Mutation {
  search(name:String): Product,
  removeProduct(name:String):Product
}

type Product {
  name:String,
  prices: [String],
  id:[String],
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
          const productsDB = db.collection('products')
          let avgSell = 0
          let buy = 0
          let sell = 0

          const getAvgPrice = (val)=>{
            let num = 0
            val.forEach(element => {
                num = num+element                
            });
            return Math.floor(num/val.length)
        }

          scrapeData.map((val)=>{ 
            prices.push((val[0]));
            ID.push(val[1])
        })

        avgSell = getAvgPrice(prices)
        
        buy = Math.floor(avgSell-(avgSell*.3))
        sell = avgSell

        
        const results = {
          prices: prices,
          name:name,
          id:ID,
          avgSell:avgSell,
          buy:buy,
          sell:sell,
        }
        
        productsDB.insertOne(results)

        return results;
      },
      removeProduct(obj,{name}){
        const productsDB = db.collection('products')
        productsDB.remove({name:name})
        return name
      }
    },
 Query:{
  async Products(){         
    console.log('fire');
    
 return db.collection('products').find().toArray()
      
      }
    }
  };


const server = new ApolloServer({
    typeDefs:schema,resolvers
})


app.use(cors())

server.applyMiddleware({ app, path: '/graphql' });

MongoClient.connect('mongodb://pogojam:Cocojam1@cluster0-shard-00-00-9grvn.mongodb.net:27017,cluster0-shard-00-01-9grvn.mongodb.net:27017,cluster0-shard-00-02-9grvn.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true',{useNewUrlParser:true},(err,client)=>{

if(err){
  return console.log(err)
}

console.log('DB up');
db = client.db('scraperDB')

  app.listen(port,() => {
    console.log(`running on ${port}`);    
})

})

exports.db = db