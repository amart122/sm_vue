import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { $sm } from "./assets/js/sm.application";
import { $sm_helpers } from "./assets/js/sm.helpers";
import axios from "axios";
const axios_instance = axios.create({ baseURL: "http://127.0.0.1:8000" });
axios_instance.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        const _error = {}
        if(error.request.status == 403) {
            _error['status'] = error.request.status,
            _error['logout'] = true
        } else {
            _error['status'] = error.request.status,
            _error['logout'] = false
        }
        return Promise.reject(_error);
});

// Create Firebase Instance
const firebaseConfig = {
    apiKey: "AIzaSyDDtrpGfPnE5boJlK4av3fwZql5USuAOXE",
    authDomain: "test-f9158.firebaseapp.com",
    databaseURL: "https://test-f9158.firebaseio.com",
    projectId: "test-f9158",
    storageBucket: "test-f9158.appspot.com",
    messagingSenderId: "793289375155",
    appId: "1:793289375155:web:b3315b0b90f587c7769fc6",
    measurementId: "G-1EL9LFVDLY"
};
initializeApp(firebaseConfig);


const auth = getAuth();
onAuthStateChanged(auth, async function(user) {
    if (user) {
        const id_token = await user.getIdToken();
        store.dispatch("setCurrentUser", user.uid);
        axios_instance({
            method: "post",
            url: "/api/session/",
            headers: { Authorization: id_token },
        }).then((response) => {
            if (response.data && response.data.username) {
                store.dispatch("setCurrentUser", response.data.username);
                document.cookie = `_sm_uid=${response.data.username};path=/`
            }
        });
    }
})


router.beforeEach((to, from, next) => {
    document.querySelector("#sm-alert-container").classList.add("hidden");
    document
        .querySelector(".loader-wrapper #circle-wave-loader")
        .classList.remove("active");

    if(!store.getters['getCurrentUser'] && to.meta.authRequired) {
        next({ path: '/account/login' })
    } else {
        next();
    }
});

const app = createApp(App);
app.config.globalProperties.$sm = $sm;
app.config.globalProperties.$sm_helpers = $sm_helpers;
app.config.globalProperties.axios = axios_instance;
app.use(store);
app.use(router);
app.mount("#__site-wrapper");
