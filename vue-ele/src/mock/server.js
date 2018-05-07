let express = require('express')

let app = express()

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

let {seller, goods, ratings} = require('./data.json')
let apiRoutes = express.Router()

apiRoutes.get('/seller', (req, res)=>{
  res.json({
    errnum: 0,
    data: seller
  })
})
apiRoutes.get('/goods', (req, res)=>{
  res.json({
    errnum: 0,
    data: goods
  })
})
apiRoutes.get('/ratings', (req, res)=>{
  res.json({
    errnum: 0,
    data: ratings
  })
})
app.use('/api', apiRoutes)
app.listen(30)


