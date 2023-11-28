import provider from '~/providers/providers.js' // export default
// https://medium.com/js-dojo/consuming-apis-in-nuxt-using-the-repository-pattern-8a13ea57d520

export default (ctx, inject) => {
  const providerWithAxiosInjected = provider(ctx.$axios)

  const repositories = {
    product: providerWithAxiosInjected('/products'),
    user: providerWithAxiosInjected('/user'),
    userRegister: providerWithAxiosInjected('/user/register'),
    auth: providerWithAxiosInjected('/auth'),
    attachment: providerWithAxiosInjected('/attachment'),
    category: providerWithAxiosInjected('/categories'),
    order: providerWithAxiosInjected('/order'),
    address: providerWithAxiosInjected('customer/address'),
    deliveryZones: providerWithAxiosInjected('zone')
    // ...
  }

  inject('repositories', repositories)
}

// this is a generic way of fetching data so we wont need to create trackProvider, userProvider, authProvider files
// see exemple below

/* import PostProviders from '~/providers/PostProviders'
import UserProviders from '~/providers/UserProviders'
import CommentProviders from '~/providers/CommentProviders'
import AlbumProviders from '~/providers/AlbumProviders'
import PhotoProviders from '~/providers/PhotoProviders'
import TodoProviders from '~/providers/TodoProviders'

export default ($axios) => ({
  post: PostProviders($axios),
  user: UserProviders($axios),
  comment: CommentProviders($axios),
  album: AlbumProviders($axios),
  photo: PhotoProviders($axios),
  todo: TodoProviders($axios)
}) */
