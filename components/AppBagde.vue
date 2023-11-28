<template>
   <span v-if="color==='success'" class="statut-badge statut-badge_success">{{text}}</span>
   <span v-else-if="color==='error'" class="statut-badge statut-badge_error">{{text}}</span>
   <span v-else class="statut-badge statut-badge_loading">{{text}}</span>
</template>

<script>
export default {
  name: 'AppBadge',
  props: {
    color: {
      default: 'success',
      type: String
    },
    text: {
      type: String,
      default: 'En attente'
    }
  }
}
</script>

<style lang="scss" scoped>
.statut-badge {
    text-transform: capitalize;
    padding: 5px 7px;
    border-radius: 2px;
        display: block;
        font-size: 12px;
    text-align: center;
}

.statut-badge_success {
    background: #DEF5D7;
    color: #76A770;
}
.statut-badge_loading {
    background: #FEF6D6;
    color: #D8AA47;
}
.statut-badge_error {
       background: #FFEBDA;
    color: #EF793D;
}
</style>
