<template>
<v-layout align-center justify-space-around row fill-height wrap>
  <v-flex xs12 sm10>
    <ETHLogs />
  </v-flex>
</v-layout>
</template>


<script>
import ETHLogs from '../components/StaticsComponents/ETHLogs'

export default {
  components: { ETHLogs },
}
</script>
