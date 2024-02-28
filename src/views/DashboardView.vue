<template>
  <v-card width="100%" height="100%">
    <v-row>
      <v-spacer></v-spacer>
      <v-col>
        <h3 class="mt-4" style="width:fit-content; margin: auto;">Users</h3>
        <v-card theme="dark">
          <v-list
          header="Users"
          :items="items"
          item-title="Username"
          item-value="Id"
        >
        </v-list>
        </v-card>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-card>
</template>

<script>
import { defineComponent } from 'vue';

// Components
import AuthService from '../services/AuthService.js';
import UserService from '../services/UserService.js';
import { globalContainer } from '../store';
import router from "../router"

export default defineComponent({
  name: 'DashboardView',
  data: () => ({
    items: []
  }),
  methods: {
    loginFailed() {
      this.$cookies.remove('username');
      this.$cookies.remove('password');
      this.$cookies.remove('current_user');
      router.push("/login");
    },
  },
  beforeMount() {
    AuthService.getUser()
    .then((data) => {
      globalContainer.User = data.Login;
      UserService.getUsers().then(data => {
        this.items = data;
      })
    })
    .catch(() => {
      if(this.$cookies.get("username") != undefined){
        AuthService.login(this.$cookies.get("username"), this.$cookies.get("password")).then(() => {
          router.go();
        })
        .catch(() => {
          this.loginFailed();
        })
      }
      else{
        globalContainer.User = {};
        this.loginFailed();
      }
    });
  },
});
</script>
