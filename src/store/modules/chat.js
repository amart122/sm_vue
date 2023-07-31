import axios from "axios";

const state = () => ({
  active_friends: [],
  chat_list: [],
});

const getters = {
  getActiveFriends(state) {
    return state.active_friends;
  },
  getChatList(state) {
    return state.chat_list;
  },
};

const actions = {
  async updateActiveFriends({ commit }) {
    let new_friends = await this.$sm.ajax({
      url: "/users/friend/",
      type: "GET",
      data: { online_only: true },
      dataType: "JSON",
    });
    commit("updateActiveFriends", new_friends);
  },
  async updateChatList({ commit }) {
    const url = "http://api.simple-chat.site:8000"
    await axios.get(url + "/api/message_room/", {
      headers: { "User": this.getters['getCurrentUser'] }
    }).then((response) => {
      commit("updateChatList", response.data);    
    }).catch((error) => {
      commit("updateChatList", []);
    })
  },
};

const mutations = {
  updateActiveFriends(state, new_friends) {
    state.active_friends = JSON.parse(new_friends);
  },
  updateChatList(state, chat_list) {
    state.chat_list = chat_list;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
