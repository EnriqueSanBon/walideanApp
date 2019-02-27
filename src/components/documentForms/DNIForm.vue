<template>
<v-form>
  <v-container text-xs-center>
    <v-layout align-center justify-space-around row fill-height>
      <v-flex xs12 md12>
        <v-menu v-model="menu2" :close-on-content-click="false" full-width max-width="290">
          <v-text-field slot="activator" :value="date" clearable label="Expiration date" readonly></v-text-field>
          <v-date-picker v-model="date" @change="menu2 = false"></v-date-picker>
        </v-menu>
      </v-flex>
    </v-layout>
  </v-container>
</v-form>
</template>

<script>
import consts from '../../consts.js';
export default {
  data() {
    return {
      provinces: consts.provinces,
      countries: consts.countries,
      firstname: null,
      surname1: null,
      surname2: null,
      adress: null,
      cp: null,
      nacionality: null,
      state: null,
      radioGroup: null,
      date: new Date().toISOString().substr(0, 10),
      gender: ['Male', 'Female'],
      menu1: false,
      menu2: false
    }
  },
  methods: {}
}
</script>
