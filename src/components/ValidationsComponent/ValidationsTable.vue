<template>
<v-data-table :headers="headers" :items="gridData" class="elevation-1">
  <template slot="items" slot-scope="props">
    <td class="font-weight-bold">{{ props.item.description }}</td>
    <td class="text-xs">{{ props.item.timestamp }}</td>
    <td class="text-xs">{{ props.item.securityLevel }}</td>
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
    this.getValidations();
  },
  data() {
    return {
      gridData: [],
      headers: [
        { text: 'Description', align: 'left', value: 'description' },
        { text: 'Validation Date', value: 'timestamp' },
        { text: 'Security Level', value: 'securityLevel' }
      ]
    }
  },
  methods: {
    getValidations() {
      console.log("Consulta validaciones");
      let config = {
        headers: {
          'securityCode': this.token
        }
      }
      axios.get('http://localhost:8080/PVIService/resources/users/' + this.clientData.userId + '/documents/' + this.$route.params.id + '/validations', config)
        .then((response) => {
          console.log("Consulta Validaciones");
          console.log(response.data);
          this.gridData = response.data.validations;
        })
    }
  }
}
</script>
