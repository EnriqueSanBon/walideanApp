<template>
<div>
  <v-progress-linear v-if="gridData.length==0 && !noDataFlag" :indeterminate="true"></v-progress-linear>
  <v-data-table :headers="headers" :items="gridData" class="elevation-1" color='primary'>
    <template slot="no-data">
      <v-alert :value="noDataFlag" color="error" icon="warning">
        {{emptyTableText}}
      </v-alert>
    </template>
    <template slot="items" slot-scope="props">
      <td>{{ props.item.docType }}</td>
      <td class="text-xs">{{props.item.id}}</td>
      <td class="text-xs">{{ props.item.expirationDate }}</td>
      <td class="text-xs">{{ props.item.processDate }}</td>
      <td class="justify-center layout px-0">
        <v-btn v-if="!docsPurchased.includes(props.item.id)" icon @click="openModal(props.item.id)">
          <v-icon>
            mobile_friendly
          </v-icon>
        </v-btn>
        <v-dialog v-model="dialog" persistent max-width="290">
          <v-card>
            <v-card-title class="headline">Purchase this document?</v-card-title>
            <v-card-text>You will pay 5 WLD to the owner of the document.</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" flat @click="dialog = false">Disagree</v-btn>
              <v-btn color="green darken-1" flat @click="purchaseDocument(selectedDocId)">Agree</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-btn icon v-if="docsPurchased.includes(props.item.id)" @click="navigateToVal(props.item.id)">
          <v-icon color="primary">
            mobile_friendly
          </v-icon>
        </v-btn>
        <!--<v-btn icon>
          <v-icon @click="navigateToDoc(props.item.id)">
            wallpaper
          </v-icon>
        </v-btn>-->
      </td>
    </template>
  </v-data-table>
  <v-snackbar v-model="snackbar" :color="snackbarColor" :timeout="6000">
    {{ snackbarText }}
    <v-btn dark flat @click="snackbar = false">
      Close
    </v-btn>
  </v-snackbar>
</div>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';
import consts from '../../consts.js';
import firebase from "firebase";
export default {
  computed: mapState(['clientData', 'docsPurchased', 'token', 'ethAddress']),
  components: {},
  mounted() {
    if (!this.clientData) {
      this.$router.push('/ClientDataRequest');
    }
    this.getDocuments();
  },
  data() {
    return {
      searchQuery: '',
      gridData: [],
      emptyTableText: 'Sorry, nothing to display here :(',
      headers: [
        { text: 'Document type', align: 'left', value: 'docType' },
        { text: 'Id', align: 'left', value: 'id' },
        { text: 'Expiration Date', value: 'expirationDate' },
        { text: 'Process Date', value: 'processDate' },
        { text: 'Actions', align: 'center', sorteable: false, value: 'name' }
      ],
      dialog: false,
      abi: consts.abi,
      contractAddress: consts.contractAddress,
      snackbarText: 'Error',
      snackbarColor: 'error',
      snackbar: false,
      selectedDocId: null,
      noDataFlag: false
    }
  },
  methods: {
    navigateToDoc: function(id) {
      this.$router.push('/document/:' + id);
    },
    navigateToVal: function(id) {
      this.$router.push('/document/' + id + '/validations');
    },
    openModal(selectedDocId) {
      this.dialog = true;
      this.selectedDocId = selectedDocId;
    },
    getDocuments() {
      let config = {
        headers: {
          'securityCode': this.token
        },
        withCredentials: true
      }
      axios.get(consts.ipPVIService + 'resources/users/' + this.clientData.userId + '/documents/', config)
        .then((response) => {
          this.gridData = response.data.documents;
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
    },
    purchaseDocumentTransaction(ownerAdress, documentPurchasedId) {
      var context = this;
      if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try { // Solicitar autorización a MetaMask (si fuese necesario)
          ethereum.enable().then(() => {
            // Instanciar el contrato de moneda Walidean (se necesita el ABI y dirección de contrato)
            var walideanABI = web3.eth.contract(this.abi);
            var walidean = walideanABI.at(this.contractAddress);
            // Eviar 10 WLD a la cuenta 0x43130D4f565fe9D9b06280617b51B634795B9583
            walidean.transfer('0x' + ownerAdress, 5, function(error, result) {
              if (!error) {
                context.$store.dispatch('addDocAsync', documentPurchasedId).then(() => {
                  //pasar al siguiente modulo
                  context.navigateToVal(documentPurchasedId);
                })
              } else {
                context.snackbar = true;
                context.snackbarText = 'Error: operation not confirmed';
                context.dialog = false;
              }
            });
          })
          // Si ocurre algún problema dentro del try (autorización / acceso MetaMask principalmente)
        } catch (error) {
          context.snackbar = true;
          context.color = 'error';
          context.snackbarText = error;
          context.dialog = false;
        } // En caso de que falle el primer if, es que MetaMask no está installado
      } else {
        context.snackbar = true;
        context.color = 'error';
        context.snackbarText = 'MetaMask is not installed';
      }
    },
    purchaseDocument(documentPurchasedId) {
      var context = this;
      var firestore = firebase.firestore();
      var providersRef = firestore.collection("providers");
      let config = {
        headers: {
          'securityCode': this.token
        },
        withCredentials: true
      }
      axios.get(consts.ipPVIService + 'resources/users/' + this.clientData.userId + '/documents/' + documentPurchasedId, config)
        .then((response) => {
          providersRef.where("pviId", "==", parseInt(response.data.providerId)).get().then((querySnapshot) => {
            if (querySnapshot.size == 1) {
              querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                if (context.ethAddress.toLowerCase() == doc.data().ethAddress.toLowerCase()) {
                  context.navigateToVal(documentPurchasedId);
                } else {
                  context.purchaseDocumentTransaction(doc.data().ethAddress, documentPurchasedId)
                }
              });
            } else {
              throw "Provider not found";
            }
          })
        }).catch((response) => {
          if (response.message === "Network Error") {
            context.snackbar = true;
            context.snackbarText = 'Network Error';
            context.dialog = false;
          } else {
            context.snackbar = true;
            context.snackbarText = 'Error: ' + response.status;
            context.dialog = false;
          }
        })
    }
  }
}
</script>
