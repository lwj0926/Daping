<template>
  <div class="product-edit-container">
    <el-form
      ref="dataForm"
      :model="temp"
      label-position="right"
      label-width="75px"
      :disabled="temp.state==2 ||temp.state==3 || !editable"
    >
      <h4>购气数据</h4>
      <el-form-item label="管道气" prop="pipGas">
        <el-input v-model="temp.pipGas" type="number" step="0.0001" />
      </el-form-item>
      <el-form-item label="人工煤气" prop="artificialGas">
        <el-input v-model="temp.artificialGas" type="number" step="0.0001" />
      </el-form-item>
      <el-form-item label="LNG内购" prop="lngIn">
        <el-input v-model="temp.lngIn" type="number" step="0.0001" />
      </el-form-item>
      <el-form-item label="LNG外购" prop="lngOut">
        <el-input v-model="temp.lngOut" type="number" step="0.0001" />
      </el-form-item>
      <el-form-item label="管输气" prop="pipTranGas">
        <el-input v-model="temp.pipTranGas" type="number" step="0.0001" />
      </el-form-item>
      <el-form-item label="CNG" prop="cng">
        <el-input v-model="temp.cng" type="number" step="0.0001" />
      </el-form-item>
      <h4>销气数据</h4>
      <el-form-item label="管道气" prop="pipGas_1">
        <el-input v-model="temp.pipGas_1" type="number" step="0.0001" />
      </el-form-item>
      <el-form-item label="人工煤气" prop="artificialGas_1">
        <el-input v-model="temp.artificialGas_1" type="number" step="0.0001" />
      </el-form-item>
      <el-form-item label="LNG内购" prop="lngIn_1">
        <el-input v-model="temp.lngIn_1" type="number" step="0.0001" />
      </el-form-item>
      <el-form-item label="LNG外购" prop="lngOut_1">
        <el-input v-model="temp.lngOut_1" type="number" step="0.0001" />
      </el-form-item>
      <el-form-item label="管输气" prop="pipTranGas_1">
        <el-input v-model="temp.pipTranGas_1" type="number" step="0.0001" />
      </el-form-item>
      <el-form-item label="CNG" prop="cng_1">
        <el-input v-model="temp.cng_1" type="number" step="0.0001" />
      </el-form-item>
      <div class="report-info">
        <h4>报表信息</h4>
        <el-form-item label="填报人">
          <span>{{ temp.editUser }}</span>
        </el-form-item>
        <el-form-item label="联系方式">
          <span>{{ temp.editUserTel }}</span>
        </el-form-item>
        <el-form-item label="填报时间">
          <span>{{ temp.editTime }}</span>
        </el-form-item>
        <el-form-item label="上报人">
          <span>{{ temp.reportUser }}</span>
        </el-form-item>
        <el-form-item label="联系方式">
          <span>{{ temp.reportUserTel }}</span>
        </el-form-item>
        <el-form-item label="上报时间">
          <span>{{ temp.reportTime }}</span>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'TradeMeter',
  components: {},
  props: {
    temp: {
      type: Object,
      default: () => {}
    },
    editable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {
    console.log('TradeMeter')
  },
  mounted() {},
  methods: {}
}
</script>

