import { createApp } from "vue";

//graph
import VNetworkGraph from "v-network-graph";
import "v-network-graph/lib/style.css";

import App from "./App.vue";
// icon source
import "@fortawesome/fontawesome-free/css/all.css";
import router from "./router";
import { key, store } from "./store";

const app = createApp(App); //graph

//antes de montar usar o router
createApp(App).use(router).use(store, key).use(VNetworkGraph).mount("#app");
