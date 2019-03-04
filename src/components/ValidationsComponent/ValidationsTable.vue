<template>
<div>
  <v-progress-linear v-if="gridData.length==0 && !noDataFlag" :indeterminate="true"></v-progress-linear>
  <v-data-table :headers="headers" :items="gridData" class="elevation-1">
    <template slot="no-data">
      <v-alert :value="noDataFlag" color="error" icon="warning">
        Sorry, nothing to display here :(
      </v-alert>
    </template>
    <template slot="items" slot-scope="props">
      <td class="font-weight-bold">{{ props.item.description }}</td>
      <td class="text-xs">{{ props.item.timestamp }}</td>
      <td class="text-xs">{{ props.item.securityLevel }}</td>
    </template>
  </v-data-table>
</div>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';
import consts from '../../consts.js';
export default {
  computed: mapState(['clientData', 'token']),
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
      ],
      noDataFlag: false
    }
  },
  methods: {
    getValidations() {
      console.log("Consulta validaciones");
      let config = {
        headers: {
          'securityCode': this.token
        },
        withCredentials: true
      }
      axios.get(consts.ipPVIService + 'resources/users/' + this.clientData.userId + '/documents/' + this.$route.params.id + '/validations', config)
        .then((response) => {
          console.log("Consulta Validaciones");
          console.log("Token en validaciones");
          console.log(this.token);
          console.log(response.data);
          this.gridData = response.data.validations;
          if (response.data.validations.length == 0) {
            this.noDataFlag = true;
          }
        })
    }
  }
}
</script>
