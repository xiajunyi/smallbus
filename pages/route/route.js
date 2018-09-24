var api = require('../../utils/api.js')
var { request } = require('../../utils/request.js')

wx.cloud.init({ traceUser: true })
var db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    direction: 1,     // 路线方向，0 和 1，默认为 1
    routeDetail: {},  // 路线详情
    stopDetail: {},   // 站点详情
    route: '',        // 路线名称
    stops: [],        // 搜索下拉框存储满足条件的路线数组
    selectedStop: '', // 被选中站点高亮显示
    record: 1,        // 是否记录，1 记录，0 不记录
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ route: options.route, record: Number(options.record) })
  },

  /**
   * 页面第一页加载显示
   */
  onShow: function () {
    var that = this
    var router_name = this.data.route
    var record = this.data.record

    request({
      url: api.ROUTE,
      data: { router_name, direction: 1 },
    }).then(function (res) {
      //请求成功的操作
      that.setData({
        routeDetail: res.data,
        stops: [],     // 置空下拉框数组
        selectedStop: '',
      });

      // 插入历史记录表中
      if (record) {
        that.dbInsertHistory({ route: router_name })
      }

      wx.setNavigationBarTitle({ title: router_name })   // 设置页面标题为当前公交路线名称
    })
  },

  /**
   * edit by dkvirus:
   * 选择下拉框中的路线，去后台查询该路线详细数据
   */
  handleSearchRoute: function (e) {
    var that = this
    var router_name = e.detail.value

    request({
      url: api.ROUTE,
      data: { router_name, direction: 1 },
    }).then(function (res) {
      //请求成功的操作
      that.setData({
        route: router_name,
        routeDetail: res.data,
        stops: [],     // 置空下拉框数组
        record: 1,
        selectedStop: '',
      });

      // 插入历史记录表中
      that.dbInsertHistory({ route: router_name })

      wx.setNavigationBarTitle({ title: router_name })   // 设置页面标题为当前公交路线名称
    })
  },

  /**
   * edit by dkvirus at 2018年09月18日11:27:34
   * 查询站点详细信息：距离所选站点距离、还有多久时间抵达...
   * note: 注意要带方向查询
   */
  handleSearchStop: function (e) {
    var that = this
    var stop_id = e.currentTarget.dataset.stopid     // 需要查询的站点 Id
    var direction = this.data.direction
    var router_name = this.data.route

    request({
      url: api.STOP,
      data: { router_name, direction, stop_id },
    }).then(function (res) {
      var stopDetail = res.data
      stopDetail.time = that.handleTime(stopDetail.time)

      //请求成功的操作
      that.setData({ stopDetail, selectedStop: stop_id });
      
    })
  },

  /**
   * edit by dkvirus at 2018年09月18日15:05:15
   * 查询公交反向路线
   */
  handleDirection: function () {
    var that = this
    var router_name = this.data.route    // 要查询的路线
    var direction = this.data.direction
    wx.showLoading()

    // 处理方向，当前是0则取1，当前是1则取0
    direction = Number(!Boolean(direction))

    request({
      url: api.ROUTE,
      data: { router_name, direction },
    }).then(function (res) {
      //请求成功的操作
      that.setData({
        route: router_name,
        routeDetail: res.data,
        direction,
        stopDetail: {},
        selectedStop: '',
      });
      wx.hideLoading();
    })
  },

  /**
   * edit by dkvirus at 2018年09月18日15:11:48
   * 后台传过来的时间以秒为单位，展示不友好，处理结果：
   * 20    =>   20秒     
   * 140   =>   2分钟20秒
   * 4000  =>   1小时6分钟40秒
   */
  handleTime(second) {
    var hour, min, sec

    if (second < 60) {
      return `${second}秒`
    } else if (second < 3600) {
      min = Math.floor(second / 60)
      sec = second % 60
      return `${min}分钟${sec}秒`
    } else {
      hour = Math.floor(second / 3600)
      min = Math.floor(second % 3600 / 60)
      sec = second % 3600 % 60
      return `${hour}小时${min}分钟${sec}秒`
    }
  },

  /**
   * edit by dkvirus at 2018年09月23日23:04:31
   * 插入历史记录表中
   */
  dbInsertHistory: function (options) {
    db.collection('bus_history')
      .add({
        data: {
          route: options.route,
          createAt: new Date(),
        }
      })
      .then(res => {
        console.log(res)
      })
  },
})