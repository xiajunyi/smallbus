function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
};

var index = require('../data/data_index.js')
var index_next = require('../data/data_index_next.js')
var discovery = require('../data/data_discovery.js')
var discovery_next = require('../data/data_discovery_next.js')

//获取公交站点信息
function getData(router_name, direction = 0){
  console.log("开始执行utils中的getData(router_name)");
  return new Promise(function(resolve, reject){
    wx.request({
      url: 'http://bus.yangmenglin.com/bus/' + router_name +'?direction='+direction,
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        console.log("success");
        console.log("我收到了返回的数据");
        console.log(res.data);
        resolve(res);
      },
      fail: function (res) {
        reject(res);
        console.log("failed");
      }
      
    })
  })
}

//获取实时到站信息
function getActualData(router_name, stop_id, direction) {
  console.log("开始执行utils中的getData(stop_id)");
  return new Promise(function (resolve, reject) {
    wx.request({
      url: 'http://bus.yangmenglin.com/bus/'+ router_name+ '路/stop/' + stop_id+'?direction='+direction,
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log("success");
        console.log("我收到了返回的数据");
        console.log(res.data);
        resolve(res);
      },
      fail: function (res) {
        reject(res);
        console.log("failed");
      }
    })
  })
}

function getData2(){
  return index.index;
}

function getNext(){
  return index_next.next;
}

function getDiscovery(){
  return discovery.discovery;
}

function discoveryNext(){
  return discovery_next.next;
}



module.exports.getData = getData;
module.exports.getData2 = getData2;
module.exports.getNext = getNext;
module.exports.getDiscovery = getDiscovery;
module.exports.discoveryNext = discoveryNext;
module.exports.getActualData = getActualData;




