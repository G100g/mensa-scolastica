import Vue from "vue";
import VueRouter from "vue-router";

import App from "./App.vue";
import Cities from "./components/Cities.vue";
import Schools from "./components/Schools.vue";
import DayNavigator from "./components/DayNavigator.vue";

Vue.use(VueRouter);
Vue.config.productionTip = false;

const routes = [
    { path: "/  ", component: Cities, redirect: "/cities" },
    { path: "/cities", component: Cities },
    { path: "/city/:city", component: Schools },
    { path: "/city/:city/school/:school", component: DayNavigator },
];

const router = new VueRouter({
    mode: "history",
    base: __dirname,
    routes, // short for `routes: routes`
});

new Vue({
    router,
    render: (h) => h(App),
}).$mount("#app");
