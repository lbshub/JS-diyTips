# JS-diyTips
自定义弹出框，灵活配置，提供了一套方便的API

-----------------------------------------------------

1.  开始使用 实例化 var tips = new diyTips(opts)

 * opts选项配置
 * opts.maskLayer 遮罩层对象  (必须设置)
 * opts.popUpLayer 弹出层对象  (必须设置)
 * opts.defineBtn 确定按钮对象
 * opts.cancelBtn 取消按钮对象
 * opts.closeBtn 关闭按钮对象
 * opts.define 点击确定按钮后执行函数
 * 	如果opts.define返回false 则会阻止弹出框关闭 
 *	一般用于做一些检测 保持弹出框为显示状态并执行某些动作
 * opts.cancel 点击取消按钮后执行函数
 * opts.close 点击关闭按钮后执行函数
 * opts.position 设置弹出层对象垂直居中定位 默认无设置  可设置固定'fixed' 或绝对'absolute'
 *     固定定位采用设置负边距的方式 弹出框固定在页面
 *     绝对定位采用设置left、top值的方式 弹出框随页面滚动

2. 实例化后调用方法
 * tips.show() //显示弹出提示框
 * tips.hide() //关闭弹出提示框
