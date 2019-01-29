import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

// Helpers
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: '#51B189', //Verde
    secondary: '#FADF70', //Amarillo
    accent: colors.indigo.base // #3F51B5
  }
})