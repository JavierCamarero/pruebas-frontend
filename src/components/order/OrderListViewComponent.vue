<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-sm-3">
        <h2 class="text-muted" v-if="model">Orden #{{ model.number }}</h2>
      </div>
      <div class="offset-sm-7 col-sm-2">
        <button class="btn btn-info" @click="setDetailAddition(true)">Agregar Producto</button>
      </div>
    </div>
    <hr class="mt-0" />
    <div v-if="model.items" class="table-responsive col-sm-12 p-0">
      <table class="table table-hover">
        <thead class="thead-dark">
          <tr class="text-center">
            <th width="10%" scope="col">SKU</th>
            <th width="40%" scope="col">Nombre</th>
            <th width="10%" scope="col">Cant.</th>
            <th width="10%" scope="col">Precio</th>
            <th v-if="addingDetail" width="5%" scope="col" class="text-danger"></th>
          </tr>
          <tr class="text-center" v-if="addingDetail">
            <th class="align-top pb-1" width="10%" scope="col">
              <input type="text" v-model="newDetail.sku" class="form-control form-control-sm" />
              <label v-if="!$v.newDetail.sku.required" class="text-danger mb-0">Requerido</label>
            </th>
            <th class="align-top pb-1" width="40%" scope="col">
              <input type="text" v-model="newDetail.name" class="form-control form-control-sm" />
              <label v-if="!$v.newDetail.name.required" class="text-danger mb-0">Requerido</label>
            </th>
            <th class="align-top pb-1" width="10%" scope="col">
              <input
                v-model="newDetail.quantity"
                type="number"
                :min="1"
                class="form-control form-control-sm text-right"
              />
              <label v-if="!$v.newDetail.quantity.required" class="text-danger mb-0">Requerido</label>
            </th>
            <th class="align-top pb-1" width="10%" scope="col">
              <input
                v-model="newDetail.price"
                step="any"
                type="number"
                :min="1"
                class="form-control form-control-sm text-right"
              />
              <label v-if="!$v.newDetail.price.required" class="text-danger mb-0">Requerido</label>
            </th>
            <th width="10%" scope="col" class="text-danger align-top">
              <button
                :disabled="$v.newDetail.$invalid"
                class="btn btn-sm btn-primary"
                @click="addDetail()"
              >
                <font-awesome-icon icon="cart-plus" />
              </button>
              <button
                class="btn btn-sm btn-danger"
                @click="resetNewDetail(), setDetailAddition(false)"
              >
                <font-awesome-icon icon="times-circle" />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in model.items" :key="item.id">
            <td>{{item.sku}}</td>
            <td>
              <img style="width:5vh;" :src="item.imageUrl" />
              {{item.name}}
            </td>
            <td class="text-right align-middle">{{item.quantity}}</td>
            <td class="text-right align-middle">$ {{item.price}}</td>
            <td v-if="addingDetail"></td>
          </tr>
        </tbody>
      </table>
    </div>
    <hr />
    <div v-if="model && model.totals">
      <div class="offset-sm-9 col-sm-3">
        <button
          type="button"
          data-toggle="modal"
          data-target="#paymentModal"
          class="btn btn-success font-weight-bold btn-block"
        >Pagar ${{model.totals.total}}</button>
      </div>
    </div>

    <!-- Modal -->
    <!-- Modal -->
    <div class="modal fade" id="paymentModal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header bg-success text-white">
            <h5 class="modal-title">Gracias por su pago</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <payment-confirmation
              v-if="model && model.totals"
              :order-number="model.number"
              :order-total="model.totals.total"
            ></payment-confirmation>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import DetailData from "./OrderDetailDataComponent";
import PaymentConfirmation from "./OrderPaymentConfirmationComponent";
import { required, minLength, minValue } from "vuelidate/lib/validators";

export default {
  name: "order-list-view",
  components: {
    DetailData,
    PaymentConfirmation
  },
  data() {
    return {
      newDetail: {},
      addingDetail: false
    };
  },
  validations: {
    newDetail: {
      name: {
        required
      },
      quantity: {
        required
      },
      sku: {
        required
      },
      price: {
        required
      }
    }
  },
  created() {
    this.$store.dispatch("order/show");
    this.$store.dispatch("product/index");
  },
  computed: {
    ...mapState("order", ["model"]),
    ...mapState("product", ["list"])
  },
  methods: {
    addDetail() {
      if (!this.$v.newDetail.$invalid) {
        this.sanitizeDetailBeforeAdding(this.newDetail);
        this.$store.commit("order/addDetail", this.newDetail);
        this.setDetailAddition(false);
        this.resetNewDetail();
      }
    },
    setDetailAddition(value) {
      this.addingDetail = value;
    },
    sanitizeDetailBeforeAdding(detail) {
      detail.price = detail.price ? parseFloat(detail.price).toFixed(2) : null;
    },
    resetNewDetail() {
      this.newDetail = {};
    }
  }
};
</script>
