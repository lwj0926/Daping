<template>
  <div class="product-edit-container">
    <el-form
      ref="dataForm"
      :model="temp"
      label-position="right"
      label-width="75px"
      :disabled="temp.state==2 ||temp.state==3 || !editable"
    >
      <h4>计划数据</h4>
      <el-form-item label="月计划" prop="planMonth">
        <el-input v-model="temp.planMonth" :disabled="true" type="number" step="0.0001" />
      </el-form-item>
      <el-form-item label="月批复" prop="replyMonth">
        <el-input v-model="temp.replyMonth" :disabled="true" type="number" step="0.0001" />
      </el-form-item>
      <el-form-item label="当日计划" prop="planDay_1">
        <el-input v-model="temp.planDay_1" type="number" step="0.0001" />
      </el-form-item>
      <el-form-item label="当日批复" prop="replyDay">
        <el-input v-model="temp.replyDay" type="number" step="0.0001" />
      </el-form-item>
      <el-form-item label="次日计划" prop="planDay_2">
        <el-input v-model="temp.planDay_2" type="number" step="0.0001" />
      </el-form-item>
      <el-form-item label="次日批复" prop="replyTomorrow">
        <el-input v-model="temp.replyTomorrow" type="number" step="0.0001" />
      </el-form-item>
      <h4>购气数据</h4>
      <el-form-item label="管道气" prop="png">
        <el-input v-model="temp.png" type="number" step="0.0001" />
      </el-form-item>
      <el-form-item label="CNG" prop="cng">
        <el-input v-model="temp.cng" type="number" step="0.0001" />
      </el-form-item>
      <el-form-item label="LNG" prop="lng">
        <el-input v-model="temp.lng" type="number" step="0.0001" />
      </el-form-item>
      <el-form-item label="LPG" prop="lpg">
        <el-input v-model="temp.lpg" type="number" step="0.0001" />
      </el-form-item>
      <h4>销气数据</h4>
      <el-form-item label="居民" prop="resident">
        <el-input v-model="temp.resident" type="number" step="0.0001" />
      </el-form-item>
      <el-form-item label="企业" prop="enterprise">
        <el-input v-model="temp.enterprise" type="number" step="0.0001" />
      </el-form-item>
      <el-form-item label="公服" prop="publicService">
        <el-input v-model="temp.publicService" type="number" step="0.0001" />
      </el-form-item>
      <el-form-item label="转供" prop="transfer">
        <el-input v-model="temp.transfer" type="number" step="0.0001" />
      </el-form-item>
      <el-form-item label="CNG" prop="cng_1">
        <el-input v-model="temp.cng_1" type="number" step="0.0001" />
      </el-form-item>
      <el-form-item label="LNG" prop="lng_1">
        <el-input v-model="temp.lng_1" type="number" step="0.0001" />
      </el-form-item>
      <el-form-item label="代输" prop="daishu">
        <el-input v-model="temp.daishu" type="number" step="0.0001" />
      </el-form-item>
      <h4>自用数据</h4>
      <el-form-item label="生产用气" prop="product">
        <el-input v-model="temp.product" type="number" step="0.0001" />
      </el-form-item>
      <el-form-item label="生活用气" prop="live">
        <el-input v-model="temp.live" type="number" step="0.0001" />
      </el-form-item>
      <h4>新增用户统计（单位：户）</h4>
      <el-form-item label="居民" prop="resident_1">
        <el-input v-model="temp.resident_1" type="number" step="0.0001" />
      </el-form-item>
      <el-form-item label="商业" prop="commerce">
        <el-input v-model="temp.commerce" type="number" step="0.0001" />
      </el-form-item>
      <el-form-item label="工业" prop="industry">
        <el-input v-model="temp.industry" type="number" step="0.0001" />
      </el-form-item>
      <el-form-item label="转供" prop="transfer_1">
        <el-input v-model="temp.transfer_1" type="number" step="0.0001" />
      </el-form-item>
      <el-form-item label="其他" prop="other">
        <el-input v-model="temp.other" type="number" step="0.0001" />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="temp.remark" type="number" step="0.0001" />
      </el-form-item>
      <h4>其他数据</h4>
      <el-form-item label="管库存" prop="pipStock" style="width:100%">
        <el-input v-model="temp.pipStock" type="number" step="0.0001" />
      </el-form-item>
      <el-form-item label="耗损" prop="loss">
        <el-input v-model="temp.loss" type="number" step="0.0001" />
      </el-form-item>
      <el-form-item label="耗损率" prop="lossRate">
        <el-input v-model="temp.lossRate" type="number" step="0.0001" />
      </el-form-item>
      <el-form-item label="进站压力" prop="pressureIn">
        <el-input v-model="temp.pressureIn" type="number" step="0.0001" />
        <span class="unit">(Mpa)</span>
      </el-form-item>
      <el-form-item label="出站压力" prop="pressureOut">
        <el-input v-model="temp.pressureOut" type="number" step="0.0001" />
        <span class="unit">(Mpa)</span>
      </el-form-item>
      <el-form-item label="进站温度" prop="tempIn">
        <el-input v-model="temp.tempIn" type="number" step="0.0001" />
        <span class="unit">℃</span>
      </el-form-item>
      <el-form-item label="出站温度" prop="tempOut">
        <el-input v-model="temp.tempOut" type="number" step="0.0001" />
        <span class="unit">℃</span>
      </el-form-item>
      <el-form-item label="生产运行动态" prop="productState" style="width:100%">
        <el-input v-model="temp.productState" type="textarea" :autosize="{ minRows: 4}" />
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
  name: 'BuySaleStock',
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

