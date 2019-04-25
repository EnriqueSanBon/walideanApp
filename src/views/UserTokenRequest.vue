<template>
<v-layout align-center justify-space-around row fill-height wrap>
  <v-flex xs12 md3>
    <TokenImput />
  </v-flex>
</v-layout>
</template>

<script>
import TokenImput from '../components/UserTokenRequestComponents/TokenImput'

export default {
  components: {
    TokenImput
  }
}
</script>
