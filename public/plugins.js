window.settingPlugins = {
  createBaiduTongji,
}

function createBaiduTongji() {
  var _hmt = _hmt || [];
  (function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?37e253bf0a8429a614c7b3ac76807f14";
    var s = document.getElementsByTagName("script")[0]; 
    s.parentNode.insertBefore(hm, s);
  })();
}