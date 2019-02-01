<template>
<v-form>
  <v-container text-xs-center>
    <v-layout align-center justify-space-around row fill-height>
      <v-flex xs12 md6>
        <v-text-field v-model="firstname" label="First name" required></v-text-field>
      </v-flex>
      <v-flex xs12 md6>
        <v-text-field v-model="surname1" label="Surname 1" required></v-text-field>
      </v-flex>
      <v-flex xs12 md6>
        <v-text-field v-model="surname2" label="Surname 2" required></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout align-center justify-space-around row fill-height>
      <v-flex xs12 md6>
        <v-text-field v-model="adress" label="Adress" required></v-text-field>
      </v-flex>
      <v-flex xs12 md6>
        <v-text-field v-model="cp" label="CP" required></v-text-field>
      </v-flex>
      <v-flex xs12 md6>
        <v-menu v-model="menu2" :close-on-content-click="false" full-width max-width="290">
          <v-text-field slot="activator" :value="date" clearable label="Formatted with datefns" readonly></v-text-field>
          <v-date-picker v-model="date" @change="menu2 = false"></v-date-picker>
        </v-menu>
      </v-flex>
    </v-layout>
    <v-layout align-center justify-space-around row fill-height>
      <v-flex xs12 md6>
        <v-select v-model="nacionality" :items="countries" label="Nacionality"></v-select>
      </v-flex>
      <v-flex xs12 md6>
        <v-select v-model="state" :items="provinces" label="Province"></v-select>
      </v-flex>
      <v-flex xs12 md6>
        <v-radio-group v-model="radioGroup">
          <v-radio v-for="gender in gender" :key="gender" :label="`Gender ${gender}`" :value="gender" color="primary"></v-radio>
        </v-radio-group>
      </v-flex>
    </v-layout>
    <v-btn round color="secondary" class="primary--text" small dark>Submit Document</v-btn>
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
