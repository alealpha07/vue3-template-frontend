<template>
  <v-card width="100%" height="100%">
    <HelloWorld />
  </v-card>
</template>

<script>
import { defineComponent } from 'vue';

// Components
import HelloWorld from '../components/HelloWorld.vue';
import AuthService from '../services/AuthService.js';
import { globalContainer } from '../store';
import router from "../router"

export default defineComponent({
  name: 'HomeView',

  components: {
    HelloWorld,
  },
  beforeMount() {
    AuthService.getUser()
    .then((data) => {
      globalContainer.User = data.Login;
    })
    .catch(() => {
      if(this.$cookies.get("username") != undefined){
        AuthService.login(this.$cookies.get("username"), this.$cookies.get("password")).then(() => {
          router.go();
        })
      }
      else{
        globalContainer.User = {};
      }
    });
  },
});
</script>
