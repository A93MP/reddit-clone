import { MikroORM } from '@mikro-orm/core'
import { __prod__ } from './constants'
import { Post } from './entities/Post'
const main = async () =>{
  const orm = await MikroORM.init({
    entities :[Post],
    dbName: 'redditclone',
    type:'postgresql',
    debug:!__prod__

  })
const post = orm.em.create(Post,{title:'my first post'})
}
main()