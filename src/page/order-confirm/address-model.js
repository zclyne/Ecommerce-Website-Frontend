'use strict';

var _mm = require('util/mm.js');
var _cities = require('util/cities/index.js');
var templateAddressModel = require('./address-model.string');
var _address = require('service/address-service.js');

var addressModel = {
    show: function (option) { // 显示编辑收货地址页面
        this.option = option; // 缓存option到this
        this.option.data = option.data || {};
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
        // 提交收货地址
        this.$modelWrap.find('.address-btn').click(function() {
            var receiverInfo = _this.getReceiverInfo(),
                isUpdate = _this.option.isUpdate; // 用于区分是添加新地址还是编辑已有地址
            if (!isUpdate && receiverInfo.status) { // 添加新地址且验证通过
                _address.save(receiverInfo.data, function (res) { // 成功
                    _mm.successTips('地址添加成功');
                    _this.hide();
                    typeof _this.option.onSuccess === 'function'
                        && _this.option.onSuccess(res);
                }, function (errMsg) { // 失败
                    _mm.errorTips(errMsg);
                });
            } else if (isUpdate && receiverInfo.status) {// 更新地址且验证通过
                _address.update(receiverInfo.data, function (res) { // 成功
                    _mm.successTips('地址更新成功');
                    _this.hide();
                    typeof _this.option.onSuccess === 'function'
                    && _this.option.onSuccess(res);
                }, function (errMsg) { // 失败
                    _mm.errorTips(errMsg);
                });
            } else { // 验证不通过
                _mm.errorTips(receiverInfo.errMsg || '好像哪里不对了');
            }
        });
        // 保证点击model内容区时，不关闭弹窗，即停止向上冒泡
        this.$modelWrap.find('.model-container').click(function (e) {
            e.stopPropagation();
        });
        // 点击叉号或者蒙版区域，关闭弹窗
        this.$modelWrap.find('.close').click(function () {
            _this.hide();
        });
    },
    getReceiverInfo: function() { // 获取表单收件人信息，并做表单的验证
        var receiverInfo = {},
            result = {
                status: false
            };
        // 从输入框中获取信息
        receiverInfo.receiverName = $.trim(this.$modelWrap.find('#receiver-name').val());
        receiverInfo.receiverProvince = this.$modelWrap.find('#receiver-province').val();
        receiverInfo.receiverCity = this.$modelWrap.find('#receiver-city').val();
        receiverInfo.receiverAddress = $.trim(this.$modelWrap.find('#receiver-address').val());
        receiverInfo.receiverPhone = $.trim(this.$modelWrap.find('#receiver-phone').val());
        receiverInfo.receiverZip = $.trim(this.$modelWrap.find('#receiver-zip').val());

        if (this.option.isUpdate) { // 如果是更新地址，还要拿到要更新的地址id
            receiverInfo.id = this.$modelWrap.find('#receiver-id').val();
        }

        // 表单验证
        if (!receiverInfo.receiverName) {
            result.errMsg = '请输入收件人姓名';
        } else if (!receiverInfo.receiverProvince) {
            result.errMsg = '请选择收件人所在省份';
        } else if (!receiverInfo.receiverCity) {
            result.errMsg = '请选择收件人所在城市';
        } else if (!receiverInfo.receiverAddress) {
            result.errMsg = '请输入收件人详细地址';
        } else if (!receiverInfo.receiverPhone) {
            result.errMsg = '请输入收件人手机号';
        } else { // 所有验证都通过
            result.status = true;
            result.data = receiverInfo;
        }
        return result;
    },
    loadModel: function() {
        var addressModelHtml = _mm.renderHtml(templateAddressModel, {
            isUpdate: this.option.isUpdate,
            data: this.option.data
        });
        this.$modelWrap.html(addressModelHtml);
        // 加载省份选项
        this.loadProvince();
    },
    loadProvince: function() { // 加载省份信息
        var provinces = _cities.getProvinces() || [],
            $provinceSelect = this.$modelWrap.find('#receiver-province');
        $provinceSelect.html(this.getSelectOption(provinces));
        // 如果是更新地址，并且有省份信息，做省份的回填
        if (this.option.isUpdate && this.option.data.receiverProvince) {
            $provinceSelect.val(this.option.data.receiverProvince);
            // 加载城市选项
            this.loadCities(this.option.data.receiverProvince);
        }
    },
    loadCities: function(provinceName) { // 根据省份加载城市信息
        var cities = _cities.getCities(provinceName) || [],
            $citySelect = this.$modelWrap.find('#receiver-city');
        $citySelect.html(this.getSelectOption(cities));
        // 如果是更新地址，并且有城市信息，做城市的回填
        if (this.option.isUpdate && this.option.data.receiverCity) {
            $citySelect.val(this.option.data.receiverCity);
        }
    },
    getSelectOption: function(optionArray) { // 获取select框的选项，输入：array，输出：html
        var html = '<option value="">请选择</option>';
        for (var i = 0, length = optionArray.length; i < length; i++) {
            html += '<option value="' + optionArray[i] + '">' + optionArray[i] + '</option>';
        }
        return html;
    },
    hide: function () { // 关闭弹窗
        this.$modelWrap.empty();
    },

};

module.exports = addressModel;