import axios from 'axios';
import Vuex from 'vuex';
import Vue from 'vue';

// load Vuex
Vue.use(Vuex);
// to handle state
const state = {
  users: [],
};

const api = process.env.VUE_APP_API_URL || 'https://randomuser.me/api/';
// to handle state
const getters = {};

// to handle actions
const actions = {
  async getUsers({ commit }) {
    await axios.get(`${api}?page=1&results=100&seed=abc`)
      .then((response) => {
        commit('SET_USERS', response.data.results);
      });
  },
};

// to handle mutations
const mutations = {
  /* eslint-disable */
  SET_USERS(state, users) {
    state.users = users;
  },
};

// export store module
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});
