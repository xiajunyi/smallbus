var api = require('../../utils/api.js')
var { request } = require('../../utils/request.js')

wx.cloud.init({ traceUser: true })
var db = wx.cloud.database()

Page({
  data: {
    route: '',
    stops: [],
    history: [],
  },

  /**
   * 调用云函数，获取 openId
   */
  onLoad: function () {
    
  },

  /**
   * 页面出现调用该方法，初始化页面数据
   */
  onShow: function () {
    var that = this
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        that.dbGetHistory(res.result)
      }
    })
    this.setData({
      route: '',
      stops: [],
    })
  },

  /**
   * edit by dkvirus:
   * 选择下拉框中的路线，去后台查询该路线详细数据
   */
  handleSearchRoute: function (e) {
    var route = ''
    var record = 1    // 是否记录
    if (e.detail && e.detail.value) {
      route = e.detail.value
    } else {
      route = e.currentTarget.dataset.router
      record = 0
    }

    wx.navigateTo({
        url: `../route/route?route=${route}&record=${record}`,
    })
  },

  /**
   * edit by dkvirus at 2018年09月23日23:40:31
   * 根据时间倒序(最新时间在前面)查询历史记录
   */
  dbGetHistory: function (openId) {
    var that = this
    db.collection('bus_history')
      .where({
        _openid: openId,
      })
      .orderBy('createAt', 'desc')   // 按时间倒序
      .get({
        success: function (res) {
          var history = res.data
          
          history = history.map(item => item.route)  // 处理数组数据结构
          history = [...new Set(history)]     // 数组去重
          history = history.slice(0, 10)      // 截取前10条

          that.setData({ history })
        }
      })
  },

})