var apiPrefix = 'https://bus.yangmenglin.com'

module.exports = {
  ROUTE: `${apiPrefix}/bus/:router_name`,                 // 路线查询接口
  STOP: `${apiPrefix}/bus/:router_name/stop/:stop_id`,    // 路线中某一站点详细信息查询接口
}