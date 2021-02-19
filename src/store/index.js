import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {

  language: 'plPL',

};

const mutations = {

  setLanguage(state, lang){
    state.language = lang;
  },

};

const actions = {

  SET_LANGUAGE({ commit }, lang){
    commit('setLanguage', lang);
  },

};

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  actions,
  mutations,
});
