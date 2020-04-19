<template>
  <div>
    <input ref="excel-upload-input" class="excel-upload-input" type="file" accept=".xlsx, .xls, .txt" @change="handleClick">
    <div class="drop" @drop="handleDrop" @dragover="handleDragover" @dragenter="handleDragover">
      拖动文件到这里或者
      <el-button :loading="loading" style="margin-left:16px;" size="mini" type="primary" @click="handleUpload">
        点击上传
      </el-button>
    </div>
  </div>
</template>

<script>
import XLSX from 'xlsx'
export default {
  props: {
      beforeUpload: Function, // eslint-disable-line
      onSuccess: Function// eslint-disable-line
  },
  data() {
    return {
      loading: false,
      excelData: {
        header: null,
        results: null
      }
    }
  },
  methods: {
    generateData(data) {
      if (data) {
        this.onSuccess && this.onSuccess(data)
      }
    },
    handleDrop(e) {
      e.stopPropagation()
      e.preventDefault()
      if (this.loading) return
      const files = e.dataTransfer.files
      if (files.length !== 1) {
        this.$message.error('只能上传一个文件')
        return
      }
      const rawFile = files[0] // only use files[0]
      if (!this.isExcel(rawFile) & !this.isTxt(rawFile)) {
        this.$message.error('请选择 .xlsx, .xls, .csv, .txt 格式的文件')
        return false
      }
      this.upload(rawFile)
      e.stopPropagation()
      e.preventDefault()
    },
    handleDragover(e) {
      e.stopPropagation()
      e.preventDefault()
      e.dataTransfer.dropEffect = 'copy'
    },
    handleUpload() {
      this.$refs['excel-upload-input'].click()
    },
    handleClick(e) {
      const files = e.target.files
      const rawFile = files[0] // only use files[0]
      if (!rawFile) return
      if (!this.isExcel(rawFile) & !this.isTxt(rawFile)) {
        this.$message.error('请选择 .xlsx, .xls, .csv, .txt 格式的文件')
        return false
      }
      this.upload(rawFile)
    },
    upload(rawFile) {
      this.$refs['excel-upload-input'].value = null // fix can't select the same excel
      if (!this.beforeUpload) {
        if (this.isTxt(rawFile)) {
          this.readerTxt(rawFile)
        } else {
          console.log('是excel')
          this.readerExcel(rawFile)
        }
        return
      }
      const before = this.beforeUpload(rawFile)
      if (before) {
        if (this.isTxt(rawFile)) {
          this.readerTxt(rawFile)
        } else {
          this.readerExcel(rawFile)
        }
      }
    },
    readerTxt(rawFile) {
      this.loading = true
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = e => {
          const data = e.target.result
          const tel = data.split(',')
          const tels = []
          const screen = []
          tel.forEach((item) => {
            if (item.length === 11) {
              tels.push(item)
            } else {
              screen.push(item)
            }
          })
          const datas = {
            tels,
            screen
          }
          this.generateData(datas)
          this.loading = false
          resolve()
        }
        reader.readAsText(rawFile)
      })
    },
    readerExcel(rawFile) {
      this.loading = true
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = e => {
          const data = e.target.result
          const workbook = XLSX.read(data, { type: 'array' })
          const firstSheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[firstSheetName]
          // const header = this.getHeaderRow(worksheet)
          const results = XLSX.utils.sheet_to_json(worksheet)
          const text = JSON.stringify(results)
          const isMobile = /(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|19[0-9]|14[57])[0-9]{8}/g
          const tel = text.trim().match(isMobile)
          const tels = []
          const screen = []
          tel.forEach((item) => {
            if (!tels.find((tel) => tel === item)) {
              console.log('没有重复')
              tels.push(item)
            } else {
              screen.push(item)
              console.log('重复了')
            }
          })
          const param = {
            tels,
            screen
          }
          this.generateData(param)
          this.loading = false
          resolve()
        }
        reader.readAsArrayBuffer(rawFile)
      })
    },
    getHeaderRow(sheet) {
      const headers = []
      const range = XLSX.utils.decode_range(sheet['!ref'])
      let C
      const R = range.s.r
      /* start in the first row */
      for (C = range.s.c; C <= range.e.c; ++C) { /* walk every column in the range */
        const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
        /* find the cell in the first row */
        let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
        headers.push(hdr)
      }
      return headers
    },
    isExcel(file) {
      return /\.(xlsx|xls|csv|txt)$/.test(file.name)
    },
    isTxt(file) {
      return /\.(txt)$/.test(file.name)
    }
  }
}
</script>

<style scoped>
  .excel-upload-input{
    display: none;
    z-index: -9999;
  }
  .drop{
    border: 2px dashed #bbb;
    width: 90%;
    height: 160px;
    line-height: 160px;
    margin: 0 auto;
    font-size: 24px;
    border-radius: 5px;
    text-align: center;
    color: #bbb;
    position: relative;
  }
</style>
