# ifthat-pass
密码管理工具

## 背景
之前用的一个非常好用的存密码的工具 Avast Password 在 app store 上下载不了了，但是又确实有存密码的需求，就打算自己做一个吧

采用前后端分离的架构，前端 vue，后端 nodejs，数据库 mongodb，接入 ifthat 统一账号登录

## 登录

使用 ifthat-login 统一登录

登录后会给每一个用户在后端添加一个用户名和加密后的字符串的一条记录

## 加密方式

AES加密解密