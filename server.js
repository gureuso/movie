const express = require('express')
const next = require('next')
    
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
    
app.prepare()
.then(() => {
  const server = express()

  server.get('/movies/:id', (req, res) => {
    const page = '/movie';
    const params = {id: req.params.id};
    app.render(req, res, page, params)
  });

  server.get('/theaters/:theater_id/showtimes/:showtime_id', (req, res) => {
    const page = '/theaters';
    const params = {
      theater_id: req.params.theater_id,
      showtime_id: req.params.showtime_id,
    };
    app.render(req, res, page, params)
  });

  server.get('/movies', (req, res) => {
    return handle(req, res)
  })
    
  server.get('*', (req, res) => {
    res.redirect('https://' + req.headers.host + req.url);
    //return handle(req, res)
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
