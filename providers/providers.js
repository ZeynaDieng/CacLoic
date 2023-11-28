// if i want to use this finction below, i could do this : aFunciton(ctx.$axios). remember $axios here could named as i want
export default $axios => resource => ({ // function with paramater "axios" that returns a function with parameter "resource"
  all () {
    return $axios.$get(`${resource}`)
  },

  create (payload, options) {
    return $axios.$post(`${resource}`, payload, options)
  },

  show (id) {
    return $axios.$get(`${resource}/${id}`)
  },

  update (payload, id, options) {
  console.log(id);
    return $axios.$put(`${resource}/${id}`, payload, options)
    
    
  },

  delete (id) {
    return $axios.$delete(`${resource}/${id}`)
  }

})

// example of $ressource : "/track"
// this is a generic way of fetching data so we wont need to create trackProvider, userProvider, authProvider
// see exemple below and repositories.js in plugins folder

/* const resource = '/posts'
export default $axios => ({
  index () {
    return $axios.get(`${resource}`)
  },

  show (id) {
    return $axios.get(`${resource}/${id}`)
  },

  create (payload) {
    return $axios.post(`${resource}`, payload)
  },

  update (id, payload) {
    return $axios.post(`${resource}/${id}`, payload)
  },

  delete (id) {
    return $axios.delete(`${resource}/${id}`)
  }
}) */
