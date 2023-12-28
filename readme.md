
# koishi插件
本仓库修改自自[https://github.com/yi03/koishi-plugin-openai-api](https://github.com/yi03/koishi-plugin-openai-api)


### 由于openai官方API某些原因可能无法直接访问
这里修改了yi03的openai-api插件，在原有基础上可以自定义API的url

使其可以同时支持：

1.官方API-直接填写官方API的url即可(目前是https://api.openai.com/v1/chat/completions)

2.可以使用cloudflare转发官方api，免费但需要注册有自己的域名

3.可以使用第三方gpt的api，具体参考其文档，但数据请求格式需与openai官方一致



# 用法

艾特bot 或 提到bot的名字 或 回复bot 后，bot会回复你。

发送 `设定 <text>` 或 `set <text>` 设定bot的人格，如 `设定 你是一只猫猫`，不设定人格的话会使用默认的人格。
openai自带的洗脑很强，所以设定人格需要一些技巧。

发送 `重置` 或 `reset` 重置bot的记忆。

每个账号的设定和记忆是独立的。



# API使用方法
### 使用cloudflare转发openai(此方法不需代理即可调用官方API，免费，但需有自己的域名)
[https://zhuanlan.zhihu.com/p/650904106]（https://zhuanlan.zhihu.com/p/650904106）

### 使用第三方API需保证请求数据格式与官方API相同
[openai官方文档](https://platform.openai.com/docs/api-reference/chat)
