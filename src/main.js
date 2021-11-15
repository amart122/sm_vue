import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
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
            signOut(getAuth())
            _error['redirect'] = '/account/login'
        } else {
            _error['status'] = error.request.status,
            _error['logout'] = false
        }
        return Promise.reject(_error);
});

// Create Firebase 
let firebaseConfig = null
if(process.env.NODE_ENV === "development") {
    firebaseConfig = {
        apiKey: "AIzaSyDDtrpGfPnE5boJlK4av3fwZql5USuAOXE",
        authDomain: "test-f9158.firebaseapp.com",
        databaseURL: "https://test-f9158.firebaseio.com",
        projectId: "test-f9158",
        storageBucket: "test-f9158.appspot.com",
        messagingSenderId: "793289375155",
        appId: "1:793289375155:web:b3315b0b90f587c7769fc6",
        measurementId: "G-1EL9LFVDLY"
    };
} else {
    firebaseConfig = {
        apiKey: "AIzaSyAztGZeWuhkTq6NYZyDAWl4rEEEyIUqzrc",
        authDomain: "simul-music.firebaseapp.com",
        projectId: "simul-music",
        storageBucket: "simul-music.appspot.com",
        messagingSenderId: "388855346937",
        appId: "1:388855346937:web:700c07539fb0875cc61428"
    };  
}

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
            const socket = new WebSocket(
                `ws:////127.0.0.1:8000/ws/sm/events/?Authentication=${store.getters["getCurrentUser"]}`
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
