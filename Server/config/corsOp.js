
const originOptions = ['http://localhost:5173','https://blog-hub-five-two.vercel.app']
var corsOptions = {
  origin: function (origin, callback) {
    if (originOptions.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

module.exports = originOptions