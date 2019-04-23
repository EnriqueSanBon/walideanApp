<template>
<v-app :dark="goDark">
  <v-toolbar app color="primary">
    <v-btn icon @click="$router.go(-1)">
      <v-icon color="secondary">arrow_back</v-icon>
    </v-btn>
    <v-btn icon @click="$router.go(1)">
      <v-icon color="secondary">arrow_forward</v-icon>
    </v-btn>
    <v-spacer></v-spacer>
    <v-toolbar-title class="secondary--text display-2">Walidean</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon @click="$router.push('/ClientDataRequest');">
      <v-icon color="secondary">person_add</v-icon>
    </v-btn>
    <v-btn icon @click="goDark=!goDark">
      <v-icon color="secondary">brightness_medium</v-icon>
    </v-btn>
    <v-btn icon @click="logOut()">
      <v-icon color="secondary">close</v-icon>
    </v-btn>
  </v-toolbar>
  <v-content>
    <v-container fluid fill-height>
      <router-view></router-view>
    </v-container>
  </v-content>
  <v-footer app>
  </v-footer>
  <v-snackbar v-model="snackbar" :color="snackbarColor" :timeout="6000">
    {{ snackbarText }}
    <v-btn dark flat @click="snackbar = false">
      Close
    </v-btn>
  </v-snackbar>
</v-app>
</template>

<script>
import axios from 'axios';
import consts from './consts.js';
import firebase from "firebase";

export default {
  name: 'App',
  components: {},
  created() {
    var store = this.$store;
    var router = this.$router;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        var uid = user.uid;
        var firestore = firebase.firestore();
        var providersRef = firestore.collection("providers");
        providersRef.where("UID", "==", uid).get()
          .then((querySnapshot) => {
            var context = this;
            if (querySnapshot.size == 1) {
              querySnapshot.forEach(function(doc) {
                console.log("profile");
                console.log(doc.data().profile);
                if (doc.data().profile === "provider") {
                  // doc.data() is never undefined for query doc snapshots
                  console.log("Consulta firestore");
                  console.log(doc.data());
                  let config = {
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    withCredentials: true
                  }
                  axios.post(consts.ipPVIService + 'resources/authenticate', {
                      "user": doc.data().userId,
                      "pass": doc.data().userId
                    }, config)
                    .then((response) => {
                      if (response.status == 200) {
                        console.log("Doc data");
                        console.log(doc.data());
                        store.dispatch('setEthAddressAsync', doc.data().ethAddress)
                          .then(() => {
                            store.dispatch('setProviderIdAsync', doc.data().pviId)
                              .then(() => {
                                router.push('/ClientDataRequest');
                              });
                          });
                      }
                    }).catch((error) => {
                      console.log(error);
                      if (error.message === "Network Error") {
                        context.snackbar = true;
                        context.snackbarText = 'Network Error';
                        console.log('Network Error');
                      } else {
                        context.snackbar = true;
                        switch (error.response.status) {
                          case 401:
                            context.snackbarText = 'User or password invalid';
                            console.log('User or password invalid');
                            break;
                          default:
                            console.log(error.response.statusText);
                            context.snackbarText = error.response.statusText;
                        }
                      }
                    })
                } else if (doc.data().profile === "user") {
                  console.log("Logueado como usuario");
                  store.dispatch('setProviderIdAsync', doc.data().pviId)
                    .then(() => {
                      router.push('/userPanel');
                    });
                }
              });
            } else {
              console.log("Usuarios encontrados distinto de 1");
            }
          })
          .catch(function(error) {
            console.log("Error en la consulta");
          });
        // ...
      } else {
        console.log("User logout watcher");
        let config = {
          withCredentials: true
        }
        axios.delete(consts.ipPVIService + 'resources/authenticate/', config)
          .then((response) => {
            console.log("Response" + response);
            router.push('/'); // Home
          }).catch((err) => {
            console.log("Error logout" + err);
            router.push('/'); // Home
          })
        // User is signed out.
        // ...
      }
    });
  },
  mounted() {
    this.$router.onReady(() => {
      this.$router.push('/')
    }, () => {
      this.$router.push('/')
    })
  },
  data() {
    return {
      goDark: false,
      snackbarText: 'Error',
      snackbarColor: 'error',
      snackbar: false
    }
  },
  methods: {
    logOut() {
      firebase.auth().signOut().then(function() {
        console.log("Firebase logout");
      }).catch(function(error) {
        console.log("Error logout firebase");
        console.log(error.message);
      });
    }

  }
}
</script>
