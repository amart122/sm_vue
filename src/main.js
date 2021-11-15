import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { $sm } from "./assets/js/sm.application";
import { $sm_helpers } from "./assets/js/sm.helpers";
import axios from "axios";
const axios_instance = axios.create({ 
    baseURL: (process.env.NODE_ENV === "development") ? "http://127.0.0.1:8000" : "https://simul-music.herokuapp.com/"
});
axios_instance.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        const _error = {}
        if(error.request.status == 403) {
            signOut(getAuth())
            _error['redirect'] = '/account/login'
        } else {
            _error['status'] = error.request.status,
            _error['logout'] = false
        }
        return Promise.reject(_error);
});

// Create Firebase Instance
const firebaseConfig = {
    apiKey: (process.env.FB_API_KEY || "AIzaSyDDtrpGfPnE5boJlK4av3fwZql5USuAOXE"),
    authDomain: (process.env.FB_AUTH_DOMAIN || "test-f9158.firebaseapp.com"),
    databaseURL: (process.env.FB_DB_URL || "https://test-f9158.firebaseio.com"),
    projectId: (process.env.FB_PROJECT_ID || "test-f9158"),
    storageBucket: (process.env.FB_STORAGE_BUCKET || "test-f9158.appspot.com"),
    messagingSenderId: (process.env.FB_MSGSEND_ID || "793289375155"),
    appId: (process.env.FB_APP_ID || "1:793289375155:web:b3315b0b90f587c7769fc6"),
    measurementId: (process.env.FB_MEASURE_ID || "G-1EL9LFVDLY")
};
initializeApp(firebaseConfig);


const auth = getAuth();
onAuthStateChanged(auth, async function(user) {
    if (user) {
        const id_token = await user.getIdToken();
        axios_instance({
            method: "post",
            url: "/api/session/",
            headers: { Authorization: id_token },
        }).then((response) => {
            if (response.data && response.data.username) {
                store.dispatch("setCurrentUser", response.data.username);
            }
        }).then((response) => {
            const url = (process.env.NODE_ENV === "development") ? "127.0.0.1:8000" : "https://simul-music.herokuapp.com";
            const socket = new WebSocket(
                `ws:////${url}/ws/sm/events/?Authentication=${store.getters["getCurrentUser"]}`
            );
            socket.onmessage = (event) => {
                try {
                    const msg = JSON.parse(event.data)
                    if(msg.type == "notification") {
                        store.dispatch("user/updateNotifications", msg.notification)
                    }
                } catch (exception) {
                    console.log("MESSAGE NOT PARSABLE")
                }
            }
        });
    }
})


router.beforeEach((to, from, next) => {
    document.querySelector("#sm-alert-container").classList.add("hidden");
    document
        .querySelector(".loader-wrapper #circle-wave-loader")
        .classList.remove("active");
    if(to.meta.authRequired && !store.getters["getCurrentUser"]) {
        $sm_helpers.show_loader();
        setTimeout( () => {
            $sm_helpers.hide_loader();
            if (!store.getters["getCurrentUser"]) {
                document.title = "LOGIN"
                next({ path: '/account/login' })
            } else {
                document.title = to.name
                next()
            }
        }, 2000)
    } else {
        document.title = to.name
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
