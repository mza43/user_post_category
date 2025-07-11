const express = require('express')
const { connectDB } = require('./config/db')
const userRoutes = require('./routes/users')
const postRoutes = require('./routes/posts')
const settingRoutes = require('./routes/settings')

const app = express()
const port = 3000
app.use(express.json())

connectDB()

app.use('/api/users', userRoutes)

app.use('/api/posts', postRoutes)
const categoryRoutes = require('./routes/categories')
app.use('/api/categories', categoryRoutes)
app.use('/api/settings', settingRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`)
})
