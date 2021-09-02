import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { $sm } from "./assets/js/sm.application";
import { $sm_helpers } from "./assets/js/sm.helpers";
import axios from "axios";
const axios_instance = axios.create({ baseURL: "http://127.0.0.1:8000" });

const app = createApp(App);
app.config.globalProperties.$sm = $sm;
app.config.globalProperties.$sm_helpers = $sm_helpers;
app.config.globalProperties.axios = axios_instance;
app.use(store);
app.use(router);
app.mount("#__site-wrapper");
