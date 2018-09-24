# smallbus

## 背景
每天上下班查公交实时信息时，虽然有上海发布这类公共号，但苦于需要经过层层点击才能进入，使用效果不是很好。于是我想做一个小程序，把我默认浏览的线路放到首页直接展示，并在后期逐步加入消息通知功能。
>+ 开始：我利用了两天坐公交的时间阅读一些小程序开发文档，想着差不多了解小程序开发过程和原理后就动手。

>+ 接着：我就开始了我的小程序试水开发，经历后端程序员初涉前端代码的各种跳坑和踌躇。

>+ 然后：经过无数次debug和google后，终于发布了第一版，还激动的写了一篇博客,名叫[《公交查询微信小程序的实现》](http://www.xiajunyi.com/pages/p50.html#more)。

>+ 直到：我的好友[@DarkKille](https://github.com/DarkKille)这位前端高手加入了我的小项目，开始帮助我。值得一提的是，他只用了一天时间就优化了我很多代码里的low逼方法，还让smallbus的界面变的稍微高档起来。

>+ 现在：我们开始利用业余时间逐步推进smallbus界面和功能的优化，希望最终能做出一个真正实用且方便大家的公交查询小程序。

## 简介
它就是一个查公交实时信息的微信小程序，我的目的就是让它方便一点，体验舒适一些。前端参照自[weapp-wechat-zhihu](https://github.com/RebeccaHanjw/weapp-wechat-zhihu)，后端来自[ark930/shanghai-bus](https://github.com/ark930/shanghai-bus)。

## 功能点
该程序主要功能为上海公交查询，详细功能点如下：
1. 指定公交线路查询
2. 历史线路推荐查询
3. 站点实时到站信息动态查询
4. 按位置匹配最近站点的公交线路（正在开发中，敬请期待。。。）
5. 公交预定站点微信消息通知（酝酿中。。。）

## 结构说明
 该小程序参照自[weapp-wechat-zhihu](https://github.com/RebeccaHanjw/weapp-wechat-zhihu)，原构造可参考[原README](https://github.com/RebeccaHanjw/weapp-wechat-zhihu/blob/master/README.md)，smallbus代码部分主要修改了三部分目录内容：
+ [pages/index](https://github.com/xiajunyi/smallbus/tree/master/pages/index)
+ [pages/router](https://github.com/xiajunyi/smallbus/tree/master/pages/router)
+ [utils](https://github.com/xiajunyi/smallbus/tree/master/utils)



## DEMO
感兴趣的话可以关注我们已发布的小程序
![img](http://www.xiajunyi.com/img/xjy/p50004.png)




