<template>
  <div class="main-con" v-if="invoice">
    <div class="" align="right">
      <img src="https://techub.com.pk/wp-content/uploads/2021/04/logo-techhub.svg" alt="" height="80px" />
    </div>
    <table width="100%" class="table">
      <thead>
        <tr>
          <th colspan="4">PERSONAL INFORMATION</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="cell-bg-1">Contact Person Name</td>
          <td class="cell-bg-2">{{ invoice.user.name }}</td>
          <td class="cell-bg-1">Company Name</td>
          <td class="cell-bg-2">{{ invoice.user.companyName }}</td>
        </tr>
        <tr>
          <td class="cell-bg-3"></td>
          <td class="cell-bg-4"></td>
          <td class="cell-bg-3">Business Activity</td>
          <td class="cell-bg-4">{{ invoice.user.businessActivity }}</td>
        </tr>
        <tr>
          <td class="cell-bg-1">Contact Number</td>
          <td class="cell-bg-2">{{ invoice.user.phoneNumber }}</td>
          <td class="cell-bg-1">Email</td>
          <td class="cell-bg-2">{{ invoice.user.email }}</td>
        </tr>
      </tbody>
    </table>
    <table width="100%" class="table invoice-table">
      <thead>
        <tr>
          <th colspan="8">INVOICE</th>
        </tr>
        <tr>
          <td class="cell-bg-1" colspan="2">Item</td>
          <td class="cell-bg-1">Room Number</td>
          <td class="cell-bg-1">Shift</td>
          <td class="cell-bg-1">Seats</td>
          <td class="cell-bg-1">Base Rate</td>
          <td class="cell-bg-1">Discount %</td>
          <td class="cell-bg-1">Amount</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="cell-bg-5" colspan="2">{{ invoice.booking.type }}</td>
          <td class="cell-bg-5">{{ invoice.booking.roomNumber }}</td>
          <td class="cell-bg-5">{{ invoice.booking.shift }}</td>
          <td class="cell-bg-5">{{ invoice.booking.seats }}</td>
          <td class="cell-bg-5">{{ invoice.booking.baseRate }}</td>
          <td class="cell-bg-5">{{ invoice.booking.discount }}</td>
          <td class="cell-bg-5">{{ invoice.booking.total }}</td>
        </tr>
        <tr v-if="invoice.booking.employeeCardPaymentPaid === 'Unpaid'">
          <td class="cell-bg-5" colspan="2">Employee Card Payment</td>
          <td class="cell-bg-5"></td>
          <td class="cell-bg-5"></td>
          <td class="cell-bg-5">{{ invoice.booking.seats }}</td>
          <td class="cell-bg-5">{{ configuration.employeeCardRate }}</td>
          <td class="cell-bg-5"></td>
          <td class="cell-bg-5">
            {{ invoice.booking.employeeCardChargesTotal }}
          </td>
        </tr>
        <tr v-else>
          <td class="cell-bg-5" colspan="2"></td>
          <td class="cell-bg-5"></td>
          <td class="cell-bg-5"></td>
          <td class="cell-bg-5"></td>
          <td class="cell-bg-5"></td>
          <td class="cell-bg-5"></td>
          <td class="cell-bg-5"></td>
        </tr>
        <tr>
          <td class="cell-bg-5" colspan="2"></td>
          <td class="cell-bg-5"></td>
          <td class="cell-bg-5"></td>
          <td class="cell-bg-5"></td>
          <td class="cell-bg-5"></td>
          <td class="cell-bg-5"></td>
          <td class="cell-bg-5"></td>
        </tr>
        <tr>
          <td class="cell-bg-5" colspan="2"></td>
          <td class="cell-bg-5"></td>
          <td class="cell-bg-5"></td>
          <td class="cell-bg-5"></td>
          <td class="cell-bg-5"></td>
          <td class="cell-bg-5"></td>
          <td class="cell-bg-5"></td>
        </tr>
        <!-- Taxes -->
        <tr>
          <td class="cell-bg-5"></td>
          <td class="cell-bg-5"></td>
          <td class="cell-bg-5"></td>
          <td class="cell-bg-5"></td>
          <td class="cell-bg-1" colspan="2">Total</td>
          <td class="cell-bg-2" colspan="2">
            {{
              invoice.booking.total +
              (invoice.booking.employeeCardChargesTotal || 0)
            }}
          </td>
        </tr>
        <tr>
          <td class="cell-bg-5"></td>
          <td class="cell-bg-5"></td>
          <td class="cell-bg-5"></td>
          <td class="cell-bg-5"></td>
          <td class="cell-bg-3" colspan="2">Security Amount</td>
          <td class="cell-bg-4" colspan="2">
            {{
              invoice.booking.securityPaid === "Paid"
                ? 0
                : invoice.booking.securityCharges
            }}
          </td>
        </tr>
        <tr>
          <td class="cell-bg-5"></td>
          <td class="cell-bg-5"></td>
          <td class="cell-bg-5"></td>
          <td class="cell-bg-5"></td>
          <td class="cell-bg-1" colspan="2">Arrears</td>
          <td class="cell-bg-2" colspan="2">{{ invoice.arrears || 0 }}</td>
        </tr>
        <tr>
          <td class="cell-bg-5"></td>
          <td class="cell-bg-5"></td>
          <td class="cell-bg-5"></td>
          <td class="cell-bg-5"></td>
          <td class="cell-bg-3" colspan="2">Tax</td>
          <td class="cell-bg-4" colspan="2">0</td>
        </tr>
        <tr>
          <td class="cell-bg-5"></td>
          <td class="cell-bg-5"></td>
          <td class="cell-bg-5"></td>
          <td class="cell-bg-5"></td>
          <td class="cell-bg-1" colspan="2">Net Amount</td>
          <td class="cell-bg-2" colspan="2">{{ invoice.netTotal }}</td>
        </tr>
        <!-- Empty -->
        <tr>
          <td class="cell-bg-5"></td>
          <td class="cell-bg-5"></td>
          <td class="cell-bg-5"></td>
          <td class="cell-bg-5"></td>
          <td class="cell-bg-5"></td>
          <td class="cell-bg-5"></td>
          <td class="cell-bg-5"></td>
          <td class="cell-bg-5"></td>
        </tr>
      </tbody>
    </table>
    <table width="100%" class="table invoice-table">
      <thead>
        <tr>
          <th colspan="8">TRANSACTION DETAILS</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="cell-bg-3" colspan="4">Business Name</td>
          <td class="cell-bg-4" colspan="4">
            {{ invoice.booking.businessName }}
          </td>
        </tr>
        <tr>
          <td class="cell-bg-1" colspan="4">NTN</td>
          <td class="cell-bg-2" colspan="4">{{ configuration.ntn }}</td>
        </tr>
        <tr>
          <td class="cell-bg-3" colspan="4">Invoice Number</td>
          <td class="cell-bg-4" colspan="4">To be coded</td>
        </tr>
        <tr>
          <td class="cell-bg-1" colspan="4">Invoice Date</td>
          <td class="cell-bg-2" colspan="4">
            {{ formatDate(invoice.createdAt) }}
          </td>
        </tr>
        <!-- Empty -->
        <tr>
          <td class="cell-bg-5"></td>
          <td class="cell-bg-5"></td>
          <td class="cell-bg-5"></td>
          <td class="cell-bg-5"></td>
          <td class="cell-bg-5"></td>
          <td class="cell-bg-5"></td>
          <td class="cell-bg-5"></td>
          <td class="cell-bg-5"></td>
        </tr>
        <tr>
          <td class="cell-bg-5" style="text-align: left">NOTE:</td>
          <td class="cell-bg-5"></td>
          <td class="cell-bg-5"></td>
          <td class="cell-bg-5"></td>
          <td class="cell-bg-5"></td>
          <td class="cell-bg-5"></td>
          <td class="cell-bg-5"></td>
          <td class="cell-bg-5"></td>
        </tr>
        <tr>
          <td class="cell-bg-5" style="text-align: left" colspan="8">
            1.Respected Sir It will be a one year Contract if you will Terminate
            this before one year Security Amount will not be Refundable.Thanks
          </td>
        </tr>
        <tr>
          <td class="cell-bg-5" style="text-align: left" colspan="8">
            2.Respected sir /Madam ,We will only Recived Checque aginst this
            invoie ..Thanks
          </td>
        </tr>
        <tr>
          <td class="cell-bg-5"></td>
          <td class="cell-bg-5"></td>
          <td class="cell-bg-5"></td>
          <td class="cell-bg-5"></td>
          <td class="cell-bg-5"></td>
          <td class="cell-bg-5"></td>
          <td class="cell-bg-5"></td>
          <td class="cell-bg-5"></td>
        </tr>
      </tbody>
    </table>
    <table width="100%" class="table amenities-table">
      <thead>
        <tr>
          <th colspan="8">AMENITIES</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="cell-bg-1">FURNISHED OFFICE</td>
          <td class="cell-bg-3">INTERNET</td>
          <td class="cell-bg-1">ELECTRICITY</td>
          <td class="cell-bg-3">OFFICE BOY</td>
          <td class="cell-bg-1">SWEEPER</td>
          <td class="cell-bg-3">WATER</td>
          <td class="cell-bg-1">TEA</td>
          <td class="cell-bg-3">COFFEE</td>
        </tr>
        <tr>
          <td class="cell-bg-1">PRINTING</td>
          <td class="cell-bg-3">SCANNING</td>
          <td class="cell-bg-1">MAIL HANDLING</td>
          <td class="cell-bg-3">CCTV</td>
          <td class="cell-bg-1">SECURITYY</td>
          <td class="cell-bg-3">MEETING ROOM</td>
          <td class="cell-bg-1">WAITING ZONE</td>
          <td class="cell-bg-3">PLAY AREA</td>
        </tr>
        <tr>
          <td class="cell-bg-1">ROOF TOP</td>
          <td class="cell-bg-3">PENTRY</td>
          <td class="cell-bg-1">ACTIVITY AREA</td>
          <td class="cell-bg-3">ATTENDANCE</td>
          <td class="cell-bg-1">GENERATOR</td>
          <td class="cell-bg-3">PARKING</td>
          <td class="cell-bg-1">FRONT DESK</td>
          <td class="cell-bg-3">FOOD COURT</td>
        </tr>
        <tr>
          <td class="cell-bg-1">BRANDING</td>
          <td class="cell-bg-3">MAINTENANCE</td>
          <td class="cell-bg-1">REPAIRING</td>
          <td class="cell-bg-3">LOCKERS</td>
          <td class="cell-bg-1">JOB PORTAL</td>
          <td class="cell-bg-3">BIO. ACCESS</td>
          <td class="cell-bg-1">EVENTS</td>
          <td class="cell-bg-3">& much more</td>
        </tr>
        <tr>
          <th colspan="8" class="footer">
            {{ invoice.booking.address }}
          </th>
        </tr>
      </tbody>
    </table>
    <div class="shadow-card">
      <el-form>
        <el-row :grid="20">
          <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
            <el-form-item label="Security Status">
              <el-select
                class="input"
                v-model="form.status"
                placeholder="Select Status"
              >
                <el-option value="Paid">Paid</el-option>
                <el-option value="Unpaid">Unpaid</el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
            <el-form-item label="Amount Paid">
              <el-input
                class="input"
                v-model="form.paidAmount"
                type="number"
                placeholder="Amount Paid"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
            <el-form-item label="Left Amount">
              <el-input
                class="input"
                v-model="form.arrears"
                type="number"
                placeholder="Amount Left"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item align="right">
          <button style="background-color: #F6B233; border: none; padding: 10px; width: 100px; color: white; border-radius: 5px; cursor: pointer; "  @click="onSubmit">Update</button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import moment from 'moment'

export default {
  data() {
    return {
      configuration: {},
      invoice: {},
      form: {
        status: '',
        paidAmount: '',
        arrears: ''
      }
    }
  },
  created() {
    this.getConfiguration()
    this.getInvoice()
  },
  methods: {
    getConfiguration() {
      this.$store.dispatch(
        'getConfiguration'
      )
        .then(
          (response) => {
            this.configuration = response.data.data[0]
          }
        )
    },
    getInvoice() {
      this.$store
        .dispatch('getInvoice', this.$route.params.id)
        .then(
          (response) => {
            this.invoice = response.data.data
            this.form = response.data.data
          }
        )
    },
    formatDate(date) {
      return moment(date).format('dddd MMMM DD, YYYY')
    },
    onSubmit(e) {
      e.preventDefault()
      const data = {
        id: this.$route.params.id,
        payload: this.form
      }
      this.$store.dispatch('updateInvoice', data)
        .then(
          (response) => {
            this.notification(response.data, 'success')
          }
        )
        .catch(
          (error) => {
            this.notification(error.response.data, 'error')
          }
        )
    },
    notification(data, type) {
      this.$notify({
        title: data.status,
        message: data.message || data.errEmail || data.errPassword,
        type: type
      })
    }
  }
}
</script>
<style lang="scss">
.el-input__inner {
    height: 50px !important;
}
.el-select {
  width: 100%;
}
</style>

<style>
.fx-con {
    display: flex;
}
.main-con {
    padding: 10px 20px;
}
.table {
    margin-top: 28px;
    border-spacing: 0;
}
.table td {
    width: 25%;
    border: none;
    text-align: right;
    padding: 2px 5px;
    height: 28px;
}
.invoice-table td {
    width: unset;
    border: 0.001rem solid rgba(0, 0, 0, 0.16);
}
.invoice-table thead td {
    text-align: center;
    width: 12.5% !important;
}
.amenities-table td {
    text-align: center;
    color: #ffffff;
    font-weight: 500;
    font-size: 12px;
    width: 12.5% !important;
    border: 1px solid rgba(255, 255, 255, 0.16);
}
.table th {
    height: 28px;
}
.table th {
    background-color: #000001;
    color: #F6B233;
}
.cell-bg-1 {
    background-color: #3b3b3b;
    color: #F6B233;
    font-weight: 700;
}
.cell-bg-2 {
    background-color: #c0c0c0;
    color: #000000;
    font-weight: 700;
}
.cell-bg-3 {
    background-color: #a1a1a1;
    color: #000000;
    font-weight: 700;
}
.cell-bg-4 {
    background-color: #ececec;
    color: #000000;
    font-weight: 700;
}
.cell-bg-5 {
    background-color: #ffffff;
    color: #000000;
}
.footer {
    font-weight: 500;
    font-size: 12px;
}
</style>

<style>
.theme-btn {
    height: 50px;
    width: 100px;
    background-color: #6c63ff;
    border-radius: 8px;
    outline: none;
    color: #fff;
    font-weight: 700;
    border: none;
}
.shadow-card {
  background-color: #fff;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.20);
  border-radius: 8px;
  padding: 10px 20px;
}
.shadow-card:hover {
  box-shadow: 0 7px 15px 0 rgba(0, 0, 0, 0.26);
}
</style>
