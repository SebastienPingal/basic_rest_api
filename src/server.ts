import express from 'express'
import token_router from './entities/token/token.router'
import justify_router from './entities/justify/justify.router'
import my_passport from './utils/passport.config'

const app = express()

app.use(express.text({ type: 'text/plain' }))
app.use(express.json());

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})

app.use('/token', token_router)
app.use('/justify', justify_router) 