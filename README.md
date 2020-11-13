# website

## Project setup

```npm
yarn install
```

### Compiles and hot-reloads for development

```npm
yarn serve
```

### Compiles and minifies for production

```npm
yarn build
```

### Lints and fixes files

```npm
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### 目录结构

```js
website
├─ config
├─ mock                     //本地模拟数据
├─ public/
├─ src/
│ ├─ api                    //后台接口服务
│ ├─ assets                 //本地静态资源
│ ├─ components             //业务通用组件
│ ├─ layout                 //通用布局
│ ├─ router                 //路由
│ ├─ store                  //vuex
│ ├─ utils                  //工具库
│ ├─ views
│ ├─ App.vue
│ ├─ main.ts                //项目入口文件
│ ├─ readme.md
│ ├─ shims-tsx.d.ts
│ ├─ shims-vue.d.ts
│ └─ variables.scss
├─ .env                     //通用环境变量
├─ .env.production          //生产环境变量
├─ babel.config.js
├─ package.json
├─ tsconfig.json            //ts配置文件
└─ vue.config.js            //vue cli 配置
```
