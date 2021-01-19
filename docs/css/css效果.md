# 图片的翻转效果
```css
.wrapper {
    width: 100%;
    height: 100%;
	position: relative;
    transition: all .5s linear;
    transform-style: preserve-3d;
    &:hover {
      transform: rotateY(180deg);
    }
}

.front-img,.back-img{
      backface-visibility: hidden;
      position: absolute;
      top: 6px;
      bottom: 6px;
      left: 20px;
      right: 20px;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
}
.back-img {
      transform: rotateY(-180deg);
}
```

```html
<div class=‘wrapper’>
 <div class=‘front-img’ style={{ backgroundImage: `url(${logo.frontLogo})` }}></div>
 <div class=‘backing’ style={{ backgroundImage: `url(${logo.backLogo})` }}></div>
</div>
```

