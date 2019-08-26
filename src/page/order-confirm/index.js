'use strict';

require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var _mm = require('util/mm.js');
var templateProduct = require('./product-list.string');
var templateAddress = require('./address-list.string');
var _order = require('service/order-service.js');
var _address = require('service/address-service.js');
var addressModel = require('./address-model.js');

var page = {
    data: {
        selectedAddressId: null // 选中的地址id，初始值为null
    },
    init: function() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function() {
        this.loadAddressList();
        this.loadProductList();
    },
    bindEvent: function() {
        var _this = this;
        // 地址的选择
        $(document).on('click', '.address-item', function() {
            // 给当前地址加上active类，并把其他地址上的active移除
            $(this).addClass('active').siblings('.address-item').removeClass('active');
            // 把选中的地址id存入data的selectedAddressId中
            _this.data.selectedAddressId = $(this).data('id');

        });

        // 订单的提交
        $(document).on('click', '.order-submit', function() {
            // 判断地址id是否存在
            var shippingId = _this.data.selectedAddressId;
            if (shippingId) {
                _order.createOrder({ // 创建新订单
                    shippingId: shippingId
                }, function (res) { // 成功
                    // 跳转到支付页面
                    window.location.href = './payment.html?orderNumber=' + res.orderNo;
                }, function (errMsg) { // 失败
                    _mm.errorTips(errMsg);
                });
            } else {
                _mm.errorTips('请选择地址后再提交');
            }
        });

        // 添加新地址
        $(document).on('click', '.address-add', function() {
            addressModel.show({
                isUpdate: false, // 是否要更新
                onSuccess: function() { // 成功回调
                    _this.loadAddressList();
                }
            });
        });
    },
    loadAddressList: function () { // 加载地址列表
        // 获取地址列表
        _address.getAddressList(function (res) { // 成功
            var addressListHtml = _mm.renderHtml(templateAddress, res);
            $('.address-con').html(addressListHtml);
        }, function (errMsg) {
            $('.address-con').html('<p class="err-tip">地址加载失败，请刷新后重试</p>');
        });
    },
    loadProductList: function () { // 加载商品列表
        // 获取地址列表
        _order.getOrderCartProductList(function (res) { // 成功
            var productListHtml = _mm.renderHtml(templateProduct, res);
            $('.product-con').html(productListHtml);
        }, function (errMsg) {
            $('.product-con').html('<p class="err-tip">商品列表加载失败，请刷新后重试</p>');
        });
    },

};
$(function() {
    page.init();
});