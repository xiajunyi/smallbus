var api = require('../../utils/api.js')
var { request } = require('../../utils/request.js')

Page({
  data: {
    direction: 1,     // 路线方向，0 和 1，默认为 1
    routeDetail: {},  // 路线详情
    stopDetail: {},   // 站点详情
    route: '',        // 路线名称
    stops: [],        // 搜索下拉框存储满足条件的路线数组
    selectedStop: '', // 被选中站点高亮显示
  },

  /**
   * edit by dkvirus:
   * 选择下拉框中的路线，去后台查询该路线详细数据
   */
  handleSearchRoute: function (e) {
    var route = ''
    if (e.detail && e.detail.value) {
      route = e.detail.value
    } else {
      route = e.currentTarget.dataset.router
    }

    wx.navigateTo({
        url: `../route/route?route=${route}`,
    })
  },
})