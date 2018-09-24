// components/search/search.js
var stations = require('../../data/stations.js')
var api = require('../../utils/api.js')
var { request } = require('../../utils/request.js')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    route: {    // 路线名称
      type: String,
      value: '',
    },
    stops: {
      type: Array,
      value: [],
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * edit by dkvirus:
     * 处理文本框的值，过滤所有路线中包含文本框输入值得选项作为下拉框的数据源
     */
    handleSelect: function (e) {
      var str = e.detail.value;   // 输入框的值

      if (str === '') {
        this.setData({ stops: [] })
      } else {
        var filters = stations.filter(item => item.indexOf(str.trim()) !== -1)
        this.setData({ stops: filters })
      }
    },

    /**
     * edit by dkvirus:
     * 选择下拉框中的路线，去后台查询该路线详细数据
     */
    handleSearchRoute: function (e) {
      var route = e.currentTarget.dataset.router    // 要查询的路线
      this.triggerEvent('select', { value: route })
    },
  }
})
