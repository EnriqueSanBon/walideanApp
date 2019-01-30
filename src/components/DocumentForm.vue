<template>
<div>
  <v-form>
    <v-container text-xs-center>
      <v-layout align-center justify-space-around row fill-height>
        <v-flex xs12 sm8>
          <v-text-field v-model="numberId" label="Number ID" required></v-text-field>
          <v-radio-group v-model="docTypeSelected">
            <v-layout row wrap>
              <v-flex v-for="button in documentTypes" xs4>
                <v-radio :key="button" :label="button" :value="button" color="primary"></v-radio>
              </v-flex>
            </v-layout>
          </v-radio-group>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import consts from '../consts.js';
export default {
  data() {
    return {
      numberId: null,
      documentTypes: consts.documentTypes,
      docTypeSelected: consts.documentTypes[0]
    }
  },
  methods: {}
}
</script>
