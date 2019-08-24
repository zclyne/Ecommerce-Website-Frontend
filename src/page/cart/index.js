'use strict';

require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var _mm = require('util/mm.js');
var templateIndex = require('./index.string');
var _cart = require('service/cart-service.js');

var page = {
    data: {

    },
    init: function() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function() {
        this.loadCart();
    },
    bindEvent: function() {
        var _this = this;

        // 商品的选择/取消选择
        $(document).on('click', '.cart-select', function() {
            var $this = $(this),
                // product-id加在父容器的属性data-product-id上
                productId = $this.parents('.cart-table').data('product-id');
            // 切换选中状态
            if ($this.is(':checked')) { // 点击后为checked，选中
                _cart.selectProduct(productId, function(res) { // 成功
                    _this.renderCart(res);
                }, function(errMsg) { // 失败
                    _this.showCartError();
                });
            } else { // 取消选中
                _cart.unselectProduct(productId, function(res) { // 成功
                    _this.renderCart(res);
                }, function(errMsg) { // 失败
                    _this.showCartError();
                });
            }
        });

        // 商品的全选/取消全选
        $(document).on('click', '.cart-select-all', function() {
            var $this = $(this);
            // 切换选中状态
            if ($this.is(':checked')) { // 点击后为checked，全选
                _cart.selectAllProducts(function(res) { // 成功
                    _this.renderCart(res);
                }, function(errMsg) { // 失败
                    _this.showCartError();
                });
            } else { // 取消全选
                _cart.unselectAllProducts(function(res) { // 成功
                    _this.renderCart(res);
                }, function(errMsg) { // 失败
                    _this.showCartError();
                });
            }
        });

        // 商品数量的变化
        $(document).on('click', '.count-btn', function() {
            var $this = $(this),
                $pCount = $this.siblings('.count-input'),
                currCount = parseInt($pCount.val()),
                type = $this.hasClass('plus') ? 'plus' : 'minus',
                productId = $this.parents('.cart-table').data('product-id'),
                minCount = 1,
                // 该商品的库存值即允许的最大值，存在pCount标签的data-max属性中
                maxCount = parseInt($pCount.data('max')),
                newCount = 0;
            if (type === 'plus') {
                if (currCount >= maxCount) {
                    _mm.errorTips('该商品数量已达到上限');
                    return;
                }
                newCount = currCount + 1;
            } else if (type === 'minus') {
                if (currCount <= minCount) {
                    return;
                }
                newCount = currCount - 1;
            }
            _cart.updateProduct({ // 更新购物车商品数量
                productId: productId,
                count: newCount
            }, function(res) { // 成功
                _this.renderCart(res);
            }, function(errMsg) {
                _this.showCartError();
            });
        });

        // 删除单个商品
        $(document).on('click', '.cart-delete', function() {
            if (window.confirm('确认要删除该商品？')) {
                var productId = $(this).parents('.cart-table').data('product-id');
                _this.deleteCartProduct(productId);
            }
        });

    },
    loadCart: function() { // 加载购物车信息
        var _this = this;
        // 获取购物车列表
        _cart.getCartList(function(res) { // 成功
            _this.renderCart(res);
        }, function(errMsg) { // 失败
            _this.showCartError();
        })
    },
    renderCart: function(data) { // 渲染购物车
        this.filter(data);
        // 缓存购物车信息
        this.data.cartInfo = data;
        // 生成html
        var cartHtml = _mm.renderHtml(templateIndex, data);
        $('.page-wrap').html(cartHtml);
    },
    filter: function(data) { // 数据匹配
        // 判断是否为空
        // cartProductVoList是传到前端的一个数组
        // !!强制转换为布尔值
        data.notEmpty = !!data.cartProductVoList.length;
    },
    showCartError: function() { // 显示错误信息
        $('.page-wrap').html('<p class="err-tip">哪里不对了，刷新一下试试</p>');
    },
    deleteCartProduct: function(productIds) { // 删除指定商品，支持批量，productId用逗号分隔
        var _this = this;
        _cart.deleteProduct(productIds, function(res) {
            _this.renderCart(res);
        }, function(errMsg) {
            _this.showCartError();
        });
    }
};
$(function() {
    page.init();
});