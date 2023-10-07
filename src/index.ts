import { ApolloServer } from '@apollo/server'
import { MikroORM } from '@mikro-orm/core'
import express from 'express'
import { buildSchema } from 'type-graphql'
import mikroOrmConfig from './mikro-orm.config'
import { HelloResolver } from './resolvers/hello'
const PORT = process.env.PORT || 3000
const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig)
  const em = orm.em.fork()
  await orm.getMigrator().up()
  const app = express()
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver],
      validate: false
    })
  })
  app.listen(PORT, () => {
    console.log(`server started on http://127.0.0.1:${PORT}`)
  })
}
main().catch(err => console.error('This err: ' + err))
