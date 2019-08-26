'use strict';

var _mm = require('util/mm.js');
var _cities = require('util/cities/index.js');
var templateAddressModel = require('./address-model.string');
var _address = require('service/address-service.js');

var addressModel = {
    show: function (option) { // 显示编辑收货地址页面
        this.option = option; // 缓存option到this
        this.$modelWrap = $('.model-wrap');
        // 渲染页面
        this.loadModel();
        // 绑定事件
        this.bindEvent();
    },
    bindEvent: function() {
        var _this = this;
        // 在选择的省份改变时，改变对应的城市列表
        this.$modelWrap.find('#receiver-province').change(function() {
            var selectedProvince = $(this).val();
            _this.loadCities(selectedProvince);
        });
    },
    loadModel: function() {
        var addressModelHtml = _mm.renderHtml(templateAddressModel, this.option.data);
        this.$modelWrap.html(addressModelHtml);
        // 加载省份选项
        this.loadProvince();
        // 加载城市选项
        this.loadCities();
    },
    loadProvince: function() { // 加载省份信息
        var provinces = _cities.getProvinces() || [],
            $provinceSelect = this.$modelWrap.find('#receiver-province');
        $provinceSelect.html(this.getSelectOption(provinces));
    },
    loadCities: function(provinceName) { // 根据省份加载城市信息
        var cities = _cities.getCities(provinceName) || [],
            $citySelect = this.$modelWrap.find('#receiver-city');
        $citySelect.html(this.getSelectOption(cities));
    },
    getSelectOption: function(optionArray) { // 获取select框的选项，输入：array，输出：html
        var html = '<option value="">请选择</option>';
        for (var i = 0, length = optionArray.length; i < length; i++) {
            html += '<option value="' + optionArray[i] + '">' + optionArray[i] + '</option>';
        }
        return html;
    },
    hide: function () { // 隐藏编辑收货地址页面

    },

};

module.exports = addressModel;