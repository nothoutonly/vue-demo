let http = require("http");
let fs = require("fs");
let url = require("url");

// 获取轮播图 /sliders
let sliders = require('./sliders.js');

function read(cb) {
  // 回调函数解决readFile异步问题，也可直接用readFileSync
  fs.readFile("./book.json", "utf-8", function (err, data) {
    if (err || data.length === 0) {
      cb([]);
    } else {
      cb(JSON.parse(data));
    }
  });
}

// function write(){
// //   fs.writeFileSync();
// // };
const pageSize = 5;
http.createServer((req, res) => {
  // 跨域请求
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.setHeader("X-Powered-By", ' 3.2.1');
  if (req.method == "OPTIONS") return res.end();

  //pathname 路径 query请求的参数 true 把请求参数放在对象里
  let {pathname, query} = url.parse(req.url, true);

  // 获取轮播图数据
  if (pathname === '/sliders') {
    res.setHeader('Content-type', 'application/json;charset=utf-8');
    res.end(JSON.stringify(sliders));
    return;
  }
  // 获取热门图书
  if (pathname === "/hot") {
    read(function (books) {
      let hot = books.reverse().slice(0, 6);
      res.setHeader('Content-type', 'application/json;charset=utf-8');
      res.end(JSON.stringify(hot));
    });
    return;
  }
  // 对书的增删改查
  if (pathname === "/book") {
    let id = parseInt(query.id);
    switch (req.method) {
      case "GET":
        if (!isNaN(id)) { // 查询一个图书
          read(function (books) {
            let book = books.find(item => item.bookId === id);
            if (!book) book = {};
            res.setHeader('Content-type', 'application/json;charset=utf-8');
            res.end(JSON.stringify(book));
          })
        } else {// 获取所有图书
          read(function (books) {
            res.setHeader('Content-type', 'application/json;charset=utf-8');
            res.end(JSON.stringify(books.reverse()));
          })
        }
        break;
      case "PUT":
        if (id) {
          let str = '';
          req.on("data", chunk => {
            str += chunk;
          });
          req.on("end", () => {
            let book = JSON.parse(str);
            read(function (books) {
              books = books.map(item => {
                if (item.bookId === id) {// 找到id相同的那本书
                  return book;
                }
                return item;// 其他书正常返回即可
              });
              fs.writeFileSync("./book.json", JSON.stringify(books), "utf-8");
              res.end(JSON.stringify(book));
            });
          });
        }
        break;
      case "POST":
        let str = '';
        req.on("data", chunk => {
          str += chunk;
        });
        req.on("end", () => {
          let book = JSON.parse(str);
          read(function (books) {
            book.bookId = books.length > 0 ? books[books.length - 1].bookId + 1 : 1;
            books.push(book);
            fs.writeFileSync("./book.json", JSON.stringify(books), "utf-8");
            res.end(JSON.stringify(book));
          })
        });
        break;
      case "DELETE":
        read(function (books) {
          books = books.filter(item => item.bookId !== id);
          fs.writeFileSync("./book.json", JSON.stringify(books), "utf-8");
          res.setHeader('Content-type', 'application/json;charset=utf-8');
          res.end();
        });
        break;
    }
    return;
  }
  //
  if (pathname === "/page") {
    let offset = parseInt(query.offset) || 0;
    read(function (books) {
      let result = books.reverse().slice(offset, offset + pageSize);
      let hasMore = true;
      if (offset + pageSize >= books.length) {
        hasMore = false;
      }
      res.setHeader('Content-type', 'application/json;charset=utf-8');
      res.end(JSON.stringify({hasMore, books: result}));
    });
    return
  }

  // 静态服务
  fs.stat("." + pathname, function (err, stats) {
    if (err) {
      res.statusCode = 404;
      res.end("NOT FOUND");
    } else {
      if (stats.isDirectory()) {
        let p = require("path").join("." + pathname+"./index.html");
        fs.createReadStream(p).pipe(res);
      } else {
        fs.createReadStream("." + pathname).pipe(res);
      }
    }
  });
}).listen(300, ()=>{
  console.log("300端口被占用");
});















