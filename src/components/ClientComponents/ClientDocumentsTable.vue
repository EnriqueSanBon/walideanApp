<template>
<div>
  <v-progress-linear v-if="gridData.length==0" :indeterminate="true"></v-progress-linear>
  <v-data-table :headers="headers" :items="gridData" class="elevation-1" color='primary'>
    <template slot="no-data">
      <v-alert :value="true" color="error" icon="warning">
        Sorry, nothing to display here :(
      </v-alert>
    </template>
    <template slot="items" slot-scope="props">
      <td>{{ props.item.docType }}</td>
      <td class="text-xs">{{props.item.id}}</td>
      <td class="text-xs">{{ props.item.expirationDate }}</td>
      <td class="text-xs">{{ props.item.processDate }}</td>
      <td class="justify-center layout px-0">
        <v-btn v-if="!docsPurchased.includes(props.item.id)" icon @click="openModal(props.item.id)">
          <v-icon class="mr-2">
            mobile_friendly
          </v-icon>
        </v-btn>
        <v-dialog v-model="dialog" persistent max-width="290">
          <v-card>
            <v-card-title class="headline">Purchase this document? {{selectedDocId}}</v-card-title>
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
        <v-btn icon>
          <v-icon @click="navigateToDoc(props.item.id)">
            wallpaper
          </v-icon>
        </v-btn>
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
  computed: mapState(['clientData', 'docsPurchased', 'token']),
  components: {},
  mounted() {
    console.log("Mounted");
    this.getDocuments();
  },
  data() {
    return {
      searchQuery: '',
      gridData: [],
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
      snackbarText: 'Texto de prueba',
      snackbarColor: 'error',
      snackbar: false,
      selectedDocId: null
    }
  },
  methods: {
    navigateToDoc: function(id) {
      console.log("navigateToDoc con id " + id);
      this.$router.push('/document/:' + id, () => console.log('Ruta cambiada'));
    },
    navigateToVal: function(id) {
      console.log("Validations Logo clicado");
      this.$router.push('/document/' + id + '/validations', () => console.log('Ruta cambiada'));
    },
    openModal(selectedDocId) {
      this.dialog = true;
      this.selectedDocId = selectedDocId;
    },
    getDocuments() {
      console.log("Token consulta documento");
      console.log(this.token);
      let config = {
        headers: {
          'securityCode': this.token
        },
        withCredentials: true
      }
      axios.get(consts.ipPVIService + 'resources/users/' + this.clientData.userId + '/documents/', config)
        .then((response) => {
          console.log("Consulta Documentos");
          console.log(response.data);
          this.gridData = response.data.documents;
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
            walidean.transfer('0x' + ownerAdress, 1, function(error, result) {
              if (!error) {
                console.log("Transaction hash: " + result);
                console.log(documentPurchasedId);
                context.$store.dispatch('addDocAsync', documentPurchasedId).then(() => {
                  //pasar al siguiente modulo
                  console.log("Cambiando de ruta");
                  context.navigateToVal(documentPurchasedId);
                })
              } else {
                console.log(error);
                context.snackbar = true;
                context.snackbarText = 'Error, operation not confirmed';
              }
            });
          })
          // Si ocurre algún problema dentro del try (autorización / acceso MetaMask principalmente)
        } catch (error) {
          console.log(error);
        } // En caso de que falle el primer if, es que MetaMask no está installado
      } else {
        console.log("MetaMask is not installed");
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
          console.log("Documento a comprar");
          console.log(response.data);
          providersRef.where("pviId", "==", parseInt(response.data.providerId)).get().then((querySnapshot) => {
            console.log(querySnapshot);
            if (querySnapshot.size == 1) {
              querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.data());
                context.purchaseDocumentTransaction(doc.data().ethAddress, documentPurchasedId)
              });
            } else {
              console.log("Proveedor no encontrado");
            }
          })
        })
    }
  }
}
</script>
