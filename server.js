const express = require('express')
const next = require('next')
const fs = require('fs')

let config = JSON.parse(fs.readFileSync('config.json'))

const dev = config.APP_MODE !== 'production'
console.log('> is_dev: '+dev)
const app = next({ dev })
const handle = app.getRequestHandler()
    
app.prepare()
.then(() => {
  const server = express()

  server.get('/movies/:id', (req, res) => {
    const page = '/movie'
    const params = {id: req.params.id}
    app.render(req, res, page, params)
  })

  server.get('/theaters/:theater_id/showtimes/:showtime_id', (req, res) => {
    const page = '/theaters'
    const params = {
      theater_id: req.params.theater_id,
      showtime_id: req.params.showtime_id
    }
    app.render(req, res, page, params)
  })
    
  server.get('*', (req, res) => {
    return handle(req, res)
  })
    
  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})
