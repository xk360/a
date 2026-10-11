```markdown
# piupiu-guard

PiuPiu酱 WebView 防护组件

## 模块
- 脚本白名单：拦截外链 script
- 野悬浮层哨兵：摘除顶层注入横幅
- iframe 清理
- 跳转记录（window.open / 外链点击）

## 更新流程
1. 改 dist/guard.js
2. version.json 里的 version 加一位
3. Commit 到 main
4. 端上脚本顶部提示"发现新版"，手动换装

## 回滚
把 guard.js 恢复上一提交，version 降回去即可
```
