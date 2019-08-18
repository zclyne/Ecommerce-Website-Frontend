'use strict';

require('./index.css');
var _mm = require('util/mm.js');
var templateIndex = require('./index.string');

// 侧边导航
var navSide = {
    option: {
        name: '',
        navList: [
            {name: 'user-center', desc: '个人中心', href: './user-center.html'},
            {name: 'order-list', desc: '我的订单', href: './order-list.html'},
            {name: 'user-pass-update', desc: '修改密码', href: './user-pass-update.html'},
            {name: 'about', desc: '关于mmall', href: './about.html'}
        ]
    },
    init: function(option) {
        $.extend(this.option, option); // 用传入的option扩展this.option
        this.renderNav();
    },
    renderNav: function () { // 渲染导航菜单
        // 遍历navList，查找匹配的name，并置为active
        for(var i = 0, iLength = this.option.navList.length; i < iLength; i++) {
            if (this.option.navList[i].name === this.option.name) {
                this.option.navList[i].isActive = true;
            }
        }
        // 渲染list数据
        var navHtml = _mm.renderHtml(templateIndex, {
            navList: this.option.navList
        });
        // 把html放入容器
        $('.nav-side').html(navHtml);
    }
};

module.exports = navSide;