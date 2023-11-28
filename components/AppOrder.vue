<template>
    <div class="mt-16 order-module">
      <h2 class="sr-only">Commandes</h2>

      <div class="space-y-20">
        <div>
          <h3 class="sr-only">Commande placée le <time datetime="2021-01-22">22 Janvier 2021</time></h3>

          <div class="bg-cac-100 rounded-lg py-6 px-4 sm:px-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 lg:space-x-8">
            <dl class="divide-y divide-gray-200 space-y-6 text-sm text-gray-600 flex-auto sm:divide-y-0 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-x-6 lg:w-1/2 lg:flex-none lg:gap-x-8">
              <div class="flex justify-between sm:block">
                <dt class="font-medium text-gray-900">Commande placée</dt>
                <dd class="sm:mt-1">
                  <time datetime="2021-01-22">22 Janvier 2021</time>
                </dd>
              </div>
              <div class="flex justify-between pt-6 sm:block sm:pt-0">
                <dt class="font-medium text-gray-900">Commande</dt>
                <dd class="sm:mt-1">#R45-533-CE7</dd>
              </div>
              <div class="flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0">
                <dt>Total</dt>
                <dd class="sm:mt-1">14000 FCFA</dd>
              </div>
            </dl>
            <a href="#" class="  w-full flex items-center justify-center bg-cac-500 mt-6 py-2 px-4 border border-cac-500 rounded-md shadow-sm text-sm font-medium text-white hover:bg-transparent hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:mt-0">
              Facture
              <span class="sr-only">for order WU88191111</span>
            </a>
          </div>
          
          <table class="mt-4 w-full text-gray-500 sm:mt-6">
            <caption class="sr-only">
              Products
            </caption>
            <thead class="sr-only text-sm text-gray-500 text-left sm:not-sr-only">
              <tr>
                <th scope="col" class="sm:w-2/5 lg:w-1/3 pr-8 py-3 font-normal">Produit</th>
                <th scope="col" class="hidden w-1/5 pr-8 py-3 font-normal sm:table-cell">Prix</th>
                <th scope="col" class="hidden pr-8 py-3 font-normal sm:table-cell">Status</th>
                <th scope="col" class="w-0 py-3 font-normal text-right">Info</th>
              </tr>
            </thead>
            <!-- product row -->
            <tbody class="border-b border-gray-200 divide-y divide-gray-200 text-sm sm:border-t">
              <tr>
                <td class="py-6 pr-8">
                  <div class="flex items-center">
                    <img src="https://tailwindui.com/img/ecommerce-images/order-history-page-02-product-01.jpg" alt="Detail of mechanical pencil tip with machined black steel shaft and chrome lead tip." class="w-16 h-16 object-center object-cover rounded mr-6">
                    <div>
                      <div class="font-medium text-gray-900">Machined Pen and Pencil Set</div>
                      <div class="mt-1 sm:hidden">7000 FCFA</div>
                    </div>
                  </div>
                </td>
                <td class="hidden py-6 pr-8 sm:table-cell">7000 FCFA</td>
                <td class="hidden py-6 pr-8 sm:table-cell">Livré le 25 Jan 2021</td>
                <td class="py-6 font-medium text-right whitespace-nowrap">
                  <a href="#" class="text-indigo-600">Voir<span class="hidden lg:inline"> Produits</span><span class="sr-only">, Bic Stylé Noir de marque</span></a>
                </td>
              </tr>

              <!-- More products... -->
            </tbody>
                        <!-- product row -->
            <tbody class="border-b border-gray-200 divide-y divide-gray-200 text-sm sm:border-t">
              <tr>
                <td class="py-6 pr-8">
                  <div class="flex items-center">
                    <img src="https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg" alt="Detail of mechanical pencil tip with machined black steel shaft and chrome lead tip." class="w-16 h-16 object-center object-cover rounded mr-6">
                    <div>
                      <div class="font-medium text-gray-900">Machined Pen and Pencil Set</div>
                      <div class="mt-1 sm:hidden">7000 FCFA</div>
                    </div>
                  </div>
                </td>
                <td class="hidden py-6 pr-8 sm:table-cell">7000 FCFA</td>
                <td class="hidden py-6 pr-8 sm:table-cell">Livré le 25 Jan 2021</td>
                <td class="py-6 font-medium text-right whitespace-nowrap">
                  <a href="#" class="text-indigo-600">Voir<span class="hidden lg:inline"> Produits</span><span class="sr-only">, Bic Stylé Noir de marque</span></a>
                </td>
              </tr>

              <!-- More products... -->
            </tbody>
          </table>
          
        </div>

        <!-- More orders... -->
      </div>
    </div>
</template>

<script>
    export default {
    name:'AppOrder'
        
    }
</script>

<style lang="scss" scoped>

</style>