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

        // 编辑地址
        $(document).on('click', '.address-update', function(e) {
            e.stopPropagation(); // 阻止冒泡
            var shippingId = $(this).parents('.address-item').data('id');
            _address.getAddress(shippingId, function(res) {
                addressModel.show({
                    isUpdate: true, // 是否要更新
                    data: res,
                    onSuccess: function() { // 成功回调
                        _this.loadAddressList();
                    }
                });
            }, function(errMsg) {
                _mm.errorTips(errMsg);
            });
            addressModel.show({
                isUpdate: false, // 是否要更新
                onSuccess: function() { // 成功回调
                    _this.loadAddressList();
                }
            });
        });

        // 删除地址
        $(document).on('click', '.address-delete', function(e) {
            e.stopPropagation(); // 阻止冒泡
            var id = $(this).parents('.address-item').data('id');
            if (window.confirm('确认要删除该地址吗？')) {
                _address.deleteAddress(id, function (res) { // 成功
                    _this.loadAddressList();
                }, function (errMsg) { // 失败
                    _mm.errorTips(errMsg);
                });
            }
        });
    },
    loadAddressList: function () { // 加载地址列表
        var _this = this;
        $('.address-con').html('<div class="loading"></div>');
        // 获取地址列表
        _address.getAddressList(function (res) { // 成功
            _this.addressFilter(res);
            var addressListHtml = _mm.renderHtml(templateAddress, res);
            $('.address-con').html(addressListHtml);
        }, function (errMsg) {
            $('.address-con').html('<p class="err-tip">地址加载失败，请刷新后重试</p>');
        });
    },
    addressFilter: function (data) { // 处理地址列表中选中状态
        if (this.data.selectedAddressId) {
            var selectedAddressIdFlag = false;
            for (var i = 0, length = data.list.length; i < length; i++) {
                if (data.list[i].id === this.data.selectedAddressId) {
                    data.list[i].isActive = true;
                    selectedAddressIdFlag = true;
                }
            }
            if (!selectedAddressIdFlag) { // 以前选中的地址不在列表中，将其删除
                this.data.selectedAddressId = null;
            }
        }
    },
    loadProductList: function () { // 加载商品列表
        // 获取地址列表
        $('.product-con').html('<div class="loading"></div>');
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