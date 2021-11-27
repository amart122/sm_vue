import axios from "axios";

const state = () => ({
  friends: [],
  notifications: [],
  signed_up: false,
});

const getters = {
  getFriends(state) {
    return state.friends;
  },
  getNotifications(state) {
    return state.notifications;
  },
  getSignedUpState(state) {
    return state.signed_up;
  }
};

const actions = {
  updateFriends({ commit }, page) {
    const url = (process.env.NODE_ENV === "development") ? "http://127.0.0.1:8000" : "https://simul-music.herokuapp.com"
    return axios.get(url + "/api/friends/", {
      headers: { "User": this.getters['getCurrentUser'] },
      params: { "page": page }
    }).then((response) => {
      commit("updateFriends", response.data);    
    }).catch((error) => {
      commit("updateFriends", []);
    })
  },
  updateNotifications({commit}, notifications) {
    const url = (process.env.NODE_ENV === "development") ? "http://127.0.0.1:8000" : "https://simul-music.herokuapp.com"
    axios({
      method: "get",
      url: url + "/api/notifications",
      data: {},
      headers: { User: this.getters['getCurrentUser'] },
    }).then((response) => {
      commit("updateNotifications", response.data)
    })
    
  },
  toSignedUp({ commit }) {
    commit("toSignedUp")
  }
};

const mutations = {
  updateFriends(state, new_friends) {
    state.friends = [...state.friends, ...new_friends];
  },
  updateNotifications(state, notifications) {
    state.notifications = notifications;
  },
  toSignedUp(state) {
    state.signed_up = true;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
