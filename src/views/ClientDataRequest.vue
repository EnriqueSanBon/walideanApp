<template>
<v-layout align-center justify-space-around row fill-height wrap>
  <v-flex xs12 md8>
    <ClientForm />
  </v-flex>
</v-layout>
</template>

<script>
import ClientForm from '../components/ClientDataRequestComponents/ClientForm'

export default {
  components: {
    ClientForm
  }
}
</script>
