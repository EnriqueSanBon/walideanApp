<template>
<v-data-table :headers="headers" :items="gridData" class="elevation-1">
  <template slot="items" slot-scope="props">
    <td>{{ props.item.docType }}</td>
    <td class="text-xs">{{ props.item.expirationDate }}</td>
    <td class="text-xs">{{ props.item.processDate }}</td>
    <td class="justify-center layout px-0">
      <v-btn icon>
        <v-icon class="mr-2" @click="navigateToVal(props.item.id)">
          mobile_friendly
        </v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon @click="navigateToDoc(props.item.id)">
          wallpaper
        </v-icon>
      </v-btn>
    </td>
  </template>
</v-data-table>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';
export default {
  computed: mapState(['clientData']),
  components: {},
  mounted() {
    console.log("Mounted");
    this.getDocuments();
  },
  data() {
    return {
      searchQuery: '',
      gridData: [
        /*
                { Tipo: 'Nomina', Numero: 12355568 },
                { Tipo: 'DNI', Numero: '523698978A' },
                { Tipo: 'Nomina', Numero: 25558745 },
                { Tipo: 'Carnet', Numero: 5888878 }*/
      ],
      headers: [
        { text: 'Document type', align: 'left', value: 'docType' },
        { text: 'Expiration Date', value: 'expirationDate' },
        { text: 'Process Date', value: 'processDate' },
        { text: 'Actions', sorteable: false, value: 'name' }
      ]
    }
  },
  methods: {
    navigateToDoc: function(id) {
      console.log("navigateToDoc con id " + id);
      this.$router.push('/document/:' + id, () => console.log('Ruta cambiada')); // Home
    },
    navigateToVal: function(id) {
      console.log("Validations Logo clicado");
      //this.$router.push('/document/:' + id + '/validations', () => console.log('Ruta cambiada')); // Home
    },
    getDocuments() {
      let config = {
        headers: {
          'securityCode': this.token
        }
      }
      axios.get('http://localhost:8080/PVIService/resources/users/' + this.clientData.userId + '/documents', config)
        .then((response) => {
          console.log("Consulta Documentos");
          console.log(response.data);
          this.gridData = response.data.documents;
        })
    }
  }
}
</script>
