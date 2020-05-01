import axios from 'axios'

const state = {
  list: [],
  model: {},
  errors: {}
}

const getters = {

}

const mutations = {
  setList(state, list) {
    state.list = list
  },
  setModel(state, model) {
    state.model = model
  },
  setErrors(state, errors) {
    state.errors = errors
  }
}

const actions = {
  async index(context) {
    return new Promise((resolve, reject) => {
      axios.get('/products').then(response => {
        context.commit('setList', response.data.products)
        resolve(response)
      }, error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
