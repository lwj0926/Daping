<template>
  <!-- 未完成的：把地址转成经纬度 -->
  <div class="app-container">
    <!-- 顶部搜索区域 -->
    <div class="filter-container mb-1">
      <div>
        <!-- 组织类型 -->
        <el-select v-model="listQuery.orgType" placeholder="组织类型" clearable style="width: 120px" class="mr-1" @change="handleFilter">
          <el-option v-for="item in orgTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
        </el-select>
        <!-- 报表类型 -->
        <el-select v-model="listQuery.reportType" placeholder="报表类型" clearable style="width: 160px" class="mr-1" @change="handleFilter">
          <el-option v-for="item in reportTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
        </el-select>
        <!-- 请输入组织名称 -->
        <el-input v-model="listQuery.orgName" placeholder="请输入组织名称" clearable style="width: 200px" @blur="handleFilter" @clear="handleFilter" />
      </div>
      <div>
        <el-button type="primary" @click="handleCreate">添加</el-button>
        <el-button v-waves :loading="downloadLoading" type="primary" @click="handleDownload">导出</el-button>
      </div>
    </div>
    <!-- 表格区域 -->
    <el-table v-loading="listLoading" :data="tableData" border>
      <el-table-column type="expand">
        <template slot-scope="{ row }">
          <el-form label-position="left" class="table-expand">
            <el-form-item label="组织名称">
              <span>{{ row.orgName }}</span>
            </el-form-item>
            <el-form-item label="组织类型">
              <span>{{ getOrgTypeLabel(row.orgType) }}</span>
            </el-form-item>
            <el-form-item label="气源类型">
              <span>{{ getGasSourceTypeLabel(row.gasSourceType) }}</span>
            </el-form-item>
            <el-form-item label="上游管线">
              <span>{{ row.upperLine }}</span>
            </el-form-item>
            <el-form-item label="地址">
              <span>{{ row.address }}</span>
            </el-form-item>
            <el-form-item label="经度">
              <span>{{ row.lon }}</span>
            </el-form-item>
            <el-form-item label="纬度">
              <span>{{ row.lat }}</span>
            </el-form-item>
            <el-form-item label="报表">
              <span>{{ getReportTypeLabel(row.reportType) }}</span>
            </el-form-item>
            <el-form-item label="创建人">
              <span>{{ row.createUser }}</span>
            </el-form-item>
            <el-form-item label="创建时间">
              <span>{{ row.createTime }}</span>
            </el-form-item>
            <el-form-item label="更改人">
              <span>{{ row.lastModifyUser }}</span>
            </el-form-item>
            <el-form-item label="更改时间">
              <span>{{ row.updateTime }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="组织名称" prop="orgName" />
      <el-table-column label="组织类型">
        <template slot-scope="{ row }">{{ getOrgTypeLabel(row.orgType) }}</template>
      </el-table-column>
      <el-table-column label="气源类型">
        <template slot-scope="{ row }">{{ getGasSourceTypeLabel(row.gasSourceType) }}</template>
      </el-table-column>
      <el-table-column label="上游管线" prop="upperLine" />
      <el-table-column label="报表" width="300">
        <template slot-scope="{ row }">{{ getReportTypeLabel(row.reportType) }}</template>
      </el-table-column>
      <el-table-column label="地址" prop="address" width="300" />
      <el-table-column label="操作" width="140">
        <template slot-scope="{ row }">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleUpdate(row)" />
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="handleDelete(row)" />
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <pagination v-show="totalCount > 0" :total="totalCount" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />

    <!-- 编辑组织 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="500px">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="80px">
        <el-form-item label="组织名称" prop="orgName">
          <el-input v-model="temp.orgName" :disabled="dialogStatus === 'update'" />
        </el-form-item>
        <el-form-item label="组织类型" prop="orgType">
          <el-select v-model="temp.orgType" class="w-100">
            <el-option v-for="item in orgTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="气源类型">
          <el-select v-model="temp.gasSourceType" class="w-100">
            <el-option v-for="item in gasSourceTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="上游管线" prop="upperLine">
          <el-input v-model="temp.upperLine" />
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="temp.address" />
        </el-form-item>
        <el-form-item label="报表" prop="reportType">
          <el-checkbox-group v-model="temp.reportType">
            <el-checkbox v-for="item in reportTypeOptions" :key="item.key" :label="item.key" :value="item.key">{{ item.display_name }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogStatus === 'create' ? createData() : updateData()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, createOrg, updateOrg, deleteOrg } from '@/api/org'
import waves from '@/directive/waves' // waves directive
import { parseTime, array2Object } from '@/utils'
import { orgTypeOptions, gasSourceTypeOptions, reportTypeOptions } from '@/utils/options'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'Org',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      tableData: null, // 表格数据
      totalCount: 0, // 总条数
      listLoading: true, // 加载动画
      listQuery: {
        // 查询条件
        pageNum: 1,
        pageSize: 10,
        orgType: undefined,
        reportType: undefined,
        orgName: undefined
      },
      orgTypeOptions, // 组织类型
      gasSourceTypeOptions, // 气源类型
      reportTypeOptions, // 报表类型
      dialogFormVisible: false, // dialog 的显示与隐藏
      dialogStatus: '', // create 还是 update。新建还是编辑
      textMap: {
        create: '新建组织',
        update: '编辑组织'
      },
      temp: {
        // 表单字段
        id: 0,
        orgName: '',
        orgType: '',
        gasSourceType: '',
        upperLine: '',
        address: '',
        lon: '',
        lat: '',
        reportType: []
      },
      rules: {
        // 表单规则
        orgName: [{ required: true, message: '组织名称必填', trigger: 'blur' }],
        orgType: [{ required: true, message: '组织类型必填', trigger: 'change' }],
        address: [{ required: true, message: '地址必填', trigger: 'blur' }],
        reportType: [{ required: true, message: '报表必选', trigger: 'change' }]
      },
      downloadLoading: false // 下载动画
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 获取列表
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.tableData = response.data
        this.totalCount = response.totalCount
        this.listLoading = false
      })
    },
    // 创建组织
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.reportType = tempData.reportType.join(',')
          createOrg(tempData).then(() => {
            this.dialogFormVisible = false
            this.$message.success('创建成功')
            // 重新获取数据，回到第一页
            this.handleFilter()
          })
        }
      })
    },
    // 更新组织
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)

          tempData.reportType = tempData.reportType.join(',')
          // console.log(tempData)
          updateOrg(tempData, { updateId: tempData.id }).then(() => {
            this.dialogFormVisible = false
            this.$message.success('更改成功')
            // 重新获取数据,不回到第一页
            this.getList()
          })
        }
      })
    },
    // 删除组织
    handleDelete(row) {
      console.log(row)
      this.$confirm(`你确定要删除【${row.orgName}】吗?`, '提示', {
        type: 'warning'
      })
        .then(() => {
          deleteOrg({ orgId: row.id }).then(response => {
            this.$message.success('删除成功')
            // 重新获取数据
            this.handleFilter()
          })
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    },
    // 搜索
    handleFilter() {
      this.listQuery.pageNum = 1
      this.getList()
    },

    // 点击“添加”按钮
    handleCreate() {
      console.log(this)
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },

    // 点击“编辑"按钮
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      // console.log(this.temp)
      this.temp.reportType = this.temp.reportType.split(',').map(item => parseInt(item))
      // console.log(this.temp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // 点击“下载”按钮
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['组织名称', '组织类型', '气源类型', '上游管线', '地址', '报表']
        const filterVal = ['orgName', 'orgType', 'gasSourceType', 'upperLine', 'address', 'reportType']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: `组织列表(${parseTime(new Date(), '{y}-{m}-{d} {h}h{i}m{s}s')})`
        })
        this.downloadLoading = false
      })
    },
    // excel 个数数据
    formatJson(filterVal) {
      return this.tableData.map(obj =>
        filterVal.map(key => {
          const value = obj[key]
          switch (key) {
            case 'orgType':
              return this.getOrgTypeLabel(value)
            case 'gasSourceType':
              return this.getGasSourceTypeLabel(value)
            case 'reportType':
              return this.getReportTypeLabel(value)
            default:
              return value
          }
        })
      )
    },
    // 组织类型Label
    getOrgTypeLabel(type) {
      return array2Object(orgTypeOptions)[type]
    },
    // 气源类型Label
    getGasSourceTypeLabel(type) {
      return array2Object(gasSourceTypeOptions)[type]
    },
    // 报表类型Label
    getReportTypeLabel(type) {
      const obj = array2Object(reportTypeOptions)

      return type
        .split(',')
        .map(item => obj[item])
        .join('；')
      //  console.log(obj)
    },
    // 重置数据
    resetTemp() {
      this.temp = {
        id: undefined,
        orgName: '',
        orgType: '',
        gasSourceType: '',
        upperLine: '',
        address: '',
        lon: '',
        lat: '',
        reportType: []
      }
    }
  }
}
</script>
