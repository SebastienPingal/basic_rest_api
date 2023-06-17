import express from 'express'
import user_router from './entities/user/token/token.router'

const app = express()
    
app.listen(3000, () => {
    console.log('Server is running on port 3000')
})

// TODO integrate this => app.use(express.json())

app.use('/user', user_router)