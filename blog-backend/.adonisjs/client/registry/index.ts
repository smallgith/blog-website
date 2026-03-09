/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'auth.new_account.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/signup',
    tokens: [{"old":"/api/v1/auth/signup","type":0,"val":"api","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['auth.new_account.store']['types'],
  },
  'auth.access_token.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/login',
    tokens: [{"old":"/api/v1/auth/login","type":0,"val":"api","end":""},{"old":"/api/v1/auth/login","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/login","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.access_token.store']['types'],
  },
  'auth.access_token.destroy': {
    methods: ["POST"],
    pattern: '/api/v1/auth/logout',
    tokens: [{"old":"/api/v1/auth/logout","type":0,"val":"api","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['auth.access_token.destroy']['types'],
  },
  'profile.profile.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/account/profile',
    tokens: [{"old":"/api/v1/account/profile","type":0,"val":"api","end":""},{"old":"/api/v1/account/profile","type":0,"val":"v1","end":""},{"old":"/api/v1/account/profile","type":0,"val":"account","end":""},{"old":"/api/v1/account/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['profile.profile.show']['types'],
  },
  'posts.index': {
    methods: ["GET","HEAD"],
    pattern: '/posts',
    tokens: [{"old":"/posts","type":0,"val":"posts","end":""}],
    types: placeholder as Registry['posts.index']['types'],
  },
  'posts.store': {
    methods: ["POST"],
    pattern: '/posts',
    tokens: [{"old":"/posts","type":0,"val":"posts","end":""}],
    types: placeholder as Registry['posts.store']['types'],
  },
  'posts.show': {
    methods: ["GET","HEAD"],
    pattern: '/posts/:slug',
    tokens: [{"old":"/posts/:slug","type":0,"val":"posts","end":""},{"old":"/posts/:slug","type":1,"val":"slug","end":""}],
    types: placeholder as Registry['posts.show']['types'],
  },
  'posts.update': {
    methods: ["PUT","PATCH"],
    pattern: '/posts/:slug',
    tokens: [{"old":"/posts/:slug","type":0,"val":"posts","end":""},{"old":"/posts/:slug","type":1,"val":"slug","end":""}],
    types: placeholder as Registry['posts.update']['types'],
  },
  'posts.destroy': {
    methods: ["DELETE"],
    pattern: '/posts/:slug',
    tokens: [{"old":"/posts/:slug","type":0,"val":"posts","end":""},{"old":"/posts/:slug","type":1,"val":"slug","end":""}],
    types: placeholder as Registry['posts.destroy']['types'],
  },
  'comments.store': {
    methods: ["POST"],
    pattern: '/posts/:id/comments',
    tokens: [{"old":"/posts/:id/comments","type":0,"val":"posts","end":""},{"old":"/posts/:id/comments","type":1,"val":"id","end":""},{"old":"/posts/:id/comments","type":0,"val":"comments","end":""}],
    types: placeholder as Registry['comments.store']['types'],
  },
  'likes.like': {
    methods: ["POST"],
    pattern: '/posts/:id/like',
    tokens: [{"old":"/posts/:id/like","type":0,"val":"posts","end":""},{"old":"/posts/:id/like","type":1,"val":"id","end":""},{"old":"/posts/:id/like","type":0,"val":"like","end":""}],
    types: placeholder as Registry['likes.like']['types'],
  },
  'likes.unlike': {
    methods: ["DELETE"],
    pattern: '/posts/:id/like',
    tokens: [{"old":"/posts/:id/like","type":0,"val":"posts","end":""},{"old":"/posts/:id/like","type":1,"val":"id","end":""},{"old":"/posts/:id/like","type":0,"val":"like","end":""}],
    types: placeholder as Registry['likes.unlike']['types'],
  },
  'bookmarks.store': {
    methods: ["POST"],
    pattern: '/posts/:id/bookmark',
    tokens: [{"old":"/posts/:id/bookmark","type":0,"val":"posts","end":""},{"old":"/posts/:id/bookmark","type":1,"val":"id","end":""},{"old":"/posts/:id/bookmark","type":0,"val":"bookmark","end":""}],
    types: placeholder as Registry['bookmarks.store']['types'],
  },
  'bookmarks.destroy': {
    methods: ["DELETE"],
    pattern: '/posts/:id/bookmark',
    tokens: [{"old":"/posts/:id/bookmark","type":0,"val":"posts","end":""},{"old":"/posts/:id/bookmark","type":1,"val":"id","end":""},{"old":"/posts/:id/bookmark","type":0,"val":"bookmark","end":""}],
    types: placeholder as Registry['bookmarks.destroy']['types'],
  },
  'bookmarks.index': {
    methods: ["GET","HEAD"],
    pattern: '/bookmarks',
    tokens: [{"old":"/bookmarks","type":0,"val":"bookmarks","end":""}],
    types: placeholder as Registry['bookmarks.index']['types'],
  },
  'profiles.me': {
    methods: ["GET","HEAD"],
    pattern: '/me',
    tokens: [{"old":"/me","type":0,"val":"me","end":""}],
    types: placeholder as Registry['profiles.me']['types'],
  },
  'profiles.show': {
    methods: ["GET","HEAD"],
    pattern: '/users/:id',
    tokens: [{"old":"/users/:id","type":0,"val":"users","end":""},{"old":"/users/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['profiles.show']['types'],
  },
  'profiles.posts': {
    methods: ["GET","HEAD"],
    pattern: '/users/:id/posts',
    tokens: [{"old":"/users/:id/posts","type":0,"val":"users","end":""},{"old":"/users/:id/posts","type":1,"val":"id","end":""},{"old":"/users/:id/posts","type":0,"val":"posts","end":""}],
    types: placeholder as Registry['profiles.posts']['types'],
  },
  'auth.register': {
    methods: ["POST"],
    pattern: '/register',
    tokens: [{"old":"/register","type":0,"val":"register","end":""}],
    types: placeholder as Registry['auth.register']['types'],
  },
  'auth.login': {
    methods: ["POST"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.login']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
