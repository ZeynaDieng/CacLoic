// eslint-disable-next-line no-unused-vars
import _ from 'lodash'
import moment from 'moment'

export default {
  methods: {
    translateStatus (status) {
      switch (status) {
        case 'completed':
          return 'complet'
        case 'issued':
          return 'en livraison'
        case 'delivering':
          return 'en livraison'
        case 'handling':
          return 'en traitement'
        case 'pending':
          return 'en attente'
        case 'cancelled':
          return 'annulé'
        case 'failed':
          return 'refusé'
        case 'rejected':
          return 'rejeté'
        case 'passed':
          return 'en validation'
      }
    },
    formatDate (input, format = 'LLLL') {
      return moment(input).format(format)
    },
    toUpperCase (input) {
      return _.toUpper(input)
    },
    unitDisplay (input) {
      switch (input) {
        case 'kg':
          return 'kilogramme'
        case 'g':
          return 'gramme'
        case 'l':
          return 'litre'
        case 'cl':
          return 'centilitre'
        case 'ml':
          return 'millilitre'
        case 'u':
          return 'unité'
      }
    }
  }
}
