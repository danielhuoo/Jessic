# Jessic

一款基于Vue的网易云音乐播放器

语言：中文 | [英文](README_en.md)

这是一个PC端的在线音乐播放器，后端数据取自网易云音乐。API接口来自：[网易云音乐 API](https://github.com/Binaryify/NeteaseCloudMusicApi).

你可以看看[Demo](http://35.242.163.122/)。

## 界面

![login.png](http://psb5eq4ez.bkt.clouddn.com/Jessic/login.png)

![main.png](http://psb5eq4ez.bkt.clouddn.com/Jessic/main.png)

这个项目是我为了练习Vue而搭建的，前后花了两个星期。实现的功能不多，但也是比较复杂和关键的功能，包括歌曲播放、选歌、切换歌单等。
使用的技术栈：Vue, Vuex, Vue-router, elementUI, axios, sass。

其中Vuex是我第一次在项目中使用的。使用下来感觉不错，跟以前的开发思维很不同，感兴趣的同学可以多看看 store 的结构。

目前已知的bug有：

1. 播放歌曲会抛出DOM异常，但不影响播放效果
2. 切换歌单后，歌单渲染不好，但不影响播放
3. 登录一定时候后会无法播放歌曲，我认为跟登录状态过期时间有关。需要刷新网页或者重新登录。
4. 缺乏测试样本，导致大部分异常状况没有被处理
5. 在Safari上无法播放歌曲。

后期展望：
1. 可能会把api接口融合进项目里，可避免多部署一套API服务
2. 可能会改写成SSR的架构
3. 极有可能使用 Electron 包装成 App，从而在 Mac 或 Linux 上运行
4. 后续会加入 搜索、歌词、歌曲的增删查改、MV等功能
5. 可能会使用 Typescript 进行重构

这个项目是我的个人项目。我会不断地更新，加入新的功能和优化。
Anyway， 这个项目是以练习为目的的，所以不可能做到十全十美。有兴趣的同学可以多交流交流。


## 安装 setup
```
npm install
```

### 运行
```
npm run serve
```

### 编译
```
npm run build
```