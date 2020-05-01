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
    },
    addDetail(state, detail) {
      state.model.items.push(detail)
    }
}

const actions = {

    async store(context, data) {
    },
    async show(context, id) {
      return new Promise((resolve, reject) => {
        axios.get('/orders/2117155815564').then(response => {
            context.commit('setModel', response.data.order)
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
