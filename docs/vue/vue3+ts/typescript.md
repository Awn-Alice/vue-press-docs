# 项目中关于 typescript 的配置

### 关于json文件的引入，新建文件 src/typings.d.ts

```typescript
declare module "*.json" {
    const value: any;
    export default value;
}
```
