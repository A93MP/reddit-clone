import { MikroORM } from '@mikro-orm/core'
import express from 'express'
import mikroOrmConfig from './mikro-orm.config'
const PORT = process.env.PORT || 3000
const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig)
  const em = orm.em.fork()
  await orm.getMigrator().up()
  const app = express()
  app.get('/', (_, res) => {
    res.send('Hello World from express')
  })
  app.listen(PORT, () => {
    console.log(`server started on http://127.0.0.1:${PORT}`)
  })
}
main().catch(err => console.error('This err: ' + err))
