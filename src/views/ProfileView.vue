<template>
  <v-container>
    <v-alert type="error" outlined v-model='error.status' transition="scale-transition" text> {{error.message}}</v-alert>
    <v-row class="mb-1">
      <!-- Avatar -->
      <v-col cols="12" xs="12" sm="6" md="4" lg="3" xl="2" align="center">
        <v-avatar size="150" class="mt-8 mb-4">
          <v-img
            :src="user.ImageUrl || require('../assets/profileLogo.jpg')"
            aspect-ratio="1.0"
          >
          <v-btn icon class="ml-3 mt-12" color="success"
           variant="outlined" @click="imageDialog = true;" v-if="edit"
           style="background-color: rgba(0,0,0,0.6); ">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          </v-img>
        </v-avatar>
      </v-col>
      
      <v-col cols="12" xs="12" sm="6" md="8" lg="9" xl="10">
        <!-- UserName -->
        <v-text-field readonly v-model="user.Username" label="Username">
        </v-text-field>

        
        <!-- Enable Edit -->
        <v-btn class="mx-2 my-2" v-if="!edit" color="primary" outlined
        @click="edit = true; before = JSON.parse(JSON.stringify(user)); image = user.ImageUrl;"
        >Edit
        </v-btn>
        
        <!-- Enable Change Password -->
        <v-checkbox v-if="edit" label="Cambia Password" v-model="changePassword"></v-checkbox>

        <!-- Change Password -->
        <v-text-field v-if="changePassword" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show1 ? 'text' : 'password'"
        autocomplete="new-password"
        @click:append="show1 = !show1"
         v-model="password" label="Nuova Password"
        >
        </v-text-field>
        <v-text-field v-if="changePassword" v-model="confirmPassword" :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show2 ? 'text' : 'password'"
        autocomplete="new-password"
        @click:append="show2 = !show2"
        label="Ripeti Nuova Password"
        >
        </v-text-field>
      </v-col>
    </v-row>

    <!-- Edit Save / Cancel Buttons -->
    <v-row v-if="edit" class="mb-2">
      <v-spacer></v-spacer>
      <v-col>
        <v-btn color="primary" variant="outlined" 
          @click="editRollback()"
        >
          Annulla
        </v-btn>
      </v-col>
      <v-col>
        <v-btn color="primary" @click="updateProfile()"> Salva Modifiche </v-btn>
      </v-col>
    </v-row>

    <!-- Image Form -->
    <v-dialog v-model="imageDialog" persistent>
      <v-card>
        <v-card-title class="text-h5"> Cambia Url Immagine </v-card-title>
        <v-card-text>
          <v-text-field label="Nuovo Url Immagine" v-model="image" outlined
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary" variant="outlined"
            @click="imageDialog = false; image = '';">
            Annulla
          </v-btn>
          <v-btn
            color="primary"
            @click=" imageDialog = false; user.ImageUrl = image;">
            Conferma
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
  </v-container>
</template>


<script>
import { defineComponent } from 'vue';

// Components
import AuthService from '../services/AuthService.js';
import { globalContainer } from '../store';
import router from "../router"
import UserService from '../services/UserService.js';

export default defineComponent({
  name: 'ProfileView',
  data: () => ({
    user: {},
    changePassword: false,
    edit: false,
    imageUrl: "",
    imageDialog: false,
    image: "",
    error: {status: false, message: ""},
    before: {},
    password: "",
    confirmPassword: "",
    show1: false,
    show2: false,
  }),
  methods: {
    loginFailed() {
      this.$cookies.remove('username');
      this.$cookies.remove('password');
      this.$cookies.remove('current_user');
      router.push("/login");
    },
     editRollback() {
      this.edit = false;
      this.user = this.before;
      this.changePassword = false;  
      globalContainer.User = this.before;
      this.image = "";
      this.password = "";
      this.confirmPassword = "";
      this.show1 = false;
      this.show2 = false;      
    },
    updateProfile() {
      if (this.changePassword) {
        UserService.editPassword(this.user.Id, this.password, this.confirmPassword).then(() => {
          this.$cookies.set("username",this.$cookies.get("username"),"30d");
          this.$cookies.set("password", this.password,"30d");
          AuthService.login(this.$cookies.get("username"), this.$cookies.get("password")).then(() => {
            this.editProfile();
          })
        })
        .catch(error => {
          this.error.message = error.response.data;
          this.error.status = true;
          setTimeout(() => {this.error.status = false}, 3500);
        })
      }
      else {
        this.editProfile();
      }
    },
    editProfile(){
      UserService.editUser(this.user.Id, this.user.ImageUrl).then( () => {
        this.edit = false;
        this.changePassword = false;
        this.password = "";
        this.confirmPassword = "";
        this.show1 = false;
        this.show2 = false;
      })
    }
  },  
  beforeMount() {
    AuthService.getUser()
    .then((data) => {
      globalContainer.User = data.Login;
      this.user = data.Login;
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
