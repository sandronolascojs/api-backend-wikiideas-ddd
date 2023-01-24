import app from './app'

app.listen(Number(process.env.PORT), () => {
  console.log(`Server started on port ${Number(process.env.PORT)}`)
})
