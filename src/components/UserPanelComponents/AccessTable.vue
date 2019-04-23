<template>
<div>
  <p>Este es tu historial de transacciones</p>
  <v-data-table :headers="headers" :items="gridData" class="elevation-1" color='primary'>
    <template slot="items" slot-scope="props">
      <td>{{ props.item.date }}</td>
      <td class="text-xs">{{props.item.documentId}}</td>
      <td class="text-xs">{{ props.item.documentType }}</td>
      <td class="text-xs">{{ props.item.providerId }}</td>
    </template>
  </v-data-table>
</div>
</template>

<script>
import consts from '../../consts.js';
import firebase from "firebase";
export default {
  mounted() {
    this.getDocuments();
  },
  data() {
    return {
      gridData: [],
      headers: [{
          text: 'Date',
          align: 'left',
          value: 'date'
        },
        {
          text: 'Document Id',
          align: 'left',
          value: 'documentId'
        },
        {
          text: 'Document Type',
          align: 'left',
          value: 'documentType'
        },
        {
          text: 'Provider Id',
          align: 'left',
          value: 'providerId'
        }
      ],
    }
  },
  methods: {
    getDocuments() {
      var firestore = firebase.firestore();
      var providersRef = firestore.collection("accessHistory");
      var context = this;
      providersRef.where("userId", "==", this.$store.state.providerId).get()
        .then((querySnapshot) => {
          var context = this;
          if (querySnapshot.size > 0) {
            console.log("transacciones encontradas");
            querySnapshot.forEach(function(doc) {
              console.log(doc.data());
              context.gridData.push(doc.data())
            })
          }
        })
    }
  }
}
</script>
