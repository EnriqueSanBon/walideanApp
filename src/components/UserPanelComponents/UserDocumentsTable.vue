<template>
<div>
  <v-progress-linear v-if="gridData.length==0 && !noDataFlag" :indeterminate="true"></v-progress-linear>
  <h3>Current Documents</h3>
  <v-data-table :headers="headers" :items="newDocuments" class="elevation-1" color='primary'>
    <template slot="no-data">
      <v-alert :value="noDataFlag" color="error" icon="warning">
        {{emptyTableText}}
      </v-alert>
    </template>
    <template slot="items" slot-scope="props">
      <td>{{ props.item.docType }}</td>
      <td class="text-xs">{{props.item.id}}</td>
      <td class="text-xs">{{ props.item.expirationDateString }}</td>
      <td class="text-xs">{{ props.item.processDateString }}</td>
      <td class="justify-center layout px-0">
        <v-btn icon @click="navigateToVal(props.item.id)">
          <v-icon>
            mobile_friendly
          </v-icon>
        </v-btn>
      </td>
    </template>
  </v-data-table>
  <h3>Expired Documents</h3>
  <v-data-table :headers="headers" :items="oldDocuments" class="elevation-1" color='primary'>
    <template slot="no-data">
      <v-alert :value="noDataFlag" color="error" icon="warning">
        {{emptyTableText}}
      </v-alert>
    </template>
    <template slot="items" slot-scope="props">
      <td>{{ props.item.docType }}</td>
      <td class="text-xs">{{props.item.id}}</td>
      <td class="text-xs">{{ props.item.expirationDateString }}</td>
      <td class="text-xs">{{ props.item.processDateString }}</td>
      <td class="justify-center layout px-0">
        <v-btn icon @click="navigateToVal(props.item.id)">
          <v-icon>
            mobile_friendly
          </v-icon>
        </v-btn>
      </td>
    </template>
  </v-data-table>
</div>
</template>

<script>
import {
  mapState
} from 'vuex';
import axios from 'axios';
import consts from '../../consts.js';
import firebase from "firebase";
export default {
  computed: mapState(['clientData', 'docsPurchased', 'token', 'ethAddress']),
  components: {},
  mounted() {
    this.getDocuments();
  },
  data() {
    return {
      gridData: [],
      oldDocuments: [],
      newDocuments: [],
      emptyTableText: 'Sorry, nothing to display here :(',
      headers: [{
          text: 'Document type',
          align: 'left',
          value: 'docType'
        },
        {
          text: 'Id',
          align: 'left',
          value: 'id'
        },
        {
          text: 'Expiration Date',
          value: 'expirationDateString'
        },
        {
          text: 'Process Date',
          value: 'processDateString'
        },
        {
          text: 'Actions',
          align: 'center',
          sorteable: false,
          value: 'name'
        }
      ],
      noDataFlag: false
    }
  },
  methods: {
    navigateToVal: function(id) {
      this.$router.push('/document/' + id + '/validations');
    },
    getDocuments() {
      let config = {
        headers: {
          'securityCode': this.token
        },
        withCredentials: true
      }
      axios.get(consts.ipPVIService + 'resources/users/' + this.$store.state.providerId + '/documents/', config)
        .then((response) => {
          const today = new Date().toISOString().substr(0, 10).replace(/-/g, "")
          this.gridData = response.data.documents.map(element => {
            element.expirationDateString = [element.expirationDate.toString().slice(0, 4), "-", element.expirationDate.toString().slice(4, 6), "-", element.expirationDate.toString().slice(6)].join('');
            element.processDateString = [element.processDate.toString().slice(0, 4), "-", element.processDate.toString().slice(4, 6), "-", element.processDate.toString().slice(6)].join('');
            return element
          });
          console.log(this.gridData);
          this.oldDocuments = this.gridData.filter(document => document.expirationDate < today)
          this.newDocuments = this.gridData.filter(document => document.expirationDate > today)
          if (response.data.documents.length == 0) {
            this.noDataFlag = true;
            this.emptyTableText = "No documents for this user"
          }
        })
        .catch((response) => {
          if (response.message === "Network Error") {
            this.noDataFlag = true;
            this.emptyTableText = "Network Error: please check connection"
          } else {
            this.noDataFlag = true;
            this.emptyTableText = "No documents for this user"
          }
        })
    }
  }
}
</script>
