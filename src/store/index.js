import { createStore } from "vuex";
import chat from "./modules/chat";
import main from "./modules/main";

export default createStore({
  modules: {
    main,
    chat,
  },
});
