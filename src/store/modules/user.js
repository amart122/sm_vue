import axios from "axios";

const state = () => ({
  online_friends: [],
  friends: [],
});

const getters = {
  getOnlineFriends(state) {
    return state.online_friends;
  },
  getFriends(state) {
    return state.friends;
  }
};

const actions = {
  async updateOnlineFriends({ commit }) {
    let new_friends = await this.$sm.ajax({
      url: "/users/friend/",
      type: "GET",
      data: { online_only: true },
      dataType: "JSON",
    });
    commit("updateOnlineFriends", new_friends);
  },
  updateFriends({ commit }, page) {
    return axios.get("http://127.0.0.1:8000/api/friends/", {
      headers: { "User": this.getters['getCurrentUser'] },
      params: { "page": page }
    }).then((response) => {
      commit("updateFriends", response.data);    
    }).catch((error) => {
      commit("updateFriends", []);
    })
  },
};

const mutations = {
  updateOnlineFriends(state, new_friends) {
    state.online_friends = JSON.parse(new_friends);
  },
  updateFriends(state, new_friends) {
    state.friends = [...state.friends, ...new_friends];
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
