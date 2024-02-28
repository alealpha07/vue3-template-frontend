<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      color="primary"
      temporary
    >

      <v-list-item
        :prepend-avatar="require('./assets/logo.png')"
        :title="title"
        @click="routeTo(getMainPage)"
        class="a-pointer"
      ></v-list-item>

      <v-divider></v-divider>

      <v-list color="transparent" density="compact" nav>
        <v-list-item v-for="item in items" :key="item.title" link @click="routeTo(item.link)"
        :prepend-icon="item.icon" :title="item.title">
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block variant="outlined" @click="logout()">
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark >
      <v-app-bar-nav-icon v-if="!(Object.keys(getUser).length === 0)"
      @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="a-cursor mx-1 d-none d-sm-block">
        <v-row align="center">
          <v-col class="mr-0 pr-0 a-pointer" @click="routeTo(getMainPage)" cols="2"><v-img width="90%" src="./assets/logo.png"></v-img></v-col>
          <v-col class="ml-0 pl-0"> <b @click="routeTo(getMainPage)" class="a-pointer">{{title}}</b> </v-col>
        </v-row>
      </v-toolbar-title>
      <v-row align="center">
        <v-spacer></v-spacer>
        <v-col v-if="(Object.keys(getUser).length === 0)"
        cols="0" xs="6" sm="4" md="3" lg="2" xl="2">
          <v-btn variant="outlined" @click="routeTo('/login')">Login</v-btn>
        </v-col>
        <v-col class="d-none d-lg-block" 
        v-if="!(Object.keys(getUser).length === 0)"
        cols="0" xs="0" sm="0" md="0" lg="3" xl="2">
          <v-row>
            <v-avatar>
              <v-img
                :src="Object.keys(getUser).length === 0 ? '' : getUser.ImageUrl || require('./assets/profileLogo.jpg')"
                aspect-ratio="1.0"
                @click="routeTo('/profile')" class="a-pointer"
              >
              </v-img>
            </v-avatar>
            <h2 class="ml-2 mt-1 a-pointer" @click="routeTo('/profile')">{{getUser.Username}}</h2>
          </v-row>
        </v-col>
      </v-row>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import AuthService from "./services/AuthService.js"
import router from "./router"
import { useDisplay } from 'vuetify'
import { globalContainer } from './store';

export default {
  name: 'App',
  data: () => ({
    items: [
      { title: "Home", icon: "mdi-movie-filter", link: "/"},
      { title: "Dashboard", icon: "mdi-book-open-blank-variant", link: "/dashboard"},
      { title: "Profile", icon: "mdi-account", link: "/profile" },
    ],
    drawer: false,
    title: process.env.VUE_APP_TITLE
  }),
  created() {
    document.title = this.title;
  },
  methods: {
    routeTo(link) {
      if (this.$route.path !== link) {
        router.push(link);
      } else {
        router.go();
      }
    },
    logout() {
      AuthService.logout().finally( () => {
        this.$cookies.remove('username');
        this.$cookies.remove('password');
        this.$cookies.remove('current_user');
        this.routeTo("/");
      });
    },
  },
  computed: {
    getUser(){
      return globalContainer.User;
    },
    getMainPage(){
      return globalContainer.MainPage;
    },
    searchBarPadding() {
      const { name } = useDisplay()
      switch (name) {
        case "lg":
          return "16";
        default:
          return "0";
      }
    },
  },
};
</script>

<style>
.a-pointer {
  cursor: pointer;
}
</style>
