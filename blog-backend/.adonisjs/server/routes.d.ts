import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_token.store': { paramsTuple?: []; params?: {} }
    'auth.access_token.destroy': { paramsTuple?: []; params?: {} }
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'posts.index': { paramsTuple?: []; params?: {} }
    'posts.store': { paramsTuple?: []; params?: {} }
    'posts.show': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'posts.update': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'posts.destroy': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'comments.store': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'likes.like': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'likes.unlike': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'bookmarks.store': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'bookmarks.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'bookmarks.index': { paramsTuple?: []; params?: {} }
    'profiles.me': { paramsTuple?: []; params?: {} }
    'profiles.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'profiles.posts': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'auth.register': { paramsTuple?: []; params?: {} }
    'auth.login': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'posts.index': { paramsTuple?: []; params?: {} }
    'posts.show': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'bookmarks.index': { paramsTuple?: []; params?: {} }
    'profiles.me': { paramsTuple?: []; params?: {} }
    'profiles.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'profiles.posts': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  HEAD: {
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'posts.index': { paramsTuple?: []; params?: {} }
    'posts.show': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'bookmarks.index': { paramsTuple?: []; params?: {} }
    'profiles.me': { paramsTuple?: []; params?: {} }
    'profiles.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'profiles.posts': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  POST: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_token.store': { paramsTuple?: []; params?: {} }
    'auth.access_token.destroy': { paramsTuple?: []; params?: {} }
    'posts.store': { paramsTuple?: []; params?: {} }
    'comments.store': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'likes.like': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'bookmarks.store': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'auth.register': { paramsTuple?: []; params?: {} }
    'auth.login': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'posts.update': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
  }
  PATCH: {
    'posts.update': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
  }
  DELETE: {
    'posts.destroy': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'likes.unlike': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'bookmarks.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}