<template>
  <section class="rounded mx-auto container p-6 flex flex-col justify-around overflow-scroll">
    <header class="uppercase bg-primnary">
      <h1 class="text-xl font-bold text-primary uppercase ">Merci pour votre commande</h1>
    </header>
  <!--   <header class="uppercase bg-primary">
      <h1 class="text-3xl font-bold text-primary uppercase ">Merci pour votre commande</h1>
    </header>
    <div class="my-4">
      <div>
        <span class="font-semibold">Reference: </span>{{ order.reference }}
      </div>
      <div>
        <h3 class="text-2xl font-bold">Articles</h3>
      </div>
      <div>
        <div v-for="(item, index) of order.items" :key="index">
          <span>{{ item.product.name }}</span> x <b>{{ item.quantity }}</b>
        </div>
      </div>

    </div>
    <footer>
      <div>
      Votre commande est en cours de traitement, <br>Vous serez livré trés bientôt!
      </div>
    <div class=" my-4">
        <div class="flex flex-col justify-center content-center items-center" style="display: flex !important; flex-direction: column;">
          <b-button type="is-primary" tag="NuxtLink" :to="`/compte/commandes/${order._id}`" label="Aller à la commande"/>
        </div>
      </div> 
    </footer> -->


      <div class="">
     <div class="flex w-full">
      <div class="grid grid-cols-2 gap-12">
  
       <div class="text-sm font-light text-slate-500">
        <p class="text-sm font-normal text-slate-700">Adresse de libraison</p>
                <p>{{ order.deliveryZone}}</p>
        <p>{{ order.deliveryAddress.fullName }}</p>

        <p>{{ order.deliveryAddress.region }}</p>
        <p>{{ order.deliveryAddress.address }}</p>
        <p>{{ order.deliveryAddress.phone }}</p>
       </div>
       <div class="text-sm font-light text-slate-500">
        <p class="text-sm font-normal text-slate-700">Référence commande</p>
        <p>{{ order.reference }}</p>

        <p class="mt-2 text-sm font-normal text-slate-700">
         Date
        </p>
        <p>    {{ order.createdAt }}</p>
       </div>
  
      </div>
     </div>
    </div>

    <div class="">
     <div class="flex flex-col mx-0 mt-8">
      <table class="min-w-full divide-y divide-slate-500">
       <thead>
        <tr>
         <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0">
          Description
         </th>
         <th scope="col" class="hidden py-3.5 px-3 text-right text-sm font-normal text-slate-700 sm:table-cell">
          Quantité
         </th>
         <th scope="col" class="hidden py-3.5 px-3 text-right text-sm font-normal text-slate-700 sm:table-cell">
          P.U
         </th>
         <th scope="col" class="py-3.5 pl-3 pr-4 text-right text-sm font-normal text-slate-700 sm:pr-6 md:pr-0">
          Montant
         </th>
        </tr>
       </thead>
       <tbody>
        <tr  v-for="(item, index) of order.items" :key="index" class="border-b border-slate-200">
         <td class="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
          <div class="font-medium text-slate-700">{{ item.product.name }}</div>
          <div class="mt-0.5 text-slate-500 sm:hidden">
              {{ item.quantity }}  x  {{ item.product.price }}
          </div>
         </td>
         <td class="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
          {{ item.quantity }}
         </td>
         <td class="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
          {{ item.product.price }}
         </td>
         <td class="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
          {{ item.totalPrice }}
         </td>
        </tr> 

        <!-- Here you can write more products/tasks that you want to charge for-->
       </tbody>
       <tfoot>
       
        <tr>
         <th scope="row" colspan="3" class="hidden pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0">
          Sous-total
         </th>
         <th scope="row" class="pt-6 pl-4 pr-3 text-sm font-light text-left text-slate-500 sm:hidden">
          Subtotal
         </th>
         <td class="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
          {{ order.transaction.cartTotalPrice }}
         </td>
        </tr>
                <tr>
         <th scope="row" colspan="3" class="hidden pt-4 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0">
          Livraison
         </th>
         <th scope="row" class="pt-4 pl-4 pr-3 text-sm font-light text-left text-slate-500 sm:hidden">
          Livraison
         </th>
         <td class="pt-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
           {{ order.transaction.delivery }}
         </td>
        </tr>
       <!--  <tr>
         <th scope="row" colspan="3" class="hidden pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0">
          Discount
         </th>
         <th scope="row" class="pt-6 pl-4 pr-3 text-sm font-light text-left text-slate-500 sm:hidden">
          Discount
         </th>
         <td class="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
          $0.00
         </td>
        </tr>
        <tr>
         <th scope="row" colspan="3" class="hidden pt-4 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0">
          Tax
         </th>
         <th scope="row" class="pt-4 pl-4 pr-3 text-sm font-light text-left text-slate-500 sm:hidden">
          Tax
         </th>
         <td class="pt-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
          $0.00
         </td>
        </tr> -->
        <tr>
         <th scope="row" colspan="3" class="hidden pt-4 pl-6 pr-3 text-sm font-normal text-right text-slate-700 sm:table-cell md:pl-0">
          Total
         </th>
         <th scope="row" class="pt-4 pl-4 pr-3 text-sm font-normal text-left text-slate-700 sm:hidden">
          Total
         </th>
         <td class="pt-4 pl-3 pr-4 text-sm font-normal text-right text-slate-700 sm:pr-6 md:pr-0">
         {{ order.transaction.total }}
         </td>
        </tr>
       </tfoot>
      </table>
     </div>
    </div>

  </section>
</template>

<script>
export default {
  name: "OrderTickerModal",
  props: {
    order: {
      type: Object,
      default: () => ({})
    },
    transaction: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    $route() {
      this.$modal.hideAll();
    }
  },
  methods: {
    async downloadTicket() {

    }
  }
}
</script>

<style scoped>

</style>
