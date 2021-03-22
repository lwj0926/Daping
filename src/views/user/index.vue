
<template>
  <div class="app-container">
    <div>
      <!-- 顶部搜索区域 -->
      <div class="filter-container mb-1">
        <div>
          <!-- 用户状态 -->
          <el-select v-model="listQuery.status" placeholder="状态" clearable style="width: 120px" class="mr-1" @change="handleFilter">
            <el-option v-for="item in userStatusTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>
          <!-- 用户角色 -->
          <el-select v-model="listQuery.roleId" placeholder="角色" clearable style="width: 160px" class="mr-1" @change="handleFilter">
            <el-option v-for="item in roleList" :key="item.id" :label="item.roleName" :value="item.id" />
          </el-select>
          <!-- 所属组织 -->
          <el-select v-model="listQuery.orgId" placeholder="所属组织" clearable filterable style="width: 160px" class="mr-1" @change="handleFilter">
            <el-option v-for="item in orgList" :key="item.id" :label="item.orgName" :value="item.id" />
          </el-select>
          <!-- 请输入用户名称 -->
          <el-input v-model="listQuery.keyword" placeholder="请输入登录账号/真实姓名" clearable style="width: 200px" @blur="handleFilter" @clear="handleFilter" />
        </div>
        <div>
          <el-button type="primary" @click="handleCreate">添加</el-button>
          <el-button v-waves :loading="downloadLoading" type="primary" @click="handleDownload">导出</el-button>
        </div>
      </div>
      <!-- 表格区域 -->
      <el-table v-loading="listLoading" :data="tableData" border fit highlight-current-row style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="{ row }">
            <el-form label-position="left" class="table-expand">
              <el-form-item label="登录账号">
                <span>{{ row.username }}</span>
              </el-form-item>
              <el-form-item label="真实姓名">
                <span>{{ row.realName }}</span>
              </el-form-item>
              <el-form-item label="角色">
                <span>{{ row.roleName }}</span>
              </el-form-item>
              <el-form-item label="所属组织">
                <span>{{ row.orgName }}</span>
              </el-form-item>
              <el-form-item label="状态">
                <el-tag :type="row.status === 0 ? 'success' : 'danger'">{{ row.status | userStatusTypeFilter }}</el-tag>
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
        <el-table-column label="登录账号" prop="username" />
        <el-table-column label="真实姓名" prop="realName" />
        <el-table-column label="角色" prop="roleName" />
        <el-table-column label="所属组织" prop="orgName" />
        <el-table-column label="状态">
          <template slot-scope="{ row }">
            <span v-for="item in userStatusTypeOptions" :key="item.key">
              <el-tag v-if="row.status === item.key" :type="item.type">{{ item.display_name }}</el-tag>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="{ row }">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleUpdate(row)" />

            <el-tooltip effect="dark" content="重置密码" placement="top" :enterable="false">
              <el-button type="warning" size="mini" icon="el-icon-unlock" @click="handlePasswordReset(row)" />
            </el-tooltip>

            <el-button type="danger" size="mini" icon="el-icon-delete" @click="handleDelete(row)" />
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <pagination v-show="totalCount > 0" :total="totalCount" :page.sync="listQuery.pageNum" :limit.sync="listQuery.limit" @pagination="getList" />
      <!-- 编辑用户 -->
      <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="500px">
        <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="80px">
          <el-form-item label="登录账号" prop="username">
            <el-input v-model="temp.username" :disabled="dialogStatus === 'update'" placeholder="请输入手机号" />
          </el-form-item>
          <el-form-item label="真实姓名" prop="realName">
            <el-input v-model="temp.realName" />
          </el-form-item>
          <el-form-item label="角色" prop="roleId">
            <el-select v-model="temp.roleId" class="w-100">
              <el-option v-for="item in roleList" :key="item.id" :label="item.roleName" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="所属组织" prop="orgId">
            <el-select v-model="temp.orgId" filterable class="w-100">
              <el-option v-for="item in orgList" :key="item.id" :label="item.orgName" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-switch v-model="temp.status" active-color="#13ce66" inactive-color="#ff4949" :active-value="0" :inactive-value="1" />
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogStatus === 'create' ? createData() : updateData()">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { fetchList, createUser, updateUser, deleteUser, passwordReset } from '@/api/user'
import { fetchList as fetchOrgList } from '@/api/org'
import { fetchList as fetchRoleList } from '@/api/role'
import { parseTime, array2Object } from '@/utils'
import { userStatusTypeOptions } from '@/utils/options'

export default {
  name: 'User',
  components: { Pagination },
  directives: { waves },
  filters: {
    userStatusTypeFilter(type) {
      return array2Object(userStatusTypeOptions)[type]
    }
  },
  data() {
    return {
      tableData: null, // 表格数据
      totalCount: 0, // 总条数
      roleList: null, // 角色列表
      orgList: null, // 组织列表
      listLoading: true, // 加载动画
      listQuery: {
        // 查询条件
        pageNum: 1,
        pageSize: 20,
        status: undefined,
        roleId: undefined,
        orgId: undefined
      },
      userStatusTypeOptions, // 用户状态类型
      dialogFormVisible: false, // dialog 的显示与隐藏
      dialogStatus: '', // create 还是 update。新建还是编辑
      textMap: {
        create: '新建用户',
        update: '编辑用户'
      },
      temp: {
        // 表单字段
        id: undefined,
        username: '',
        realName: '',
        status: 0,
        orgId: undefined,
        roleId: undefined
      },
      rules: {
        // 表单规则
        username: [{ required: true, message: '登录账号必填', trigger: 'blur' }],
        realName: [{ required: true, message: '真实姓名必填', trigger: 'blur' }],
        roleId: [{ required: true, message: '角色必填', trigger: 'change' }],
        orgId: [{ required: true, message: '所属组织必填', trigger: 'change' }]
      },
      downloadLoading: false // 下载动画
    }
  },
  created() {
    this.getList()
    this.getOrgList()
    this.getRoleList()
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
    // 获取组织列表
    getOrgList() {
      this.listLoading = true
      fetchOrgList({
        pageNum: 1,
        pageSize: 1000
      }).then(response => {
        this.orgList = response.data
        this.listLoading = false
      })
    },
    // 获取角色列表
    getRoleList() {
      this.listLoading = true
      fetchRoleList({
        pageNum: 1,
        pageSize: 1000
      }).then(response => {
        this.roleList = response.data
        this.listLoading = false
      })
    },
    // 搜索
    handleFilter() {
      this.listQuery.pageNum = 1
      this.getList()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        username: '',
        realName: '',
        status: 0,
        orgId: undefined,
        roleId: undefined
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          createUser(this.temp).then(() => {
            this.dialogFormVisible = false
            this.$message.success('创建成功')
            this.handleFilter()
            console.log(this.temp)
          })
        }
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          updateUser(this.temp).then(() => {
            this.dialogFormVisible = false
            this.$message.success('更改成功')
            this.getList()
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handlePasswordReset(row) {
      this.$confirm(`你确定要重置【${row.realName}】的密码吗?`, '提示', {
        type: 'warning'
      })
        .then(() => {
          passwordReset({ userId: row.id }).then(response => {
            this.$message.success('成功将用户密码重置为123456')
          })
        })
        .catch(() => {
          this.$message.info('已取消操作')
        })
    },
    handleDelete(row) {
      this.$confirm(`你确定要删除【${row.realName}】吗?`, '提示', {
        type: 'warning'
      })
        .then(() => {
          deleteUser({ userId: row.id }).then(response => {
            this.$message.success('删除成功')
          })
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['登录账号', '真实姓名', '角色', '所属组织', '状态']
        const filterVal = ['username', 'realName', 'roleName', 'orgName', 'status']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: `用户列表(${parseTime(new Date(), '{y}-{m}-{d} {h}h{i}m{s}s')})`
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.tableData.map(obj =>
        filterVal.map(key => {
          const value = obj[key]
          if (key === 'status') {
            return array2Object(userStatusTypeOptions)[value]
          } else {
            return obj[key]
          }
        })
      )
    }
  }
}
</script>
