<template>
<v-card>
  <v-card-title>
    <h4>Client Data</h4>
  </v-card-title>
  <v-divider></v-divider>
  <v-list dense>
    <v-list-tile v-for="(value, key) in clientData">
      <v-list-tile-content class="font-weight-bold">{{ key }}:</v-list-tile-content>
      <v-list-tile-content class="align-end">{{ value }}</v-list-tile-content>
    </v-list-tile>
  </v-list>
</v-card>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';
export default {
  computed: mapState(['clientData']),
  components: {},
  data() {
    return {
      searchQuery: '',
      gridColumns: ['Tipo', 'Numero', 'Documento', 'Validacion'],
      gridData: [
        /*
                { Tipo: 'Nomina', Numero: 12355568 },
                { Tipo: 'DNI', Numero: '523698978A' },
                { Tipo: 'Nomina', Numero: 25558745 },
                { Tipo: 'Carnet', Numero: 5888878 }*/
      ]
    }
  },
  methods: {}
}
</script>
