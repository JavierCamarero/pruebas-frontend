<template>
  <div>
    <p
    v-if="orderNumber && orderTotal"
  >Su pago por la cantidad de <b>${{orderTotal}}</b> para la orden <b><u>#{{orderNumber}}</u></b> ha sido realizado correctamente!</p>
  <p v-else>Su pago ha sido realizado correctamente!</p>
  <p class="text-right">Gracias por su preferencia.</p>
  </div>
</template>

<script>
export default {
  name: "payment-confirmation",
  props: {
    orderNumber: {
      type: String,
      default: null
    },
    orderTotal: {
      type: String,
      default: null
    }
  },
  data() {
    return {};
  }
};
</script>
