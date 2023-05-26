const Router = require('koa-router')
const { Home, Hello, Login, Signin, Save, Register, AddUser } = require('../controllers/home')

const router = new Router()

router.get('/', Home)
router.get('/hello/:name', Hello)
router.get('/login', Login)
router.post('/signin', Signin)
router.get('/save', Save)
router.get('/register', Register)
router.post('/addUser', AddUser)

module.exports = router