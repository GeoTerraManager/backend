import express from 'express'
import { UserDTO } from './models/UserDTO'
import UserServiceMongo from './services/UserServiceMongo'
// import routes from './routes'

const app = express()
const service = new UserServiceMongo()

app.use(express.json())
// app.use(routes)

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.listen(3000, async () => {
  console.log('Server running on port 3000.')

  const user = new UserDTO()
  user.email = 'teste'
  user.nome_completo = 'otavio'
  user.nome_de_usuario = 'otavio.teste'
  user.senha = '1234'

  await service.createUser(user)
})
