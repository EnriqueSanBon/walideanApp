<template>
<div>
  <v-carousel>
    <v-carousel-item v-for="(url,i) in downloadURLs" :key="i" :src="url"></v-carousel-item>
  </v-carousel>
</div>
</template>

<script>
import {
  mapState
} from 'vuex';
import consts from '../../consts.js';
import firebase from "firebase";
import axios from 'axios';
export default {
  computed: mapState(['clientData', 'token']),
  components: {},
  mounted() {
    console.log("Se monta");
    this.getDocumentInfo();
  },
  data() {
    return {
      urls: [],
      downloadURLs: []
    }
  },
  methods: {
    getImgUrls(storageUrl) {
      console.log("Consulta direcciones");
      console.log(storageUrl);
      var context = this;
      var firestore = firebase.firestore();
      var documentsRef = firestore.collection("documents");
      documentsRef.doc(storageUrl).get()
        .then((documentSnapshot) => {
          console.log("Document Snapshot");
          console.log(documentSnapshot);
          console.log(documentSnapshot.data());
          var document = documentSnapshot.data();
          if (document != null) {
            context.urls = document.files
            this.getServerImg(storageUrl);
          } else {
            console.log("error");
          }
        })
    },
    getServerImg(storageUrl) {
      var context = this;
      var storage = firebase.storage();
      var storageRef = storage.ref();
      var user = firebase.auth().currentUser;

      console.log("urls");
      console.log(this.urls);
      this.urls.forEach(function(url) {
        console.log("url");
        console.log(url);
        // Create a reference to the file we want to download
        var imgRef = storageRef.child(storageUrl + '/' + user.uid + '/' + url);
        // Get the download URL
        imgRef.getDownloadURL()
          .then(function(downloadUrl) {
            // Insert url into an <img> tag to "download"
            context.downloadURLs.push(downloadUrl);
          }).catch(function(error) {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            console.log(error);
            switch (error.code) {
              case 'storage/object-not-found':
                // File doesn't exist
                console.log("File doesn't exist");
                break;

              case 'storage/unauthorized':
                // User doesn't have permission to access the object
                console.log("User doesn't have permission to access the object");
                break;

              case 'storage/canceled':
                // User canceled the upload
                console.log("User canceled the upload");
                break;

              case 'storage/unknown':
                // Unknown error occurred, inspect the server response
                console.log("Unknown error occurred, inspect the server response");
                break;
            }
          });
      });

    },
    getDocumentInfo() {
      console.log("nepe");
      var context = this;
      let config = {
        headers: {
          'securityCode': this.token
        },
        withCredentials: true
      }
      axios.get(consts.ipPVIService + 'resources/users/' + (this.clientData ? this.clientData.userId : this.$store.state.providerId) + '/documents/' + this.$route.params.id, config)
        .then((response) => {
          console.log("Document Info");
          console.log(response.data);
          if (!response.data.item) {
            console.log("No storage pointer");
          } else {
            var user = firebase.auth().currentUser;
            this.getImgUrls(response.data.item + user.uid);
          }
        })
    }
  }

}
</script>
