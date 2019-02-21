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
        <a :href="props.item.transactionHash" target="_blank">See transaction</a>
      </td>
    </template>
  </v-data-table>
  <v-layout align-center justify-space-around row fill-height wrap>
    <v-flex xs12 sm12>
      <line-chart :chart-data="datacollection" :options="chartOptions" :height="90"></line-chart>
    </v-flex>

  </v-layout>
</div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import LineChart from '../../components/Charts/LineChart.vue'

export default {
  computed: mapState(['ethAddress']),
  components: {
    LineChart
  },
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
      datacollection: null,
      labels: [],
      dataset0: [],
      dataset1: [],
      chartOptions: {
        aspectRatio: 0.5
      },
      ethAddressFormated: null
    }
  },
  methods: {
    getStatics() {
      this.ethAddressFormated = '0x000000000000000000000000' + this.ethAddress;
      console.log(this.ethAddressFormated);
      var dateArray = this.getDateArray(Date.now() - 2629750000, Date.now());
      var context = this;
      let config = {
        params: {
          'module': 'logs',
          'action': 'getLogs',
          'address': '0xAcb75E759725816629b112927220b2d664808BB2', //contract
          'fromBlock': '4935210', //genesis block
          'toBlock': 'latest',
          'topic1': this.ethAddressFormated, //From
          'topic2': this.ethAddressFormated, //To
          'topic1_2_opr': 'or' //type
        }
      }
      axios.get('https://api-ropsten.etherscan.io/api', config)
        .then((response) => {
          this.gridData = response.data.result.sort(function(a, b) {
            return parseInt(a.timeStamp, 16) - parseInt(b.timeStamp, 16);
          });
          this.gridData = this.gridData.map((obj) => {
            //Format response
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
            //compose chart arrays
            var formatedDate = formatedObj.date.getDate() + '/' + (formatedObj.date.getMonth() + 1) + '/' + formatedObj.date.getFullYear();
            var indexInDates = dateArray.findIndex(elem => elem.date === formatedDate);
            if (indexInDates >= 0) {
              if (obj.topics[1] == context.ethAddressFormated) {
                dateArray[indexInDates].out += formatedObj.WLD
              } else {
                dateArray[indexInDates].in += formatedObj.WLD
              }
            }
            return formatedObj
          })
          dateArray.map((obj) => {
            this.labels.push(obj.date)
            this.dataset0.push(obj.out)
            this.dataset1.push(obj.in)
          })
          this.datacollection = {
            labels: this.labels,
            datasets: [{
              label: 'Purchases',
              backgroundColor: '#51B189',
              data: this.dataset0
            }, {
              label: 'Sales',
              backgroundColor: '#FADF70',
              data: this.dataset1
            }]
          }
        })
    },
    getDateArray(start, end) {
      var arr = []
      var dt = new Date(start);
      while (dt <= end) {
        var element = {
          date: null,
          out: 0,
          in: 0
        }
        var now = new Date(dt)
        element.date = now.getDate().toString() + '/' + (now.getMonth() + 1).toString() + '/' + now.getFullYear().toString()
        arr.push(element);
        dt.setDate(dt.getDate() + 1);
      }
      return arr;
    }
  }
}
</script>
