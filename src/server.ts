import express from 'express'
import token_router from './entities/token/token.router'
import justify_router from './entities/justify/justify.router'

const app = express()

const port = process.env.PORT ?? 3000

app.use(express.text({ type: 'text/plain' }))
app.use(express.json())

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

app.use('/token', token_router)
app.use('/justify', justify_router)

// health check
app.get('/', (req, res) => {
  res.send('OK')
})
