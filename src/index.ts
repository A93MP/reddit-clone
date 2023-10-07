import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { MikroORM } from '@mikro-orm/core'
import express, { json } from 'express'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import mikroOrmConfig from './mikro-orm.config'
import { HelloResolver } from './resolvers/hello'
import { PostResolver } from './resolvers/post'
import { MyContext } from './types'
const PORT = process.env.PORT || 3000
const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig)
  const em = orm.em.fork()
  await orm.getMigrator().up()
  const app = express()
  const apolloServer = new ApolloServer<MyContext>({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver],
      validate: false
    })
  })
  await apolloServer.start()
  app.use(
    '/graphql',
    json(),
    expressMiddleware(apolloServer, {
      context: async () => ({ em: em })
    })
  )
  app.listen(PORT, () => {
    console.log(`server started on http://127.0.0.1:${PORT}`)
  })
}
main().catch(err => console.error('This err: ' + err))
