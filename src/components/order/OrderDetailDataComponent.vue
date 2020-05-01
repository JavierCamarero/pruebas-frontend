<template>
  <div>
    <div class="row">
      <div class="col-sm-8">
        <v-select v-model="selectedProduct" :reduce="option => {return { name: option.name, sku: option.sku, price: option.price, imageUrl: option.imageUrl, quantity: 1 }}" :options="products" label="name">
          <template #option="option">
            <div class="row">
              <div class="col-sm-3">
                <img v-if="option.imageUrl" style="width:5vh;" :src="option.imageUrl" />
              </div>
              <div class="col-sm-6">
                <p class="font-weight-bold">{{option.name}}</p>
              </div>
              <div class="col-sm-3">
                <p class="text-right">$ {{option.price}}</p>
              </div>
            </div>
          </template>
        </v-select>
      </div>
      <div v-if="selectedProduct" class="col-sm-2">
        <input v-model="selectedProduct.quantity" type="number" :min="1" class="form-control text-right h-100">
      </div>
    </div>
  </div>
</template>

<script>
import vSelect from "vue-select";
export default {
  name: "order-detail-data",
  components: {
    vSelect
  },
  data() {
    return {
      selectedProduct: null
    };
  },
  computed: {
    products() {
      return this.$store.state.product.list;
    }
  }
};
</script>
