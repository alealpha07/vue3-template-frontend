<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="4" xl="3">
        <v-card>
          <v-card-title class="text-h5">{{mode}}</v-card-title>
          <v-alert class="ml-4 mr-4" type="error" variant="outlined" v-model='error.status' transition="scale-transition" text> {{error.message}}</v-alert>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="login.username"
                :rules="usernameRules"
                label="Username"
                required
              ></v-text-field>
              <v-text-field
                v-model="login.password"
                :rules="passwordRules"
                label="Password"
                type="password"
                required
              ></v-text-field>
              <v-text-field
                v-if="mode == 'Register'"
                v-model="login.confirmPassword"
                :rules="confirmPasswordRules"
                label="Confirm Password"
                type="password"
                required
              ></v-text-field>
              <p class="mb-2" v-if="mode == 'Login'">You don't have an account? Please <b @click="mode='Register'" style="color: #1867c0; cursor: pointer;">Register Here</b></p>
              <p class="mb-2" v-if="mode != 'Login'">You already have an account? Please <b @click="mode='Login'" style="color: #1867c0; cursor: pointer;">Login Here</b></p>
              <v-btn :disabled="!valid" color="primary" @click="submit">{{mode}}</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AuthService from "../services/AuthService.js"
import router from "../router";
//import { globalContainer } from './store';

export default {
  name: 'LoginRegister',
  data: () => ({
    mode: "Login",
    valid: false,
    error: {status: false, message: ""},
    login: { username: '', password: '', confirmPassword: '' },
    usernameRules: [
      v => !!v || 'Username is required',
    ],
    passwordRules: [
      v => !!v || 'Password is required',
    ],
    confirmPasswordRules: [
      v => !!v || 'Password is required',
    ],
  }),
  methods: {
    routeTo(link) {
      if (this.$route.path !== link) {
        router.push(link);
      } else {
        router.go();
      }
    },
    submit() {
      if (this.$refs.form.validate()) {
        if (this.mode == "Login"){
          AuthService.login(this.login.username, this.login.password)
          .then(() => {
            this.$cookies.set("username",this.login.username,"30d");
            this.$cookies.set("password",this.login.password,"30d");
            this.routeTo("/dashboard");
          })
          .catch(error => {
            this.error.message = error.response.data.message;
            this.error.status = true;
            setTimeout(() => {this.error.status = false}, 3500);
          })
        }
        else {
          AuthService.register(this.login.username, this.login.password, this.login.confirmPassword)
          .then(() => {
            this.mode = "Login";
          })
          .catch(error => {
            this.error.message = error.response.data.message;
            this.error.status = true;
            setTimeout(() => {this.error.status = false}, 3500);
          })
        }
      }
    },
  },
  /*mounted() {
    AuthService.getUser()
    .then(() => this.routeTo(this.$globalContainer.MainPage))
    .catch(() => {
        this.$globalContainer.User = {};
      if(this.$cookies.get("username") != undefined){
        AuthService.login(this.$cookies.get("username"), this.$cookies.get("password")).then(() => {
          this.routeTo(this.$globalContainer.MainPage)
        })
      }
    });
  },*/
};
</script>
