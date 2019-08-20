'use strict';

require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var _mm = require('util/mm.js');
var templateIndex = require('./index.string');
var _product = require('service/product-service.js');
var _cart = require('service/cart-service.js');

var page = {
    data: {
        productId: _mm.getUrlParam('productId') || '',
    },
    init: function() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function() {
        // 判断是否传入productId
        if (!this.data.productId) {
            _mm.goHome(); // 若没有传入productId, 自动跳回首页
        }
        this.loadDetail();
    },
    bindEvent: function() {
        var _this = this;
        // 图片预览，此处使用事件代理
        $(document).on('mouseenter', '.p-img-item', function() {
            // $(this)即触发了该mouseenter事件的元素
            var imageUrl = $(this).find('.p-img').attr('src');
            $('.main-img').attr('src', imageUrl);
        });
        // count操作
        $(document).on('click', '.p-count-btn', function() {
            var type = $(this).hasClass('plus') ? 'plus' : 'minus', // 判断是+还是-
                $pCount = $('.p-count'),
                currCount = parseInt($pCount.val()),
                minCount = 1,
                maxCount = _this.data.detailInfo.stock || 1;
            if (type === 'plus') {
                $pCount.val(currCount < maxCount ? currCount + 1 : maxCount);
            } else if (type === 'minus') {
                $pCount.val(currCount > minCount ? currCount - 1 : minCount);
            }
        });
        // 加入购物车
        $(document).on('click', '.cart-add', function() {
            _cart.addToCart({
                productId: _this.data.productId,
                count: $('.p-count').val()
            }, function(res) { // 成功
                window.location.href = './result.html?type=cart-add';
            }, function(errMsg) { // 失败
                _mm.errorTips(errMsg);
            });
        });
    },
    loadDetail: function() { // 加载商品详细信息
        var _this = this;
        var html = '';
        var $pageWrap = $('.page-wrap');
        $pageWrap.html('<div class="loading"></div>');
        // 请求商品detail信息
        _product.getProductDetail(this.data.productId, function(res) { // 成功
            _this.filter(res);
            _this.data.detailInfo = res; // 缓存detail的数据，之后购物车加减时要用
            html = _mm.renderHtml(templateIndex, res);
            $pageWrap.html(html);
        }, function(errMsg) { // 失败
            $pageWrap.html('<p class="err-tip">此商品太淘气，找不到了~~</p>');
        });
    },
    filter: function(data) { // 数据匹配
        // subImages原本是以','分隔的字符串，为多张图片的文件名
        if (data.subImages) {
            data.subImages = data.subImages.split(',');
        }
    }
};
$(function() {
    page.init();
});