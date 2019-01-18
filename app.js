const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const path = require('path')
const serveStatic = require('serve-static')
const webpack = require('webpack')
const webpackMiddleware = require('webpack-dev-middleware')
const cookie = require('cookie-parser')
const compression = require('compression')

const config = require('./config')
const webpackConfig = require('./webpack.config')
const setupBasicAuth = require('./lib/setup-basic-auth')
const Manager = require('./lib/manager')
const Missions = require('./lib/missions')
const Mods = require('./lib/mods')
const Logs = require('./lib/logs')
const Settings = require('./lib/settings')
const Login = require('./lib/login')

const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const webpackCompiler = webpack(webpackConfig)

app.use(compression())
app.use(webpackMiddleware(webpackCompiler, {
  publicPath: webpackConfig.output.publicPath
}))

// setupBasicAuth(config, app)
const login = new Login(config)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookie())

morgan.token('user', function (req) { return req.auth ? req.auth.user : 'anon' })
app.use(morgan(config.logFormat || 'dev'))

app.get('/', async function (req, res) {
  if (await login.is_signed_in(req) === false) {
    res.redirect(302, '/login')
  } else {
    res.sendFile(path.join(__dirname, './public/index.html'))
  }
})

app.get('/login', async function (req, res) {
  if (await login.is_signed_in(req) === false) {
    res.sendFile(path.join(__dirname, './public/login.html'))
  } else {
    res.redirect(302, '/')
  }
})

app.use(serveStatic(path.join(__dirname, 'public'), { maxAge: '60 seconds' }))

const logs = new Logs(config)

const manager = new Manager(config, logs)
manager.load()

const missions = new Missions(config)
const mods = new Mods(config)
mods.updateMods()

const settings = new Settings(config)

app.use('/api/logs', require('./routes/logs')(logs))
app.use('/api/missions', require('./routes/missions')(missions))
app.use('/api/mods', require('./routes/mods')(mods))
app.use('/api/servers', require('./routes/servers')(manager, mods))
app.use('/api/settings', require('./routes/settings')(settings))
app.use('/api/login', require('./routes/login')(login))

io.on('connection', function (socket) {
  socket.emit('missions', missions.missions)
  socket.emit('mods', mods.mods)
  socket.emit('servers', manager.getServers())
  socket.emit('settings', settings.getPublicSettings())
})

missions.on('missions', function (missions) {
  io.emit('missions', missions)
})

mods.on('mods', function (mods) {
  io.emit('mods', mods)
})

manager.on('servers', function () {
  io.emit('servers', manager.getServers())
})

server.listen(config.port, config.host)
