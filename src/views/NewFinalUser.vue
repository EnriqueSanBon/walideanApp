<template>
<v-layout align-center justify-space-around row fill-height wrap>
  <v-flex xs12 md8>
    <NewUserForm />
  </v-flex>
</v-layout>
</template>

<script>
import NewUserForm from '../components/RegisterFinalUser/NewUserForm'

export default {
  components: {
    NewUserForm
  }
}
</script>
