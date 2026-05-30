# Mu Nan Photography Journal

这是一个个人摄影作品集静态网页，可以直接本地打开，也可以部署到 GitHub Pages。

## 文件

- `index.html`: 页面内容和图片链接
- `styles.css`: 页面视觉样式
- `script.js`: 顶部导航滚动效果
- `assets/`: 本地摄影图片

## 替换成自己的照片

在 `index.html` 中搜索 `images.unsplash.com`，把对应的 `src` 换成你的本地图片路径，例如：

```html
<img src="./assets/my-street-photo.jpg" alt="街头摄影作品" />
```

建议把自己的照片放进 `assets` 文件夹。保持横图和竖图混排会更像真正的作品集。

## 本地预览

在这个文件夹里运行：

```bash
python3 -m http.server 4173
```

然后打开：

```text
http://127.0.0.1:4173
```

## 发布到 GitHub Pages

推荐仓库设置：

- Repository name: `photography-portfolio`
- Branch: `main`
- Pages source: `Deploy from a branch`
- Branch folder: `/ (root)`

发布后地址通常是：

```text
https://你的GitHub用户名.github.io/photography-portfolio/
```

## 修改联系方式

在 `index.html` 底部搜索 `your.email@example.com`，替换成你的邮箱。Instagram 和小红书链接也可以在同一区域修改。
