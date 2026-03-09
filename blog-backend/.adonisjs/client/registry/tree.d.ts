/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    newAccount: {
      store: typeof routes['auth.new_account.store']
    }
    accessToken: {
      store: typeof routes['auth.access_token.store']
      destroy: typeof routes['auth.access_token.destroy']
    }
    register: typeof routes['auth.register']
    login: typeof routes['auth.login']
  }
  profile: {
    profile: {
      show: typeof routes['profile.profile.show']
    }
  }
  posts: {
    index: typeof routes['posts.index']
    store: typeof routes['posts.store']
    show: typeof routes['posts.show']
    update: typeof routes['posts.update']
    destroy: typeof routes['posts.destroy']
  }
  comments: {
    store: typeof routes['comments.store']
  }
  likes: {
    like: typeof routes['likes.like']
    unlike: typeof routes['likes.unlike']
  }
  bookmarks: {
    store: typeof routes['bookmarks.store']
    destroy: typeof routes['bookmarks.destroy']
    index: typeof routes['bookmarks.index']
  }
  profiles: {
    me: typeof routes['profiles.me']
    show: typeof routes['profiles.show']
    posts: typeof routes['profiles.posts']
  }
}
