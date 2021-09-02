import { createStore } from "vuex";
import chat from "./modules/chat";
import main from "./modules/main";

const state = {
  username: null,
};
const getters = {
  getCurrentUser(state) {
    return state.username;
  },
};
const actions = {
  setCurrentUser({ commit }, username) {
    commit("setCurrentUser", username);
  },
};
const mutations = {
  setCurrentUser(state, username) {
    state.username = username;
  },
};

export default createStore({
  modules: {
    main,
    chat,
  },
  state,
  getters,
  actions,
  mutations,
});
