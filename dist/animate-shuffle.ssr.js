'use strict';Object.defineProperty(exports,'__esModule',{value:true});function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// Play shuffle animation for given string 🎬
var script = {
  name: "AnimateShuffle",
  props: {
    // String for being animated
    animationString: {
      type: String,
      required: true,
      default: ""
    },
    // Pool of chars for animation tick
    charsPool: {
      type: Array,
      required: true,
      default: function _default() {
        return [];
      },
      validator: function validator(chars) {
        return chars.every(function (char) {
          return typeof char === "string";
        });
      }
    },
    // Delay before animation tick for every char
    charUpdateDelay: {
      type: Number,
      default: 50
    },
    // Animation duration for every char
    charAnimationDuration: {
      type: Number,
      default: 1000
    },
    // Delay before initial render
    startingAnimationDelay: {
      type: Number,
      default: 0
    },
    // Tag for the container element
    containerElementTag: {
      type: String,
      default: "div"
    },
    // Tag for char element
    charElementTag: {
      type: String,
      default: "span"
    },
    // Class that being added upon char animation complete
    charAnimationCompleteClass: {
      type: String,
      default: ""
    },
    // Class for every char element
    charClass: {
      type: String,
      default: ""
    }
  },
  data: function data() {
    return {
      renderedChars: "",
      charAnimationIndex: null,
      charTimestamp: null,
      isAnimationDelayActive: true
    };
  },
  mounted: function mounted() {
    var _this = this;

    setTimeout(function () {
      _this.isAnimationDelayActive = false;

      _this.planToAnimateChar();
    }, this.startingAnimationDelay);
  },
  methods: {
    planToAnimateChar: function planToAnimateChar() {
      var isFirstRender = !this.charTimestamp && !this.charAnimationIndex;
      this.charAnimationIndex = isFirstRender ? 0 : this.charAnimationIndex;
      this.charTimestamp = Date.now();

      if (this.charAnimationIndex >= this.animationString.length) {
        this.$emit("string-animation-complete");
        return;
      }

      this.animateChar();
    },
    animateChar: function animateChar() {
      var _this2 = this;

      setTimeout(function () {
        var animationDurationNotExceeded = Date.now() - _this2.charTimestamp < _this2.charAnimationDuration;

        var randomString = _toConsumableArray(Array(_this2.animationString.length - _this2.charAnimationIndex)).map(function () {
          return _this2.charsPool[Math.floor(Math.random() * _this2.charsPool.length)];
        });

        _this2.renderedChars = _this2.animationString.substring(0, _this2.charAnimationIndex) + randomString.join("");

        if (animationDurationNotExceeded) {
          _this2.animateChar();
        } else {
          _this2.$emit("char-animation-complete", {
            index: _this2.charAnimationIndex,
            char: _this2.animationString[_this2.charAnimationIndex]
          });

          _this2.charAnimationIndex += 1;

          _this2.planToAnimateChar();
        }
      }, this.charUpdateDelay);
    }
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c(_vm.containerElementTag, {
    tag: "component"
  }, [_vm.isAnimationDelayActive ? _vm._t("default") : _vm._l(_vm.renderedChars.split(''), function (char, index) {
    return _c(_vm.charElementTag, {
      key: index,
      tag: "component",
      class: index < _vm.charAnimationIndex ? [_vm.charAnimationCompleteClass, _vm.charClass] : _vm.charClass,
      domProps: {
        "textContent": _vm._s(char)
      }
    });
  })], 2);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = "data-v-db327cd4";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);// Import vue component

var install = function installAnimateShuffle(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('AnimateShuffle', __vue_component__);
}; // Create module definition for Vue.use()


var plugin = {
  install: install
}; // To auto-install on non-es builds, when vue is found
// eslint-disable-next-line no-redeclare

/* global window, global */

{
  var GlobalVue = null;

  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
  }

  if (GlobalVue) {
    GlobalVue.use(plugin);
  }
} // Inject install function into component - allows component
// to be registered via Vue.use() as well as Vue.component()


__vue_component__.install = install; // Export component by default
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;
exports.default=__vue_component__;