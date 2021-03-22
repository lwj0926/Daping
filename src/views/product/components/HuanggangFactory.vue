<template>
  <div class="product-edit-container">
    <el-form
      :model="temp"
      label-position="right"
      :disabled="temp.state==2 ||temp.state==3 || !editable"
      label-width="75px"
    >
      <!-- <h4>基本信息</h4>
      <el-form-item label="填报日期" prop="editDate" disabled>
        <el-input v-model="temp.editDate" :disabled="true" />
      </el-form-item>
      <el-form-item label="填报单位" prop="orgName">
        <el-input v-model="temp.orgName" :disabled="true" />
      </el-form-item>
      <el-form-item label="填报人" prop="editUser">
        <el-input v-model="temp.editUser" :disabled="true" />
      </el-form-item>
      <el-form-item label="联系方式" prop="tel">
        <el-input v-model="temp.tel" :disabled="true" />
      </el-form-item>-->
      <h4>购销存数据（LNG外购）</h4>
      <el-form-item label="购气日累" prop="buyGasDay">
        <el-input v-model="temp.buyGasDay" type="number" step="0.0001" />
      </el-form-item>
      <el-form-item label="销气日累" prop="sellGasDay">
        <el-input v-model="temp.sellGasDay" type="number" step="0.0001" />
      </el-form-item>
      <el-form-item label="生产用气" prop="productGas">
        <el-input v-model="temp.productGas" type="number" step="0.0001" />
      </el-form-item>
      <el-form-item label="生活用气" prop="liveGas">
        <el-input v-model="temp.liveGas" type="number" step="0.0001" />
      </el-form-item>
      <el-form-item label="当日库存" prop="stockDayWf">
        <el-input v-model="temp.stockDayWf" type="number" step="0.0001" />
        <span class="unit">(万方)</span>
      </el-form-item>
      <el-form-item label="当日库存" prop="stockDayDun">
        <el-input v-model="temp.stockDayDun" type="number" step="0.0001" />
        <span class="unit">(吨)</span>
      </el-form-item>
      <el-form-item label="库容比" prop="storageCapacity">
        <el-input v-model="temp.storageCapacity" type="number" step="0.0001" />
        <span class="unit">%</span>
      </el-form-item>
      <h4>购销存数据（LNG自产）</h4>
      <el-form-item label="购气日累" prop="username">
        <el-input v-model="temp.username" type="number" step="0.0001" />
      </el-form-item>
      <el-form-item label="销气日累" prop="realName">
        <el-input v-model="temp.realName" type="number" step="0.0001" />
      </el-form-item>
      <el-form-item label="生产用气" prop="realName">
        <el-input v-model="temp.realName" type="number" step="0.0001" />
      </el-form-item>
      <el-form-item label="生活用气" prop="realName">
        <el-input v-model="temp.realName" type="number" step="0.0001" />
      </el-form-item>
      <el-form-item label="当日库存" prop="realName">
        <el-input v-model="temp.realName" type="number" step="0.0001" />
        <span class="unit">(万方)</span>
      </el-form-item>
      <el-form-item label="当日库存" prop="realName">
        <el-input v-model="temp.realName" type="number" step="0.0001" />
        <span class="unit">(吨)</span>
      </el-form-item>
      <el-form-item label="库容比" prop="realName">
        <el-input v-model="temp.realName" type="number" step="0.0001" />
        <span class="unit">%</span>
      </el-form-item>
      <h4>日运行动态</h4>
      <el-form-item
        label="1、购销气量与上一日对比相差10%以上的数据原因分析"
        prop="gapCause"
        label-width="340px"
        style="width:100%"
      >
        <el-input v-model="temp.gapCause" />
      </el-form-item>
      <el-form-item label="2、A类动火作业日进展情况" prop="awork" label-width="180px" style="width:100%">
        <el-input v-model="temp.awork" />
      </el-form-item>
      <el-form-item label="3、A类生产设备维修、保养情况" prop="adevice" label-width="205px" style="width:100%">
        <el-input v-model="temp.adevice" />
      </el-form-item>
      <el-form-item label="4、A类项目投产日进展情况" prop="aprog" label-width="180px" style="width:100%">
        <el-input v-model="temp.aprog" />
      </el-form-item>
      <el-form-item label="5、突发事件" prop="emergency" label-width="95px" style="width:100%">
        <el-input v-model="temp.emergency" />
      </el-form-item>
      <el-form-item label="6、影响生产的恶劣天气情况" prop="weather" label-width="185px" style="width:100%">
        <el-input v-model="temp.weather" />
      </el-form-item>
      <el-form-item
        label="7、上、下游单位重大生产变化或事故事件"
        prop="exchange"
        label-width="265px"
        style="width:100%"
      >
        <el-input v-model="temp.exchange" />
      </el-form-item>
      <el-form-item
        label="8、本单位A类生产设备操作情况变化"
        prop="adeviceOp"
        label-width="235px"
        style="width:100%"
      >
        <el-input v-model="temp.adeviceOp" />
      </el-form-item>
      <el-form-item label="9、需要协调解决的问题" prop="questions" label-width="160px" style="width:100%">
        <el-input v-model="temp.questions" />
      </el-form-item>
      <el-form-item label="10、其他" prop="otherThing" label-width="75px" style="width:100%">
        <el-input v-model="temp.otherThing" />
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
  name: 'HuanggangFactory',
  props: {
    temp: {
      type: Object,
      default: () => {}
    },
    editable: {
      type: Boolean,
      default: true
    }
  }
}
</script>

