<template>
<div>
  <v-data-table :headers="headers" :items="gridData" class="elevation-1" color='primary'>
    <template slot="items" slot-scope="props">
      <td class="text-xs">{{ props.item.from }}</td>
      <td class="text-xs">{{ props.item.to }}</td>
      <td class="text-xs">{{ props.item.WLD }}</td>
      <td class="text-xs">{{ props.item.gas }}</td>
      <td class="text-xs">{{ props.item.doc }}</td>
      <td class="text-xs">{{ props.item.date }}</td>
      <td class="text-xs">
        <a :href="props.item.transactionHash">See transaction</a>
      </td>
    </template>
  </v-data-table>
  <v-layout align-center justify-space-around row fill-height wrap>
    <v-flex xs12 sm6>
      <v-sparkline :show-labels="false" :fill="fill" :gradient="gradient" :line-width="width" :padding="padding" :smooth="radius || false" :value="incomeChartValues" auto-draw></v-sparkline>
    </v-flex>
    <v-flex xs12 sm6>
      <v-sparkline :fill="fill" :gradient="gradient" :line-width="width" :padding="padding" :smooth="radius || false" :value="outcomeChartValues" auto-draw></v-sparkline>
    </v-flex>
  </v-layout>
</div>
</template>

<script>
import axios from 'axios';
const gradients = [
  ['#222'],
  ['#42b3f4'],
  ['red', 'orange', 'yellow'],
  ['purple', 'violet'],
  ['#00c6ff', '#F0F', '#FF0'],
  ['#f72047', '#ffd200', '#1feaea']
]
export default {
  mounted() {
    this.getStatics();
  },
  data() {
    return {
      gridData: [],
      headers: [
        { text: 'From', align: 'left', value: 'from' },
        { text: 'To', value: 'to' },
        { text: 'WLD', value: 'WLD' },
        { text: 'Gas', value: 'gas' },
        { text: 'DocId', value: 'doc' },
        { text: 'Date', value: 'date' },
        { text: 'URL', value: 'transactionHash' }
      ],

      fill: true,
      gradient: gradients[4],
      gradients,
      padding: 8,
      radius: 0,
      incomeChartValues: [0, 0],
      outcomeChartValues: [0, 0],
      width: 0.5
    }
  },
  methods: {
    getStatics() {
      let config = {
        params: {
          'module': 'logs',
          'action': 'getLogs',
          'address': '0xAcb75E759725816629b112927220b2d664808BB2', //contract
          'fromBlock': '4935210', //genesis block
          'toBlock': 'latest',
          'topic1': '0x000000000000000000000000b078a8db38dfb6b298a215a92e96a7eeafb4ff5b', //From
          'topic2': '0x000000000000000000000000b078a8db38dfb6b298a215a92e96a7eeafb4ff5b', //To
          'topic1_2_opr': 'or' //type
        }
      }
      axios.get('https://api-ropsten.etherscan.io/api', config)
        .then((response) => {
          console.log("Consulta Estadistcias");
          console.log(response.data);

          this.gridData = response.data.result.sort(function(a, b) {
            return parseInt(b.timeStamp, 16) - parseInt(a.timeStamp, 16);
          });
          this.gridData = this.gridData.map((obj) => {
            var formatedObj = {};
            formatedObj.date = new Date(0);
            formatedObj.date.setUTCSeconds(parseInt(obj.timeStamp, 16));
            formatedObj.gas = parseInt(obj.gasUsed, 16) / Math.pow(10, 9);
            formatedObj.WLD = parseInt(obj.data, 16);
            formatedObj.from = '0x' + obj.topics[1].slice(26, 30) + '...' + obj.topics[1].slice(-4);
            formatedObj.to = '0x' + obj.topics[2].slice(26, 30) + '...' + obj.topics[2].slice(-4);
            formatedObj.transactionHash = 'https://ropsten.etherscan.io/tx/' + obj.transactionHash;
            if (obj.topics[3]) {
              formatedObj.doc = parseInt(obj.topics[3], 16);
            }
            if (obj.topics[1] == '0x000000000000000000000000b078a8db38dfb6b298a215a92e96a7eeafb4ff5b') {
              this.outcomeChartValues.push(formatedObj.WLD)
            } else {
              this.incomeChartValues.push(formatedObj.WLD)
            }
            return formatedObj
          })

          console.log("Formateado");
          console.log(this.gridData);
          console.log("Chart Data");
          console.log(this.chartValues);
        })
    }
  }
}
</script>


https://api-ropsten.etherscan.io/api?module=logs&action=getLogs&address=0xAcb75E759725816629b112927220b2d664808BB2&fromBlock=4935210&toBlock=latest&topic1=0x000000000000000000000000b078a8db38dfb6b298a215a92e96a7eeafb4ff5b&topic2=0x000000000000000000000000b078a8db38dfb6b298a215a92e96a7eeafb4ff5b&topic1_2_opr=or
