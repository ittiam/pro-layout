/**
* @DATE: 2019/12/23 9:08
* @Version: 0.0.1
* @Author: liuchentong
* @Description: 展示颜色类
* @Update:
*/

<template>
    <div>
        <div>
            <button style="visibility:hidden" ref="copy" class="btn" :data-clipboard-text="copyContent" id="btn">
                Copy to clipboard
            </button>
            <h1>样式颜色展示,第一个为白色主题对应颜色，第二个为黑色主题对应颜色,点击类名复制</h1>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #A2B0C6;"></div>
                <div class="icon-div" style="background-color: #A2B0C6;"></div>
                <span class="mls">.wic1</span> <br/> 描述：导航栏图标颜色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #C0C0C0;"></div>
                <div class="icon-div" style="background-color: #87909F;"></div>
                <span class="mls">.wic-main</span><br/>描述：页内icon颜色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #C0C0C0;"></div>
                <div class="icon-div" style="background-color: #37404D;"></div>
                <span class="mls">.wic-invalid</span><br/>描述：失效icon颜色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #333333;"></div>
                <div class="icon-div" style="background-color: #ffffff;"></div>
                <span class="mls">.wfc1</span><br/>描述：一级文字颜色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #666666;"></div>
                <div class="icon-div" style="background-color: #ADB5BD;"></div>
                <span class="mls">.wfc2</span><br/>描述：二级文字颜色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #999999;"></div>
                <div class="icon-div" style="background-color: #868E96;"></div>
                <span class="mls">.wfc3</span><br/>描述：三级文字颜色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #C0C0C0;"></div>
                <div class="icon-div" style="background-color: #495057;"></div>
                <span class="mls">.wfc-invalid</span><br/>描述：失效文字颜色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #4285F4;"></div>
                <div class="icon-div" style="background-color: #4285F4;"></div>
                <span class="mls">.wfc-theme</span><br/>描述：主题文字色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #0ACC9D;"></div>
                <div class="icon-div" style="background-color: #0ACC9D;"></div>
                <span class="mls">.wfc-success</span><br/>描述：安全文字色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #F59F00;"></div>
                <div class="icon-div" style="background-color: #F59F00;"></div>
                <span class="mls">.wfc-error</span><br/>描述：异常文字色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #F64357;"></div>
                <div class="icon-div" style="background-color: #F64357;"></div>
                <span class="mls">.wfc-alarm</span><br/>描述：告警文字色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #6281A3;"></div>
                <div class="icon-div" style="background-color: #95B1C5;"></div>
                <span class="mls">.wfc-unusual</span><br/>描述：偏色字体颜色，不是一级二级，不常用的一类字体颜色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #969FA9;"></div>
                <div class="icon-div" style="background-color: #ADB5BD;"></div>
                <span class="mls">.wfc-menu1</span><br/>描述：导航一级字体颜色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #969FA9;"></div>
                <div class="icon-div" style="background-color: #ADB5BD;"></div>
                <span class="mls">.wfc-menu2</span><br/>描述：导航二级字体颜色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #ffffff;"></div>
                <div class="icon-div" style="background-color: #ffffff;"></div>
                <span class="mls">.wfc-topmenu</span><br/>描述：顶部导航字体颜色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: rgba(255, 255, 255, .8);"></div>
                <div class="icon-div" style="background-color: rgba(255, 255, 255, .8);"></div>
                <span class="mls">.wfc-footmenu</span><br/>描述：页面底部字体颜色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #ffffff;"></div>
                <div class="icon-div" style="background-color: #ffffff;"></div>
                <span class="mls">.wfc-colorbtn</span><br/>描述：深色背景按钮字体颜色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #4285F4;"></div>
                <div class="icon-div" style="background-color: #4285F4;"></div>
                <span class="mls">.wfc-hover:hover</span><br/>描述：文字悬停颜色（一般情况下为主题颜色）
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #333333;"></div>
                <div class="icon-div" style="background-color: #ffffff;"></div>
                <span class="mls">.wfc1-hover:hover</span><br/>描述：文字悬停颜色（特殊情况一级文字颜色）
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #ffffff;"></div>
                <div class="icon-div" style="background-color: #ffffff;"></div>
                <span class="mls">.wfc-menu1-hover:hover</span><br/>描述：导航一级字体悬停颜色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #4285F4;"></div>
                <div class="icon-div" style="background-color: #4285F4;"></div>
                <span class="mls">.wfc-menu2-hover:hover</span><br/>描述：导航二级字体悬停颜色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #666666;"></div>
                <div class="icon-div" style="background-color: #4285F4;"></div>
                <span class="mls">.wfc-tree-hover:hover</span><br/>描述：树悬浮字体颜色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #333333;"></div>
                <div class="icon-div" style="background-color: #ffffff;"></div>
                <span class="mls">.wfc-active</span><br/>描述：文字激活选中颜色（一级文字颜色）
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #333333;"></div>
                <div class="icon-div" style="background-color: #ffffff;"></div>
                <span class="mls">.wfc-active:active</span><br/>描述：文字激活选中颜色（一级文字颜色）
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #ffffff;"></div>
                <div class="icon-div" style="background-color: #ffffff;"></div>
                <span class="mls">.wfc-menu1-active</span><br/>描述：导航激活选中一级字体颜色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #ffffff;"></div>
                <div class="icon-div" style="background-color: #ffffff;"></div>
                <span class="mls">.wfc-menu1-active:active</span><br/>描述：导航激活选中一级字体颜色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #ffffff;"></div>
                <div class="icon-div" style="background-color: #ffffff;"></div>
                <span class="mls">.wfc-menu2-active</span><br/>描述：导航激活选中二级字体颜色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #ffffff;"></div>
                <div class="icon-div" style="background-color: #ffffff;"></div>
                <span class="mls">.wfc-menu2-active:active</span><br/>描述：导航激活选中二级字体颜色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #333333;"></div>
                <div class="icon-div" style="background-color: #ffffff;"></div>
                <span class="mls">.wfc-card-active</span><br/>描述：卡片激活选中字体颜色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #333333;"></div>
                <div class="icon-div" style="background-color: #ffffff;"></div>
                <span class="mls">.wfc-card-active:active</span><br/>描述：卡片激活选中字体颜色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #4285F4;"></div>
                <div class="icon-div" style="background-color: #ffffff;"></div>
                <span class="mls">.wfc-tree-active</span><br/>描述：树激活选中字体颜色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #4285F4;"></div>
                <div class="icon-div" style="background-color: #ffffff;"></div>
                <span class="mls">.wfc-tree-active:active</span><br/>描述：树激活选中字体颜色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #71A3F8;"></div>
                <div class="icon-div" style="background-color: #ffffff;"></div>
                <span class="mls">.wbdc</span><br/>描述：边框线条颜色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #D6D6D6;"></div>
                <div class="icon-div" style="background-color: #495057;"></div>
                <span class="mls">.wbdc-hover:hover</span><br/>描述：边框线条悬停颜色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #71A3F8;"></div>
                <div class="icon-div" style="background-color: #ffffff;"></div>
                <span class="mls">.wbdc-active</span><br/>描述：边框线条选中颜色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #71A3F8;"></div>
                <div class="icon-div" style="background-color: #ffffff;"></div>
                <span class="mls">.wbdc-active:active</span><br/>描述：边框线条选中颜色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #DEE2E7;"></div>
                <div class="icon-div" style="background-color: #282E34;"></div>
                <span class="mls">.wbdc-divider</span><br/>描述：分割线色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #F1F3F5;"></div>
                <div class="icon-div" style="background-color: #303942;"></div>
                <span class="mls">.wbdc-pop-divider</span><br/>描述：弹出框分割线色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #D6D6D6;"></div>
                <div class="icon-div" style="background-color: #495057;"></div>
                <span class="mls">.wbdc4</span><br/>描述：暂空
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #F1F3F5;"></div>
                <div class="icon-div" style="background-color: #303942;"></div>
                <span class="mls">.wbdc-datepicker</span><br/>描述：日期上边条
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #71A3F8;"></div>
                <div class="icon-div" style="background-color: #5790FB;"></div>
                <span class="mls">.wbdc-stick</span><br/>描述：导航火柴棒色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #4285F4;"></div>
                <div class="icon-div" style="background-color: #4285F4;"></div>
                <span class="mls">.wbdc-theme</span><br/>描述：主题边框线条色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #0ACC9D;"></div>
                <div class="icon-div" style="background-color: #0ACC9D;"></div>
                <span class="mls">.wbdc-success</span><br/>描述：安全边框线条色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #F59F00;"></div>
                <div class="icon-div" style="background-color: #F59F00;"></div>
                <span class="mls">.wbdc-error</span><br/>描述：异常边框线条色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #F64357;"></div>
                <div class="icon-div" style="background-color: #F64357;"></div>
                <span class="mls">.wbdc-alarm</span><br/>描述：告警边框线条色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #EDF1F7;"></div>
                <div class="icon-div" style="background-color: #0B0E12;"></div>
                <span class="mls">.wbgc-main</span><br/>描述：界面背底色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #ffffff;"></div>
                <div class="icon-div" style="background-color: #12161D;"></div>
                <span class="mls">.wbgc-card</span><br/>描述：卡片色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #F7FAFF;"></div>
                <div class="icon-div" style="background-color: #181C24;"></div>
                <span class="mls">.wbgc-shallow</span><br/>描述：卡片上浅背板色、 日历头部背色、表格头部颜色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #F2F6FC;"></div>
                <div class="icon-div" style="background-color: #0E1116;"></div>
                <span class="mls">.wbgc-deep</span><br/>描述：卡片上深背板色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #11181F;"></div>
                <div class="icon-div" style="background-color: #11181F;"></div>
                <span class="mls">.wbgc-head</span><br/>描述：头部背板色(除日历头部、表格头部其它卡片头部)
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #F7FAFF;"></div>
                <div class="icon-div" style="background-color: #7066CC;"></div>
                <span class="mls">.wbgc-footer</span><br/>描述：页面底部背色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #ffffff;"></div>
                <div class="icon-div" style="background-color: #20262F;"></div>
                <span class="mls">.wbgc-dialog</span><br/>描述：弹出框背色、表格行内容的展开背色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #C0C0C0;"></div>
                <div class="icon-div" style="background-color: #20262F;"></div>
                <span class="mls">.wbgc-comment</span><br/>描述：未评价背色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #f5f5f5;"></div>
                <div class="icon-div" style="background-color: #1B2027;"></div>
                <span class="mls">.wbgc-invalid</span><br/>描述：失效背板色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #4285F4;"></div>
                <div class="icon-div" style="background-color: #4285F4;"></div>
                <span class="mls">.wbgc-theme</span><br/>描述：主题背板色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #0ACC9D;"></div>
                <div class="icon-div" style="background-color: #0ACC9D;"></div>
                <span class="mls">.wbgc-success</span><br/>描述：安全背板色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #F59F00;"></div>
                <div class="icon-div" style="background-color: #F59F00;"></div>
                <span class="mls">.wbgc-error</span><br/>描述：异常背板色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #F64357;"></div>
                <div class="icon-div" style="background-color: #F64357;"></div>
                <span class="mls">.wbgc-alarm</span><br/>描述：告警背板色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #71A3F8;"></div>
                <div class="icon-div" style="background-color: #71A3F8;"></div>
                <span class="mls">.wbgc-theme-hover:hover</span><br/>描述：主题色按钮悬浮背色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #29DCB1;"></div>
                <div class="icon-div" style="background-color: #29DCB1;"></div>
                <span class="mls">.wbgc-success-hover:hover</span><br/>描述：安全色按钮悬浮背色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #FAB005;"></div>
                <div class="icon-div" style="background-color: #FAB005;"></div>
                <span class="mls">.wbgc-error-hover:hover</span><br/>描述：异常色按钮悬浮背色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #FF5568;"></div>
                <div class="icon-div" style="background-color: #FF5568;"></div>
                <span class="mls">.wbgc-alarm-hover:hover</span><br/>描述：告警色按钮悬浮背色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #2A323F;"></div>
                <div class="icon-div" style="background-color: #171E28;"></div>
                <span class="mls">.wbgc-menu</span><br/>描述：导航菜单背板色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #202631;"></div>
                <div class="icon-div" style="background-color: #10161E;"></div>
                <span class="mls">.wbgc-submenu</span><br/>描述：二级导航菜单背板色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #11181F;"></div>
                <div class="icon-div" style="background-color: #0A0E14;"></div>
                <span class="mls">.wbgc-menu-hover:hover</span><br/>描述：导航菜单悬停背板色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #2D4A75;"></div>
                <div class="icon-div" style="background-color: #152844;"></div>
                <span class="mls">.wbgc-menu-active</span><br/>描述：导航菜单选中背板色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #2D4A75;"></div>
                <div class="icon-div" style="background-color: #152844;"></div>
                <span class="mls">.wbgc-menu-active:active</span><br/>描述：导航菜单选中背板色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #ffffff;"></div>
                <div class="icon-div" style="background-color: #11151B;"></div>
                <span class="mls">.wbgc-tree</span><br/>描述：树选择背板色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #F1F6FD;"></div>
                <div class="icon-div" style="background-color: #152844;"></div>
                <span class="mls">.wbgc-tree-active</span><br/>描述：树选择选中背板色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #F1F6FD;"></div>
                <div class="icon-div" style="background-color: #152844;"></div>
                <span class="mls">.wbgc-tree-active:active</span><br/>描述：树选择选中背板色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #F8F9FA;"></div>
                <div class="icon-div" style="background-color: #0A0E14;"></div>
                <span class="mls">.wbgc-tree-hover:hover</span><br/>描述：树选择悬浮背板色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #202631;"></div>
                <div class="icon-div" style="background-color: #20262F;"></div>
                <span class="mls">.wbgc-tree-popover</span><br/>描述：树气泡背景颜色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #11181F;"></div>
                <div class="icon-div" style="background-color: #2B333F;"></div>
                <span class="mls">.wbgc-tree-popover-hover:hover</span><br/>描述：树气泡悬浮背板色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #F4F6F9;"></div>
                <div class="icon-div" style="background-color: #171E28;"></div>
                <span class="mls">.wbgc-tab</span><br/>描述：标签页背板色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #ffffff;"></div>
                <div class="icon-div" style="background-color: #232B38;"></div>
                <span class="mls">.wbgc-tab-hover:hover</span><br/>描述：标签页悬浮背板色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #ffffff;"></div>
                <div class="icon-div" style="background-color: #232B38;"></div>
                <span class="mls">.wbgc-tab-active</span><br/>描述：标签页激活选中背板色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #ffffff;"></div>
                <div class="icon-div" style="background-color: #232B38;"></div>
                <span class="mls">.wbgc-tab-active:active</span><br/>描述：标签页激活选中背板色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #ffffff;"></div>
                <div class="icon-div" style="background-color: #20262F;"></div>
                <span class="mls">.wbgc-dropdown</span> <br/>描述：下拉背色、气泡背色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #F1F6FD;"></div>
                <div class="icon-div" style="background-color: #2B333F;"></div>
                <span class="mls">.wbgc-dropdown-hover:hover</span><br/>描述：下拉悬停背色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #F1F6FD;"></div>
                <div class="icon-div" style="background-color: #2B333F;"></div>
                <span class="mls">.wbgc-dropdown-active</span> <br/>描述：下拉激活选中色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #F1F6FD;"></div>
                <div class="icon-div" style="background-color: #2B333F;"></div>
                <span class="mls">.wbgc-dropdown-active:active</span> <br/>描述：下拉激活选中色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #ffffff;"></div>
                <div class="icon-div" style="background-color: #20262F;"></div>
                <span class="mls">.wbgc-timepicker</span> <br/>描述：日期选择器背色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #F1F6FD;"></div>
                <div class="icon-div" style="background-color: #2B333F;"></div>
                <span class="mls">.wbgc-timepicker-hover</span> <br/>描述：日期悬浮背色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #F4F6F9;"></div>
                <div class="icon-div" style="background-color: #171D25;"></div>
                <span class="mls">.wbgc-timepicker-active</span> <br/>描述：日期选中区域背色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #F4F6F9;"></div>
                <div class="icon-div" style="background-color: #171D25;"></div>
                <span class="mls">.wbgc-timepicker-active:active</span> <br/>描述：日期选中区域背色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #F1F6FD;"></div>
                <div class="icon-div" style="background-color: #171D25;"></div>
                <span class="mls">.wbgc-timeperior-hover</span> <br/>描述：时间选择(日历上时间段)悬浮背色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: rgba(246, 67, 87, .1);"></div>
                <div class="icon-div" style="background-color: rgba(246, 67, 87, .1);"></div>
                <span class="mls">.wbgc-calendar-off</span> <br/>描述：日历离线背色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #F1F6FD;"></div>
                <div class="icon-div" style="background-color: #1F2530;"></div>
                <span class="mls">.wbgc-calendar-year-hover:hover</span> <br/>描述：日历月悬浮背色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #F1F6FD;"></div>
                <div class="icon-div" style="background-color: #1F2530;"></div>
                <span class="mls">.wbgc-calendar-active</span> <br/>描述：日历选中背色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #F1F6FD;"></div>
                <div class="icon-div" style="background-color: #1F2530;"></div>
                <span class="mls">.wbgc-calendar-active:active</span> <br/>描述：日历选中背色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #DEE2E7;"></div>
                <div class="icon-div" style="background-color: #20262F;"></div>
                <span class="mls">.wbgc-switch-off</span> <br/>描述：开关熄灭背板色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #F9FAFB;"></div>
                <div class="icon-div" style="background-color: #161B25;"></div>
                <span class="mls">.wbgc-tr-alternate</span> <br/>描述：表格行交替背色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #EAF1FB;"></div>
                <div class="icon-div" style="background-color: #1F2530;"></div>
                <span class="mls">.wbgc-tr-hover:hover</span> <br/>描述：表格行悬浮背色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #F1F3F5;"></div>
                <div class="icon-div" style="background-color: #303942;"></div>
                <span class="mls">.wbgc-dialog-tr-hover:hover</span> <br/>描述：弹窗框表格行悬浮背色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #F5F5F5;"></div>
                <div class="icon-div" style="background-color: #282E34;"></div>
                <span class="mls">.wbgc-scroll</span> <br/>描述：滚动条背板色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: #D6D6D6;"></div>
                <div class="icon-div" style="background-color: #495057;"></div>
                <span class="mls">.wbgc-scroll-bar</span> <br/>描述：滚动条滑块背板色
            </div>
        </div>
        <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <div class="icon-div" style="background-color: rgba(0, 0, 0, 0);"></div>
                <div class="icon-div" style="background-color: rgba(0, 0, 0, .1);"></div>
                <span class="mls">.wbsc</span> <br/>描述：弹出框阴影颜色（一般情况下只有这一种）
            </div>
        </div>
    </div>
</template>

<script>
    import Clipboard from 'clipboard';

    export default {
        name: "resetClass",
        data() {
            return {
                copyContent: '', // 复制的内容
                clipboard: null	 // clipboard 实例
            };
        },
        methods: {
            // 复制类名
            copyClass (e) {
                this.$message.destroy();
                if (e.target.className === 'mls') {
                    this.copyContent = e.target.innerText;
                    this.$nextTick(() => {
                        document.getElementById("btn").click();
                    });
                    this.$message.success(`复制 ${this.copyContent} 成功`, 2);
                }
            },
            // 将rgb转化为十六进制
            colorHex (color) {
                // RGB颜色值的正则
                var reg = /^(rgba|RGBA)/;
                if (reg.test(color)) {
                    return String(color);
                } else {
                    var strHex = "#";
                    // 把RGB的3个数值变成数组
                    var colorArr = color.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
                    // 转成16进制
                    for (var i = 0; i < colorArr.length; i++) {
                        var hex = Number(colorArr[i]).toString(16).toUpperCase();
                        if (hex === "0") {
                            hex += hex;
                        }
                        strHex += hex;
                    }
                    return strHex;
                }
            }
        },
        mounted() {
            let _this = this;
            this.clipboard = new Clipboard('#btn', {
                text: _this.copyContent
            });

            // 将色值添加到 .icon-div 中
            let domLi = document.querySelectorAll('.icon-div');
            var reg = /^(rgba|RGBA)/;
            domLi.forEach((item, idx) => {
                let str = this.colorHex(item.style.backgroundColor);
                if (reg.test(str)) { 
                    if (idx % 2 !== 0) {
                        item.style.left = '20px';
                        item.style.bottom = '3px';
                    } else {
                        item.style.bottom = '25px';
                    }
                }
                item.innerHTML = `<span class='wfc2' style="position: absolute;top: 0;left: 20px;width: 180px;">${str}</span>`;
            });
        },
        created() {
            document.body.addEventListener('click', this.copyClass, false);
        },
        destroyed() {
            this.clipboard.destroy();
        }
    };
</script>

<style lang="less" scoped>
h1 {
    color: #ccc;
    margin-bottom: 20px;
}
.glyph {
    display: inline-block;
    background-color: #add8e630;
    margin: 0 20px 10px 0;
    width: 23%;
    height: 130px;
    padding: 15px;
    position: relative;
    min-width: 230px;
    &:hover {
        background-color: #93ccdf75;
    }
    .icon-div{
        width: 15px;
        height: 15px;
        position: absolute;
        bottom: 10px;
        right: 50%;
        &:nth-child(2n - 1) {
            left: 18px;
            right: auto;
        }
    }
    .mls {
        font-size: 24px;
        cursor: pointer;
        width: 100%;
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}
</style>


