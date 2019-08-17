'use strict';

require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');

// 用$(function() {})的写法，保证在页面加载完之后再执行函数内容
$(function () {
    var type = _mm.getUrlParam('type') || 'default',
        $element = $('.' + type + '-success');
    // 显示对应的元素
    $element.show();
});