'use strict';var dayjs=require('dayjs'),localeData=require('dayjs/plugin/localeData'),localizedFormat=require('dayjs/plugin/localizedFormat'),customParseFormat=require('dayjs/plugin/customParseFormat'),isToday=require('dayjs/plugin/isToday'),isBetween=require('dayjs/plugin/isBetween'),duration=require('dayjs/plugin/duration'),vue=require('vue');function _interopDefaultLegacy(e){return e&&typeof e==='object'&&'default'in e?e:{'default':e}}var dayjs__default=/*#__PURE__*/_interopDefaultLegacy(dayjs);var localeData__default=/*#__PURE__*/_interopDefaultLegacy(localeData);var localizedFormat__default=/*#__PURE__*/_interopDefaultLegacy(localizedFormat);var customParseFormat__default=/*#__PURE__*/_interopDefaultLegacy(customParseFormat);var isToday__default=/*#__PURE__*/_interopDefaultLegacy(isToday);var isBetween__default=/*#__PURE__*/_interopDefaultLegacy(isBetween);var duration__default=/*#__PURE__*/_interopDefaultLegacy(duration);function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
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

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}var usePreviousDate = function usePreviousDate(date) {
  var display = [];

  for (var i = 0; i <= date.date(0).day(); i++) {
    display.push(date.date(0).subtract(i, 'day'));
  }

  return display.sort(function (a, b) {
    return a.date() - b.date();
  });
};
var useCurrentDate = function useCurrentDate(date) {
  return Array.from({
    length: date.daysInMonth()
  }, function (v, k) {
    return date.date(k + 1);
  });
};
var useNextDate = function useNextDate(date) {
  var display = [];

  for (var i = 1; i <= 42 - (usePreviousDate(date).length + date.daysInMonth()); i++) {
    display.push(date.date(i).month(date.month()).add(1, 'month'));
  }

  return display;
};
var useDisableDate = function useDisableDate(date, _ref) {
  var disableDate = _ref.disableDate;

  if (typeof disableDate === 'function') {
    return disableDate(date.toDate());
  } else {
    return false;
  }
};
var useBetweenRange = function useBetweenRange(date, _ref2) {
  var previous = _ref2.previous,
      next = _ref2.next;
  var pattern;

  if (previous.isAfter(next, 'date')) {
    pattern = '(]';
  } else {
    pattern = '[)';
  }

  return !!(date.isBetween(previous, next, 'date', pattern) && !date.off);
};
var useToValueFromString = function useToValueFromString(date, _ref3) {
  var formatter = _ref3.formatter;
  return date.format(formatter.date);
};
var useToValueFromArray = function useToValueFromArray(_ref4, _ref5) {
  var previous = _ref4.previous,
      next = _ref4.next;
  var formatter = _ref5.formatter,
      separator = _ref5.separator;
  return "".concat(previous.format(formatter.date)).concat(separator).concat(next.format(formatter.date));
};
var useDirective = function useDirective(binding) {
  var instance = binding.instance,
      arg = binding.arg,
      value = binding.value;
  document.body.addEventListener('click', function ($event) {
    if ($event.target.classList.contains('litepie-datepicker-overlay')) {
      return instance.isShow = false;
    } else {
      if (instance.LitepieDatepickerRef) {
        var autoApply = instance.autoApply,
            previous = instance.previous,
            next = instance.next;
        var target = $event.target.classList.contains('litepie-datepicker-date');

        if (target && autoApply && !previous && !next) {
          return instance.isShow = false;
        }

        if (!autoApply && $event.target.classList.contains("".concat(arg, "-apply-picker")) && instance.value !== '') {
          return instance.isShow = false;
        }

        if ($event.target.classList.contains("".concat(arg, "-cancel-picker"))) {
          return instance.isShow = false;
        }

        if ($event.target.classList.contains("litepie-shortcuts") && autoApply) {
          return instance.isShow = false;
        }

        return instance.isShow = instance.LitepieDatepickerRef.contains($event.target) || document.getElementById(value) === $event.target || value === $event.target;
      }

      return instance.isShow = true;
    }
  });
};
var useVisibleViewport = function useVisibleViewport(el) {
  var _el$getBoundingClient = el.getBoundingClientRect(),
      right = _el$getBoundingClient.right;

  var vWidth = window.innerWidth || document.documentElement.clientWidth;
  return right < vWidth;
};var script$6 = vue.defineComponent({
  name: 'LitepieHeader',
  props: {
    asPrevOrNext: Boolean,
    panel: Object,
    calendar: Object
  },
  inheritAttrs: false
});var _hoisted_1$6 = {
  class: "flex justify-between items-center px-2 py-1.5 rounded-md border border-black/[.1] dark:border-litepie-secondary-700/[1]"
};
var _hoisted_2$6 = {
  class: "flex-shrink-0"
};
var _hoisted_3$5 = {
  class: "inline-flex rounded-full"
};
var _hoisted_4$2 = {
  class: "w-5 h-5",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
};
var _hoisted_5$1 = ["d"];
var _hoisted_6$1 = {
  class: "px-1.5 space-x-1.5 flex flex-1"
};
var _hoisted_7$1 = {
  class: "flex-1 flex rounded-md"
};
var _hoisted_8$1 = ["textContent"];
var _hoisted_9$1 = {
  class: "flex-1 flex rounded-md"
};
var _hoisted_10$1 = ["textContent"];
var _hoisted_11$1 = {
  class: "flex-shrink-0"
};
var _hoisted_12$1 = {
  class: "inline-flex rounded-full"
};
var _hoisted_13$1 = {
  class: "w-5 h-5",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
};
var _hoisted_14$1 = ["d"];
function render$6(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$6, [vue.createElementVNode("div", _hoisted_2$6, [vue.withDirectives(vue.createElementVNode("span", _hoisted_3$5, [vue.createElementVNode("button", {
    type: "button",
    class: "p-1.5 rounded-full bg-white text-litepie-secondary-600 transition-colors border border-transparent hover:bg-litepie-secondary-100 hover:text-litepie-secondary-900 focus:bg-litepie-primary-50 focus:text-litepie-secondary-900 focus:border-litepie-primary-300 focus:ring focus:ring-litepie-primary-500 focus:ring-opacity-10 focus:outline-none dark:bg-litepie-secondary-800 dark:text-litepie-secondary-300 dark:hover:bg-litepie-secondary-700 dark:hover:text-litepie-secondary-300 dark:focus:bg-litepie-secondary-600 dark:focus:text-litepie-secondary-100 dark:focus:border-litepie-primary-500 dark:focus:ring-opacity-25 dark:focus:bg-opacity-50",
    onClick: _cache[0] || (_cache[0] = function ($event) {
      return _ctx.panel.calendar ? _ctx.calendar.onPrevious() : _ctx.calendar.onPreviousYear();
    })
  }, [(vue.openBlock(), vue.createElementBlock("svg", _hoisted_4$2, [vue.createElementVNode("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-width": "1.5",
    d: _ctx.panel.calendar ? "M15 19l-7-7 7-7" : "M11 19l-7-7 7-7m8 14l-7-7 7-7"
  }, null, 8, _hoisted_5$1)]))])], 512), [[vue.vShow, _ctx.panel.calendar || _ctx.panel.year]])]), vue.createElementVNode("div", _hoisted_6$1, [vue.createElementVNode("span", _hoisted_7$1, [vue.createElementVNode("button", {
    type: "button",
    class: "px-3 py-1.5 block w-full leading-relaxed rounded-md bg-white text-xs 2xl:text-sm tracking-wide text-litepie-secondary-600 font-semibold sm:font-medium transition-colors border border-transparent hover:bg-litepie-secondary-100 hover:text-litepie-secondary-900 focus:bg-litepie-primary-50 focus:text-litepie-secondary-900 focus:border-litepie-primary-300 focus:ring focus:ring-litepie-primary-500 focus:ring-opacity-10 focus:outline-none uppercase dark:bg-litepie-secondary-800 dark:text-litepie-secondary-300 dark:hover:bg-litepie-secondary-700 dark:hover:text-litepie-secondary-300 dark:focus:bg-litepie-secondary-600 dark:focus:text-litepie-secondary-100 dark:focus:border-litepie-primary-500 dark:focus:ring-opacity-25 dark:focus:bg-opacity-50",
    textContent: vue.toDisplayString(_ctx.calendar.month),
    onClick: _cache[1] || (_cache[1] = function ($event) {
      return _ctx.calendar.openMonth();
    })
  }, null, 8, _hoisted_8$1)]), vue.createElementVNode("span", _hoisted_9$1, [vue.createElementVNode("button", {
    type: "button",
    class: "px-3 py-1.5 block w-full leading-relaxed rounded-md bg-white text-xs 2xl:text-sm tracking-wide text-litepie-secondary-600 font-semibold sm:font-medium transition-colors border border-transparent hover:bg-litepie-secondary-100 hover:text-litepie-secondary-900 focus:bg-litepie-primary-50 focus:text-litepie-secondary-900 focus:border-litepie-primary-300 focus:ring focus:ring-litepie-primary-500 focus:ring-opacity-10 focus:outline-none uppercase dark:bg-litepie-secondary-800 dark:text-litepie-secondary-300 dark:hover:bg-litepie-secondary-700 dark:hover:text-litepie-secondary-300 dark:focus:bg-litepie-secondary-600 dark:focus:text-litepie-secondary-100 dark:focus:border-litepie-primary-500 dark:focus:ring-opacity-25 dark:focus:bg-opacity-50",
    textContent: vue.toDisplayString(_ctx.calendar.year),
    onClick: _cache[2] || (_cache[2] = function ($event) {
      return _ctx.calendar.openYear();
    })
  }, null, 8, _hoisted_10$1)])]), vue.createElementVNode("div", _hoisted_11$1, [vue.withDirectives(vue.createElementVNode("span", _hoisted_12$1, [vue.createElementVNode("button", {
    type: "button",
    class: "p-1.5 rounded-full bg-white text-litepie-secondary-600 transition-colors border border-transparent hover:bg-litepie-secondary-100 hover:text-litepie-secondary-900 focus:bg-litepie-primary-50 focus:text-litepie-secondary-900 focus:border-litepie-primary-300 focus:ring focus:ring-litepie-primary-500 focus:ring-opacity-10 focus:outline-none dark:bg-litepie-secondary-800 dark:text-litepie-secondary-300 dark:hover:bg-litepie-secondary-700 dark:hover:text-litepie-secondary-300 dark:focus:bg-litepie-secondary-600 dark:focus:text-litepie-secondary-100 dark:focus:border-litepie-primary-500 dark:focus:ring-opacity-25 dark:focus:bg-opacity-50",
    onClick: _cache[3] || (_cache[3] = function ($event) {
      return _ctx.panel.calendar ? _ctx.calendar.onNext() : _ctx.calendar.onNextYear();
    })
  }, [(vue.openBlock(), vue.createElementBlock("svg", _hoisted_13$1, [vue.createElementVNode("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-width": "1.5",
    d: _ctx.panel.calendar ? "M9 5l7 7-7 7" : "M13 5l7 7-7 7M5 5l7 7-7 7"
  }, null, 8, _hoisted_14$1)]))])], 512), [[vue.vShow, _ctx.panel.calendar || _ctx.panel.year]])])]);
}script$6.render = render$6;var script$5 = vue.defineComponent({
  name: 'LitepieMonth',
  props: {
    months: Array
  },
  inheritAttrs: false,
  emits: ['update:month']
});var _hoisted_1$5 = {
  class: "flex flex-wrap mt-1.5"
};
var _hoisted_2$5 = {
  class: "flex rounded-md mt-1.5"
};
var _hoisted_3$4 = ["textContent", "onClick"];
function render$5(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$5, [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.months, function (month, key) {
    return vue.openBlock(), vue.createElementBlock("div", {
      key: key,
      class: "w-1/2 px-0.5"
    }, [vue.createElementVNode("span", _hoisted_2$5, [vue.createElementVNode("button", {
      type: "button",
      class: "px-3 py-2 block w-full leading-6 rounded-md bg-white text-xs 2xl:text-sm tracking-wide text-litepie-secondary-600 font-medium transition-colors border border-transparent hover:bg-litepie-secondary-100 hover:text-litepie-secondary-900 focus:bg-litepie-primary-50 focus:text-litepie-secondary-900 focus:border-litepie-primary-300 focus:ring focus:ring-litepie-primary-500 focus:ring-opacity-10 focus:outline-none uppercase dark:bg-litepie-secondary-800 dark:hover:bg-litepie-secondary-700 dark:text-litepie-secondary-300 dark:hover:text-litepie-secondary-100 dark:focus:bg-litepie-secondary-700",
      textContent: vue.toDisplayString(month),
      onClick: function onClick($event) {
        return _ctx.$emit('update:month', key);
      }
    }, null, 8, _hoisted_3$4)])]);
  }), 128))]);
}script$5.render = render$5;var script$4 = vue.defineComponent({
  name: 'LitepieWeek',
  props: {
    weeks: Array
  },
  inheritAttrs: false
});var _hoisted_1$4 = {
  class: "grid grid-cols-7 py-2 mt-0.5 border-b border-black/[.1] dark:border-litepie-secondary-700/[1]"
};
var _hoisted_2$4 = ["textContent"];
function render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$4, [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.weeks, function (day, keyDay) {
    return vue.openBlock(), vue.createElementBlock("div", {
      key: keyDay,
      class: "text-litepie-secondary-500 text-xs 2xl:text-sm tracking-wide font-medium text-center cursor-default dark:text-litepie-secondary-400"
    }, [vue.createElementVNode("span", {
      textContent: vue.toDisplayString(day)
    }, null, 8, _hoisted_2$4)]);
  }), 128))]);
}script$4.render = render$4;var script$3 = vue.defineComponent({
  name: 'LitepieYear',
  props: {
    asPrevOrNext: Boolean,
    years: Array
  },
  inheritAttrs: false,
  emits: ['update:year']
});var _hoisted_1$3 = {
  class: "flex flex-wrap"
};
var _hoisted_2$3 = {
  class: "flex rounded-md mt-1.5"
};
var _hoisted_3$3 = ["textContent", "onClick"];
function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$3, [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.years, function (year, key) {
    return vue.openBlock(), vue.createElementBlock("div", {
      key: key,
      class: "w-1/2 px-0.5"
    }, [vue.createElementVNode("span", _hoisted_2$3, [vue.createElementVNode("button", {
      type: "button",
      class: "px-3 py-2 block w-full leading-6 rounded-md bg-white text-xs 2xl:text-sm tracking-wide text-litepie-secondary-600 font-medium transition-colors border border-transparent hover:bg-litepie-secondary-100 hover:text-litepie-secondary-900 focus:bg-litepie-primary-50 focus:text-litepie-secondary-900 focus:border-litepie-primary-300 focus:ring focus:ring-litepie-primary-500 focus:ring-opacity-10 focus:outline-none uppercase dark:bg-litepie-secondary-800 dark:hover:bg-litepie-secondary-700 dark:text-litepie-secondary-300 dark:hover:text-litepie-secondary-100 dark:focus:bg-litepie-secondary-700",
      textContent: vue.toDisplayString(year),
      onClick: function onClick($event) {
        return _ctx.$emit('update:year', year, _ctx.asPrevOrNext);
      }
    }, null, 8, _hoisted_3$3)])]);
  }), 128))]);
}script$3.render = render$3;var script$2 = vue.defineComponent({
  name: 'LitepieCalendar',
  props: {
    asPrevOrNext: Boolean,
    calendar: Object,
    weeks: Array,
    asRange: Boolean
  },
  inheritAttrs: false,
  emits: ['update:date'],
  setup: function setup() {
    var isBetweenRange = vue.inject('isBetweenRange');
    var betweenRangeClasses = vue.inject('betweenRangeClasses');
    var datepickerClasses = vue.inject('datepickerClasses');
    var atMouseOver = vue.inject('atMouseOver');
    return {
      isBetweenRange: isBetweenRange,
      betweenRangeClasses: betweenRangeClasses,
      datepickerClasses: datepickerClasses,
      atMouseOver: atMouseOver
    };
  }
});var _hoisted_1$2 = {
  class: "grid grid-cols-7 gap-y-0.5 my-1"
};
var _hoisted_2$2 = ["data-tooltip"];
var _hoisted_3$2 = ["disabled", "onClick", "onMouseenter", "onFocusin", "textContent", "data-date"];
function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$2, [vue.createVNode(vue.TransitionGroup, {
    "enter-from-class": "opacity-0",
    "enter-to-class": "opacity-100",
    "enter-active-class": "transition-opacity ease-out duration-300",
    "leave-active-class": "transition-opacity ease-in duration-200",
    "leave-from-class": "opacity-100",
    "leave-to-class": "opacity-0"
  }, {
    default: vue.withCtx(function () {
      return [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.calendar.date(), function (date, keyDate) {
        return vue.openBlock(), vue.createElementBlock("div", {
          key: keyDate,
          class: vue.normalizeClass(["relative", {
            'litepie-tooltip': _ctx.asRange && date.duration()
          }]),
          "data-tooltip": "".concat(date.duration())
        }, [vue.createVNode(vue.Transition, {
          "enter-from-class": "opacity-0",
          "enter-to-class": "opacity-100",
          "enter-active-class": "transition-opacity ease-out duration-200",
          "leave-active-class": "transition-opacity ease-in duration-150",
          "leave-from-class": "opacity-100",
          "leave-to-class": "opacity-0"
        }, {
          default: vue.withCtx(function () {
            return [_ctx.isBetweenRange(date) || date.hovered() ? (vue.openBlock(), vue.createElementBlock("span", {
              key: 0,
              class: vue.normalizeClass(["absolute bg-litepie-primary-100 bg-opacity-60 dark:bg-litepie-secondary-700 dark:bg-opacity-50", _ctx.betweenRangeClasses(date)])
            }, null, 2)) : vue.createCommentVNode("", true)];
          }),
          _: 2
        }, 1024), vue.createElementVNode("button", {
          type: "button",
          class: vue.normalizeClass(["litepie-datepicker-date relative w-12 h-12 lg:w-10 lg:h-10 flex justify-center items-center text-xs 2xl:text-sm focus:outline-none", [_ctx.datepickerClasses(date), _ctx.asRange ? 'transition-all' : 'transition-colors']]),
          disabled: date.disabled || date.inRange(),
          onClick: function onClick($event) {
            return _ctx.$emit('update:date', date, _ctx.asPrevOrNext);
          },
          onMouseenter: function onMouseenter($event) {
            return _ctx.atMouseOver(date);
          },
          onFocusin: function onFocusin($event) {
            return _ctx.atMouseOver(date);
          },
          textContent: vue.toDisplayString(date.date()),
          "data-date": date.toDate()
        }, null, 42, _hoisted_3$2)], 10, _hoisted_2$2);
      }), 128))];
    }),
    _: 1
  })]);
}script$2.render = render$2;var script$1 = vue.defineComponent({
  name: 'LitepieShortcut',
  props: {
    shortcuts: [Boolean, Function],
    asRange: Boolean,
    asSingle: Boolean,
    i18n: Object
  },
  inheritAttrs: false,
  setup: function setup(props) {
    var setToToday = vue.inject('setToToday');
    var setToYesterday = vue.inject('setToYesterday');
    var setToLastDay = vue.inject('setToLastDay');
    var setToThisMonth = vue.inject('setToThisMonth');
    var setToLastMonth = vue.inject('setToLastMonth');
    var setToCustomShortcut = vue.inject('setToCustomShortcut');

    var withShortcut = function withShortcut() {
      if (typeof props.shortcuts === 'function') {
        return props.shortcuts();
      } else {
        return false;
      }
    };

    return {
      setToToday: setToToday,
      setToYesterday: setToYesterday,
      setToLastDay: setToLastDay,
      setToThisMonth: setToThisMonth,
      setToLastMonth: setToLastMonth,
      setToCustomShortcut: setToCustomShortcut,
      withShortcut: withShortcut
    };
  }
});var _hoisted_1$1 = {
  key: 0,
  class: "relative w-full border-t border-b-0 sm:border-t-0 sm:border-b lg:border-b-0 lg:border-r border-black/[.1] order-last sm:order-none dark:border-litepie-secondary-700/[1] sm:mt-1 lg:mr-1 sm:mb-1 lg:mb-0 sm:mx-1 lg:mx-0"
};
var _hoisted_2$1 = {
  key: 0,
  class: "grid grid-cols-2 sm:grid-cols-3 gap-1 lg:block w-full pr-0 sm:pr-1 mt-1.5 sm:mt-0 sm:mb-1.5 lg:mb-0"
};
var _hoisted_3$1 = ["onClick", "textContent"];
var _hoisted_4$1 = {
  key: 1,
  class: "grid grid-cols-2 sm:grid-cols-3 gap-1 lg:block w-full pr-0 sm:pr-1 mt-1.5 sm:mt-0 sm:mb-1.5 lg:mb-0"
};
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return _ctx.asRange && !_ctx.asSingle ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$1, [_ctx.withShortcut() ? (vue.openBlock(), vue.createElementBlock("ol", _hoisted_2$1, [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.withShortcut(), function (item, i) {
    return vue.openBlock(), vue.createElementBlock("li", {
      key: i
    }, [vue.createElementVNode("a", {
      href: "#",
      class: "litepie-shortcuts block text-sm lg:text-xs px-2 py-2 sm:leading-4 whitespace-nowrap font-medium rounded text-litepie-primary-600 hover:text-litepie-primary-700 transition-colors hover:bg-litepie-secondary-100 focus:bg-litepie-secondary-100 focus:text-litepie-primary-600 dark:hover:bg-litepie-secondary-700 dark:hover:text-litepie-primary-300 dark:text-litepie-primary-400 dark:focus:bg-litepie-secondary-700 dark:focus:text-litepie-primary-300",
      onClick: vue.withModifiers(function ($event) {
        return _ctx.setToCustomShortcut(item);
      }, ["prevent"]),
      textContent: vue.toDisplayString(item.label)
    }, null, 8, _hoisted_3$1)]);
  }), 128))])) : (vue.openBlock(), vue.createElementBlock("ol", _hoisted_4$1, [vue.createElementVNode("li", null, [vue.createElementVNode("a", {
    href: "#",
    class: "litepie-shortcuts block text-sm lg:text-xs px-2 py-2 sm:leading-4 whitespace-nowrap font-medium rounded text-litepie-primary-600 hover:text-litepie-primary-700 transition-colors hover:bg-litepie-secondary-100 focus:bg-litepie-secondary-100 focus:text-litepie-primary-600 dark:hover:bg-litepie-secondary-700 dark:hover:text-litepie-primary-300 dark:text-litepie-primary-400 dark:focus:bg-litepie-secondary-700 dark:focus:text-litepie-primary-300",
    onClick: _cache[0] || (_cache[0] = vue.withModifiers(function () {
      return _ctx.setToToday && _ctx.setToToday.apply(_ctx, arguments);
    }, ["prevent"]))
  }, vue.toDisplayString(_ctx.i18n.today), 1)]), vue.createElementVNode("li", null, [vue.createElementVNode("a", {
    href: "#",
    class: "litepie-shortcuts block text-sm lg:text-xs px-2 py-2 sm:leading-4 whitespace-nowrap font-medium rounded text-litepie-primary-600 hover:text-litepie-primary-700 transition-colors hover:bg-litepie-secondary-100 focus:bg-litepie-secondary-100 focus:text-litepie-primary-600 dark:hover:bg-litepie-secondary-700 dark:hover:text-litepie-primary-300 dark:text-litepie-primary-400 dark:focus:bg-litepie-secondary-700 dark:focus:text-litepie-primary-300",
    onClick: _cache[1] || (_cache[1] = vue.withModifiers(function () {
      return _ctx.setToYesterday && _ctx.setToYesterday.apply(_ctx, arguments);
    }, ["prevent"]))
  }, vue.toDisplayString(_ctx.i18n.yesterday), 1)]), vue.createElementVNode("li", null, [vue.createElementVNode("a", {
    href: "#",
    class: "litepie-shortcuts block text-sm lg:text-xs px-2 py-2 sm:leading-4 whitespace-nowrap font-medium rounded text-litepie-primary-600 hover:text-litepie-primary-700 transition-colors hover:bg-litepie-secondary-100 focus:bg-litepie-secondary-100 focus:text-litepie-primary-600 dark:hover:bg-litepie-secondary-700 dark:hover:text-litepie-primary-300 dark:text-litepie-primary-400 dark:focus:bg-litepie-secondary-700 dark:focus:text-litepie-primary-300",
    onClick: _cache[2] || (_cache[2] = vue.withModifiers(function ($event) {
      return _ctx.setToLastDay(7);
    }, ["prevent"]))
  }, vue.toDisplayString(_ctx.i18n.past(7)), 1)]), vue.createElementVNode("li", null, [vue.createElementVNode("a", {
    href: "#",
    class: "litepie-shortcuts block text-sm lg:text-xs px-2 py-2 sm:leading-4 whitespace-nowrap font-medium rounded text-litepie-primary-600 hover:text-litepie-primary-700 transition-colors hover:bg-litepie-secondary-100 focus:bg-litepie-secondary-100 focus:text-litepie-primary-600 dark:hover:bg-litepie-secondary-700 dark:hover:text-litepie-primary-300 dark:text-litepie-primary-400 dark:focus:bg-litepie-secondary-700 dark:focus:text-litepie-primary-300",
    onClick: _cache[3] || (_cache[3] = vue.withModifiers(function ($event) {
      return _ctx.setToLastDay(30);
    }, ["prevent"]))
  }, vue.toDisplayString(_ctx.i18n.past(30)), 1)]), vue.createElementVNode("li", null, [vue.createElementVNode("a", {
    href: "#",
    class: "litepie-shortcuts block text-sm lg:text-xs px-2 py-2 sm:leading-4 whitespace-nowrap font-medium rounded text-litepie-primary-600 hover:text-litepie-primary-700 transition-colors hover:bg-litepie-secondary-100 focus:bg-litepie-secondary-100 focus:text-litepie-primary-600 dark:hover:bg-litepie-secondary-700 dark:hover:text-litepie-primary-300 dark:text-litepie-primary-400 dark:focus:bg-litepie-secondary-700 dark:focus:text-litepie-primary-300",
    onClick: _cache[4] || (_cache[4] = vue.withModifiers(function () {
      return _ctx.setToThisMonth && _ctx.setToThisMonth.apply(_ctx, arguments);
    }, ["prevent"]))
  }, vue.toDisplayString(_ctx.i18n.currentMonth), 1)]), vue.createElementVNode("li", null, [vue.createElementVNode("a", {
    href: "#",
    class: "litepie-shortcuts block text-sm lg:text-xs px-2 py-2 sm:leading-4 whitespace-nowrap font-medium rounded text-litepie-primary-600 hover:text-litepie-primary-700 transition-colors hover:bg-litepie-secondary-100 focus:bg-litepie-secondary-100 focus:text-litepie-primary-600 dark:hover:bg-litepie-secondary-700 dark:hover:text-litepie-primary-300 dark:text-litepie-primary-400 dark:focus:bg-litepie-secondary-700 dark:focus:text-litepie-primary-300",
    onClick: _cache[5] || (_cache[5] = vue.withModifiers(function () {
      return _ctx.setToLastMonth && _ctx.setToLastMonth.apply(_ctx, arguments);
    }, ["prevent"]))
  }, vue.toDisplayString(_ctx.i18n.pastMonth), 1)])]))])) : vue.createCommentVNode("", true);
}script$1.render = render$1;function __variableDynamicImportRuntime0__(path) {
  switch (path) {

    default: return new Promise(function(resolve, reject) {
      (typeof queueMicrotask === 'function' ? queueMicrotask : setTimeout)(
        reject.bind(null, new Error("Unknown variable dynamic import: " + path))
      );
    })
   }
 }
dayjs__default["default"].extend(localeData__default["default"]);
dayjs__default["default"].extend(localizedFormat__default["default"]);
dayjs__default["default"].extend(customParseFormat__default["default"]);
dayjs__default["default"].extend(isToday__default["default"]);
dayjs__default["default"].extend(isBetween__default["default"]);
dayjs__default["default"].extend(duration__default["default"]);
var script = /*#__PURE__*/vue.defineComponent({
  name: 'LitepieDatepicker',
  // vue component name
  components: {
    LitepieHeader: script$6,
    LitepieMonth: script$5,
    LitepieWeek: script$4,
    LitepieYear: script$3,
    LitepieCalendar: script$2,
    LitepieShortcut: script$1
  },
  directives: {
    litepie: {
      mounted: function mounted(el, binding) {
        useDirective(binding);
      },
      updated: function updated(el, binding) {
        useDirective(binding);
      }
    }
  },
  props: {
    overlay: Boolean,
    asSingle: Boolean,
    useRange: Boolean,
    placeholder: {
      type: [Boolean, String],
      default: false
    },
    i18n: {
      type: String,
      default: 'en'
    },
    disableDate: {
      type: [Boolean, Array, Function],
      default: false
    },
    disableInRange: {
      type: Boolean,
      default: true
    },
    trigger: {
      type: String,
      default: null
    },
    autoApply: {
      type: Boolean,
      default: true
    },
    shortcuts: {
      type: [Boolean, Function],
      default: true
    },
    separator: {
      type: String,
      default: ' ~ '
    },
    formatter: {
      type: Object,
      default: function _default() {
        return {
          date: 'YYYY-MM-DD HH:mm:ss',
          month: 'MMM'
        };
      }
    },
    modelValue: {
      type: [Array, Object, String],
      default: []
    },
    startFrom: {
      type: [Object, String],
      default: function _default() {
        return new Date();
      }
    },
    options: {
      type: Object,
      default: function _default() {
        return {
          shortcuts: {
            today: 'Today',
            yesterday: 'Yesterday',
            past: function past(period) {
              return "Last ".concat(period, " Days");
            },
            currentMonth: 'This Month',
            pastMonth: 'Last Month'
          },
          footer: {
            apply: 'Apply',
            cancel: 'Cancel'
          }
        };
      }
    }
  },
  inheritAttrs: false,
  emits: ['update:modelValue'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit;
    var LitepieRef = vue.ref(null);
    var LitepieDatepickerRef = vue.ref(null);
    var LitepieInputRef = vue.ref(null);
    var isShow = vue.ref(false);
    var placement = vue.ref(true);
    var givenPlaceholder = vue.ref('');
    var selection = vue.ref(null);
    var pickerValue = vue.ref('');
    var hoverValue = vue.ref([]);
    var applyValue = vue.ref([]);
    var previous = vue.ref(null);
    var next = vue.ref(null);
    var panel = vue.reactive({
      previous: {
        calendar: true,
        month: false,
        year: false
      },
      next: {
        calendar: true,
        month: false,
        year: false
      }
    });
    var datepicker = vue.ref({
      previous: dayjs__default["default"](),
      next: dayjs__default["default"]().add(1, 'month'),
      year: {
        previous: dayjs__default["default"]().year(),
        next: dayjs__default["default"]().year()
      },
      weeks: dayjs__default["default"].weekdaysShort(),
      months: props.formatter.month === 'MMM' ? dayjs__default["default"].monthsShort() : dayjs__default["default"].months()
    });
    var weeks = vue.computed(function () {
      return datepicker.value.weeks;
    });
    var months = vue.computed(function () {
      return datepicker.value.months;
    });
    var calendar = vue.computed(function () {
      var _unref = vue.unref(datepicker),
          previous = _unref.previous,
          next = _unref.next,
          year = _unref.year;

      return {
        previous: {
          date: function date() {
            return usePreviousDate(previous).concat(useCurrentDate(previous)).concat(useNextDate(previous)).map(function (v) {
              v.today = v.isToday();
              v.active = previous.month() === v.month();
              v.off = previous.month() !== v.month();
              v.sunday = v.day() === 0;
              v.disabled = useDisableDate(v, props) && !inRangeDate(v);

              v.inRange = function () {
                if (props.asSingle && !props.useRange) {
                  return previous.month() !== v.month();
                }
              };

              v.hovered = function () {
                if (!asRange()) return false;

                if (hoverValue.value.length > 1) {
                  return (v.isBetween(hoverValue.value[0], hoverValue.value[1], 'date', '()') || v.isBetween(hoverValue.value[1], hoverValue.value[0], 'date', '()')) && previous.month() === v.month();
                }

                return false;
              };

              v.duration = function () {
                return false;
              };

              return v;
            });
          },
          month: previous && previous.format(props.formatter.month),
          year: previous && previous.year(),
          years: function years() {
            return Array.from({
              length: 12
            }, function (v, k) {
              return year.previous + k;
            });
          },
          onPrevious: function onPrevious() {
            datepicker.value.previous = previous.subtract(1, 'month');
          },
          onNext: function onNext() {
            datepicker.value.previous = previous.add(1, 'month');

            if (previous.diff(next, 'month') === -1) {
              datepicker.value.next = next.add(1, 'month');
            }
          },
          onPreviousYear: function onPreviousYear() {
            datepicker.value.year.previous = datepicker.value.year.previous - 12;
          },
          onNextYear: function onNextYear() {
            datepicker.value.year.previous = datepicker.value.year.previous + 12;
          },
          openMonth: function openMonth() {
            panel.previous.month = !panel.previous.month;
            panel.previous.year = false;
            panel.previous.calendar = !panel.previous.month;
          },
          setMount: function setMount($event) {
            datepicker.value.previous = previous.month($event);
            panel.previous.month = !panel.previous.month;
            panel.previous.year = false;
            panel.previous.calendar = !panel.previous.month;
            vue.nextTick(function () {
              if (datepicker.value.next.isSame(datepicker.value.previous, 'month') || datepicker.value.next.isBefore(datepicker.value.previous)) {
                datepicker.value.next = datepicker.value.previous.add(1, 'month');
              }

              datepicker.value.year.next = datepicker.value.next.year();
            });
          },
          openYear: function openYear() {
            panel.previous.year = !panel.previous.year;
            panel.previous.month = false;
            panel.previous.calendar = !panel.previous.year;
          },
          setYear: function setYear($event, asNext) {
            if (!asNext) {
              datepicker.value.previous = previous.year($event);
              panel.previous.year = !panel.previous.year;
              panel.previous.calendar = !panel.previous.year;
              vue.nextTick(function () {
                if (datepicker.value.next.isSame(datepicker.value.previous, 'month') || datepicker.value.next.isBefore(datepicker.value.previous)) {
                  datepicker.value.next = datepicker.value.previous.add(1, 'month');
                }

                datepicker.value.year.previous = datepicker.value.previous.year();
                datepicker.value.year.next = datepicker.value.next.year();
              });
            }
          }
        },
        next: {
          date: function date() {
            return usePreviousDate(next).concat(useCurrentDate(next)).concat(useNextDate(next)).map(function (v) {
              v.today = v.isToday();
              v.active = next.month() === v.month();
              v.off = next.month() !== v.month();
              v.sunday = v.day() === 0;
              v.disabled = useDisableDate(v, props) && !inRangeDate(v);

              v.inRange = function () {
                if (props.asSingle && !props.useRange) {
                  return next.month() !== v.month();
                }
              };

              v.hovered = function () {
                if (hoverValue.value.length > 1) {
                  return (v.isBetween(hoverValue.value[0], hoverValue.value[1], 'date', '()') || v.isBetween(hoverValue.value[1], hoverValue.value[0], 'date', '()')) && next.month() === v.month();
                }

                return false;
              };

              v.duration = function () {
                return false;
              };

              return v;
            });
          },
          month: next && next.format(props.formatter.month),
          year: next && next.year(),
          years: function years() {
            return Array.from({
              length: 12
            }, function (v, k) {
              return year.next + k;
            });
          },
          onPrevious: function onPrevious() {
            datepicker.value.next = next.subtract(1, 'month');

            if (next.diff(previous, 'month') === 1) {
              datepicker.value.previous = previous.subtract(1, 'month');
            }
          },
          onNext: function onNext() {
            datepicker.value.next = next.add(1, 'month');
          },
          onPreviousYear: function onPreviousYear() {
            datepicker.value.year.next = datepicker.value.year.next - 12;
          },
          onNextYear: function onNextYear() {
            datepicker.value.year.next = datepicker.value.year.next + 12;
          },
          openMonth: function openMonth() {
            panel.next.month = !panel.next.month;
            panel.next.year = false;
            panel.next.calendar = !panel.next.month;
          },
          setMount: function setMount($event) {
            datepicker.value.next = next.month($event);
            panel.next.month = !panel.next.month;
            panel.next.year = false;
            panel.next.calendar = !panel.next.month;
            vue.nextTick(function () {
              if (datepicker.value.previous.isSame(datepicker.value.next, 'month') || datepicker.value.previous.isAfter(datepicker.value.next)) {
                datepicker.value.previous = datepicker.value.next.subtract(1, 'month');
              }

              datepicker.value.year.previous = datepicker.value.previous.year();
            });
          },
          openYear: function openYear() {
            panel.next.year = !panel.next.year;
            panel.next.month = false;
            panel.next.calendar = !panel.next.year;
          },
          setYear: function setYear($event, asNext) {
            if (asNext) {
              datepicker.value.next = next.year($event);
              panel.next.year = !panel.next.year;
              panel.next.month = false;
              panel.next.calendar = !panel.next.year;
              vue.nextTick(function () {
                if (datepicker.value.previous.isSame(datepicker.value.next, 'month') || datepicker.value.previous.isAfter(datepicker.value.next)) {
                  datepicker.value.previous = datepicker.value.next.subtract(1, 'month');
                }

                datepicker.value.year.previous = datepicker.value.previous.year();
                datepicker.value.year.next = datepicker.value.next.year();
              });
            }
          }
        }
      };
    });

    var useArray = function useArray() {
      return Array.isArray(props.modelValue);
    };

    var useObject = function useObject() {
      return _typeof(props.modelValue) === 'object';
    };

    var asRange = function asRange() {
      if (!props.useRange && !props.asSingle) {
        return true;
      } else if (!props.useRange && props.asSingle) {
        return false;
      } else if (props.useRange && !props.asSingle) {
        return true;
      } else return !!(props.useRange && props.asSingle);
    };

    var inRangeDate = function inRangeDate(date) {
      if (props.disableInRange) return false;
      if (pickerValue.value === '') return false;
      var s, e;

      if (useArray()) {
        var _props$modelValue = _slicedToArray(props.modelValue, 2),
            start = _props$modelValue[0],
            end = _props$modelValue[1];

        s = start;
        e = end;
      } else if (useObject()) {
        if (props.modelValue) {
          var _Object$values = Object.values(props.modelValue),
              _Object$values2 = _slicedToArray(_Object$values, 2),
              _start = _Object$values2[0],
              _end = _Object$values2[1];

          s = _start;
          e = _end;
        }
      } else {
        var _props$modelValue$spl = props.modelValue.split(props.separator),
            _props$modelValue$spl2 = _slicedToArray(_props$modelValue$spl, 2),
            _start2 = _props$modelValue$spl2[0],
            _end2 = _props$modelValue$spl2[1];

        s = _start2;
        e = _end2;
      }

      return date.isBetween(dayjs__default["default"](s, props.formatter.date, true), dayjs__default["default"](e, props.formatter.date, true), 'date', '[]');
    };

    var show = function show() {
      isShow.value = true;
    };

    var hide = function hide() {
      isShow.value = false;
    };

    var force = function force() {
      previous.value = null;
      next.value = null;
      hoverValue.value = [];
      selection.value = null;
    };

    var clearPicker = function clearPicker() {
      pickerValue.value = '';

      if (useArray()) {
        emit('update:modelValue', []);
      } else if (useObject()) {
        var obj = {};

        var _Object$keys = Object.keys(props.modelValue),
            _Object$keys2 = _slicedToArray(_Object$keys, 2),
            start = _Object$keys2[0],
            end = _Object$keys2[1];

        obj[start] = '';
        obj[end] = '';
        emit('update:modelValue', obj);
      } else {
        emit('update:modelValue', '');
      }

      applyValue.value = [];
      LitepieInputRef.value && LitepieInputRef.value.focus();
    };
    /**
     * keyUp event
     * @since v1.0.5
     */


    var keyUp = function keyUp() {
      if (asRange()) {
        var _pickerValue$value$sp = pickerValue.value.split(props.separator),
            _pickerValue$value$sp2 = _slicedToArray(_pickerValue$value$sp, 2),
            s = _pickerValue$value$sp2[0],
            e = _pickerValue$value$sp2[1];

        var _ref2 = [dayjs__default["default"](s, props.formatter.date, true), dayjs__default["default"](e, props.formatter.date, true)],
            sd = _ref2[0],
            ed = _ref2[1];

        if (sd.isValid() && ed.isValid()) {
          setDate(sd);
          setDate(ed);

          if (useArray()) {
            emit('update:modelValue', [s, e]);
          } else if (useObject()) {
            var obj = {};

            var _Object$keys3 = Object.keys(props.modelValue),
                _Object$keys4 = _slicedToArray(_Object$keys3, 2),
                start = _Object$keys4[0],
                end = _Object$keys4[1];

            obj[start] = s;
            obj[end] = e;
            emit('update:modelValue', obj);
          } else {
            emit('update:modelValue', useToValueFromArray({
              previous: sd,
              next: ed
            }, props));
          }
        }
      } else {
        var d = dayjs__default["default"](pickerValue.value, props.formatter.date, true);

        if (d.isValid()) {
          setDate(d);

          if (useArray()) {
            emit('update:modelValue', [pickerValue.value]);
          } else if (useObject()) {
            var _obj = {};

            var _Object$keys5 = Object.keys(props.modelValue),
                _Object$keys6 = _slicedToArray(_Object$keys5, 1),
                _start3 = _Object$keys6[0];

            _obj[_start3] = pickerValue.value;
            emit('update:modelValue', _obj);
          } else {
            emit('update:modelValue', pickerValue.value);
          }
        }
      }
    };

    var setDate = function setDate(date, asNext) {
      if (asRange()) {
        if (previous.value) {
          next.value = date;

          if (props.autoApply) {
            if (date.isBefore(previous.value)) {
              pickerValue.value = useToValueFromArray({
                previous: date,
                next: previous.value
              }, props);
            } else {
              pickerValue.value = useToValueFromArray({
                previous: previous.value,
                next: date
              }, props);
            }

            var _pickerValue$value$sp3 = pickerValue.value.split(props.separator),
                _pickerValue$value$sp4 = _slicedToArray(_pickerValue$value$sp3, 2),
                s = _pickerValue$value$sp4[0],
                e = _pickerValue$value$sp4[1];

            if (useArray()) {
              emit('update:modelValue', [dayjs__default["default"](s, props.formatter.date, true).format(props.formatter.date), dayjs__default["default"](e, props.formatter.date, true).format(props.formatter.date)]);
            } else if (useObject()) {
              var obj = {};

              var _Object$keys7 = Object.keys(props.modelValue),
                  _Object$keys8 = _slicedToArray(_Object$keys7, 2),
                  start = _Object$keys8[0],
                  end = _Object$keys8[1];

              obj[start] = s;
              obj[end] = e;
              emit('update:modelValue', obj);
            } else {
              emit('update:modelValue', useToValueFromArray({
                previous: dayjs__default["default"](s, props.formatter.date, true),
                next: dayjs__default["default"](e, props.formatter.date, true)
              }, props));
            }

            isShow.value = false;
            applyValue.value = [];

            if (!dayjs__default["default"](s, props.formatter.date, true).isSame(dayjs__default["default"](e, props.formatter.date, true), 'month')) {
              datepicker.value.previous = dayjs__default["default"](s, props.formatter.date, true);
              datepicker.value.next = dayjs__default["default"](e, props.formatter.date, true);
            }

            force();
          } else {
            if (previous.value.isAfter(date, 'month')) {
              applyValue.value = [date, previous.value];
            } else {
              applyValue.value = [previous.value, date];
            }

            var _applyValue$value = _slicedToArray(applyValue.value, 2),
                _s = _applyValue$value[0],
                _e = _applyValue$value[1];

            if (!_s.isSame(_e, 'month')) {
              datepicker.value.previous = _s;
              datepicker.value.next = _e;
            }

            force();
          }
        } else {
          applyValue.value = [];
          previous.value = date;
          selection.value = date;
          hoverValue.value.push(date);
          applyValue.value.push(date);

          if (asNext) {
            datepicker.value.next = date;

            if (datepicker.value.previous.isSame(date, 'month')) {
              datepicker.value.next = date.add(1, 'month');
            }
          } else {
            datepicker.value.previous = date;

            if (datepicker.value.next.isSame(date, 'month')) {
              datepicker.value.previous = datepicker.value.next;
              datepicker.value.next = date.add(1, 'month');
            }
          }
        }
      } else {
        if (props.autoApply) {
          pickerValue.value = useToValueFromString(date, props);

          if (useArray()) {
            emit('update:modelValue', [pickerValue.value]);
          } else if (useObject()) {
            var _obj2 = {};

            var _Object$keys9 = Object.keys(props.modelValue),
                _Object$keys10 = _slicedToArray(_Object$keys9, 1),
                _start4 = _Object$keys10[0];

            _obj2[_start4] = pickerValue.value;
            emit('update:modelValue', _obj2);
          } else {
            emit('update:modelValue', pickerValue.value);
          }

          isShow.value = false;
          applyValue.value = [];
          force();
        } else {
          applyValue.value = [date];
          force();
        }
      }
    }; // TODO: Working with date time


    var setHours = function setHours() {
    };

    var setMinutes = function setMinutes() {
    };

    var setSeconds = function setSeconds() {
    };

    var applyDate = function applyDate() {
      if (applyValue.value.length < 1) return false;
      var date;

      if (asRange()) {
        var _applyValue$value2 = _slicedToArray(applyValue.value, 2),
            s = _applyValue$value2[0],
            e = _applyValue$value2[1];

        if (e.isBefore(s)) {
          date = useToValueFromArray({
            previous: e,
            next: s
          }, props);
        } else {
          date = useToValueFromArray({
            previous: s,
            next: e
          }, props);
        }
      } else {
        var _applyValue$value3 = _slicedToArray(applyValue.value, 1),
            _s2 = _applyValue$value3[0];

        date = _s2;
      }

      if (asRange()) {
        var _date$split = date.split(props.separator),
            _date$split2 = _slicedToArray(_date$split, 2),
            _s3 = _date$split2[0],
            _e2 = _date$split2[1];

        if (useArray()) {
          emit('update:modelValue', [dayjs__default["default"](_s3, props.formatter.date, true).format(props.formatter.date), dayjs__default["default"](_e2, props.formatter.date, true).format(props.formatter.date)]);
        } else if (useObject()) {
          var obj = {};

          var _Object$keys11 = Object.keys(props.modelValue),
              _Object$keys12 = _slicedToArray(_Object$keys11, 2),
              start = _Object$keys12[0],
              end = _Object$keys12[1];

          obj[start] = _s3;
          obj[end] = _e2;
          emit('update:modelValue', obj);
        } else {
          emit('update:modelValue', useToValueFromArray({
            previous: dayjs__default["default"](_s3, props.formatter.date, true),
            next: dayjs__default["default"](_e2, props.formatter.date, true)
          }, props));
        }

        pickerValue.value = date;
      } else {
        pickerValue.value = date.format(props.formatter.date);

        if (useArray()) {
          emit('update:modelValue', [pickerValue.value]);
        } else if (useObject()) {
          var _obj3 = {};

          var _Object$keys13 = Object.keys(props.modelValue),
              _Object$keys14 = _slicedToArray(_Object$keys13, 1),
              _start5 = _Object$keys14[0];

          _obj3[_start5] = pickerValue.value;
          emit('update:modelValue', _obj3);
        } else {
          emit('update:modelValue', pickerValue.value);
        }
      }
    };

    var atMouseOver = function atMouseOver(date) {
      if (!asRange()) return false;

      if (previous.value) {
        hoverValue.value = [previous.value, date];
      } else {
        hoverValue.value = [];
        return false;
      }
    };

    var isBetweenRange = function isBetweenRange(date) {
      if (previous.value && props.autoApply) return false;
      var s, e;

      if (hoverValue.value.length > 1) {
        var _hoverValue$value = _slicedToArray(hoverValue.value, 2),
            start = _hoverValue$value[0],
            end = _hoverValue$value[1];

        s = dayjs__default["default"](start, props.formatter.date, true);
        e = dayjs__default["default"](end, props.formatter.date, true);
      } else {
        if (useArray()) {
          if (props.autoApply) {
            var _props$modelValue2 = _slicedToArray(props.modelValue, 2),
                _start6 = _props$modelValue2[0],
                _end3 = _props$modelValue2[1];

            s = _start6 && dayjs__default["default"](_start6, props.formatter.date, true);
            e = _end3 && dayjs__default["default"](_end3, props.formatter.date, true);
          } else {
            var _applyValue$value4 = _slicedToArray(applyValue.value, 2),
                _start7 = _applyValue$value4[0],
                _end4 = _applyValue$value4[1];

            s = dayjs__default["default"](_start7, props.formatter.date, true);
            e = dayjs__default["default"](_end4, props.formatter.date, true);
          }
        } else if (useObject()) {
          if (props.autoApply) {
            if (props.modelValue) {
              var _Object$values3 = Object.values(props.modelValue),
                  _Object$values4 = _slicedToArray(_Object$values3, 2),
                  _start8 = _Object$values4[0],
                  _end5 = _Object$values4[1];

              s = _start8 && dayjs__default["default"](_start8, props.formatter.date, true);
              e = _end5 && dayjs__default["default"](_end5, props.formatter.date, true);
            }
          } else {
            var _applyValue$value5 = _slicedToArray(applyValue.value, 2),
                _start9 = _applyValue$value5[0],
                _end6 = _applyValue$value5[1];

            s = dayjs__default["default"](_start9, props.formatter.date, true);
            e = dayjs__default["default"](_end6, props.formatter.date, true);
          }
        } else {
          if (props.autoApply) {
            var _ref3 = props.modelValue ? props.modelValue.split(props.separator) : [false, false],
                _ref4 = _slicedToArray(_ref3, 2),
                _start10 = _ref4[0],
                _end7 = _ref4[1];

            s = _start10 && dayjs__default["default"](_start10, props.formatter.date, true);
            e = _end7 && dayjs__default["default"](_end7, props.formatter.date, true);
          } else {
            var _applyValue$value6 = _slicedToArray(applyValue.value, 2),
                _start11 = _applyValue$value6[0],
                _end8 = _applyValue$value6[1];

            s = dayjs__default["default"](_start11, props.formatter.date, true);
            e = dayjs__default["default"](_end8, props.formatter.date, true);
          }
        }
      }

      if (s && e) {
        return useBetweenRange(date, {
          previous: s,
          next: e
        });
      }

      return false;
    };

    var datepickerClasses = function datepickerClasses(date) {
      var today = date.today,
          active = date.active,
          off = date.off,
          disabled = date.disabled;
      var classes, s, e;

      if (asRange()) {
        if (useArray()) {
          if (selection.value) {
            var _hoverValue$value2 = _slicedToArray(hoverValue.value, 2),
                start = _hoverValue$value2[0],
                end = _hoverValue$value2[1];

            s = start && dayjs__default["default"](start, props.formatter.date, true);
            e = end && dayjs__default["default"](end, props.formatter.date, true);
          } else {
            if (props.autoApply) {
              var _props$modelValue3 = _slicedToArray(props.modelValue, 2),
                  _start12 = _props$modelValue3[0],
                  _end9 = _props$modelValue3[1];

              s = _start12 && dayjs__default["default"](_start12, props.formatter.date, true);
              e = _end9 && dayjs__default["default"](_end9, props.formatter.date, true);
            } else {
              var _applyValue$value7 = _slicedToArray(applyValue.value, 2),
                  _start13 = _applyValue$value7[0],
                  _end10 = _applyValue$value7[1];

              s = _start13 && dayjs__default["default"](_start13, props.formatter.date, true);
              e = _end10 && dayjs__default["default"](_end10, props.formatter.date, true);
            }
          }
        } else if (useObject()) {
          if (selection.value) {
            var _hoverValue$value3 = _slicedToArray(hoverValue.value, 2),
                _start14 = _hoverValue$value3[0],
                _end11 = _hoverValue$value3[1];

            s = _start14 && dayjs__default["default"](_start14, props.formatter.date, true);
            e = _end11 && dayjs__default["default"](_end11, props.formatter.date, true);
          } else {
            if (props.autoApply) {
              var _ref5 = props.modelValue ? Object.values(props.modelValue) : [false, false],
                  _ref6 = _slicedToArray(_ref5, 2),
                  _start15 = _ref6[0],
                  _end12 = _ref6[1];

              s = _start15 && dayjs__default["default"](_start15, props.formatter.date, true);
              e = _end12 && dayjs__default["default"](_end12, props.formatter.date, true);
            } else {
              var _applyValue$value8 = _slicedToArray(applyValue.value, 2),
                  _start16 = _applyValue$value8[0],
                  _end13 = _applyValue$value8[1];

              s = _start16 && dayjs__default["default"](_start16, props.formatter.date, true);
              e = _end13 && dayjs__default["default"](_end13, props.formatter.date, true);
            }
          }
        } else {
          if (selection.value) {
            var _hoverValue$value4 = _slicedToArray(hoverValue.value, 2),
                _start17 = _hoverValue$value4[0],
                _end14 = _hoverValue$value4[1];

            s = _start17 && dayjs__default["default"](_start17, props.formatter.date, true);
            e = _end14 && dayjs__default["default"](_end14, props.formatter.date, true);
          } else {
            if (props.autoApply) {
              var _ref7 = props.modelValue ? props.modelValue.split(props.separator) : [false, false],
                  _ref8 = _slicedToArray(_ref7, 2),
                  _start18 = _ref8[0],
                  _end15 = _ref8[1];

              s = _start18 && dayjs__default["default"](_start18, props.formatter.date, true);
              e = _end15 && dayjs__default["default"](_end15, props.formatter.date, true);
            } else {
              var _applyValue$value9 = _slicedToArray(applyValue.value, 2),
                  _start19 = _applyValue$value9[0],
                  _end16 = _applyValue$value9[1];

              s = _start19 && dayjs__default["default"](_start19, props.formatter.date, true);
              e = _end16 && dayjs__default["default"](_end16, props.formatter.date, true);
            }
          }
        }
      } else {
        if (useArray()) {
          if (props.autoApply) {
            if (props.modelValue.length > 0) {
              var _props$modelValue4 = _slicedToArray(props.modelValue, 1),
                  _start20 = _props$modelValue4[0];

              s = dayjs__default["default"](_start20, props.formatter.date, true);
            }
          } else {
            var _applyValue$value10 = _slicedToArray(applyValue.value, 1),
                _start21 = _applyValue$value10[0];

            s = _start21 && dayjs__default["default"](_start21, props.formatter.date, true);
          }
        } else if (useObject()) {
          if (props.autoApply) {
            if (props.modelValue) {
              var _Object$values5 = Object.values(props.modelValue),
                  _Object$values6 = _slicedToArray(_Object$values5, 1),
                  _start22 = _Object$values6[0];

              s = dayjs__default["default"](_start22, props.formatter.date, true);
            }
          } else {
            var _applyValue$value11 = _slicedToArray(applyValue.value, 1),
                _start23 = _applyValue$value11[0];

            s = _start23 && dayjs__default["default"](_start23, props.formatter.date, true);
          }
        } else {
          if (props.autoApply) {
            if (props.modelValue) {
              var _props$modelValue$spl3 = props.modelValue.split(props.separator),
                  _props$modelValue$spl4 = _slicedToArray(_props$modelValue$spl3, 1),
                  _start24 = _props$modelValue$spl4[0];

              s = dayjs__default["default"](_start24, props.formatter.date, true);
            }
          } else {
            var _applyValue$value12 = _slicedToArray(applyValue.value, 1),
                _start25 = _applyValue$value12[0];

            s = _start25 && dayjs__default["default"](_start25, props.formatter.date, true);
          }
        }
      }

      if (active) {
        classes = today ? "text-litepie-primary-500 font-semibold dark:text-litepie-primary-400 rounded-full" : disabled ? "text-litepie-secondary-600 font-normal disabled:text-litepie-secondary-500 disabled:cursor-not-allowed rounded-full" : date.isBetween(s, e, 'date', '()') ? "text-litepie-secondary-700 font-medium dark:text-litepie-secondary-100 rounded-full" : "text-litepie-secondary-600 font-medium dark:text-litepie-secondary-200 rounded-full";
      }

      if (off) {
        classes = "text-litepie-secondary-400 font-light disabled:cursor-not-allowed";
      }

      if (s && e && !off) {
        if (date.isSame(s, 'date')) {
          classes = e.isAfter(s, 'date') ? 'bg-litepie-primary-500 text-white font-bold rounded-l-full disabled:cursor-not-allowed' : 'bg-litepie-primary-500 text-white font-bold rounded-r-full disabled:cursor-not-allowed';

          if (s.isSame(e, 'date')) {
            classes = "bg-litepie-primary-500 text-white font-bold rounded-full disabled:cursor-not-allowed";
          }
        }

        if (date.isSame(e, 'date')) {
          classes = e.isAfter(s, 'date') ? 'bg-litepie-primary-500 text-white font-bold rounded-r-full disabled:cursor-not-allowed' : 'bg-litepie-primary-500 text-white font-bold rounded-l-full disabled:cursor-not-allowed';

          if (s.isSame(e, 'date')) {
            classes = "bg-litepie-primary-500 text-white font-bold rounded-full disabled:cursor-not-allowed";
          }
        }
      } else if (s) {
        if (date.isSame(s, 'date') && !off) {
          classes = "bg-litepie-primary-500 text-white font-bold rounded-full disabled:cursor-not-allowed";
        }
      }

      return classes;
    };

    var betweenRangeClasses = function betweenRangeClasses(date) {
      var classes, s, e;
      classes = '';
      if (!asRange()) return classes;

      if (useArray()) {
        if (hoverValue.value.length > 1) {
          var _hoverValue$value5 = _slicedToArray(hoverValue.value, 2),
              start = _hoverValue$value5[0],
              end = _hoverValue$value5[1];

          s = start && dayjs__default["default"](start, props.formatter.date, true);
          e = end && dayjs__default["default"](end, props.formatter.date, true);
        } else {
          if (props.autoApply) {
            var _props$modelValue5 = _slicedToArray(props.modelValue, 2),
                _start26 = _props$modelValue5[0],
                _end17 = _props$modelValue5[1];

            s = _start26 && dayjs__default["default"](_start26, props.formatter.date, true);
            e = _end17 && dayjs__default["default"](_end17, props.formatter.date, true);
          } else {
            var _applyValue$value13 = _slicedToArray(applyValue.value, 2),
                _start27 = _applyValue$value13[0],
                _end18 = _applyValue$value13[1];

            s = _start27 && dayjs__default["default"](_start27, props.formatter.date, true);
            e = _end18 && dayjs__default["default"](_end18, props.formatter.date, true);
          }
        }
      } else if (useObject()) {
        if (hoverValue.value.length > 1) {
          var _hoverValue$value6 = _slicedToArray(hoverValue.value, 2),
              _start28 = _hoverValue$value6[0],
              _end19 = _hoverValue$value6[1];

          s = _start28 && dayjs__default["default"](_start28, props.formatter.date, true);
          e = _end19 && dayjs__default["default"](_end19, props.formatter.date, true);
        } else {
          if (props.autoApply) {
            if (props.modelValue) {
              var _Object$values7 = Object.values(props.modelValue),
                  _Object$values8 = _slicedToArray(_Object$values7, 2),
                  _start29 = _Object$values8[0],
                  _end20 = _Object$values8[1];

              s = _start29 && dayjs__default["default"](_start29, props.formatter.date, true);
              e = _end20 && dayjs__default["default"](_end20, props.formatter.date, true);
            }
          } else {
            var _applyValue$value14 = _slicedToArray(applyValue.value, 2),
                _start30 = _applyValue$value14[0],
                _end21 = _applyValue$value14[1];

            s = _start30 && dayjs__default["default"](_start30, props.formatter.date, true);
            e = _end21 && dayjs__default["default"](_end21, props.formatter.date, true);
          }
        }
      } else {
        if (hoverValue.value.length > 1) {
          var _hoverValue$value7 = _slicedToArray(hoverValue.value, 2),
              _start31 = _hoverValue$value7[0],
              _end22 = _hoverValue$value7[1];

          s = _start31 && dayjs__default["default"](_start31, props.formatter.date, true);
          e = _end22 && dayjs__default["default"](_end22, props.formatter.date, true);
        } else {
          if (props.autoApply) {
            var _ref9 = props.modelValue ? props.modelValue.split(props.separator) : [false, false],
                _ref10 = _slicedToArray(_ref9, 2),
                _start32 = _ref10[0],
                _end23 = _ref10[1];

            s = _start32 && dayjs__default["default"](_start32, props.formatter.date, true);
            e = _end23 && dayjs__default["default"](_end23, props.formatter.date, true);
          } else {
            var _applyValue$value15 = _slicedToArray(applyValue.value, 2),
                _start33 = _applyValue$value15[0],
                _end24 = _applyValue$value15[1];

            s = _start33 && dayjs__default["default"](_start33, props.formatter.date, true);
            e = _end24 && dayjs__default["default"](_end24, props.formatter.date, true);
          }
        }
      }

      if (s && e) {
        if (date.isSame(s, 'date')) {
          if (e.isBefore(s)) {
            classes += " rounded-r-full inset-0";
          }

          if (s.isBefore(e)) {
            classes += " rounded-l-full inset-0";
          }
        } else if (date.isSame(e, 'date')) {
          if (e.isBefore(s)) {
            classes += " rounded-l-full inset-0";
          }

          if (s.isBefore(e)) {
            classes += " rounded-r-full inset-0";
          }
        } else {
          classes += " inset-0";
        }
      }

      return classes;
    };

    var forceEmit = function forceEmit(s, e) {
      datepicker.value.previous = dayjs__default["default"](s, props.formatter.date, true);
      datepicker.value.next = dayjs__default["default"](e, props.formatter.date, true);

      if (dayjs__default["default"].duration(datepicker.value.next.diff(datepicker.value.previous)).$d.months === 2 || dayjs__default["default"].duration(datepicker.value.next.diff(datepicker.value.previous)).$d.months === 1 && dayjs__default["default"].duration(datepicker.value.next.diff(datepicker.value.previous)).$d.days === 7) {
        datepicker.value.next = datepicker.value.next.subtract(1, 'month');
      }

      if (datepicker.value.next.isSame(datepicker.value.previous, 'month') || datepicker.value.next.isBefore(datepicker.value.previous)) {
        datepicker.value.next = datepicker.value.previous.add(1, 'month');
      }
    };

    var emitShortcut = function emitShortcut(s, e) {
      if (asRange()) {
        if (props.autoApply) {
          if (useArray()) {
            emit('update:modelValue', [s, e]);
          } else if (useObject()) {
            var obj = {};

            var _Object$keys15 = Object.keys(props.modelValue),
                _Object$keys16 = _slicedToArray(_Object$keys15, 2),
                start = _Object$keys16[0],
                end = _Object$keys16[1];

            obj[start] = s;
            obj[end] = e;
            emit('update:modelValue', obj);
          } else {
            emit('update:modelValue', useToValueFromArray({
              previous: dayjs__default["default"](s, props.formatter.date, true),
              next: dayjs__default["default"](e, props.formatter.date, true)
            }, props));
          }

          pickerValue.value = "".concat(s).concat(props.separator).concat(e);
        } else {
          applyValue.value = [dayjs__default["default"](s, props.formatter.date, true), dayjs__default["default"](e, props.formatter.date, true)];
        }
      } else {
        if (props.autoApply) {
          if (useArray()) {
            emit('update:modelValue', [s]);
          } else if (useObject()) {
            var _obj4 = {};

            var _Object$keys17 = Object.keys(props.modelValue),
                _Object$keys18 = _slicedToArray(_Object$keys17, 1),
                _start34 = _Object$keys18[0];

            _obj4[_start34] = s;
            emit('update:modelValue', _obj4);
          } else {
            emit('update:modelValue', s);
          }

          pickerValue.value = s;
        } else {
          applyValue.value = [dayjs__default["default"](s, props.formatter.date, true), dayjs__default["default"](e, props.formatter.date, true)];
        }
      }

      forceEmit(s, e);
    };

    var setToToday = function setToToday() {
      var s = dayjs__default["default"]().format(props.formatter.date);
      var e = dayjs__default["default"]().format(props.formatter.date);
      emitShortcut(s, e);
    };

    var setToYesterday = function setToYesterday() {
      var s = dayjs__default["default"]().subtract(1, 'day').format(props.formatter.date);
      var e = dayjs__default["default"]().subtract(1, 'day').format(props.formatter.date);
      emitShortcut(s, e);
    };

    var setToLastDay = function setToLastDay(day) {
      var s = dayjs__default["default"]().subtract(day - 1, 'day').format(props.formatter.date);
      var e = dayjs__default["default"]().format(props.formatter.date);
      emitShortcut(s, e);
    };

    var setToThisMonth = function setToThisMonth() {
      var s = dayjs__default["default"]().date(1).format(props.formatter.date);
      var e = dayjs__default["default"]().date(dayjs__default["default"]().daysInMonth()).format(props.formatter.date);
      emitShortcut(s, e);
    };

    var setToLastMonth = function setToLastMonth() {
      var s = dayjs__default["default"]().date(1).subtract(1, 'month').format(props.formatter.date);
      var e = dayjs__default["default"]().date(0).format(props.formatter.date);
      emitShortcut(s, e);
    };

    var setToCustomShortcut = function setToCustomShortcut(item) {
      var s, e;

      var _item$atClick = item.atClick(),
          _item$atClick2 = _slicedToArray(_item$atClick, 2),
          d = _item$atClick2[0],
          dd = _item$atClick2[1];

      s = dayjs__default["default"](d).format(props.formatter.date);
      e = dayjs__default["default"](dd).format(props.formatter.date);
      emitShortcut(s, e);
    };

    vue.watch(function () {
      return isShow.value;
    }, function () {
      vue.nextTick(function () {
        placement.value = useVisibleViewport(LitepieRef.value);
      });
    });
    vue.watch(function () {
      return applyValue.value;
    }, function (newValue) {
      if (newValue.length > 0) {
        panel.previous.calendar = true;
        panel.previous.month = false;
        panel.previous.year = false;
        panel.next.calendar = true;
        panel.next.month = false;
        panel.next.year = false;
      }
    });
    vue.watchEffect(function () {
      if (!props.placeholder) {
        if (asRange()) {
          givenPlaceholder.value = "".concat(props.formatter.date).concat(props.separator).concat(props.formatter.date);
        } else {
          givenPlaceholder.value = props.formatter.date;
        }
      } else {
        givenPlaceholder.value = props.placeholder;
      }
    });
    vue.watchEffect(function () {
      var locale = props.i18n;
      vue.nextTick(function () {
        __variableDynamicImportRuntime0__("./locale/".concat(locale, ".js")).then(function () {
          dayjs__default["default"].locale(locale);
          var s, e;

          if (asRange()) {
            if (useArray()) {
              if (props.modelValue.length > 0) {
                var _props$modelValue6 = _slicedToArray(props.modelValue, 2),
                    start = _props$modelValue6[0],
                    end = _props$modelValue6[1];

                s = dayjs__default["default"](start, props.formatter.date, true);
                e = dayjs__default["default"](end, props.formatter.date, true);
              }
            } else if (useObject()) {
              if (!vue.isProxy(props.modelValue)) {
                try {
                  console.log(Object.keys(props.modelValue));
                } catch (e) {
                  console.warn('[Litepie Datepicker]: It looks like you want to use Object as the argument %cv-model', 'font-style: italic; color: #42b883;', ', but you pass it undefined or null.');
                  console.warn("[Litepie Datepicker]: We has replace with %c{ startDate: '', endDate: '' }", 'font-style: italic; color: #42b883;', ', but you can replace manually.');
                  emit('update:modelValue', {
                    startDate: '',
                    endDate: ''
                  });
                }
              }

              if (props.modelValue) {
                var _Object$values9 = Object.values(props.modelValue),
                    _Object$values10 = _slicedToArray(_Object$values9, 2),
                    _start35 = _Object$values10[0],
                    _end25 = _Object$values10[1];

                s = _start35 && dayjs__default["default"](_start35, props.formatter.date, true);
                e = _end25 && dayjs__default["default"](_end25, props.formatter.date, true);
              }
            } else {
              if (props.modelValue) {
                var _props$modelValue$spl5 = props.modelValue.split(props.separator),
                    _props$modelValue$spl6 = _slicedToArray(_props$modelValue$spl5, 2),
                    _start36 = _props$modelValue$spl6[0],
                    _end26 = _props$modelValue$spl6[1];

                s = dayjs__default["default"](_start36, props.formatter.date, true);
                e = dayjs__default["default"](_end26, props.formatter.date, true);
              }
            }

            if (s && e) {
              pickerValue.value = useToValueFromArray({
                previous: s,
                next: e
              }, props);

              if (e.isBefore(s, 'month')) {
                datepicker.value.previous = e;
                datepicker.value.next = s;
                datepicker.value.year.previous = e.year();
                datepicker.value.year.next = s.year();
              } else if (e.isSame(s, 'month')) {
                datepicker.value.previous = s;
                datepicker.value.next = e.add(1, 'month');
                datepicker.value.year.previous = s.year();
                datepicker.value.year.next = s.add(1, 'year').year();
              } else {
                datepicker.value.previous = s;
                datepicker.value.next = e;
                datepicker.value.year.previous = s.year();
                datepicker.value.year.next = e.year();
              }

              if (!props.autoApply) {
                applyValue.value = [s, e];
              }
            } else {
              datepicker.value.previous = dayjs__default["default"](props.startFrom);
              datepicker.value.next = dayjs__default["default"](props.startFrom).add(1, 'month');
              datepicker.value.year.previous = datepicker.value.previous.year();
              datepicker.value.year.next = datepicker.value.next.year();
            }
          } else {
            if (useArray()) {
              if (props.modelValue.length > 0) {
                var _props$modelValue7 = _slicedToArray(props.modelValue, 1),
                    _start37 = _props$modelValue7[0];

                s = dayjs__default["default"](_start37, props.formatter.date, true);
              }
            } else if (useObject()) {
              if (props.modelValue) {
                var _Object$values11 = Object.values(props.modelValue),
                    _Object$values12 = _slicedToArray(_Object$values11, 1),
                    _start38 = _Object$values12[0];

                s = dayjs__default["default"](_start38, props.formatter.date, true);
              }
            } else {
              if (props.modelValue.length) {
                var _props$modelValue$spl7 = props.modelValue.split(props.separator),
                    _props$modelValue$spl8 = _slicedToArray(_props$modelValue$spl7, 1),
                    _start39 = _props$modelValue$spl8[0];

                s = dayjs__default["default"](_start39, props.formatter.date, true);
              }
            }

            if (s && s.isValid()) {
              pickerValue.value = useToValueFromString(s, props);
              datepicker.value.previous = s;
              datepicker.value.next = s.add(1, 'month');
              datepicker.value.year.previous = s.year();
              datepicker.value.year.next = s.add(1, 'year').year();

              if (!props.autoApply) {
                applyValue.value = [s];
              }
            } else {
              datepicker.value.previous = dayjs__default["default"](props.startFrom);
              datepicker.value.next = dayjs__default["default"](props.startFrom).add(1, 'month');
              datepicker.value.year.previous = datepicker.value.previous.year();
              datepicker.value.year.next = datepicker.value.next.year();
            }
          }

          datepicker.value.weeks = dayjs__default["default"].weekdaysShort();
          datepicker.value.months = props.formatter.month === 'MMM' ? dayjs__default["default"].monthsShort() : dayjs__default["default"].months();
        }).catch(function () {
          console.warn("[Litepie Datepicker]: List of supported locales https://github.com/iamkun/dayjs/tree/dev/src/locale");
        });
      });
    });
    vue.provide('isBetweenRange', isBetweenRange);
    vue.provide('betweenRangeClasses', betweenRangeClasses);
    vue.provide('datepickerClasses', datepickerClasses);
    vue.provide('atMouseOver', atMouseOver);
    vue.provide('setToToday', setToToday);
    vue.provide('setToYesterday', setToYesterday);
    vue.provide('setToLastDay', setToLastDay);
    vue.provide('setToThisMonth', setToThisMonth);
    vue.provide('setToLastMonth', setToLastMonth);
    vue.provide('setToCustomShortcut', setToCustomShortcut);
    return {
      LitepieRef: LitepieRef,
      LitepieDatepickerRef: LitepieDatepickerRef,
      LitepieInputRef: LitepieInputRef,
      isShow: isShow,
      placement: placement,
      givenPlaceholder: givenPlaceholder,
      previous: previous,
      next: next,
      panel: panel,
      pickerValue: pickerValue,
      hoverValue: hoverValue,
      applyValue: applyValue,
      datepicker: datepicker,
      calendar: calendar,
      weeks: weeks,
      months: months,
      asRange: asRange,
      show: show,
      hide: hide,
      keyUp: keyUp,
      setDate: setDate,
      setHours: setHours,
      setMinutes: setMinutes,
      setSeconds: setSeconds,
      applyDate: applyDate,
      clearPicker: clearPicker
    };
  }
});var _hoisted_1 = {
  class: "relative block"
};
var _hoisted_2 = ["placeholder"];
var _hoisted_3 = {
  class: "absolute inset-y-0 right-0 inline-flex items-center rounded-md overflow-hidden"
};
var _hoisted_4 = {
  class: "w-5 h-5",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
};
var _hoisted_5 = {
  key: 0,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "1.5",
  d: "M6 18L18 6M6 6l12 12"
};
var _hoisted_6 = {
  key: 1,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "1.5",
  d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
};
var _hoisted_7 = {
  class: "fixed inset-0 z-50 overflow-y-auto sm:overflow-visible sm:static sm:z-auto bg-white dark:bg-litepie-secondary-800 sm:rounded-lg shadow-sm"
};
var _hoisted_8 = {
  class: "flex flex-wrap lg:flex-nowrap"
};
var _hoisted_9 = {
  class: "relative flex flex-wrap sm:flex-nowrap p-1"
};
var _hoisted_10 = {
  key: 0,
  class: "hidden absolute inset-0 sm:flex justify-center items-center"
};

var _hoisted_11 = /*#__PURE__*/vue.createElementVNode("div", {
  class: "w-8 sm:w-1 h-1 sm:h-8 bg-litepie-primary-500 rounded-xl shadow-inner"
}, null, -1);

var _hoisted_12 = [_hoisted_11];
var _hoisted_13 = {
  class: "px-0.5 sm:px-2"
};
var _hoisted_14 = {
  key: 1,
  class: "relative w-full sm:w-80 overflow-hidden mt-3 sm:mt-0 sm:ml-2"
};
var _hoisted_15 = {
  class: "px-0.5 sm:px-2"
};
var _hoisted_16 = {
  key: 0
};
var _hoisted_17 = {
  class: "mt-2 mx-2 py-1.5 border-t border-black/[.1] dark:border-litepie-secondary-700/[1]"
};
var _hoisted_18 = {
  class: "mt-1.5 sm:flex sm:flex-row-reverse"
};
var _hoisted_19 = ["disabled", "textContent"];
var _hoisted_20 = ["textContent"];
var _hoisted_21 = {
  key: 1,
  class: "sm:hidden"
};
var _hoisted_22 = {
  class: "mt-2 mx-2 py-1.5 border-t border-black/[.1] dark:border-litepie-secondary-700/[1]"
};
var _hoisted_23 = {
  class: "mt-1.5 sm:flex sm:flex-row-reverse"
};
var _hoisted_24 = ["textContent"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_litepie_shortcut = vue.resolveComponent("litepie-shortcut");

  var _component_litepie_header = vue.resolveComponent("litepie-header");

  var _component_litepie_month = vue.resolveComponent("litepie-month");

  var _component_litepie_year = vue.resolveComponent("litepie-year");

  var _component_litepie_week = vue.resolveComponent("litepie-week");

  var _component_litepie_calendar = vue.resolveComponent("litepie-calendar");

  var _directive_litepie = vue.resolveDirective("litepie");

  return vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", {
    id: "litepie",
    ref: "LitepieDatepickerRef",
    class: vue.normalizeClass(["relative w-full", [{
      'litepie-datepicker-overlay': _ctx.overlay
    }, {
      open: _ctx.isShow && _ctx.overlay
    }]])
  }, [vue.renderSlot(_ctx.$slots, "default", {
    value: _ctx.pickerValue,
    placeholder: _ctx.givenPlaceholder,
    clear: _ctx.clearPicker
  }, function () {
    return [vue.createElementVNode("label", _hoisted_1, [vue.withDirectives(vue.createElementVNode("input", vue.mergeProps({
      ref: "LitepieInputRef",
      type: "text",
      class: "relative block w-full pl-3 pr-12 py-2.5 rounded-lg overflow-hidden text-sm text-litepie-secondary-700 placeholder-litepie-secondary-400 transition-colors bg-white border border-litepie-secondary-300 focus:border-litepie-primary-300 focus:ring focus:ring-litepie-primary-500 focus:ring-opacity-10 focus:outline-none dark:bg-litepie-secondary-800 dark:border-litepie-secondary-700 dark:text-litepie-secondary-100 dark:placeholder-litepie-secondary-500 dark:focus:border-litepie-primary-500 dark:focus:ring-opacity-20"
    }, _ctx.$attrs, {
      "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
        return _ctx.pickerValue = $event;
      }),
      placeholder: _ctx.givenPlaceholder,
      onKeyup: _cache[1] || (_cache[1] = function () {
        return _ctx.keyUp && _ctx.keyUp.apply(_ctx, arguments);
      })
    }), null, 16, _hoisted_2), [[vue.vModelText, _ctx.pickerValue]]), vue.createElementVNode("span", _hoisted_3, [vue.createElementVNode("button", {
      type: "button",
      class: "px-2 py-1 mr-1 focus:outline-none text-litepie-secondary-400 dark:text-opacity-70 rounded-md",
      onClick: _cache[2] || (_cache[2] = function ($event) {
        return _ctx.pickerValue ? _ctx.clearPicker() : _ctx.$refs.LitepieInputRef.focus();
      })
    }, [(vue.openBlock(), vue.createElementBlock("svg", _hoisted_4, [_ctx.pickerValue ? (vue.openBlock(), vue.createElementBlock("path", _hoisted_5)) : (vue.openBlock(), vue.createElementBlock("path", _hoisted_6))]))])])])];
  }), vue.createVNode(vue.Transition, {
    "enter-from-class": "opacity-0 translate-y-3",
    "enter-to-class": "opacity-100 translate-y-0",
    "enter-active-class": "transform transition ease-out duration-200",
    "leave-active-class": "transform transition ease-in duration-150",
    "leave-from-class": "opacity-100 translate-y-0",
    "leave-to-class": "opacity-0 translate-y-3"
  }, {
    default: vue.withCtx(function () {
      return [vue.withDirectives(vue.createElementVNode("div", {
        ref: "LitepieRef",
        class: vue.normalizeClass(["absolute z-50 top-full sm:mt-2.5", _ctx.placement ? 'left-0 right-auto' : 'left-auto right-0'])
      }, [vue.createElementVNode("div", _hoisted_7, [vue.createElementVNode("div", {
        class: vue.normalizeClass(["litepie-datepicker static sm:relative w-full bg-white sm:rounded-lg sm:shadow-sm border-0 sm:border border-black/[.1] px-3 py-3 sm:px-1 sm:py-1.5 dark:bg-litepie-secondary-800 dark:border-litepie-secondary-700/[1]", _ctx.placement ? 'place-left' : 'place-right'])
      }, [vue.createElementVNode("div", _hoisted_8, [_ctx.shortcuts ? (vue.openBlock(), vue.createBlock(_component_litepie_shortcut, {
        key: 0,
        shortcuts: _ctx.shortcuts,
        "as-range": _ctx.asRange(),
        "as-single": _ctx.asSingle,
        i18n: _ctx.options.shortcuts
      }, null, 8, ["shortcuts", "as-range", "as-single", "i18n"])) : vue.createCommentVNode("", true), vue.createElementVNode("div", _hoisted_9, [_ctx.asRange() && !_ctx.asSingle ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_10, _hoisted_12)) : vue.createCommentVNode("", true), vue.createElementVNode("div", {
        class: vue.normalizeClass(["relative w-full sm:w-80", {
          'mb-3 sm:mb-0 sm:mr-2': _ctx.asRange() && !_ctx.asSingle
        }])
      }, [vue.createVNode(_component_litepie_header, {
        panel: _ctx.panel.previous,
        calendar: _ctx.calendar.previous
      }, null, 8, ["panel", "calendar"]), vue.createElementVNode("div", _hoisted_13, [vue.withDirectives(vue.createVNode(_component_litepie_month, {
        months: _ctx.months,
        "onUpdate:month": _ctx.calendar.previous.setMount
      }, null, 8, ["months", "onUpdate:month"]), [[vue.vShow, _ctx.panel.previous.month]]), vue.withDirectives(vue.createVNode(_component_litepie_year, {
        years: _ctx.calendar.previous.years(),
        "onUpdate:year": _ctx.calendar.previous.setYear
      }, null, 8, ["years", "onUpdate:year"]), [[vue.vShow, _ctx.panel.previous.year]]), vue.withDirectives(vue.createElementVNode("div", null, [vue.createVNode(_component_litepie_week, {
        weeks: _ctx.weeks
      }, null, 8, ["weeks"]), vue.createVNode(_component_litepie_calendar, {
        calendar: _ctx.calendar.previous,
        weeks: _ctx.weeks,
        "as-range": _ctx.asRange(),
        "onUpdate:date": _ctx.setDate
      }, null, 8, ["calendar", "weeks", "as-range", "onUpdate:date"])], 512), [[vue.vShow, _ctx.panel.previous.calendar]])])], 2), _ctx.asRange() && !_ctx.asSingle ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_14, [vue.createVNode(_component_litepie_header, {
        "as-prev-or-next": "",
        panel: _ctx.panel.next,
        calendar: _ctx.calendar.next
      }, null, 8, ["panel", "calendar"]), vue.createElementVNode("div", _hoisted_15, [vue.withDirectives(vue.createVNode(_component_litepie_month, {
        months: _ctx.months,
        "onUpdate:month": _ctx.calendar.next.setMount
      }, null, 8, ["months", "onUpdate:month"]), [[vue.vShow, _ctx.panel.next.month]]), vue.withDirectives(vue.createVNode(_component_litepie_year, {
        "as-prev-or-next": "",
        years: _ctx.calendar.next.years(),
        "onUpdate:year": _ctx.calendar.next.setYear
      }, null, 8, ["years", "onUpdate:year"]), [[vue.vShow, _ctx.panel.next.year]]), vue.withDirectives(vue.createElementVNode("div", null, [vue.createVNode(_component_litepie_week, {
        weeks: _ctx.weeks
      }, null, 8, ["weeks"]), vue.createVNode(_component_litepie_calendar, {
        "as-prev-or-next": "",
        calendar: _ctx.calendar.next,
        weeks: _ctx.weeks,
        "as-range": _ctx.asRange(),
        "onUpdate:date": _ctx.setDate
      }, null, 8, ["calendar", "weeks", "as-range", "onUpdate:date"])], 512), [[vue.vShow, _ctx.panel.next.calendar]])])])) : vue.createCommentVNode("", true)])]), !_ctx.autoApply ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_16, [vue.createElementVNode("div", _hoisted_17, [vue.createElementVNode("div", _hoisted_18, [vue.createElementVNode("button", {
        type: "button",
        class: "away-apply-picker w-full transition ease-out duration-300 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-litepie-primary-600 text-base font-medium text-white hover:bg-litepie-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-litepie-primary-500 sm:ml-3 sm:w-auto sm:text-sm dark:ring-offset-litepie-secondary-800 disabled:cursor-not-allowed",
        disabled: _ctx.asSingle ? _ctx.applyValue.length < 1 : _ctx.applyValue.length < 2,
        onClick: _cache[3] || (_cache[3] = function () {
          return _ctx.applyDate && _ctx.applyDate.apply(_ctx, arguments);
        }),
        textContent: vue.toDisplayString(_ctx.options.footer.apply)
      }, null, 8, _hoisted_19), vue.createElementVNode("button", {
        type: "button",
        class: "mt-3 away-cancel-picker w-full transition ease-out duration-300 inline-flex justify-center rounded-md border border-litepie-secondary-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-litepie-secondary-700 hover:bg-litepie-secondary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-litepie-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm dark:ring-offset-litepie-secondary-800",
        textContent: vue.toDisplayString(_ctx.options.footer.cancel)
      }, null, 8, _hoisted_20)])])])) : (vue.openBlock(), vue.createElementBlock("div", _hoisted_21, [vue.createElementVNode("div", _hoisted_22, [vue.createElementVNode("div", _hoisted_23, [vue.createElementVNode("button", {
        type: "button",
        class: "away-cancel-picker w-full transition ease-out duration-300 inline-flex justify-center rounded-md border border-litepie-secondary-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-litepie-secondary-700 hover:bg-litepie-secondary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-litepie-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm dark:ring-offset-litepie-secondary-800",
        textContent: vue.toDisplayString(_ctx.options.footer.cancel)
      }, null, 8, _hoisted_24)])])]))], 2)])], 2), [[vue.vShow, _ctx.isShow]])];
    }),
    _: 1
  })], 2)), [[_directive_litepie, _ctx.trigger, "away"]]);
}function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}var css_248z = "\n.litepie-datepicker-overlay::before {\n  content: '';\n  position: fixed;\n  top: 0px;\n  right: 0px;\n  bottom: 0px;\n  left: 0px;\n  display: none;\n  --tw-bg-opacity: 1;\n  background-color: rgba(0, 0, 0, var(--tw-bg-opacity));\n  opacity: 0;\n  transition-property: opacity;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 150ms;\n  transition-duration: 200ms;\n  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);\n}\n.litepie-datepicker-overlay.open::before {\n  display: block;\n  opacity: 0.5;\n}\n.litepie-datepicker::before {\n  --litepie-datepicker: 0px;\n  content: '';\n  position: absolute;\n  top: 0px;\n  height: 1rem;\n  width: 1rem;\n  border-width: 1px;\n  border-color: rgba(0, 0, 0, .1);\n  --tw-bg-opacity: 1;\n  background-color: rgba(255, 255, 255, var(--tw-bg-opacity));\n  --tw-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n.dark .litepie-datepicker::before {\n  --tw-border-opacity: 1;\n  border-color: rgba(55, 65, 81, var(--tw-border-opacity));\n  --tw-bg-opacity: 1;\n  background-color: rgba(31, 41, 55, var(--tw-bg-opacity));\n}\n.litepie-datepicker::before {\n  transform: translate(50%, -50%) rotate(-45deg);\n  -webkit-clip-path: polygon(\n    calc(var(--litepie-datepicker) * -1) calc(var(--litepie-datepicker) * -1),\n    calc(100% + var(--litepie-datepicker)) calc(var(--litepie-datepicker) * -1),\n    calc(100% + var(--litepie-datepicker))\n      calc(100% + var(--litepie-datepicker))\n  );\n          clip-path: polygon(\n    calc(var(--litepie-datepicker) * -1) calc(var(--litepie-datepicker) * -1),\n    calc(100% + var(--litepie-datepicker)) calc(var(--litepie-datepicker) * -1),\n    calc(100% + var(--litepie-datepicker))\n      calc(100% + var(--litepie-datepicker))\n  );\n}\n.litepie-datepicker.place-left::before {\n  left: 0.25rem;\n}\n.litepie-datepicker.place-right::before {\n  right: 1.25rem;\n}\n";
styleInject(css_248z);script.render = render;// Import vue component
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),

var component = /*#__PURE__*/(function () {
  // Get component instance
  var installable = script; // Attach install function executed by Vue.use()

  installable.install = function (app) {
    app.component('LitepieDatepicker', installable);
  };

  return installable;
})(); // It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;
var namedExports=/*#__PURE__*/Object.freeze({__proto__:null,'default':component});// only expose one global var, with named exports exposed as properties of
// that global var (eg. plugin.namedExport)

Object.entries(namedExports).forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      exportName = _ref2[0],
      exported = _ref2[1];

  if (exportName !== 'default') component[exportName] = exported;
});module.exports=component;