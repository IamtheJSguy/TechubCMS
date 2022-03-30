import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import axios from 'axios'

import Cookie from 'js-cookie'

Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

export default new Vuex.Store({
  state: {
    user: {},
    searchQuery: '',
    cart: [],
    order: {},
    data: {}
  },
  mutations: {
    initializeStore(state) {
      Cookie.set('sidebarStatus', 1)
      if (localStorage.getItem('currentUser')) {
        const user = JSON.parse(localStorage.getItem('currentUser'))
        state.user = user
        axios.defaults.headers.common.Authorization = currentUser.token
      } else {
        localStorage.removeItem('currentUser')
        localStorage.removeItem('restaurant')
        localStorage.removeItem('chatId')
        localStorage.removeItem('token')
        localStorage.removeItem('order')
      }
    },
    currentUser(state, currentUser) {
      state.user = currentUser
      if (!currentUser) {
        state.user = currentUser
        localStorage.removeItem('currentUser')
        localStorage.removeItem('token')
        axios.defaults.headers.common.Authorization = null
      } else {
        if (currentUser.loginName) {
          state.user = currentUser
          localStorage.setItem('currentUser', JSON.stringify(currentUser))
          localStorage.setItem('token', currentUser.token)
          axios.defaults.headers.common.Authorization = currentUser.token
        }
      }
    },
    Data(state, data) {
      state.data = data
    },
    search(state, query) {
      state.searchQuery = query
    },
    addItemToCart(state, data) {
      let flag = false
      state.cart.map((cartItem, index) => {
        if (cartItem.menu === data.menu) {
          state.cart[index] = data
          flag = true
          return
        }
      })
      if (!flag) {
        state.cart.push(data)
      }
    },
    setOrder(state) {
      state.order = JSON.parse(localStorage.getItem('order'))
    },
    setCart(state, data) {
      state.cart = data
    }
  },
  actions: {
    // Admin
    adminLogin({ commit }, payload) {
      commit('Data', payload)
      return axios({
        url: '/admins/login',
        method: 'POST',
        data: payload
      })
    },
    // Users
    createUser({ commit }, payload) {
      commit('Data', payload)
      return axios({
        url: '/users',
        method: 'POST',
        data: payload
      })
    },
    getUsers({ commit }) {
      commit('Data', {})
      return axios({
        url: `/users`,
        method: 'GET'
      })
    },
    getUser({ commit }, id) {
      commit('Data', {})
      return axios({
        url: `/users/${id}`,
        method: 'GET'
      })
    },
    deleteUser({ commit }, id) {
      commit('Data', {})
      return axios({
        url: `/users/${id}`,
        method: 'DELETE'
      })
    },
    updateUser({ commit }, data) {
      commit('Data', data)
      return axios({
        url: `/users/${data.id}`,
        method: 'PATCH',
        data: data.payload
      })
    },
    // Bookings
    createBooking({ commit }, payload) {
      commit('Data', payload)
      return axios({
        url: '/bookings',
        method: 'POST',
        data: payload
      })
    },
    getBookings({ commit }) {
      commit('Data', {})
      return axios({
        url: `/bookings`,
        method: 'GET'
      })
    },
    getBookingsByUser({ commit }, id) {
      commit('Data', {})
      return axios({
        url: `/bookings/user/${id}`,
        method: 'GET'
      })
    },
    getBooking({ commit }, id) {
      commit('Data', {})
      return axios({
        url: `/bookings/${id}`,
        method: 'GET'
      })
    },
    deleteBooking({ commit }, id) {
      commit('Data', {})
      return axios({
        url: `/bookings/${id}`,
        method: 'DELETE'
      })
    },
    updateBooking({ commit }, data) {
      commit('Data', data)
      return axios({
        url: `/bookings/${data.id}`,
        method: 'PATCH',
        data: data.payload
      })
    },
    // Configurations
    postConfiguration({ commit }, data) {
      commit('Data', {})
      return axios({
        url: '/configurations',
        method: 'POST',
        data: data
      })
    },
    getConfiguration({ commit }) {
      commit('Data', {})
      return axios({
        url: '/configurations',
        method: 'GET'
      })
    },
    createInvoice({ commit }, payload) {
      commit('Data', payload)
      return axios({
        url: '/invoices',
        method: 'POST',
        data: payload
      })
    },
    getInvoices({ commit }) {
      commit('Data', {})
      return axios({
        url: `/invoices`,
        method: 'GET'
      })
    },
    getInvoice({ commit }, id) {
      commit('Data', {})
      return axios({
        url: `/invoices/${id}`,
        method: 'GET'
      })
    },
    deleteInvoice({ commit }, id) {
      commit('Data', {})
      return axios({
        url: `/invoices/${id}`,
        method: 'DELETE'
      })
    },
    updateInvoice({ commit }, data) {
      commit('Data', data)
      return axios({
        url: `/invoices/${data.id}`,
        method: 'PATCH',
        data: data.payload
      })
    },
    // Session Actions
    updateCurrentUser({ commit }) {
      if (localStorage.getItem('currentUser')) {
        const user = JSON.parse(localStorage.getItem('currentUser'))
        axios({
          url: `users/${user._id}`,
          method: 'GET'
        })
          .then(
            (response) => {
              localStorage.setItem('currentUser', JSON.stringify(response.data.data))
              commit('currentUser', JSON.parse(localStorage.getItem('currentUser')))
            }
          )
          .catch(
            (error) => {
              if (error) {
                localStorage.removeItem('userId')
                localStorage.removeItem('currentUser')
                localStorage.removeItem('token')
              }
            }
          )
      }
    },
    updateSessionUser({ commit }, user) {
      commit('currentUser', user)
    }
  },
  modules,
  getters
})
