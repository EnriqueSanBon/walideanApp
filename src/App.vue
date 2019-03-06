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
    <router-link class="secondary--text" to="/">Home</router-link>
    <router-link class="secondary--text" to="/ClientDataRequest">ClientDataRequest</router-link>
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
export default {
  name: 'App',
  components: {},
  mounted() {
    this.$router.onReady(() => { this.$router.push('/') }, () => { this.$router.push('/') })
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
