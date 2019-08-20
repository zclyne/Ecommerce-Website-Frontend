'use strict';

require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var _mm = require('util/mm.js');
var templateIndex = require('./index.string');
var _product = require('service/product-service.js');
var Pagination = require('util/pagination/index.js');

var page = {
    data: {
        listParam: {
            keyword: _mm.getUrlParam('keyword') || '',
            categoryId: _mm.getUrlParam('categoryId') || '',
            orderBy: _mm.getUrlParam('orderBy') || 'default',
            pageNum: _mm.getUrlParam('pageNum') || 1,
            pageSize: _mm.getUrlParam('pageSize') || 20
        }
    },
    init: function() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function() {
        this.loadList();
    },
    bindEvent: function() {
        var _this = this;
        $('.sort-item').click(function() { // 排序的点击事件
            var $this = $(this);
            _this.data.listParam.pageNum = 1;
            if ($this.data('type') === 'default') { // 点击默认排序
                if ($this.hasClass('active')) { // 已经active，直接返回
                    return;
                } else {
                    $this.addClass('active').siblings('.sort-item')
                        .removeClass('active asc desc');
                    _this.data.listParam.orderBy = 'default';
                }
            } else if ($this.data('type') === 'price') { // 点击价格排序
                $this.addClass('active').siblings('.sort-item') // active class的处理
                    .removeClass('active asc desc');
                // 升序、降序的处理
                if (!$this.hasClass('asc')) {
                    $this.addClass('asc').removeClass('desc');
                    _this.data.listParam.orderBy = 'price_asc';
                } else {
                    $this.addClass('desc').removeClass('asc');
                    _this.data.listParam.orderBy = 'price_desc';
                }
            }
            _this.loadList(); // 设置完排序参数后，重新加载列表
        });
    },
    loadList: function() { // 加载list数据
        var listParam = this.data.listParam;
        var listHtml = '';
        var _this = this;
        var $pListCon = $('.p-list-con');
        $pListCon.html('<div class="loading"></div>'); // 获取到数据前，显示loading图标
        // keyword和category不共存
        listParam.categoryId ? (delete listParam.keyword) : (delete listParam.categoryId);
        // 从接口获取数据
        _product.getProductList(listParam, function(res) { // 成功，渲染html
            listHtml = _mm.renderHtml(templateIndex, {
                list: res.list
            });
            $pListCon.html(listHtml);
            // 加载分页信息
            _this.loadPagination({
                hasPreviousPage: res.hasPreviousPage,
                prePage: res.prePage,
                hasNextPage: res.hasNextPage,
                nextPage: res.nextPage,
                pageNum: res.pageNum,
                pages: res.pages
            });
        }, function(errMsg) { // 失败
            _mm.errorTips(errMsg);
        });
    },
    loadPagination: function(pageInfo) { // 加载分页信息
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container: $('.pagination'),
            onSelectPage: function(pageNum) {
                _this.data.listParam.pageNum = pageNum;
                _this.loadList();
            }
        }));
    }
};
$(function() {
    page.init();
});