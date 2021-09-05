import { createStore } from "vuex";
import chat from "./modules/chat";
import main from "./modules/main";
import user from "./modules/user";

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
    user,
  },
  state,
  getters,
  actions,
  mutations,
});
