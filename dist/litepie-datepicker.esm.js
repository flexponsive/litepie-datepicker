import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isToday from 'dayjs/plugin/isToday';
import isBetween from 'dayjs/plugin/isBetween';
import duration from 'dayjs/plugin/duration';
import { defineComponent, openBlock, createElementBlock, createElementVNode, withDirectives, vShow, toDisplayString, Fragment, renderList, inject, createVNode, TransitionGroup, withCtx, normalizeClass, Transition, createCommentVNode, withModifiers, ref, reactive, computed, unref, nextTick, watch, watchEffect, isProxy, provide, resolveComponent, resolveDirective, renderSlot, mergeProps, vModelText, createBlock } from 'vue';

const usePreviousDate = date => {
  const display = [];

  for (let i = 0; i <= date.date(0).day(); i++) {
    display.push(date.date(0).subtract(i, 'day'));
  }

  return display.sort((a, b) => a.date() - b.date());
};
const useCurrentDate = date => {
  return Array.from({
    length: date.daysInMonth()
  }, (v, k) => date.date(k + 1));
};
const useNextDate = date => {
  const display = [];

  for (let i = 1; i <= 42 - (usePreviousDate(date).length + date.daysInMonth()); i++) {
    display.push(date.date(i).month(date.month()).add(1, 'month'));
  }

  return display;
};
const useDisableDate = (date, _ref) => {
  let {
    disableDate
  } = _ref;

  if (typeof disableDate === 'function') {
    return disableDate(date.toDate());
  } else {
    return false;
  }
};
const useBetweenRange = (date, _ref2) => {
  let {
    previous,
    next
  } = _ref2;
  let pattern;

  if (previous.isAfter(next, 'date')) {
    pattern = '(]';
  } else {
    pattern = '[)';
  }

  return !!(date.isBetween(previous, next, 'date', pattern) && !date.off);
};
const useToValueFromString = (date, _ref3) => {
  let {
    formatter
  } = _ref3;
  return date.format(formatter.date);
};
const useToValueFromArray = (_ref4, _ref5) => {
  let {
    previous,
    next
  } = _ref4;
  let {
    formatter,
    separator
  } = _ref5;
  return `${previous.format(formatter.date)}${separator}${next.format(formatter.date)}`;
};
const useDirective = binding => {
  const {
    instance,
    arg,
    value
  } = binding;
  document.body.addEventListener('click', $event => {
    if ($event.target.classList.contains('litepie-datepicker-overlay')) {
      return instance.isShow = false;
    } else {
      if (instance.LitepieDatepickerRef) {
        const {
          autoApply,
          previous,
          next
        } = instance;
        const target = $event.target.classList.contains('litepie-datepicker-date');

        if (target && autoApply && !previous && !next) {
          return instance.isShow = false;
        }

        if (!autoApply && $event.target.classList.contains(`${arg}-apply-picker`) && instance.value !== '') {
          return instance.isShow = false;
        }

        if ($event.target.classList.contains(`${arg}-cancel-picker`)) {
          return instance.isShow = false;
        }

        if ($event.target.classList.contains(`litepie-shortcuts`) && autoApply) {
          return instance.isShow = false;
        }

        return instance.isShow = instance.LitepieDatepickerRef.contains($event.target) || document.getElementById(value) === $event.target || value === $event.target;
      }

      return instance.isShow = true;
    }
  });
};
const useVisibleViewport = el => {
  const {
    right
  } = el.getBoundingClientRect();
  const vWidth = window.innerWidth || document.documentElement.clientWidth;
  return right < vWidth;
};

var script$6 = defineComponent({
  name: 'LitepieHeader',
  props: {
    asPrevOrNext: Boolean,
    panel: Object,
    calendar: Object
  },
  inheritAttrs: false
});

const _hoisted_1$6 = {
  class: "flex justify-between items-center px-2 py-1.5 rounded-md border border-black/[.1] dark:border-litepie-secondary-700/[1]"
};
const _hoisted_2$6 = {
  class: "flex-shrink-0"
};
const _hoisted_3$5 = {
  class: "inline-flex rounded-full"
};
const _hoisted_4$2 = {
  class: "w-5 h-5",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_5$1 = ["d"];
const _hoisted_6$1 = {
  class: "px-1.5 space-x-1.5 flex flex-1"
};
const _hoisted_7$1 = {
  class: "flex-1 flex rounded-md"
};
const _hoisted_8$1 = ["textContent"];
const _hoisted_9$1 = {
  class: "flex-1 flex rounded-md"
};
const _hoisted_10$1 = ["textContent"];
const _hoisted_11$1 = {
  class: "flex-shrink-0"
};
const _hoisted_12$1 = {
  class: "inline-flex rounded-full"
};
const _hoisted_13$1 = {
  class: "w-5 h-5",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_14$1 = ["d"];
function render$6(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$6, [createElementVNode("div", _hoisted_2$6, [withDirectives(createElementVNode("span", _hoisted_3$5, [createElementVNode("button", {
    type: "button",
    class: "p-1.5 rounded-full bg-white text-litepie-secondary-600 transition-colors border border-transparent hover:bg-litepie-secondary-100 hover:text-litepie-secondary-900 focus:bg-litepie-primary-50 focus:text-litepie-secondary-900 focus:border-litepie-primary-300 focus:ring focus:ring-litepie-primary-500 focus:ring-opacity-10 focus:outline-none dark:bg-litepie-secondary-800 dark:text-litepie-secondary-300 dark:hover:bg-litepie-secondary-700 dark:hover:text-litepie-secondary-300 dark:focus:bg-litepie-secondary-600 dark:focus:text-litepie-secondary-100 dark:focus:border-litepie-primary-500 dark:focus:ring-opacity-25 dark:focus:bg-opacity-50",
    onClick: _cache[0] || (_cache[0] = $event => _ctx.panel.calendar ? _ctx.calendar.onPrevious() : _ctx.calendar.onPreviousYear())
  }, [(openBlock(), createElementBlock("svg", _hoisted_4$2, [createElementVNode("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-width": "1.5",
    d: _ctx.panel.calendar ? `M15 19l-7-7 7-7` : `M11 19l-7-7 7-7m8 14l-7-7 7-7`
  }, null, 8, _hoisted_5$1)]))])], 512), [[vShow, _ctx.panel.calendar || _ctx.panel.year]])]), createElementVNode("div", _hoisted_6$1, [createElementVNode("span", _hoisted_7$1, [createElementVNode("button", {
    type: "button",
    class: "px-3 py-1.5 block w-full leading-relaxed rounded-md bg-white text-xs 2xl:text-sm tracking-wide text-litepie-secondary-600 font-semibold sm:font-medium transition-colors border border-transparent hover:bg-litepie-secondary-100 hover:text-litepie-secondary-900 focus:bg-litepie-primary-50 focus:text-litepie-secondary-900 focus:border-litepie-primary-300 focus:ring focus:ring-litepie-primary-500 focus:ring-opacity-10 focus:outline-none uppercase dark:bg-litepie-secondary-800 dark:text-litepie-secondary-300 dark:hover:bg-litepie-secondary-700 dark:hover:text-litepie-secondary-300 dark:focus:bg-litepie-secondary-600 dark:focus:text-litepie-secondary-100 dark:focus:border-litepie-primary-500 dark:focus:ring-opacity-25 dark:focus:bg-opacity-50",
    textContent: toDisplayString(_ctx.calendar.month),
    onClick: _cache[1] || (_cache[1] = $event => _ctx.calendar.openMonth())
  }, null, 8, _hoisted_8$1)]), createElementVNode("span", _hoisted_9$1, [createElementVNode("button", {
    type: "button",
    class: "px-3 py-1.5 block w-full leading-relaxed rounded-md bg-white text-xs 2xl:text-sm tracking-wide text-litepie-secondary-600 font-semibold sm:font-medium transition-colors border border-transparent hover:bg-litepie-secondary-100 hover:text-litepie-secondary-900 focus:bg-litepie-primary-50 focus:text-litepie-secondary-900 focus:border-litepie-primary-300 focus:ring focus:ring-litepie-primary-500 focus:ring-opacity-10 focus:outline-none uppercase dark:bg-litepie-secondary-800 dark:text-litepie-secondary-300 dark:hover:bg-litepie-secondary-700 dark:hover:text-litepie-secondary-300 dark:focus:bg-litepie-secondary-600 dark:focus:text-litepie-secondary-100 dark:focus:border-litepie-primary-500 dark:focus:ring-opacity-25 dark:focus:bg-opacity-50",
    textContent: toDisplayString(_ctx.calendar.year),
    onClick: _cache[2] || (_cache[2] = $event => _ctx.calendar.openYear())
  }, null, 8, _hoisted_10$1)])]), createElementVNode("div", _hoisted_11$1, [withDirectives(createElementVNode("span", _hoisted_12$1, [createElementVNode("button", {
    type: "button",
    class: "p-1.5 rounded-full bg-white text-litepie-secondary-600 transition-colors border border-transparent hover:bg-litepie-secondary-100 hover:text-litepie-secondary-900 focus:bg-litepie-primary-50 focus:text-litepie-secondary-900 focus:border-litepie-primary-300 focus:ring focus:ring-litepie-primary-500 focus:ring-opacity-10 focus:outline-none dark:bg-litepie-secondary-800 dark:text-litepie-secondary-300 dark:hover:bg-litepie-secondary-700 dark:hover:text-litepie-secondary-300 dark:focus:bg-litepie-secondary-600 dark:focus:text-litepie-secondary-100 dark:focus:border-litepie-primary-500 dark:focus:ring-opacity-25 dark:focus:bg-opacity-50",
    onClick: _cache[3] || (_cache[3] = $event => _ctx.panel.calendar ? _ctx.calendar.onNext() : _ctx.calendar.onNextYear())
  }, [(openBlock(), createElementBlock("svg", _hoisted_13$1, [createElementVNode("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-width": "1.5",
    d: _ctx.panel.calendar ? `M9 5l7 7-7 7` : `M13 5l7 7-7 7M5 5l7 7-7 7`
  }, null, 8, _hoisted_14$1)]))])], 512), [[vShow, _ctx.panel.calendar || _ctx.panel.year]])])]);
}

script$6.render = render$6;

var script$5 = defineComponent({
  name: 'LitepieMonth',
  props: {
    months: Array
  },
  inheritAttrs: false,
  emits: ['update:month']
});

const _hoisted_1$5 = {
  class: "flex flex-wrap mt-1.5"
};
const _hoisted_2$5 = {
  class: "flex rounded-md mt-1.5"
};
const _hoisted_3$4 = ["textContent", "onClick"];
function render$5(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$5, [(openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.months, (month, key) => {
    return openBlock(), createElementBlock("div", {
      key: key,
      class: "w-1/2 px-0.5"
    }, [createElementVNode("span", _hoisted_2$5, [createElementVNode("button", {
      type: "button",
      class: "px-3 py-2 block w-full leading-6 rounded-md bg-white text-xs 2xl:text-sm tracking-wide text-litepie-secondary-600 font-medium transition-colors border border-transparent hover:bg-litepie-secondary-100 hover:text-litepie-secondary-900 focus:bg-litepie-primary-50 focus:text-litepie-secondary-900 focus:border-litepie-primary-300 focus:ring focus:ring-litepie-primary-500 focus:ring-opacity-10 focus:outline-none uppercase dark:bg-litepie-secondary-800 dark:hover:bg-litepie-secondary-700 dark:text-litepie-secondary-300 dark:hover:text-litepie-secondary-100 dark:focus:bg-litepie-secondary-700",
      textContent: toDisplayString(month),
      onClick: $event => _ctx.$emit('update:month', key)
    }, null, 8, _hoisted_3$4)])]);
  }), 128))]);
}

script$5.render = render$5;

var script$4 = defineComponent({
  name: 'LitepieWeek',
  props: {
    weeks: Array
  },
  inheritAttrs: false
});

const _hoisted_1$4 = {
  class: "grid grid-cols-7 py-2 mt-0.5 border-b border-black/[.1] dark:border-litepie-secondary-700/[1]"
};
const _hoisted_2$4 = ["textContent"];
function render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$4, [(openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.weeks, (day, keyDay) => {
    return openBlock(), createElementBlock("div", {
      key: keyDay,
      class: "text-litepie-secondary-500 text-xs 2xl:text-sm tracking-wide font-medium text-center cursor-default dark:text-litepie-secondary-400"
    }, [createElementVNode("span", {
      textContent: toDisplayString(day)
    }, null, 8, _hoisted_2$4)]);
  }), 128))]);
}

script$4.render = render$4;

var script$3 = defineComponent({
  name: 'LitepieYear',
  props: {
    asPrevOrNext: Boolean,
    years: Array
  },
  inheritAttrs: false,
  emits: ['update:year']
});

const _hoisted_1$3 = {
  class: "flex flex-wrap"
};
const _hoisted_2$3 = {
  class: "flex rounded-md mt-1.5"
};
const _hoisted_3$3 = ["textContent", "onClick"];
function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$3, [(openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.years, (year, key) => {
    return openBlock(), createElementBlock("div", {
      key: key,
      class: "w-1/2 px-0.5"
    }, [createElementVNode("span", _hoisted_2$3, [createElementVNode("button", {
      type: "button",
      class: "px-3 py-2 block w-full leading-6 rounded-md bg-white text-xs 2xl:text-sm tracking-wide text-litepie-secondary-600 font-medium transition-colors border border-transparent hover:bg-litepie-secondary-100 hover:text-litepie-secondary-900 focus:bg-litepie-primary-50 focus:text-litepie-secondary-900 focus:border-litepie-primary-300 focus:ring focus:ring-litepie-primary-500 focus:ring-opacity-10 focus:outline-none uppercase dark:bg-litepie-secondary-800 dark:hover:bg-litepie-secondary-700 dark:text-litepie-secondary-300 dark:hover:text-litepie-secondary-100 dark:focus:bg-litepie-secondary-700",
      textContent: toDisplayString(year),
      onClick: $event => _ctx.$emit('update:year', year, _ctx.asPrevOrNext)
    }, null, 8, _hoisted_3$3)])]);
  }), 128))]);
}

script$3.render = render$3;

var script$2 = defineComponent({
  name: 'LitepieCalendar',
  props: {
    asPrevOrNext: Boolean,
    calendar: Object,
    weeks: Array,
    asRange: Boolean
  },
  inheritAttrs: false,
  emits: ['update:date'],

  setup() {
    const isBetweenRange = inject('isBetweenRange');
    const betweenRangeClasses = inject('betweenRangeClasses');
    const datepickerClasses = inject('datepickerClasses');
    const atMouseOver = inject('atMouseOver');
    return {
      isBetweenRange,
      betweenRangeClasses,
      datepickerClasses,
      atMouseOver
    };
  }

});

const _hoisted_1$2 = {
  class: "grid grid-cols-7 gap-y-0.5 my-1"
};
const _hoisted_2$2 = ["data-tooltip"];
const _hoisted_3$2 = ["disabled", "onClick", "onMouseenter", "onFocusin", "textContent", "data-date"];
function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$2, [createVNode(TransitionGroup, {
    "enter-from-class": "opacity-0",
    "enter-to-class": "opacity-100",
    "enter-active-class": "transition-opacity ease-out duration-300",
    "leave-active-class": "transition-opacity ease-in duration-200",
    "leave-from-class": "opacity-100",
    "leave-to-class": "opacity-0"
  }, {
    default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.calendar.date(), (date, keyDate) => {
      return openBlock(), createElementBlock("div", {
        key: keyDate,
        class: normalizeClass(["relative", {
          'litepie-tooltip': _ctx.asRange && date.duration()
        }]),
        "data-tooltip": `${date.duration()}`
      }, [createVNode(Transition, {
        "enter-from-class": "opacity-0",
        "enter-to-class": "opacity-100",
        "enter-active-class": "transition-opacity ease-out duration-200",
        "leave-active-class": "transition-opacity ease-in duration-150",
        "leave-from-class": "opacity-100",
        "leave-to-class": "opacity-0"
      }, {
        default: withCtx(() => [_ctx.isBetweenRange(date) || date.hovered() ? (openBlock(), createElementBlock("span", {
          key: 0,
          class: normalizeClass(["absolute bg-litepie-primary-100 bg-opacity-60 dark:bg-litepie-secondary-700 dark:bg-opacity-50", _ctx.betweenRangeClasses(date)])
        }, null, 2)) : createCommentVNode("", true)]),
        _: 2
      }, 1024), createElementVNode("button", {
        type: "button",
        class: normalizeClass(["litepie-datepicker-date relative w-12 h-12 lg:w-10 lg:h-10 flex justify-center items-center text-xs 2xl:text-sm focus:outline-none", [_ctx.datepickerClasses(date), _ctx.asRange ? 'transition-all' : 'transition-colors']]),
        disabled: date.disabled || date.inRange(),
        onClick: $event => _ctx.$emit('update:date', date, _ctx.asPrevOrNext),
        onMouseenter: $event => _ctx.atMouseOver(date),
        onFocusin: $event => _ctx.atMouseOver(date),
        textContent: toDisplayString(date.date()),
        "data-date": date.toDate()
      }, null, 42, _hoisted_3$2)], 10, _hoisted_2$2);
    }), 128))]),
    _: 1
  })]);
}

script$2.render = render$2;

var script$1 = defineComponent({
  name: 'LitepieShortcut',
  props: {
    shortcuts: [Boolean, Function],
    asRange: Boolean,
    asSingle: Boolean,
    i18n: Object
  },
  inheritAttrs: false,

  setup(props) {
    const setToToday = inject('setToToday');
    const setToYesterday = inject('setToYesterday');
    const setToLastDay = inject('setToLastDay');
    const setToThisMonth = inject('setToThisMonth');
    const setToLastMonth = inject('setToLastMonth');
    const setToCustomShortcut = inject('setToCustomShortcut');

    const withShortcut = () => {
      if (typeof props.shortcuts === 'function') {
        return props.shortcuts();
      } else {
        return false;
      }
    };

    return {
      setToToday,
      setToYesterday,
      setToLastDay,
      setToThisMonth,
      setToLastMonth,
      setToCustomShortcut,
      withShortcut
    };
  }

});

const _hoisted_1$1 = {
  key: 0,
  class: "relative w-full border-t border-b-0 sm:border-t-0 sm:border-b lg:border-b-0 lg:border-r border-black/[.1] order-last sm:order-none dark:border-litepie-secondary-700/[1] sm:mt-1 lg:mr-1 sm:mb-1 lg:mb-0 sm:mx-1 lg:mx-0"
};
const _hoisted_2$1 = {
  key: 0,
  class: "grid grid-cols-2 sm:grid-cols-3 gap-1 lg:block w-full pr-0 sm:pr-1 mt-1.5 sm:mt-0 sm:mb-1.5 lg:mb-0"
};
const _hoisted_3$1 = ["onClick", "textContent"];
const _hoisted_4$1 = {
  key: 1,
  class: "grid grid-cols-2 sm:grid-cols-3 gap-1 lg:block w-full pr-0 sm:pr-1 mt-1.5 sm:mt-0 sm:mb-1.5 lg:mb-0"
};
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return _ctx.asRange && !_ctx.asSingle ? (openBlock(), createElementBlock("div", _hoisted_1$1, [_ctx.withShortcut() ? (openBlock(), createElementBlock("ol", _hoisted_2$1, [(openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.withShortcut(), (item, i) => {
    return openBlock(), createElementBlock("li", {
      key: i
    }, [createElementVNode("a", {
      href: "#",
      class: "litepie-shortcuts block text-sm lg:text-xs px-2 py-2 sm:leading-4 whitespace-nowrap font-medium rounded text-litepie-primary-600 hover:text-litepie-primary-700 transition-colors hover:bg-litepie-secondary-100 focus:bg-litepie-secondary-100 focus:text-litepie-primary-600 dark:hover:bg-litepie-secondary-700 dark:hover:text-litepie-primary-300 dark:text-litepie-primary-400 dark:focus:bg-litepie-secondary-700 dark:focus:text-litepie-primary-300",
      onClick: withModifiers($event => _ctx.setToCustomShortcut(item), ["prevent"]),
      textContent: toDisplayString(item.label)
    }, null, 8, _hoisted_3$1)]);
  }), 128))])) : (openBlock(), createElementBlock("ol", _hoisted_4$1, [createElementVNode("li", null, [createElementVNode("a", {
    href: "#",
    class: "litepie-shortcuts block text-sm lg:text-xs px-2 py-2 sm:leading-4 whitespace-nowrap font-medium rounded text-litepie-primary-600 hover:text-litepie-primary-700 transition-colors hover:bg-litepie-secondary-100 focus:bg-litepie-secondary-100 focus:text-litepie-primary-600 dark:hover:bg-litepie-secondary-700 dark:hover:text-litepie-primary-300 dark:text-litepie-primary-400 dark:focus:bg-litepie-secondary-700 dark:focus:text-litepie-primary-300",
    onClick: _cache[0] || (_cache[0] = withModifiers(function () {
      return _ctx.setToToday && _ctx.setToToday(...arguments);
    }, ["prevent"]))
  }, toDisplayString(_ctx.i18n.today), 1)]), createElementVNode("li", null, [createElementVNode("a", {
    href: "#",
    class: "litepie-shortcuts block text-sm lg:text-xs px-2 py-2 sm:leading-4 whitespace-nowrap font-medium rounded text-litepie-primary-600 hover:text-litepie-primary-700 transition-colors hover:bg-litepie-secondary-100 focus:bg-litepie-secondary-100 focus:text-litepie-primary-600 dark:hover:bg-litepie-secondary-700 dark:hover:text-litepie-primary-300 dark:text-litepie-primary-400 dark:focus:bg-litepie-secondary-700 dark:focus:text-litepie-primary-300",
    onClick: _cache[1] || (_cache[1] = withModifiers(function () {
      return _ctx.setToYesterday && _ctx.setToYesterday(...arguments);
    }, ["prevent"]))
  }, toDisplayString(_ctx.i18n.yesterday), 1)]), createElementVNode("li", null, [createElementVNode("a", {
    href: "#",
    class: "litepie-shortcuts block text-sm lg:text-xs px-2 py-2 sm:leading-4 whitespace-nowrap font-medium rounded text-litepie-primary-600 hover:text-litepie-primary-700 transition-colors hover:bg-litepie-secondary-100 focus:bg-litepie-secondary-100 focus:text-litepie-primary-600 dark:hover:bg-litepie-secondary-700 dark:hover:text-litepie-primary-300 dark:text-litepie-primary-400 dark:focus:bg-litepie-secondary-700 dark:focus:text-litepie-primary-300",
    onClick: _cache[2] || (_cache[2] = withModifiers($event => _ctx.setToLastDay(7), ["prevent"]))
  }, toDisplayString(_ctx.i18n.past(7)), 1)]), createElementVNode("li", null, [createElementVNode("a", {
    href: "#",
    class: "litepie-shortcuts block text-sm lg:text-xs px-2 py-2 sm:leading-4 whitespace-nowrap font-medium rounded text-litepie-primary-600 hover:text-litepie-primary-700 transition-colors hover:bg-litepie-secondary-100 focus:bg-litepie-secondary-100 focus:text-litepie-primary-600 dark:hover:bg-litepie-secondary-700 dark:hover:text-litepie-primary-300 dark:text-litepie-primary-400 dark:focus:bg-litepie-secondary-700 dark:focus:text-litepie-primary-300",
    onClick: _cache[3] || (_cache[3] = withModifiers($event => _ctx.setToLastDay(30), ["prevent"]))
  }, toDisplayString(_ctx.i18n.past(30)), 1)]), createElementVNode("li", null, [createElementVNode("a", {
    href: "#",
    class: "litepie-shortcuts block text-sm lg:text-xs px-2 py-2 sm:leading-4 whitespace-nowrap font-medium rounded text-litepie-primary-600 hover:text-litepie-primary-700 transition-colors hover:bg-litepie-secondary-100 focus:bg-litepie-secondary-100 focus:text-litepie-primary-600 dark:hover:bg-litepie-secondary-700 dark:hover:text-litepie-primary-300 dark:text-litepie-primary-400 dark:focus:bg-litepie-secondary-700 dark:focus:text-litepie-primary-300",
    onClick: _cache[4] || (_cache[4] = withModifiers(function () {
      return _ctx.setToThisMonth && _ctx.setToThisMonth(...arguments);
    }, ["prevent"]))
  }, toDisplayString(_ctx.i18n.currentMonth), 1)]), createElementVNode("li", null, [createElementVNode("a", {
    href: "#",
    class: "litepie-shortcuts block text-sm lg:text-xs px-2 py-2 sm:leading-4 whitespace-nowrap font-medium rounded text-litepie-primary-600 hover:text-litepie-primary-700 transition-colors hover:bg-litepie-secondary-100 focus:bg-litepie-secondary-100 focus:text-litepie-primary-600 dark:hover:bg-litepie-secondary-700 dark:hover:text-litepie-primary-300 dark:text-litepie-primary-400 dark:focus:bg-litepie-secondary-700 dark:focus:text-litepie-primary-300",
    onClick: _cache[5] || (_cache[5] = withModifiers(function () {
      return _ctx.setToLastMonth && _ctx.setToLastMonth(...arguments);
    }, ["prevent"]))
  }, toDisplayString(_ctx.i18n.pastMonth), 1)])]))])) : createCommentVNode("", true);
}

script$1.render = render$1;

function __variableDynamicImportRuntime0__(path) {
  switch (path) {

    default: return new Promise(function(resolve, reject) {
      (typeof queueMicrotask === 'function' ? queueMicrotask : setTimeout)(
        reject.bind(null, new Error("Unknown variable dynamic import: " + path))
      );
    })
   }
 }
dayjs.extend(localeData);
dayjs.extend(localizedFormat);
dayjs.extend(customParseFormat);
dayjs.extend(isToday);
dayjs.extend(isBetween);
dayjs.extend(duration);
var script = /*#__PURE__*/defineComponent({
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
      mounted: (el, binding) => {
        useDirective(binding);
      },
      updated: (el, binding) => {
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
      default: () => ({
        date: 'YYYY-MM-DD HH:mm:ss',
        month: 'MMM'
      })
    },
    modelValue: {
      type: [Array, Object, String],
      default: []
    },
    startFrom: {
      type: [Object, String],
      default: () => new Date()
    },
    options: {
      type: Object,
      default: () => ({
        shortcuts: {
          today: 'Today',
          yesterday: 'Yesterday',
          past: period => `Last ${period} Days`,
          currentMonth: 'This Month',
          pastMonth: 'Last Month'
        },
        footer: {
          apply: 'Apply',
          cancel: 'Cancel'
        }
      })
    }
  },
  inheritAttrs: false,
  emits: ['update:modelValue'],

  setup(props, _ref) {
    let {
      emit
    } = _ref;
    const LitepieRef = ref(null);
    const LitepieDatepickerRef = ref(null);
    const LitepieInputRef = ref(null);
    const isShow = ref(false);
    const placement = ref(true);
    const givenPlaceholder = ref('');
    const selection = ref(null);
    const pickerValue = ref('');
    const hoverValue = ref([]);
    const applyValue = ref([]);
    const previous = ref(null);
    const next = ref(null);
    const panel = reactive({
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
    const datepicker = ref({
      previous: dayjs(),
      next: dayjs().add(1, 'month'),
      year: {
        previous: dayjs().year(),
        next: dayjs().year()
      },
      weeks: dayjs.weekdaysShort(),
      months: props.formatter.month === 'MMM' ? dayjs.monthsShort() : dayjs.months()
    });
    const weeks = computed(() => datepicker.value.weeks);
    const months = computed(() => datepicker.value.months);
    const calendar = computed(() => {
      const {
        previous,
        next,
        year
      } = unref(datepicker);
      return {
        previous: {
          date: () => {
            return usePreviousDate(previous).concat(useCurrentDate(previous)).concat(useNextDate(previous)).map(v => {
              v.today = v.isToday();
              v.active = previous.month() === v.month();
              v.off = previous.month() !== v.month();
              v.sunday = v.day() === 0;
              v.disabled = useDisableDate(v, props) && !inRangeDate(v);

              v.inRange = () => {
                if (props.asSingle && !props.useRange) {
                  return previous.month() !== v.month();
                }
              };

              v.hovered = () => {
                if (!asRange()) return false;

                if (hoverValue.value.length > 1) {
                  return (v.isBetween(hoverValue.value[0], hoverValue.value[1], 'date', '()') || v.isBetween(hoverValue.value[1], hoverValue.value[0], 'date', '()')) && previous.month() === v.month();
                }

                return false;
              };

              v.duration = () => {
                return false;
              };

              return v;
            });
          },
          month: previous && previous.format(props.formatter.month),
          year: previous && previous.year(),
          years: () => {
            return Array.from({
              length: 12
            }, (v, k) => year.previous + k);
          },
          onPrevious: () => {
            datepicker.value.previous = previous.subtract(1, 'month');
          },
          onNext: () => {
            datepicker.value.previous = previous.add(1, 'month');

            if (previous.diff(next, 'month') === -1) {
              datepicker.value.next = next.add(1, 'month');
            }
          },
          onPreviousYear: () => {
            datepicker.value.year.previous = datepicker.value.year.previous - 12;
          },
          onNextYear: () => {
            datepicker.value.year.previous = datepicker.value.year.previous + 12;
          },
          openMonth: () => {
            panel.previous.month = !panel.previous.month;
            panel.previous.year = false;
            panel.previous.calendar = !panel.previous.month;
          },
          setMount: $event => {
            datepicker.value.previous = previous.month($event);
            panel.previous.month = !panel.previous.month;
            panel.previous.year = false;
            panel.previous.calendar = !panel.previous.month;
            nextTick(() => {
              if (datepicker.value.next.isSame(datepicker.value.previous, 'month') || datepicker.value.next.isBefore(datepicker.value.previous)) {
                datepicker.value.next = datepicker.value.previous.add(1, 'month');
              }

              datepicker.value.year.next = datepicker.value.next.year();
            });
          },
          openYear: () => {
            panel.previous.year = !panel.previous.year;
            panel.previous.month = false;
            panel.previous.calendar = !panel.previous.year;
          },
          setYear: ($event, asNext) => {
            if (!asNext) {
              datepicker.value.previous = previous.year($event);
              panel.previous.year = !panel.previous.year;
              panel.previous.calendar = !panel.previous.year;
              nextTick(() => {
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
          date: () => {
            return usePreviousDate(next).concat(useCurrentDate(next)).concat(useNextDate(next)).map(v => {
              v.today = v.isToday();
              v.active = next.month() === v.month();
              v.off = next.month() !== v.month();
              v.sunday = v.day() === 0;
              v.disabled = useDisableDate(v, props) && !inRangeDate(v);

              v.inRange = () => {
                if (props.asSingle && !props.useRange) {
                  return next.month() !== v.month();
                }
              };

              v.hovered = () => {
                if (hoverValue.value.length > 1) {
                  return (v.isBetween(hoverValue.value[0], hoverValue.value[1], 'date', '()') || v.isBetween(hoverValue.value[1], hoverValue.value[0], 'date', '()')) && next.month() === v.month();
                }

                return false;
              };

              v.duration = () => {
                return false;
              };

              return v;
            });
          },
          month: next && next.format(props.formatter.month),
          year: next && next.year(),
          years: () => {
            return Array.from({
              length: 12
            }, (v, k) => year.next + k);
          },
          onPrevious: () => {
            datepicker.value.next = next.subtract(1, 'month');

            if (next.diff(previous, 'month') === 1) {
              datepicker.value.previous = previous.subtract(1, 'month');
            }
          },
          onNext: () => {
            datepicker.value.next = next.add(1, 'month');
          },
          onPreviousYear: () => {
            datepicker.value.year.next = datepicker.value.year.next - 12;
          },
          onNextYear: () => {
            datepicker.value.year.next = datepicker.value.year.next + 12;
          },
          openMonth: () => {
            panel.next.month = !panel.next.month;
            panel.next.year = false;
            panel.next.calendar = !panel.next.month;
          },
          setMount: $event => {
            datepicker.value.next = next.month($event);
            panel.next.month = !panel.next.month;
            panel.next.year = false;
            panel.next.calendar = !panel.next.month;
            nextTick(() => {
              if (datepicker.value.previous.isSame(datepicker.value.next, 'month') || datepicker.value.previous.isAfter(datepicker.value.next)) {
                datepicker.value.previous = datepicker.value.next.subtract(1, 'month');
              }

              datepicker.value.year.previous = datepicker.value.previous.year();
            });
          },
          openYear: () => {
            panel.next.year = !panel.next.year;
            panel.next.month = false;
            panel.next.calendar = !panel.next.year;
          },
          setYear: ($event, asNext) => {
            if (asNext) {
              datepicker.value.next = next.year($event);
              panel.next.year = !panel.next.year;
              panel.next.month = false;
              panel.next.calendar = !panel.next.year;
              nextTick(() => {
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

    const useArray = () => Array.isArray(props.modelValue);

    const useObject = () => typeof props.modelValue === 'object';

    const asRange = () => {
      if (!props.useRange && !props.asSingle) {
        return true;
      } else if (!props.useRange && props.asSingle) {
        return false;
      } else if (props.useRange && !props.asSingle) {
        return true;
      } else return !!(props.useRange && props.asSingle);
    };

    const inRangeDate = date => {
      if (props.disableInRange) return false;
      if (pickerValue.value === '') return false;
      let s, e;

      if (useArray()) {
        const [start, end] = props.modelValue;
        s = start;
        e = end;
      } else if (useObject()) {
        if (props.modelValue) {
          const [start, end] = Object.values(props.modelValue);
          s = start;
          e = end;
        }
      } else {
        const [start, end] = props.modelValue.split(props.separator);
        s = start;
        e = end;
      }

      return date.isBetween(dayjs(s, props.formatter.date, true), dayjs(e, props.formatter.date, true), 'date', '[]');
    };

    const show = () => {
      isShow.value = true;
    };

    const hide = () => {
      isShow.value = false;
    };

    const force = () => {
      previous.value = null;
      next.value = null;
      hoverValue.value = [];
      selection.value = null;
    };

    const clearPicker = () => {
      pickerValue.value = '';

      if (useArray()) {
        emit('update:modelValue', []);
      } else if (useObject()) {
        const obj = {};
        const [start, end] = Object.keys(props.modelValue);
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


    const keyUp = () => {
      if (asRange()) {
        const [s, e] = pickerValue.value.split(props.separator);
        const [sd, ed] = [dayjs(s, props.formatter.date, true), dayjs(e, props.formatter.date, true)];

        if (sd.isValid() && ed.isValid()) {
          setDate(sd);
          setDate(ed);

          if (useArray()) {
            emit('update:modelValue', [s, e]);
          } else if (useObject()) {
            const obj = {};
            const [start, end] = Object.keys(props.modelValue);
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
        const d = dayjs(pickerValue.value, props.formatter.date, true);

        if (d.isValid()) {
          setDate(d);

          if (useArray()) {
            emit('update:modelValue', [pickerValue.value]);
          } else if (useObject()) {
            const obj = {};
            const [start] = Object.keys(props.modelValue);
            obj[start] = pickerValue.value;
            emit('update:modelValue', obj);
          } else {
            emit('update:modelValue', pickerValue.value);
          }
        }
      }
    };

    const setDate = (date, asNext) => {
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

            const [s, e] = pickerValue.value.split(props.separator);

            if (useArray()) {
              emit('update:modelValue', [dayjs(s, props.formatter.date, true).format(props.formatter.date), dayjs(e, props.formatter.date, true).format(props.formatter.date)]);
            } else if (useObject()) {
              const obj = {};
              const [start, end] = Object.keys(props.modelValue);
              obj[start] = s;
              obj[end] = e;
              emit('update:modelValue', obj);
            } else {
              emit('update:modelValue', useToValueFromArray({
                previous: dayjs(s, props.formatter.date, true),
                next: dayjs(e, props.formatter.date, true)
              }, props));
            }

            isShow.value = false;
            applyValue.value = [];

            if (!dayjs(s, props.formatter.date, true).isSame(dayjs(e, props.formatter.date, true), 'month')) {
              datepicker.value.previous = dayjs(s, props.formatter.date, true);
              datepicker.value.next = dayjs(e, props.formatter.date, true);
            }

            force();
          } else {
            if (previous.value.isAfter(date, 'month')) {
              applyValue.value = [date, previous.value];
            } else {
              applyValue.value = [previous.value, date];
            }

            const [s, e] = applyValue.value;

            if (!s.isSame(e, 'month')) {
              datepicker.value.previous = s;
              datepicker.value.next = e;
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
            const obj = {};
            const [start] = Object.keys(props.modelValue);
            obj[start] = pickerValue.value;
            emit('update:modelValue', obj);
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


    const setHours = function () {
    };

    const setMinutes = function () {
    };

    const setSeconds = function () {
    };

    const applyDate = () => {
      if (applyValue.value.length < 1) return false;
      let date;

      if (asRange()) {
        const [s, e] = applyValue.value;

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
        const [s] = applyValue.value;
        date = s;
      }

      if (asRange()) {
        const [s, e] = date.split(props.separator);

        if (useArray()) {
          emit('update:modelValue', [dayjs(s, props.formatter.date, true).format(props.formatter.date), dayjs(e, props.formatter.date, true).format(props.formatter.date)]);
        } else if (useObject()) {
          const obj = {};
          const [start, end] = Object.keys(props.modelValue);
          obj[start] = s;
          obj[end] = e;
          emit('update:modelValue', obj);
        } else {
          emit('update:modelValue', useToValueFromArray({
            previous: dayjs(s, props.formatter.date, true),
            next: dayjs(e, props.formatter.date, true)
          }, props));
        }

        pickerValue.value = date;
      } else {
        pickerValue.value = date.format(props.formatter.date);

        if (useArray()) {
          emit('update:modelValue', [pickerValue.value]);
        } else if (useObject()) {
          const obj = {};
          const [start] = Object.keys(props.modelValue);
          obj[start] = pickerValue.value;
          emit('update:modelValue', obj);
        } else {
          emit('update:modelValue', pickerValue.value);
        }
      }
    };

    const atMouseOver = date => {
      if (!asRange()) return false;

      if (previous.value) {
        hoverValue.value = [previous.value, date];
      } else {
        hoverValue.value = [];
        return false;
      }
    };

    const isBetweenRange = date => {
      if (previous.value && props.autoApply) return false;
      let s, e;

      if (hoverValue.value.length > 1) {
        const [start, end] = hoverValue.value;
        s = dayjs(start, props.formatter.date, true);
        e = dayjs(end, props.formatter.date, true);
      } else {
        if (useArray()) {
          if (props.autoApply) {
            const [start, end] = props.modelValue;
            s = start && dayjs(start, props.formatter.date, true);
            e = end && dayjs(end, props.formatter.date, true);
          } else {
            const [start, end] = applyValue.value;
            s = dayjs(start, props.formatter.date, true);
            e = dayjs(end, props.formatter.date, true);
          }
        } else if (useObject()) {
          if (props.autoApply) {
            if (props.modelValue) {
              const [start, end] = Object.values(props.modelValue);
              s = start && dayjs(start, props.formatter.date, true);
              e = end && dayjs(end, props.formatter.date, true);
            }
          } else {
            const [start, end] = applyValue.value;
            s = dayjs(start, props.formatter.date, true);
            e = dayjs(end, props.formatter.date, true);
          }
        } else {
          if (props.autoApply) {
            const [start, end] = props.modelValue ? props.modelValue.split(props.separator) : [false, false];
            s = start && dayjs(start, props.formatter.date, true);
            e = end && dayjs(end, props.formatter.date, true);
          } else {
            const [start, end] = applyValue.value;
            s = dayjs(start, props.formatter.date, true);
            e = dayjs(end, props.formatter.date, true);
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

    const datepickerClasses = date => {
      const {
        today,
        active,
        off,
        disabled
      } = date;
      let classes, s, e;

      if (asRange()) {
        if (useArray()) {
          if (selection.value) {
            const [start, end] = hoverValue.value;
            s = start && dayjs(start, props.formatter.date, true);
            e = end && dayjs(end, props.formatter.date, true);
          } else {
            if (props.autoApply) {
              const [start, end] = props.modelValue;
              s = start && dayjs(start, props.formatter.date, true);
              e = end && dayjs(end, props.formatter.date, true);
            } else {
              const [start, end] = applyValue.value;
              s = start && dayjs(start, props.formatter.date, true);
              e = end && dayjs(end, props.formatter.date, true);
            }
          }
        } else if (useObject()) {
          if (selection.value) {
            const [start, end] = hoverValue.value;
            s = start && dayjs(start, props.formatter.date, true);
            e = end && dayjs(end, props.formatter.date, true);
          } else {
            if (props.autoApply) {
              const [start, end] = props.modelValue ? Object.values(props.modelValue) : [false, false];
              s = start && dayjs(start, props.formatter.date, true);
              e = end && dayjs(end, props.formatter.date, true);
            } else {
              const [start, end] = applyValue.value;
              s = start && dayjs(start, props.formatter.date, true);
              e = end && dayjs(end, props.formatter.date, true);
            }
          }
        } else {
          if (selection.value) {
            const [start, end] = hoverValue.value;
            s = start && dayjs(start, props.formatter.date, true);
            e = end && dayjs(end, props.formatter.date, true);
          } else {
            if (props.autoApply) {
              const [start, end] = props.modelValue ? props.modelValue.split(props.separator) : [false, false];
              s = start && dayjs(start, props.formatter.date, true);
              e = end && dayjs(end, props.formatter.date, true);
            } else {
              const [start, end] = applyValue.value;
              s = start && dayjs(start, props.formatter.date, true);
              e = end && dayjs(end, props.formatter.date, true);
            }
          }
        }
      } else {
        if (useArray()) {
          if (props.autoApply) {
            if (props.modelValue.length > 0) {
              const [start] = props.modelValue;
              s = dayjs(start, props.formatter.date, true);
            }
          } else {
            const [start] = applyValue.value;
            s = start && dayjs(start, props.formatter.date, true);
          }
        } else if (useObject()) {
          if (props.autoApply) {
            if (props.modelValue) {
              const [start] = Object.values(props.modelValue);
              s = dayjs(start, props.formatter.date, true);
            }
          } else {
            const [start] = applyValue.value;
            s = start && dayjs(start, props.formatter.date, true);
          }
        } else {
          if (props.autoApply) {
            if (props.modelValue) {
              const [start] = props.modelValue.split(props.separator);
              s = dayjs(start, props.formatter.date, true);
            }
          } else {
            const [start] = applyValue.value;
            s = start && dayjs(start, props.formatter.date, true);
          }
        }
      }

      if (active) {
        classes = today ? `text-litepie-primary-500 font-semibold dark:text-litepie-primary-400 rounded-full` : disabled ? `text-litepie-secondary-600 font-normal disabled:text-litepie-secondary-500 disabled:cursor-not-allowed rounded-full` : date.isBetween(s, e, 'date', '()') ? `text-litepie-secondary-700 font-medium dark:text-litepie-secondary-100 rounded-full` : `text-litepie-secondary-600 font-medium dark:text-litepie-secondary-200 rounded-full`;
      }

      if (off) {
        classes = `text-litepie-secondary-400 font-light disabled:cursor-not-allowed`;
      }

      if (s && e && !off) {
        if (date.isSame(s, 'date')) {
          classes = e.isAfter(s, 'date') ? 'bg-litepie-primary-500 text-white font-bold rounded-l-full disabled:cursor-not-allowed' : 'bg-litepie-primary-500 text-white font-bold rounded-r-full disabled:cursor-not-allowed';

          if (s.isSame(e, 'date')) {
            classes = `bg-litepie-primary-500 text-white font-bold rounded-full disabled:cursor-not-allowed`;
          }
        }

        if (date.isSame(e, 'date')) {
          classes = e.isAfter(s, 'date') ? 'bg-litepie-primary-500 text-white font-bold rounded-r-full disabled:cursor-not-allowed' : 'bg-litepie-primary-500 text-white font-bold rounded-l-full disabled:cursor-not-allowed';

          if (s.isSame(e, 'date')) {
            classes = `bg-litepie-primary-500 text-white font-bold rounded-full disabled:cursor-not-allowed`;
          }
        }
      } else if (s) {
        if (date.isSame(s, 'date') && !off) {
          classes = `bg-litepie-primary-500 text-white font-bold rounded-full disabled:cursor-not-allowed`;
        }
      }

      return classes;
    };

    const betweenRangeClasses = date => {
      let classes, s, e;
      classes = '';
      if (!asRange()) return classes;

      if (useArray()) {
        if (hoverValue.value.length > 1) {
          const [start, end] = hoverValue.value;
          s = start && dayjs(start, props.formatter.date, true);
          e = end && dayjs(end, props.formatter.date, true);
        } else {
          if (props.autoApply) {
            const [start, end] = props.modelValue;
            s = start && dayjs(start, props.formatter.date, true);
            e = end && dayjs(end, props.formatter.date, true);
          } else {
            const [start, end] = applyValue.value;
            s = start && dayjs(start, props.formatter.date, true);
            e = end && dayjs(end, props.formatter.date, true);
          }
        }
      } else if (useObject()) {
        if (hoverValue.value.length > 1) {
          const [start, end] = hoverValue.value;
          s = start && dayjs(start, props.formatter.date, true);
          e = end && dayjs(end, props.formatter.date, true);
        } else {
          if (props.autoApply) {
            if (props.modelValue) {
              const [start, end] = Object.values(props.modelValue);
              s = start && dayjs(start, props.formatter.date, true);
              e = end && dayjs(end, props.formatter.date, true);
            }
          } else {
            const [start, end] = applyValue.value;
            s = start && dayjs(start, props.formatter.date, true);
            e = end && dayjs(end, props.formatter.date, true);
          }
        }
      } else {
        if (hoverValue.value.length > 1) {
          const [start, end] = hoverValue.value;
          s = start && dayjs(start, props.formatter.date, true);
          e = end && dayjs(end, props.formatter.date, true);
        } else {
          if (props.autoApply) {
            const [start, end] = props.modelValue ? props.modelValue.split(props.separator) : [false, false];
            s = start && dayjs(start, props.formatter.date, true);
            e = end && dayjs(end, props.formatter.date, true);
          } else {
            const [start, end] = applyValue.value;
            s = start && dayjs(start, props.formatter.date, true);
            e = end && dayjs(end, props.formatter.date, true);
          }
        }
      }

      if (s && e) {
        if (date.isSame(s, 'date')) {
          if (e.isBefore(s)) {
            classes += ` rounded-r-full inset-0`;
          }

          if (s.isBefore(e)) {
            classes += ` rounded-l-full inset-0`;
          }
        } else if (date.isSame(e, 'date')) {
          if (e.isBefore(s)) {
            classes += ` rounded-l-full inset-0`;
          }

          if (s.isBefore(e)) {
            classes += ` rounded-r-full inset-0`;
          }
        } else {
          classes += ` inset-0`;
        }
      }

      return classes;
    };

    const forceEmit = (s, e) => {
      datepicker.value.previous = dayjs(s, props.formatter.date, true);
      datepicker.value.next = dayjs(e, props.formatter.date, true);

      if (dayjs.duration(datepicker.value.next.diff(datepicker.value.previous)).$d.months === 2 || dayjs.duration(datepicker.value.next.diff(datepicker.value.previous)).$d.months === 1 && dayjs.duration(datepicker.value.next.diff(datepicker.value.previous)).$d.days === 7) {
        datepicker.value.next = datepicker.value.next.subtract(1, 'month');
      }

      if (datepicker.value.next.isSame(datepicker.value.previous, 'month') || datepicker.value.next.isBefore(datepicker.value.previous)) {
        datepicker.value.next = datepicker.value.previous.add(1, 'month');
      }
    };

    const emitShortcut = (s, e) => {
      if (asRange()) {
        if (props.autoApply) {
          if (useArray()) {
            emit('update:modelValue', [s, e]);
          } else if (useObject()) {
            const obj = {};
            const [start, end] = Object.keys(props.modelValue);
            obj[start] = s;
            obj[end] = e;
            emit('update:modelValue', obj);
          } else {
            emit('update:modelValue', useToValueFromArray({
              previous: dayjs(s, props.formatter.date, true),
              next: dayjs(e, props.formatter.date, true)
            }, props));
          }

          pickerValue.value = `${s}${props.separator}${e}`;
        } else {
          applyValue.value = [dayjs(s, props.formatter.date, true), dayjs(e, props.formatter.date, true)];
        }
      } else {
        if (props.autoApply) {
          if (useArray()) {
            emit('update:modelValue', [s]);
          } else if (useObject()) {
            const obj = {};
            const [start] = Object.keys(props.modelValue);
            obj[start] = s;
            emit('update:modelValue', obj);
          } else {
            emit('update:modelValue', s);
          }

          pickerValue.value = s;
        } else {
          applyValue.value = [dayjs(s, props.formatter.date, true), dayjs(e, props.formatter.date, true)];
        }
      }

      forceEmit(s, e);
    };

    const setToToday = () => {
      const s = dayjs().format(props.formatter.date);
      const e = dayjs().format(props.formatter.date);
      emitShortcut(s, e);
    };

    const setToYesterday = () => {
      const s = dayjs().subtract(1, 'day').format(props.formatter.date);
      const e = dayjs().subtract(1, 'day').format(props.formatter.date);
      emitShortcut(s, e);
    };

    const setToLastDay = day => {
      const s = dayjs().subtract(day - 1, 'day').format(props.formatter.date);
      const e = dayjs().format(props.formatter.date);
      emitShortcut(s, e);
    };

    const setToThisMonth = () => {
      const s = dayjs().date(1).format(props.formatter.date);
      const e = dayjs().date(dayjs().daysInMonth()).format(props.formatter.date);
      emitShortcut(s, e);
    };

    const setToLastMonth = () => {
      const s = dayjs().date(1).subtract(1, 'month').format(props.formatter.date);
      const e = dayjs().date(0).format(props.formatter.date);
      emitShortcut(s, e);
    };

    const setToCustomShortcut = item => {
      let s, e;
      const [d, dd] = item.atClick();
      s = dayjs(d).format(props.formatter.date);
      e = dayjs(dd).format(props.formatter.date);
      emitShortcut(s, e);
    };

    watch(() => isShow.value, () => {
      nextTick(() => {
        placement.value = useVisibleViewport(LitepieRef.value);
      });
    });
    watch(() => applyValue.value, newValue => {
      if (newValue.length > 0) {
        panel.previous.calendar = true;
        panel.previous.month = false;
        panel.previous.year = false;
        panel.next.calendar = true;
        panel.next.month = false;
        panel.next.year = false;
      }
    });
    watchEffect(() => {
      if (!props.placeholder) {
        if (asRange()) {
          givenPlaceholder.value = `${props.formatter.date}${props.separator}${props.formatter.date}`;
        } else {
          givenPlaceholder.value = props.formatter.date;
        }
      } else {
        givenPlaceholder.value = props.placeholder;
      }
    });
    watchEffect(() => {
      const locale = props.i18n;
      nextTick(() => {
        __variableDynamicImportRuntime0__(`./locale/${locale}.js`).then(() => {
          dayjs.locale(locale);
          let s, e;

          if (asRange()) {
            if (useArray()) {
              if (props.modelValue.length > 0) {
                const [start, end] = props.modelValue;
                s = dayjs(start, props.formatter.date, true);
                e = dayjs(end, props.formatter.date, true);
              }
            } else if (useObject()) {
              if (!isProxy(props.modelValue)) {
                try {
                  console.log(Object.keys(props.modelValue));
                } catch (e) {
                  console.warn('[Litepie Datepicker]: It looks like you want to use Object as the argument %cv-model', 'font-style: italic; color: #42b883;', ', but you pass it undefined or null.');
                  console.warn(`[Litepie Datepicker]: We has replace with %c{ startDate: '', endDate: '' }`, 'font-style: italic; color: #42b883;', ', but you can replace manually.');
                  emit('update:modelValue', {
                    startDate: '',
                    endDate: ''
                  });
                }
              }

              if (props.modelValue) {
                const [start, end] = Object.values(props.modelValue);
                s = start && dayjs(start, props.formatter.date, true);
                e = end && dayjs(end, props.formatter.date, true);
              }
            } else {
              if (props.modelValue) {
                const [start, end] = props.modelValue.split(props.separator);
                s = dayjs(start, props.formatter.date, true);
                e = dayjs(end, props.formatter.date, true);
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
              datepicker.value.previous = dayjs(props.startFrom);
              datepicker.value.next = dayjs(props.startFrom).add(1, 'month');
              datepicker.value.year.previous = datepicker.value.previous.year();
              datepicker.value.year.next = datepicker.value.next.year();
            }
          } else {
            if (useArray()) {
              if (props.modelValue.length > 0) {
                const [start] = props.modelValue;
                s = dayjs(start, props.formatter.date, true);
              }
            } else if (useObject()) {
              if (props.modelValue) {
                const [start] = Object.values(props.modelValue);
                s = dayjs(start, props.formatter.date, true);
              }
            } else {
              if (props.modelValue.length) {
                const [start] = props.modelValue.split(props.separator);
                s = dayjs(start, props.formatter.date, true);
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
              datepicker.value.previous = dayjs(props.startFrom);
              datepicker.value.next = dayjs(props.startFrom).add(1, 'month');
              datepicker.value.year.previous = datepicker.value.previous.year();
              datepicker.value.year.next = datepicker.value.next.year();
            }
          }

          datepicker.value.weeks = dayjs.weekdaysShort();
          datepicker.value.months = props.formatter.month === 'MMM' ? dayjs.monthsShort() : dayjs.months();
        }).catch(() => {
          console.warn(`[Litepie Datepicker]: List of supported locales https://github.com/iamkun/dayjs/tree/dev/src/locale`);
        });
      });
    });
    provide('isBetweenRange', isBetweenRange);
    provide('betweenRangeClasses', betweenRangeClasses);
    provide('datepickerClasses', datepickerClasses);
    provide('atMouseOver', atMouseOver);
    provide('setToToday', setToToday);
    provide('setToYesterday', setToYesterday);
    provide('setToLastDay', setToLastDay);
    provide('setToThisMonth', setToThisMonth);
    provide('setToLastMonth', setToLastMonth);
    provide('setToCustomShortcut', setToCustomShortcut);
    return {
      LitepieRef,
      LitepieDatepickerRef,
      LitepieInputRef,
      isShow,
      placement,
      givenPlaceholder,
      previous,
      next,
      panel,
      pickerValue,
      hoverValue,
      applyValue,
      datepicker,
      calendar,
      weeks,
      months,
      asRange,
      show,
      hide,
      keyUp,
      setDate,
      setHours,
      setMinutes,
      setSeconds,
      applyDate,
      clearPicker
    };
  }

});

const _hoisted_1 = {
  class: "relative block"
};
const _hoisted_2 = ["placeholder"];
const _hoisted_3 = {
  class: "absolute inset-y-0 right-0 inline-flex items-center rounded-md overflow-hidden"
};
const _hoisted_4 = {
  class: "w-5 h-5",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_5 = {
  key: 0,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "1.5",
  d: "M6 18L18 6M6 6l12 12"
};
const _hoisted_6 = {
  key: 1,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "1.5",
  d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
};
const _hoisted_7 = {
  class: "fixed inset-0 z-50 overflow-y-auto sm:overflow-visible sm:static sm:z-auto bg-white dark:bg-litepie-secondary-800 sm:rounded-lg shadow-sm"
};
const _hoisted_8 = {
  class: "flex flex-wrap lg:flex-nowrap"
};
const _hoisted_9 = {
  class: "relative flex flex-wrap sm:flex-nowrap p-1"
};
const _hoisted_10 = {
  key: 0,
  class: "hidden absolute inset-0 sm:flex justify-center items-center"
};

const _hoisted_11 = /*#__PURE__*/createElementVNode("div", {
  class: "w-8 sm:w-1 h-1 sm:h-8 bg-litepie-primary-500 rounded-xl shadow-inner"
}, null, -1);

const _hoisted_12 = [_hoisted_11];
const _hoisted_13 = {
  class: "px-0.5 sm:px-2"
};
const _hoisted_14 = {
  key: 1,
  class: "relative w-full sm:w-80 overflow-hidden mt-3 sm:mt-0 sm:ml-2"
};
const _hoisted_15 = {
  class: "px-0.5 sm:px-2"
};
const _hoisted_16 = {
  key: 0
};
const _hoisted_17 = {
  class: "mt-2 mx-2 py-1.5 border-t border-black/[.1] dark:border-litepie-secondary-700/[1]"
};
const _hoisted_18 = {
  class: "mt-1.5 sm:flex sm:flex-row-reverse"
};
const _hoisted_19 = ["disabled", "textContent"];
const _hoisted_20 = ["textContent"];
const _hoisted_21 = {
  key: 1,
  class: "sm:hidden"
};
const _hoisted_22 = {
  class: "mt-2 mx-2 py-1.5 border-t border-black/[.1] dark:border-litepie-secondary-700/[1]"
};
const _hoisted_23 = {
  class: "mt-1.5 sm:flex sm:flex-row-reverse"
};
const _hoisted_24 = ["textContent"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_litepie_shortcut = resolveComponent("litepie-shortcut");

  const _component_litepie_header = resolveComponent("litepie-header");

  const _component_litepie_month = resolveComponent("litepie-month");

  const _component_litepie_year = resolveComponent("litepie-year");

  const _component_litepie_week = resolveComponent("litepie-week");

  const _component_litepie_calendar = resolveComponent("litepie-calendar");

  const _directive_litepie = resolveDirective("litepie");

  return withDirectives((openBlock(), createElementBlock("div", {
    id: "litepie",
    ref: "LitepieDatepickerRef",
    class: normalizeClass(["relative w-full", [{
      'litepie-datepicker-overlay': _ctx.overlay
    }, {
      open: _ctx.isShow && _ctx.overlay
    }]])
  }, [renderSlot(_ctx.$slots, "default", {
    value: _ctx.pickerValue,
    placeholder: _ctx.givenPlaceholder,
    clear: _ctx.clearPicker
  }, () => [createElementVNode("label", _hoisted_1, [withDirectives(createElementVNode("input", mergeProps({
    ref: "LitepieInputRef",
    type: "text",
    class: "relative block w-full pl-3 pr-12 py-2.5 rounded-lg overflow-hidden text-sm text-litepie-secondary-700 placeholder-litepie-secondary-400 transition-colors bg-white border border-litepie-secondary-300 focus:border-litepie-primary-300 focus:ring focus:ring-litepie-primary-500 focus:ring-opacity-10 focus:outline-none dark:bg-litepie-secondary-800 dark:border-litepie-secondary-700 dark:text-litepie-secondary-100 dark:placeholder-litepie-secondary-500 dark:focus:border-litepie-primary-500 dark:focus:ring-opacity-20"
  }, _ctx.$attrs, {
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => _ctx.pickerValue = $event),
    placeholder: _ctx.givenPlaceholder,
    onKeyup: _cache[1] || (_cache[1] = function () {
      return _ctx.keyUp && _ctx.keyUp(...arguments);
    })
  }), null, 16, _hoisted_2), [[vModelText, _ctx.pickerValue]]), createElementVNode("span", _hoisted_3, [createElementVNode("button", {
    type: "button",
    class: "px-2 py-1 mr-1 focus:outline-none text-litepie-secondary-400 dark:text-opacity-70 rounded-md",
    onClick: _cache[2] || (_cache[2] = $event => _ctx.pickerValue ? _ctx.clearPicker() : _ctx.$refs.LitepieInputRef.focus())
  }, [(openBlock(), createElementBlock("svg", _hoisted_4, [_ctx.pickerValue ? (openBlock(), createElementBlock("path", _hoisted_5)) : (openBlock(), createElementBlock("path", _hoisted_6))]))])])])]), createVNode(Transition, {
    "enter-from-class": "opacity-0 translate-y-3",
    "enter-to-class": "opacity-100 translate-y-0",
    "enter-active-class": "transform transition ease-out duration-200",
    "leave-active-class": "transform transition ease-in duration-150",
    "leave-from-class": "opacity-100 translate-y-0",
    "leave-to-class": "opacity-0 translate-y-3"
  }, {
    default: withCtx(() => [withDirectives(createElementVNode("div", {
      ref: "LitepieRef",
      class: normalizeClass(["absolute z-50 top-full sm:mt-2.5", _ctx.placement ? 'left-0 right-auto' : 'left-auto right-0'])
    }, [createElementVNode("div", _hoisted_7, [createElementVNode("div", {
      class: normalizeClass(["litepie-datepicker static sm:relative w-full bg-white sm:rounded-lg sm:shadow-sm border-0 sm:border border-black/[.1] px-3 py-3 sm:px-1 sm:py-1.5 dark:bg-litepie-secondary-800 dark:border-litepie-secondary-700/[1]", _ctx.placement ? 'place-left' : 'place-right'])
    }, [createElementVNode("div", _hoisted_8, [_ctx.shortcuts ? (openBlock(), createBlock(_component_litepie_shortcut, {
      key: 0,
      shortcuts: _ctx.shortcuts,
      "as-range": _ctx.asRange(),
      "as-single": _ctx.asSingle,
      i18n: _ctx.options.shortcuts
    }, null, 8, ["shortcuts", "as-range", "as-single", "i18n"])) : createCommentVNode("", true), createElementVNode("div", _hoisted_9, [_ctx.asRange() && !_ctx.asSingle ? (openBlock(), createElementBlock("div", _hoisted_10, _hoisted_12)) : createCommentVNode("", true), createElementVNode("div", {
      class: normalizeClass(["relative w-full sm:w-80", {
        'mb-3 sm:mb-0 sm:mr-2': _ctx.asRange() && !_ctx.asSingle
      }])
    }, [createVNode(_component_litepie_header, {
      panel: _ctx.panel.previous,
      calendar: _ctx.calendar.previous
    }, null, 8, ["panel", "calendar"]), createElementVNode("div", _hoisted_13, [withDirectives(createVNode(_component_litepie_month, {
      months: _ctx.months,
      "onUpdate:month": _ctx.calendar.previous.setMount
    }, null, 8, ["months", "onUpdate:month"]), [[vShow, _ctx.panel.previous.month]]), withDirectives(createVNode(_component_litepie_year, {
      years: _ctx.calendar.previous.years(),
      "onUpdate:year": _ctx.calendar.previous.setYear
    }, null, 8, ["years", "onUpdate:year"]), [[vShow, _ctx.panel.previous.year]]), withDirectives(createElementVNode("div", null, [createVNode(_component_litepie_week, {
      weeks: _ctx.weeks
    }, null, 8, ["weeks"]), createVNode(_component_litepie_calendar, {
      calendar: _ctx.calendar.previous,
      weeks: _ctx.weeks,
      "as-range": _ctx.asRange(),
      "onUpdate:date": _ctx.setDate
    }, null, 8, ["calendar", "weeks", "as-range", "onUpdate:date"])], 512), [[vShow, _ctx.panel.previous.calendar]])])], 2), _ctx.asRange() && !_ctx.asSingle ? (openBlock(), createElementBlock("div", _hoisted_14, [createVNode(_component_litepie_header, {
      "as-prev-or-next": "",
      panel: _ctx.panel.next,
      calendar: _ctx.calendar.next
    }, null, 8, ["panel", "calendar"]), createElementVNode("div", _hoisted_15, [withDirectives(createVNode(_component_litepie_month, {
      months: _ctx.months,
      "onUpdate:month": _ctx.calendar.next.setMount
    }, null, 8, ["months", "onUpdate:month"]), [[vShow, _ctx.panel.next.month]]), withDirectives(createVNode(_component_litepie_year, {
      "as-prev-or-next": "",
      years: _ctx.calendar.next.years(),
      "onUpdate:year": _ctx.calendar.next.setYear
    }, null, 8, ["years", "onUpdate:year"]), [[vShow, _ctx.panel.next.year]]), withDirectives(createElementVNode("div", null, [createVNode(_component_litepie_week, {
      weeks: _ctx.weeks
    }, null, 8, ["weeks"]), createVNode(_component_litepie_calendar, {
      "as-prev-or-next": "",
      calendar: _ctx.calendar.next,
      weeks: _ctx.weeks,
      "as-range": _ctx.asRange(),
      "onUpdate:date": _ctx.setDate
    }, null, 8, ["calendar", "weeks", "as-range", "onUpdate:date"])], 512), [[vShow, _ctx.panel.next.calendar]])])])) : createCommentVNode("", true)])]), !_ctx.autoApply ? (openBlock(), createElementBlock("div", _hoisted_16, [createElementVNode("div", _hoisted_17, [createElementVNode("div", _hoisted_18, [createElementVNode("button", {
      type: "button",
      class: "away-apply-picker w-full transition ease-out duration-300 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-litepie-primary-600 text-base font-medium text-white hover:bg-litepie-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-litepie-primary-500 sm:ml-3 sm:w-auto sm:text-sm dark:ring-offset-litepie-secondary-800 disabled:cursor-not-allowed",
      disabled: _ctx.asSingle ? _ctx.applyValue.length < 1 : _ctx.applyValue.length < 2,
      onClick: _cache[3] || (_cache[3] = function () {
        return _ctx.applyDate && _ctx.applyDate(...arguments);
      }),
      textContent: toDisplayString(_ctx.options.footer.apply)
    }, null, 8, _hoisted_19), createElementVNode("button", {
      type: "button",
      class: "mt-3 away-cancel-picker w-full transition ease-out duration-300 inline-flex justify-center rounded-md border border-litepie-secondary-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-litepie-secondary-700 hover:bg-litepie-secondary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-litepie-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm dark:ring-offset-litepie-secondary-800",
      textContent: toDisplayString(_ctx.options.footer.cancel)
    }, null, 8, _hoisted_20)])])])) : (openBlock(), createElementBlock("div", _hoisted_21, [createElementVNode("div", _hoisted_22, [createElementVNode("div", _hoisted_23, [createElementVNode("button", {
      type: "button",
      class: "away-cancel-picker w-full transition ease-out duration-300 inline-flex justify-center rounded-md border border-litepie-secondary-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-litepie-secondary-700 hover:bg-litepie-secondary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-litepie-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm dark:ring-offset-litepie-secondary-800",
      textContent: toDisplayString(_ctx.options.footer.cancel)
    }, null, 8, _hoisted_24)])])]))], 2)])], 2), [[vShow, _ctx.isShow]])]),
    _: 1
  })], 2)), [[_directive_litepie, _ctx.trigger, "away"]]);
}

function styleInject(css, ref) {
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
}

var css_248z = "\n.litepie-datepicker-overlay::before {\n  content: '';\n  position: fixed;\n  top: 0px;\n  right: 0px;\n  bottom: 0px;\n  left: 0px;\n  display: none;\n  --tw-bg-opacity: 1;\n  background-color: rgba(0, 0, 0, var(--tw-bg-opacity));\n  opacity: 0;\n  transition-property: opacity;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 150ms;\n  transition-duration: 200ms;\n  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);\n}\n.litepie-datepicker-overlay.open::before {\n  display: block;\n  opacity: 0.5;\n}\n.litepie-datepicker::before {\n  --litepie-datepicker: 0px;\n  content: '';\n  position: absolute;\n  top: 0px;\n  height: 1rem;\n  width: 1rem;\n  border-width: 1px;\n  border-color: rgba(0, 0, 0, .1);\n  --tw-bg-opacity: 1;\n  background-color: rgba(255, 255, 255, var(--tw-bg-opacity));\n  --tw-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n.dark .litepie-datepicker::before {\n  --tw-border-opacity: 1;\n  border-color: rgba(55, 65, 81, var(--tw-border-opacity));\n  --tw-bg-opacity: 1;\n  background-color: rgba(31, 41, 55, var(--tw-bg-opacity));\n}\n.litepie-datepicker::before {\n  transform: translate(50%, -50%) rotate(-45deg);\n  -webkit-clip-path: polygon(\n    calc(var(--litepie-datepicker) * -1) calc(var(--litepie-datepicker) * -1),\n    calc(100% + var(--litepie-datepicker)) calc(var(--litepie-datepicker) * -1),\n    calc(100% + var(--litepie-datepicker))\n      calc(100% + var(--litepie-datepicker))\n  );\n          clip-path: polygon(\n    calc(var(--litepie-datepicker) * -1) calc(var(--litepie-datepicker) * -1),\n    calc(100% + var(--litepie-datepicker)) calc(var(--litepie-datepicker) * -1),\n    calc(100% + var(--litepie-datepicker))\n      calc(100% + var(--litepie-datepicker))\n  );\n}\n.litepie-datepicker.place-left::before {\n  left: 0.25rem;\n}\n.litepie-datepicker.place-right::before {\n  right: 1.25rem;\n}\n";
styleInject(css_248z);

script.render = render;

// Import vue component
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),

var entry_esm = /*#__PURE__*/(() => {
  // Get component instance
  const installable = script; // Attach install function executed by Vue.use()

  installable.install = app => {
    app.component('LitepieDatepicker', installable);
  };

  return installable;
})(); // It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;

export { entry_esm as default };
