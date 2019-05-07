<template>
<v-layout align-center justify-space-around row fill-height wrap>
  <v-flex xs12 md4>
    <RegisterForm />
  </v-flex>
</v-layout>
</template>

<script>
import RegisterForm from '../components/RegisterComponents/RegisterForm'

export default {
  components: {
    RegisterForm
  }
}
</script>
