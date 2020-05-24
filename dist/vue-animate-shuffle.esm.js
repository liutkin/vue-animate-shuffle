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
      default: () => [],
      validator: chars => chars.every(char => typeof char === "string")
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
  data: () => ({
    renderedString: "",
    charAnimationIndex: null,
    charTimestamp: null,
    isAnimationDelayActive: true
  }),

  mounted() {
    setTimeout(() => {
      this.isAnimationDelayActive = false;
      this.planToAnimateChar();
    }, this.startingAnimationDelay);
  },

  methods: {
    planToAnimateChar() {
      if (this.charAnimationIndex > this.animationString.length) {
        this.$emit("string-animation-complete", {
          renderedString: this.renderedString
        });
        return;
      }

      const isFirstRender = !this.charTimestamp && !this.charAnimationIndex;
      this.charAnimationIndex = isFirstRender ? 0 : this.charAnimationIndex;
      this.charTimestamp = Date.now();
      this.animateChar();
    },

    animateChar() {
      setTimeout(() => {
        const animationDurationNotExceeded = Date.now() - this.charTimestamp < this.charAnimationDuration && this.charAnimationIndex < this.animationString.length;
        const randomString = [...Array(this.animationString.length - this.charAnimationIndex)].map(() => this.charsPool[Math.floor(Math.random() * this.charsPool.length)]);
        this.renderedString = this.animationString.substring(0, this.charAnimationIndex) + randomString.join("");

        if (animationDurationNotExceeded) {
          this.animateChar();
        } else {
          if (this.charAnimationIndex < this.animationString.length) {
            this.$emit("char-animation-complete", {
              index: this.charAnimationIndex,
              char: this.animationString[this.charAnimationIndex]
            });
          }

          this.charAnimationIndex += 1;
          this.planToAnimateChar();
        }
      }, this.charUpdateDelay);
    }

  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
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
}

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c(_vm.containerElementTag, {
    tag: "component"
  }, [_vm.isAnimationDelayActive ? _vm._t("default") : _vm._l(_vm.renderedString.split(''), function (char, index) {
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

const __vue_inject_styles__ = undefined;
/* scoped */

const __vue_scope_id__ = undefined;
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

// Import vue component

const install = function installAnimateShuffle(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component("AnimateShuffle", __vue_component__);
}; // Create module definition for Vue.use()
// to be registered via Vue.use() as well as Vue.component()


__vue_component__.install = install; // Export component by default
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;

export default __vue_component__;
