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
</v-app>
</template>

<script>
import axios from 'axios';
import consts from './consts.js';
import firebase from "firebase";

export default {
  name: 'App',
  components: {},
  mounted() {
    this.$router.onReady(() => {
      this.$router.push('/')
    }, () => {
      this.$router.push('/')
    })

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log("User logged watcher" + user.uid);
        // User is signed in.
        var uid = user.uid;
        var firestore = firebase.firestore();
        var providersRef = firestore.collection("providers");
        providersRef.where("UID", "==", uid).get()
          .then((querySnapshot) => {
            if (querySnapshot.size == 1) {
              querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log("Consulta firestore");
                console.log(doc.data());
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
        // User is signed out.
        // ...
      }
    });
  },
  data() {
    return {
      goDark: false
    }
  },
  methods: {
    logOut() {
      var context = this;
      let config = {
        withCredentials: true
      }
      firebase.auth().signOut().then(function() {
        console.log("Firebase logout");
      }).catch(function(error) {
        console.log("Error logout firebase");
        console.log(error.message);
      });
      axios.delete(consts.ipPVIService + 'resources/authenticate/', config)
        .then(() => {
          this.$router.push('/'); // Home
        }).catch(() => {
          this.$router.push('/'); // Home
        })
    }

  }
}
</script>
