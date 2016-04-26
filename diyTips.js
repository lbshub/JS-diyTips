/**
 * LBS diyTips 自定义弹出提示框 (适合宽高确定的弹出)
 * Date: 2016-04-06
 * ====================================================================
 * 开始使用 实例化 var tips = new diyTips(opts)
 * ====================================================================
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
 * ====================================================================
 * 实例化后调用方法
 * tips.show() //显示弹出提示框
 * tips.hide() //关闭弹出提示框
 * ====================================================================
 **/

;(function(window, document) {
	var diyTips = function(opts) {
		opts = opts || {};
		this.maskLayer = opts.maskLayer || null;
		this.popUpLayer = opts.popUpLayer || null;
		this.defineBtn = opts.defineBtn || null;
		this.cancelBtn = opts.cancelBtn || null;
		this.closeBtn = opts.closeBtn || null;
		this.defineFn = opts.define || function() {};
		this.cancelFn = opts.cancel || function() {};
		this.closeFn = opts.close || function() {};
		this.position = opts.position || '';
		this._init();
	};
	diyTips.prototype = {
		_init: function() {
			var _this = this;
			if (this.defineBtn) this._on(this.defineBtn, 'click', function() {
				_this._define();
			});
			if (this.cancelBtn) this._on(this.cancelBtn, 'click', function() {
				_this._cancel();
			});
			if (this.closeBtn) this._on(this.closeBtn, 'click', function() {
				_this._close();
			});
			if (this.position === 'fixed' || this.position === 'absolute') this._setup();
		},
		_setup: function() {
			// 获取隐藏状态的宽高
			this.oldStyle = this.popUpLayer.style.cssText;
			if (this._css('visibility') !== 'hidden') this.popUpLayer.style.visibility = 'hidden';
			if (this._css('position') === 'static') this.popUpLayer.style.position = 'absolute';
			if (this._css('display') === 'none') this.popUpLayer.style.display = 'block';
			this.width = this.popUpLayer.offsetWidth;
			this.height = this.popUpLayer.offsetHeight;
			this.popUpLayer.style.cssText = this.oldStyle;

			this._get();
			if (this.position === 'fixed') {
				this.maskLayer.style.position = 'fixed';
				this.maskLayer.style.height = Math.max(this.pH, this.wH) + 'px';
				if (this._css('position') !== 'fixed') this.popUpLayer.style.position = 'fixed';
				if (this._css('left') !== '50%') this.popUpLayer.style.left = '50%';
				if (this._css('top') !== '50%') this.popUpLayer.style.top = '50%';
				if (this._css('marginLeft') !== -this.width / 2 + 'px') this.popUpLayer.style.marginLeft = -this.width / 2 + 'px';
				if (this._css('marginTop') !== -this.height / 2 + 'px') this.popUpLayer.style.marginTop = -this.height / 2 + 'px';
			} else if (this.position === 'absolute') {
				this.maskLayer.style.position = 'absolute';
				this.maskLayer.style.height = Math.max(this.pH, this.wH) + 'px';
				if (this._css('position') !== 'absolute') this.popUpLayer.style.position = 'absolute';
				if (parseInt(this._css('marginLeft')) !== '0') this.popUpLayer.style.marginLeft = '0px';
				if (parseInt(this._css('marginTop')) !== '0') this.popUpLayer.style.marginTop = '0px';
				this.popUpLayer.style.left = (this.wW - this.width) / 2 + 'px';
				this.popUpLayer.style.top = this.sY + (this.wH - this.height) / 2 + 'px';
			}
		},
		_get: function() {
			var d = document,
				doc = d.documentElement,
				body = d.body;
			this.pH = doc.scrollHeight || body.scrollHeight;
			this.sY = doc.scrollTop || body.scrollTop;
			this.wW = doc.clientWidth;
			this.wH = doc.clientHeight;
			if (document.compatMode != 'CSS1Compat') {
				this.pH = body.scrollHeight;
				this.sY = body.scrollTop;
				this.wW = body.clientWidth;
				this.wH = body.clientHeight;
			}
		},
		_set: function() {
			this._get();
			if (this.position === 'absolute') {
				this.popUpLayer.style.left = (this.wW - this.width) / 2 + 'px';
				this.popUpLayer.style.top = this.sY + (this.wH - this.height) / 2 + 'px';
			}
		},
		_define: function() {
			var before = this.defineFn();
			if (before === false) return;
			this.hide();
		},
		_cancel: function() {
			this.hide();
			this.cancelFn();
		},
		_close: function(cb) {
			this.hide();
			this.closeFn();
		},
		_css: function(n) {
			return this.popUpLayer.currentStyle ? this.popUpLayer.currentStyle[n] : getComputedStyle(this.popUpLayer, null)[n];
		},
		_on: function(el, type, handler) {
			if (el.addEventListener) {
				el.addEventListener(type, handler, false);
			} else if (el.attachEvent) {
				el.attachEvent('on' + type, handler);
			} else {
				el['on' + type] = handler;
			}
		},
		show: function() {
			this.maskLayer.style.display = 'block';
			this.popUpLayer.style.display = 'block';
			if (this.position === 'absolute') this._set();
			this.popUpLayer.focus();
		},
		hide: function() {
			this.maskLayer.style.display = 'none';
			this.popUpLayer.style.display = 'none';
			this.popUpLayer.blur();
		}
	};
	if (typeof define === 'function' && define.amd) {
		define('diyTips', [], function() {
			return diyTips;
		});
	} else {
		window.diyTips = diyTips;
	}
}(window, document));