//index.js

var util = require('../../utils/util.js')
var app = getApp()
var router_name
Page({
  data: {
    feed: [1],
    feedDetail: [1],
    feed_length: 0,
    router_name: 993,
    search_stop_detail_touch: 100,
    search_stop_detail: 100,
    direction:1,
    fromStop:'',
    toStop:'',
    searchingInfo:''
  },
  //事件处理函数
  bindItemTap: function() {
    wx.navigateTo({
      url: '../answer/answer'
    })
  },
  bindQueTap: function() {
    wx.navigateTo({
      url: '../question/question'
    })
  },
  onLoad: function () {
    console.log('现在在执行onLoad')
    //var that = this
    //调用应用实例的方法获取全局数据
    this.getData();
  },
  upper: function () {
    wx.showNavigationBarLoading()
    //this.refresh();
    this.getData();
    console.log("router_name");
    setTimeout(function () { wx.hideNavigationBarLoading(); wx.stopPullDownRefresh(); }, 2000);
  },
  lower: function (e) {
    wx.showNavigationBarLoading();
    var that = this;
    setTimeout(function () { wx.hideNavigationBarLoading(); wx.stopPullDownRefresh();}, 2000);
    console.log("lower");
  },
  //scroll: function (e) {
  //  console.log("scroll")
  //},

  //网络请求数据, 实现首页刷新
  refresh0: function(){
    var index_api = '';
    util.getData(index_api)
        .then(function(data){
          //this.setData({
          //
          //});
          console.log(data);
        });
  },
  refresh: function(){
    console.log("现在在执行index中的refresh()方法");
    wx.showToast({
      title: '刷新中',
      icon: 'loading',
      duration: 3000
    });
    var feed = util.getData2();
    console.log("loaddata");
    var feed_data = feed.data;
    this.setData({
      feed:feed_data,
      feed_length: feed_data.length
    });
    setTimeout(function(){
      wx.showToast({
        title: '刷新成功',
        icon: 'success',
        duration: 2000
      })
    },3000)

  },
  //使用本地 fake 数据实现继续加载效果
  nextLoad: function(){
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 4000
    })
    var next = util.getNext();
    console.log("continueload");
    var next_data = next.data;
    this.setData({
      feed: this.data.feed.concat(next_data),
      feed_length: this.data.feed_length + next_data.length
    });
    setTimeout(function(){
      wx.showToast({
        title: '加载成功',
        icon: 'success',
        duration: 2000
      })
    },3000)
  },
//绑定搜索线路的值获取
  searchInput: function (e) {
    console.log('输入了新的线路。。。。。');
    var str = e.detail.value;
    if (str.lastIndexOf('路')!=-1){
      str = str.substr(0, str.length - 1);
    }
    console.log(str);

    this.setData({
      router_name: str
    })
    console.log(this.data.router_name);

  },
  //搜索按钮的触发事件
  search_router_e: function (e) {
    wx.showNavigationBarLoading()
    //this.refresh();
    console.log('输入了新的线路');
    console.log(this.data.router_name);
    this.getData();
    console.log("upper");
    setTimeout(function () { wx.hideNavigationBarLoading(); wx.stopPullDownRefresh(); }, 3000);
  },
  //搜索按钮的触发事件
  switch_router_e: function (e) {
    wx.showNavigationBarLoading()
    //this.refresh();
    console.log('开始切换方向');
    console.log(this.data.direction);
    this.getSwitchData();
    setTimeout(function () { wx.hideNavigationBarLoading(); wx.stopPullDownRefresh(); }, 3000);
  },
//获取点击的实时站点号
  actualSearchTap: function(e) {
   console.log("下面是实时站点号");
   var str = e.currentTarget.dataset.detail_id;
    var actualStop = str.substring(0, str.length - 1);
    this.setData({
      search_stop_detail_touch: actualStop
    });
    this.getActualData(actualStop);
   //setTimeout(function () { wx.hideNavigationBarLoading(); wx.stopPullDownRefresh(); }, 2000);
 },
  //执行线路信息查询
  getData: function () {
    console.log("现在在执行index里的getData()方法1?");
    console.log(this.data.router_name);
    this.setData({
      feed: '我是feed',
      feed_length: '我是feed_length'
    });
    console.log(this.data.feed);
    var that = this;
    util.getData(this.data.router_name, this.data.direction).then(function (res) {
      //请求成功的操作
      console.log("请求现在是同步返回的吗？");
      console.log(res.data);      
      that.setData({
        feed: res.data.stops,
        feed_length: res.data.stops.length,
        fromStop: res.data.from,
        toStop: res.data.to
      });
    });
  },
  //切换方向
  //执行线路信息查询
  getSwitchData: function () {
    console.log("现在在执行index里的getData()方法1?");
    console.log(this.data.router_name);
    this.setData({
      feed: '我是feed',
      feed_length: '我是feed_length',
      direction: (this.data.direction+1)%2
    });
    console.log(this.data.feed);
    var that = this;
    util.getData(this.data.router_name, this.data.direction).then(function (res) {
      //请求成功的操作
      console.log("请求现在是同步返回的吗？");
      console.log(res.data);
      that.setData({
        feed: res.data.stops,
        feed_length: res.data.stops.length,
        fromStop:res.data.from,
        toStop:res.data.to
      });
    });
  },
  //获取实时的到站信息
  getActualData: function (actualStop) {
    console.log("现在在执行index里的getData()方法1?");
    console.log(this.data.search_stop_detail);
    console.log(this.data.feed);
    console.log("正在载入实时信息");
    this.setData({
      searchingInfo: '正在拼命加载实时信息  ~~~'
    });
    var that = this;
    util.getActualData(this.data.router_name, actualStop, this.data.direction).then(function (res) {
      //请求成功的操作
      console.log("详细请求现在是同步返回的吗？");
      console.log(res.data);
      console.log("详细现在请求的站点编号是" + actualStop);
      var parseData = res.data;
      parseData.time = parseInt(parseData.time / 60);
      that.setData({
        search_stop_detail: actualStop,
        feedDetail: parseData,
        searchingInfo: ''
      });
      console.log("间隔为");
      console.log(that.data.feedDetail.stop_interval);
    });
  },
})
