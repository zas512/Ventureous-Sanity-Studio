import {author} from './author'
import {blog} from './blog'
import {blogIndex} from './blog-index'
import {category} from './category'
import {comment} from './comment'
import {faq} from './faq'
import {footer} from './footer'
import {homePage} from './home-page'
import {navbar} from './navbar'
import {page} from './page'
import {playlist} from './playlist'
import {redirect} from './redirect'
import {settings} from './settings'
import {startup} from './startup'

export const singletons = [homePage, blogIndex, settings, footer, navbar]

export const documents = [
  blog,
  page,
  faq,
  author,
  category,
  startup,
  playlist,
  comment,
  ...singletons,
  redirect,
]
