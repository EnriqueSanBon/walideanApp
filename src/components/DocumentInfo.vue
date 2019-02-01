<template>
<v-card>
  <v-card-title>
    <h4>Client Data</h4>
  </v-card-title>
  <v-divider></v-divider>
  <v-list dense>
    <v-list-tile v-for="(value, key) in this.currentDocument.data">
      <v-list-tile-content class="font-weight-bold">{{ key }}:</v-list-tile-content>
      <v-list-tile-content class="align-end">{{ value }}</v-list-tile-content>
    </v-list-tile>
  </v-list>
</v-card>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';
import consts from '../consts.js';
export default {
  computed: mapState(['clientData']),
  mounted() {
    console.log("Mounted");
    this.getDocument();
  },
  data() {
    return {
      currentDocument: '',
    }
  },
  methods: {
    getDocument() {
      let config = {
        headers: {
          'securityCode': this.token
        }
      }
      console.log("La llamada al document es");
      console.log(consts.ipPVIService + consts.portPVIService + '/PVIService/resources/users/' + this.clientData.userId + '/documents/' + this.$route.params.id);
      axios.get('http://localhost:8080/PVIService/resources/users/' + this.clientData.userId + '/documents/' + this.$route.params.id, config)
        .then((response) => {
          console.log("Consulta datos Documento");
          console.log(response.data);
          this.currentDocument = response.data
        })
    }
  }
}
</script>
