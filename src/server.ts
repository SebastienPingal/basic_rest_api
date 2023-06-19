import express from 'express'
import token_router from './entities/token/token.router'

const app = express()
app.use(express.json());

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})

// TODO integrate this => app.use(express.json())

app.use('/token', token_router)