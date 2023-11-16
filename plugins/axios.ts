import axios from "axios";
export default defineNuxtPlugin((nuxtApp) => {
const config = useRuntimeConfig();
const axiosPlugin = axios.create();
// axiosPlugin.defaults.baseURL = "https://jsonplaceholder.typicode.com/"
axiosPlugin.defaults.baseURL = config.public.apiBase;
return{
    provide:{
        axiosPlugin: axiosPlugin,
    }
}
});