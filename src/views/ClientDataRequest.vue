<template>
<v-layout align-center justify-space-around row fill-height wrap>
  <v-flex xs12 md3>
    <ProviderBalance />
  </v-flex>
  <v-flex xs12 md8>
    <ClientForm />
  </v-flex>
</v-layout>
</template>

<script>
import ProviderBalance from '../components/ClientComponents/ProviderBalance'
import ClientForm from '../components/ClientDataRequestComponents/ClientForm'

export default {
  components: {
    ClientForm,
    ProviderBalance
  }
}
</script>
