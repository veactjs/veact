import { watch as sr, isRef as Kr, isReactive as Gr, ref as Xr, shallowRef as Hr, customRef as Zr, reactive as Qr, shallowReactive as et, readonly as rt, shallowReadonly as tt, computed as nt, effectScope as it } from "@vue/reactivity";
export * from "@vue/reactivity";
import { watch as vn } from "@vue/reactivity";
import or, { useRef as ie, useEffect as De, useCallback as be, useReducer as at, useMemo as st, useState as L } from "react";
/*!
 * veact v1.0.0
 * https://github.com/veactjs/veact
 *
 * Includes @vue/reactivity
 * https://github.com/vuejs/core/tree/main/packages/reactivity
 *
 * (c) 2021-present Surmon and Veact contributors.
 * Released under the MIT License.
 *
 * Date: 2024-09-18T12:50:21.310Z
 */
var $ = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Ce = { exports: {} }, he = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var nr;
function ot() {
  if (nr) return he;
  nr = 1;
  var r = or, t = Symbol.for("react.element"), e = Symbol.for("react.fragment"), i = Object.prototype.hasOwnProperty, s = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, a = { key: !0, ref: !0, __self: !0, __source: !0 };
  function o(l, f, h) {
    var d, g = {}, p = null, m = null;
    h !== void 0 && (p = "" + h), f.key !== void 0 && (p = "" + f.key), f.ref !== void 0 && (m = f.ref);
    for (d in f) i.call(f, d) && !a.hasOwnProperty(d) && (g[d] = f[d]);
    if (l && l.defaultProps) for (d in f = l.defaultProps, f) g[d] === void 0 && (g[d] = f[d]);
    return { $$typeof: t, type: l, key: p, ref: m, props: g, _owner: s.current };
  }
  return he.Fragment = e, he.jsx = o, he.jsxs = o, he;
}
var ve = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ir;
function ut() {
  return ir || (ir = 1, process.env.NODE_ENV !== "production" && function() {
    var r = or, t = Symbol.for("react.element"), e = Symbol.for("react.portal"), i = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), o = Symbol.for("react.provider"), l = Symbol.for("react.context"), f = Symbol.for("react.forward_ref"), h = Symbol.for("react.suspense"), d = Symbol.for("react.suspense_list"), g = Symbol.for("react.memo"), p = Symbol.for("react.lazy"), m = Symbol.for("react.offscreen"), A = Symbol.iterator, Y = "@@iterator";
    function J(n) {
      if (n === null || typeof n != "object")
        return null;
      var u = A && n[A] || n[Y];
      return typeof u == "function" ? u : null;
    }
    var x = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function k(n) {
      {
        for (var u = arguments.length, v = new Array(u > 1 ? u - 1 : 0), y = 1; y < u; y++)
          v[y - 1] = arguments[y];
        we("error", n, v);
      }
    }
    function we(n, u, v) {
      {
        var y = x.ReactDebugCurrentFrame, R = y.getStackAddendum();
        R !== "" && (u += "%s", v = v.concat([R]));
        var E = v.map(function(w) {
          return String(w);
        });
        E.unshift("Warning: " + u), Function.prototype.apply.call(console[n], console, E);
      }
    }
    var q = !1, _ = !1, B = !1, O = !1, Z = !1, oe;
    oe = Symbol.for("react.module.reference");
    function W(n) {
      return !!(typeof n == "string" || typeof n == "function" || n === i || n === a || Z || n === s || n === h || n === d || O || n === m || q || _ || B || typeof n == "object" && n !== null && (n.$$typeof === p || n.$$typeof === g || n.$$typeof === o || n.$$typeof === l || n.$$typeof === f || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      n.$$typeof === oe || n.getModuleId !== void 0));
    }
    function ue(n, u, v) {
      var y = n.displayName;
      if (y)
        return y;
      var R = u.displayName || u.name || "";
      return R !== "" ? v + "(" + R + ")" : v;
    }
    function fe(n) {
      return n.displayName || "Context";
    }
    function M(n) {
      if (n == null)
        return null;
      if (typeof n.tag == "number" && k("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof n == "function")
        return n.displayName || n.name || null;
      if (typeof n == "string")
        return n;
      switch (n) {
        case i:
          return "Fragment";
        case e:
          return "Portal";
        case a:
          return "Profiler";
        case s:
          return "StrictMode";
        case h:
          return "Suspense";
        case d:
          return "SuspenseList";
      }
      if (typeof n == "object")
        switch (n.$$typeof) {
          case l:
            var u = n;
            return fe(u) + ".Consumer";
          case o:
            var v = n;
            return fe(v._context) + ".Provider";
          case f:
            return ue(n, n.render, "ForwardRef");
          case g:
            var y = n.displayName || null;
            return y !== null ? y : M(n.type) || "Memo";
          case p: {
            var R = n, E = R._payload, w = R._init;
            try {
              return M(w(E));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var F = Object.assign, K = 0, Q, G, X, H, de, ze, Ye;
    function qe() {
    }
    qe.__reactDisabledLog = !0;
    function wr() {
      {
        if (K === 0) {
          Q = console.log, G = console.info, X = console.warn, H = console.error, de = console.group, ze = console.groupCollapsed, Ye = console.groupEnd;
          var n = {
            configurable: !0,
            enumerable: !0,
            value: qe,
            writable: !0
          };
          Object.defineProperties(console, {
            info: n,
            log: n,
            warn: n,
            error: n,
            group: n,
            groupCollapsed: n,
            groupEnd: n
          });
        }
        K++;
      }
    }
    function Rr() {
      {
        if (K--, K === 0) {
          var n = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: F({}, n, {
              value: Q
            }),
            info: F({}, n, {
              value: G
            }),
            warn: F({}, n, {
              value: X
            }),
            error: F({}, n, {
              value: H
            }),
            group: F({}, n, {
              value: de
            }),
            groupCollapsed: F({}, n, {
              value: ze
            }),
            groupEnd: F({}, n, {
              value: Ye
            })
          });
        }
        K < 0 && k("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Re = x.ReactCurrentDispatcher, Ee;
    function ye(n, u, v) {
      {
        if (Ee === void 0)
          try {
            throw Error();
          } catch (R) {
            var y = R.stack.trim().match(/\n( *(at )?)/);
            Ee = y && y[1] || "";
          }
        return `
` + Ee + n;
      }
    }
    var Oe = !1, pe;
    {
      var Er = typeof WeakMap == "function" ? WeakMap : Map;
      pe = new Er();
    }
    function Be(n, u) {
      if (!n || Oe)
        return "";
      {
        var v = pe.get(n);
        if (v !== void 0)
          return v;
      }
      var y;
      Oe = !0;
      var R = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var E;
      E = Re.current, Re.current = null, wr();
      try {
        if (u) {
          var w = function() {
            throw Error();
          };
          if (Object.defineProperty(w.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(w, []);
            } catch (I) {
              y = I;
            }
            Reflect.construct(n, [], w);
          } else {
            try {
              w.call();
            } catch (I) {
              y = I;
            }
            n.call(w.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (I) {
            y = I;
          }
          n();
        }
      } catch (I) {
        if (I && y && typeof I.stack == "string") {
          for (var b = I.stack.split(`
`), D = y.stack.split(`
`), T = b.length - 1, j = D.length - 1; T >= 1 && j >= 0 && b[T] !== D[j]; )
            j--;
          for (; T >= 1 && j >= 0; T--, j--)
            if (b[T] !== D[j]) {
              if (T !== 1 || j !== 1)
                do
                  if (T--, j--, j < 0 || b[T] !== D[j]) {
                    var U = `
` + b[T].replace(" at new ", " at ");
                    return n.displayName && U.includes("<anonymous>") && (U = U.replace("<anonymous>", n.displayName)), typeof n == "function" && pe.set(n, U), U;
                  }
                while (T >= 1 && j >= 0);
              break;
            }
        }
      } finally {
        Oe = !1, Re.current = E, Rr(), Error.prepareStackTrace = R;
      }
      var ne = n ? n.displayName || n.name : "", ee = ne ? ye(ne) : "";
      return typeof n == "function" && pe.set(n, ee), ee;
    }
    function Or(n, u, v) {
      return Be(n, !1);
    }
    function xr(n) {
      var u = n.prototype;
      return !!(u && u.isReactComponent);
    }
    function _e(n, u, v) {
      if (n == null)
        return "";
      if (typeof n == "function")
        return Be(n, xr(n));
      if (typeof n == "string")
        return ye(n);
      switch (n) {
        case h:
          return ye("Suspense");
        case d:
          return ye("SuspenseList");
      }
      if (typeof n == "object")
        switch (n.$$typeof) {
          case f:
            return Or(n.render);
          case g:
            return _e(n.type, u, v);
          case p: {
            var y = n, R = y._payload, E = y._init;
            try {
              return _e(E(R), u, v);
            } catch {
            }
          }
        }
      return "";
    }
    var le = Object.prototype.hasOwnProperty, Le = {}, Ve = x.ReactDebugCurrentFrame;
    function ge(n) {
      if (n) {
        var u = n._owner, v = _e(n.type, n._source, u ? u.type : null);
        Ve.setExtraStackFrame(v);
      } else
        Ve.setExtraStackFrame(null);
    }
    function Sr(n, u, v, y, R) {
      {
        var E = Function.call.bind(le);
        for (var w in n)
          if (E(n, w)) {
            var b = void 0;
            try {
              if (typeof n[w] != "function") {
                var D = Error((y || "React class") + ": " + v + " type `" + w + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof n[w] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw D.name = "Invariant Violation", D;
              }
              b = n[w](u, w, y, v, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (T) {
              b = T;
            }
            b && !(b instanceof Error) && (ge(R), k("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", y || "React class", v, w, typeof b), ge(null)), b instanceof Error && !(b.message in Le) && (Le[b.message] = !0, ge(R), k("Failed %s type: %s", v, b.message), ge(null));
          }
      }
    }
    var Tr = Array.isArray;
    function xe(n) {
      return Tr(n);
    }
    function jr(n) {
      {
        var u = typeof Symbol == "function" && Symbol.toStringTag, v = u && n[Symbol.toStringTag] || n.constructor.name || "Object";
        return v;
      }
    }
    function kr(n) {
      try {
        return Ne(n), !1;
      } catch {
        return !0;
      }
    }
    function Ne(n) {
      return "" + n;
    }
    function Je(n) {
      if (kr(n))
        return k("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", jr(n)), Ne(n);
    }
    var ce = x.ReactCurrentOwner, Ar = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Ke, Ge, Se;
    Se = {};
    function Pr(n) {
      if (le.call(n, "ref")) {
        var u = Object.getOwnPropertyDescriptor(n, "ref").get;
        if (u && u.isReactWarning)
          return !1;
      }
      return n.ref !== void 0;
    }
    function Cr(n) {
      if (le.call(n, "key")) {
        var u = Object.getOwnPropertyDescriptor(n, "key").get;
        if (u && u.isReactWarning)
          return !1;
      }
      return n.key !== void 0;
    }
    function Mr(n, u) {
      if (typeof n.ref == "string" && ce.current && u && ce.current.stateNode !== u) {
        var v = M(ce.current.type);
        Se[v] || (k('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', M(ce.current.type), n.ref), Se[v] = !0);
      }
    }
    function Dr(n, u) {
      {
        var v = function() {
          Ke || (Ke = !0, k("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", u));
        };
        v.isReactWarning = !0, Object.defineProperty(n, "key", {
          get: v,
          configurable: !0
        });
      }
    }
    function Fr(n, u) {
      {
        var v = function() {
          Ge || (Ge = !0, k("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", u));
        };
        v.isReactWarning = !0, Object.defineProperty(n, "ref", {
          get: v,
          configurable: !0
        });
      }
    }
    var Ir = function(n, u, v, y, R, E, w) {
      var b = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: t,
        // Built-in properties that belong on the element
        type: n,
        key: u,
        ref: v,
        props: w,
        // Record the component responsible for creating this element.
        _owner: E
      };
      return b._store = {}, Object.defineProperty(b._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(b, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: y
      }), Object.defineProperty(b, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: R
      }), Object.freeze && (Object.freeze(b.props), Object.freeze(b)), b;
    };
    function Wr(n, u, v, y, R) {
      {
        var E, w = {}, b = null, D = null;
        v !== void 0 && (Je(v), b = "" + v), Cr(u) && (Je(u.key), b = "" + u.key), Pr(u) && (D = u.ref, Mr(u, R));
        for (E in u)
          le.call(u, E) && !Ar.hasOwnProperty(E) && (w[E] = u[E]);
        if (n && n.defaultProps) {
          var T = n.defaultProps;
          for (E in T)
            w[E] === void 0 && (w[E] = T[E]);
        }
        if (b || D) {
          var j = typeof n == "function" ? n.displayName || n.name || "Unknown" : n;
          b && Dr(w, j), D && Fr(w, j);
        }
        return Ir(n, b, D, R, y, ce.current, w);
      }
    }
    var Te = x.ReactCurrentOwner, Xe = x.ReactDebugCurrentFrame;
    function te(n) {
      if (n) {
        var u = n._owner, v = _e(n.type, n._source, u ? u.type : null);
        Xe.setExtraStackFrame(v);
      } else
        Xe.setExtraStackFrame(null);
    }
    var je;
    je = !1;
    function ke(n) {
      return typeof n == "object" && n !== null && n.$$typeof === t;
    }
    function He() {
      {
        if (Te.current) {
          var n = M(Te.current.type);
          if (n)
            return `

Check the render method of \`` + n + "`.";
        }
        return "";
      }
    }
    function Ur(n) {
      return "";
    }
    var Ze = {};
    function $r(n) {
      {
        var u = He();
        if (!u) {
          var v = typeof n == "string" ? n : n.displayName || n.name;
          v && (u = `

Check the top-level render call using <` + v + ">.");
        }
        return u;
      }
    }
    function Qe(n, u) {
      {
        if (!n._store || n._store.validated || n.key != null)
          return;
        n._store.validated = !0;
        var v = $r(u);
        if (Ze[v])
          return;
        Ze[v] = !0;
        var y = "";
        n && n._owner && n._owner !== Te.current && (y = " It was passed a child from " + M(n._owner.type) + "."), te(n), k('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', v, y), te(null);
      }
    }
    function er(n, u) {
      {
        if (typeof n != "object")
          return;
        if (xe(n))
          for (var v = 0; v < n.length; v++) {
            var y = n[v];
            ke(y) && Qe(y, u);
          }
        else if (ke(n))
          n._store && (n._store.validated = !0);
        else if (n) {
          var R = J(n);
          if (typeof R == "function" && R !== n.entries)
            for (var E = R.call(n), w; !(w = E.next()).done; )
              ke(w.value) && Qe(w.value, u);
        }
      }
    }
    function zr(n) {
      {
        var u = n.type;
        if (u == null || typeof u == "string")
          return;
        var v;
        if (typeof u == "function")
          v = u.propTypes;
        else if (typeof u == "object" && (u.$$typeof === f || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        u.$$typeof === g))
          v = u.propTypes;
        else
          return;
        if (v) {
          var y = M(u);
          Sr(v, n.props, "prop", y, n);
        } else if (u.PropTypes !== void 0 && !je) {
          je = !0;
          var R = M(u);
          k("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", R || "Unknown");
        }
        typeof u.getDefaultProps == "function" && !u.getDefaultProps.isReactClassApproved && k("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Yr(n) {
      {
        for (var u = Object.keys(n.props), v = 0; v < u.length; v++) {
          var y = u[v];
          if (y !== "children" && y !== "key") {
            te(n), k("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", y), te(null);
            break;
          }
        }
        n.ref !== null && (te(n), k("Invalid attribute `ref` supplied to `React.Fragment`."), te(null));
      }
    }
    var rr = {};
    function tr(n, u, v, y, R, E) {
      {
        var w = W(n);
        if (!w) {
          var b = "";
          (n === void 0 || typeof n == "object" && n !== null && Object.keys(n).length === 0) && (b += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var D = Ur();
          D ? b += D : b += He();
          var T;
          n === null ? T = "null" : xe(n) ? T = "array" : n !== void 0 && n.$$typeof === t ? (T = "<" + (M(n.type) || "Unknown") + " />", b = " Did you accidentally export a JSX literal instead of a component?") : T = typeof n, k("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", T, b);
        }
        var j = Wr(n, u, v, R, E);
        if (j == null)
          return j;
        if (w) {
          var U = u.children;
          if (U !== void 0)
            if (y)
              if (xe(U)) {
                for (var ne = 0; ne < U.length; ne++)
                  er(U[ne], n);
                Object.freeze && Object.freeze(U);
              } else
                k("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              er(U, n);
        }
        if (le.call(u, "key")) {
          var ee = M(n), I = Object.keys(u).filter(function(Jr) {
            return Jr !== "key";
          }), Ae = I.length > 0 ? "{key: someKey, " + I.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!rr[ee + Ae]) {
            var Nr = I.length > 0 ? "{" + I.join(": ..., ") + ": ...}" : "{}";
            k(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Ae, ee, Nr, ee), rr[ee + Ae] = !0;
          }
        }
        return n === i ? Yr(j) : zr(j), j;
      }
    }
    function qr(n, u, v) {
      return tr(n, u, v, !0);
    }
    function Br(n, u, v) {
      return tr(n, u, v, !1);
    }
    var Lr = Br, Vr = qr;
    ve.Fragment = i, ve.jsx = Lr, ve.jsxs = Vr;
  }()), ve;
}
process.env.NODE_ENV === "production" ? Ce.exports = ot() : Ce.exports = ut();
var ur = Ce.exports;
function fr(r) {
  const t = ie(!0), e = ie(void 0);
  return t.current && (t.current = !1, e.current = r()), e.current;
}
function ft(r) {
  De(() => {
    r();
  }, []);
}
function lr(r) {
  De(() => () => {
    r();
  }, []);
}
function Xt(r) {
  const t = ie(!1);
  De(() => {
    t.current ? r() : t.current = !0;
  });
}
const Pe = "veact", cr = {
  ...console,
  log(...r) {
    console.log(`[${Pe}]`, ...r);
  },
  warn(...r) {
    console.warn(`[${Pe}]`, ...r);
  },
  error(...r) {
    console.error(`[${Pe}]`, ...r);
  }
};
function lt(r, t, e = {}) {
  return sr(r, t, {
    ...e,
    onWarn: cr.warn,
    scheduler: (i) => i()
  });
}
const V = (r, t, e = {}) => {
  const i = ie(), s = be(() => {
    i.current && (i.current(), i.current = void 0);
  }, []), a = be(() => {
    i.current && s(), i.current = lt(r, () => {
      console.log("触发更新"), t();
    }, e);
  }, []);
  return ft(() => {
    console.log("执行监听"), a();
  }), lr(() => {
    console.log("取消监听"), s();
  }), fr(() => {
    console.log("初始监听"), a();
  }), i;
}, ct = (r) => r + 1, N = () => at(ct, 0)[1];
var c = {};
function S(r, e) {
  var e = e || {};
  this._head = 0, this._tail = 0, this._capacity = e.capacity, this._capacityMask = 3, this._list = new Array(4), Array.isArray(r) && this._fromArray(r);
}
S.prototype.peekAt = function(t) {
  var e = t;
  if (e === (e | 0)) {
    var i = this.size();
    if (!(e >= i || e < -i))
      return e < 0 && (e += i), e = this._head + e & this._capacityMask, this._list[e];
  }
};
S.prototype.get = function(t) {
  return this.peekAt(t);
};
S.prototype.peek = function() {
  if (this._head !== this._tail)
    return this._list[this._head];
};
S.prototype.peekFront = function() {
  return this.peek();
};
S.prototype.peekBack = function() {
  return this.peekAt(-1);
};
Object.defineProperty(S.prototype, "length", {
  get: function() {
    return this.size();
  }
});
S.prototype.size = function() {
  return this._head === this._tail ? 0 : this._head < this._tail ? this._tail - this._head : this._capacityMask + 1 - (this._head - this._tail);
};
S.prototype.unshift = function(t) {
  if (t === void 0) return this.size();
  var e = this._list.length;
  return this._head = this._head - 1 + e & this._capacityMask, this._list[this._head] = t, this._tail === this._head && this._growArray(), this._capacity && this.size() > this._capacity && this.pop(), this._head < this._tail ? this._tail - this._head : this._capacityMask + 1 - (this._head - this._tail);
};
S.prototype.shift = function() {
  var t = this._head;
  if (t !== this._tail) {
    var e = this._list[t];
    return this._list[t] = void 0, this._head = t + 1 & this._capacityMask, t < 2 && this._tail > 1e4 && this._tail <= this._list.length >>> 2 && this._shrinkArray(), e;
  }
};
S.prototype.push = function(t) {
  if (t === void 0) return this.size();
  var e = this._tail;
  return this._list[e] = t, this._tail = e + 1 & this._capacityMask, this._tail === this._head && this._growArray(), this._capacity && this.size() > this._capacity && this.shift(), this._head < this._tail ? this._tail - this._head : this._capacityMask + 1 - (this._head - this._tail);
};
S.prototype.pop = function() {
  var t = this._tail;
  if (t !== this._head) {
    var e = this._list.length;
    this._tail = t - 1 + e & this._capacityMask;
    var i = this._list[this._tail];
    return this._list[this._tail] = void 0, this._head < 2 && t > 1e4 && t <= e >>> 2 && this._shrinkArray(), i;
  }
};
S.prototype.removeOne = function(t) {
  var e = t;
  if (e === (e | 0) && this._head !== this._tail) {
    var i = this.size(), s = this._list.length;
    if (!(e >= i || e < -i)) {
      e < 0 && (e += i), e = this._head + e & this._capacityMask;
      var a = this._list[e], o;
      if (t < i / 2) {
        for (o = t; o > 0; o--)
          this._list[e] = this._list[e = e - 1 + s & this._capacityMask];
        this._list[e] = void 0, this._head = this._head + 1 + s & this._capacityMask;
      } else {
        for (o = i - 1 - t; o > 0; o--)
          this._list[e] = this._list[e = e + 1 + s & this._capacityMask];
        this._list[e] = void 0, this._tail = this._tail - 1 + s & this._capacityMask;
      }
      return a;
    }
  }
};
S.prototype.remove = function(t, e) {
  var i = t, s, a = e;
  if (i === (i | 0) && this._head !== this._tail) {
    var o = this.size(), l = this._list.length;
    if (!(i >= o || i < -o || e < 1)) {
      if (i < 0 && (i += o), e === 1 || !e)
        return s = new Array(1), s[0] = this.removeOne(i), s;
      if (i === 0 && i + e >= o)
        return s = this.toArray(), this.clear(), s;
      i + e > o && (e = o - i);
      var f;
      for (s = new Array(e), f = 0; f < e; f++)
        s[f] = this._list[this._head + i + f & this._capacityMask];
      if (i = this._head + i & this._capacityMask, t + e === o) {
        for (this._tail = this._tail - e + l & this._capacityMask, f = e; f > 0; f--)
          this._list[i = i + 1 + l & this._capacityMask] = void 0;
        return s;
      }
      if (t === 0) {
        for (this._head = this._head + e + l & this._capacityMask, f = e - 1; f > 0; f--)
          this._list[i = i + 1 + l & this._capacityMask] = void 0;
        return s;
      }
      if (i < o / 2) {
        for (this._head = this._head + t + e + l & this._capacityMask, f = t; f > 0; f--)
          this.unshift(this._list[i = i - 1 + l & this._capacityMask]);
        for (i = this._head - 1 + l & this._capacityMask; a > 0; )
          this._list[i = i - 1 + l & this._capacityMask] = void 0, a--;
        t < 0 && (this._tail = i);
      } else {
        for (this._tail = i, i = i + e + l & this._capacityMask, f = o - (e + t); f > 0; f--)
          this.push(this._list[i++]);
        for (i = this._tail; a > 0; )
          this._list[i = i + 1 + l & this._capacityMask] = void 0, a--;
      }
      return this._head < 2 && this._tail > 1e4 && this._tail <= l >>> 2 && this._shrinkArray(), s;
    }
  }
};
S.prototype.splice = function(t, e) {
  var i = t;
  if (i === (i | 0)) {
    var s = this.size();
    if (i < 0 && (i += s), !(i > s))
      if (arguments.length > 2) {
        var a, o, l, f = arguments.length, h = this._list.length, d = 2;
        if (!s || i < s / 2) {
          for (o = new Array(i), a = 0; a < i; a++)
            o[a] = this._list[this._head + a & this._capacityMask];
          for (e === 0 ? (l = [], i > 0 && (this._head = this._head + i + h & this._capacityMask)) : (l = this.remove(i, e), this._head = this._head + i + h & this._capacityMask); f > d; )
            this.unshift(arguments[--f]);
          for (a = i; a > 0; a--)
            this.unshift(o[a - 1]);
        } else {
          o = new Array(s - (i + e));
          var g = o.length;
          for (a = 0; a < g; a++)
            o[a] = this._list[this._head + i + e + a & this._capacityMask];
          for (e === 0 ? (l = [], i != s && (this._tail = this._head + i + h & this._capacityMask)) : (l = this.remove(i, e), this._tail = this._tail - g + h & this._capacityMask); d < f; )
            this.push(arguments[d++]);
          for (a = 0; a < g; a++)
            this.push(o[a]);
        }
        return l;
      } else
        return this.remove(i, e);
  }
};
S.prototype.clear = function() {
  this._head = 0, this._tail = 0;
};
S.prototype.isEmpty = function() {
  return this._head === this._tail;
};
S.prototype.toArray = function() {
  return this._copyArray(!1);
};
S.prototype._fromArray = function(t) {
  for (var e = 0; e < t.length; e++) this.push(t[e]);
};
S.prototype._copyArray = function(t) {
  var e = [], i = this._list, s = i.length, a;
  if (t || this._head > this._tail) {
    for (a = this._head; a < s; a++) e.push(i[a]);
    for (a = 0; a < this._tail; a++) e.push(i[a]);
  } else
    for (a = this._head; a < this._tail; a++) e.push(i[a]);
  return e;
};
S.prototype._growArray = function() {
  this._head && (this._list = this._copyArray(!0), this._head = 0), this._tail = this._list.length, this._list.length <<= 1, this._capacityMask = this._capacityMask << 1 | 1;
};
S.prototype._shrinkArray = function() {
  this._list.length >>>= 1, this._capacityMask >>>= 1;
};
var ht = S, hr = { exports: {} };
(function(r) {
  var t = function() {
    function e(p, m) {
      return m != null && p instanceof m;
    }
    var i;
    try {
      i = Map;
    } catch {
      i = function() {
      };
    }
    var s;
    try {
      s = Set;
    } catch {
      s = function() {
      };
    }
    var a;
    try {
      a = Promise;
    } catch {
      a = function() {
      };
    }
    function o(p, m, A, Y, J) {
      typeof m == "object" && (A = m.depth, Y = m.prototype, J = m.includeNonEnumerable, m = m.circular);
      var x = [], k = [], we = typeof Buffer < "u";
      typeof m > "u" && (m = !0), typeof A > "u" && (A = 1 / 0);
      function q(_, B) {
        if (_ === null)
          return null;
        if (B === 0)
          return _;
        var O, Z;
        if (typeof _ != "object")
          return _;
        if (e(_, i))
          O = new i();
        else if (e(_, s))
          O = new s();
        else if (e(_, a))
          O = new a(function(G, X) {
            _.then(function(H) {
              G(q(H, B - 1));
            }, function(H) {
              X(q(H, B - 1));
            });
          });
        else if (o.__isArray(_))
          O = [];
        else if (o.__isRegExp(_))
          O = new RegExp(_.source, g(_)), _.lastIndex && (O.lastIndex = _.lastIndex);
        else if (o.__isDate(_))
          O = new Date(_.getTime());
        else {
          if (we && Buffer.isBuffer(_))
            return Buffer.allocUnsafe ? O = Buffer.allocUnsafe(_.length) : O = new Buffer(_.length), _.copy(O), O;
          e(_, Error) ? O = Object.create(_) : typeof Y > "u" ? (Z = Object.getPrototypeOf(_), O = Object.create(Z)) : (O = Object.create(Y), Z = Y);
        }
        if (m) {
          var oe = x.indexOf(_);
          if (oe != -1)
            return k[oe];
          x.push(_), k.push(O);
        }
        e(_, i) && _.forEach(function(G, X) {
          var H = q(X, B - 1), de = q(G, B - 1);
          O.set(H, de);
        }), e(_, s) && _.forEach(function(G) {
          var X = q(G, B - 1);
          O.add(X);
        });
        for (var W in _) {
          var ue;
          Z && (ue = Object.getOwnPropertyDescriptor(Z, W)), !(ue && ue.set == null) && (O[W] = q(_[W], B - 1));
        }
        if (Object.getOwnPropertySymbols)
          for (var fe = Object.getOwnPropertySymbols(_), W = 0; W < fe.length; W++) {
            var M = fe[W], F = Object.getOwnPropertyDescriptor(_, M);
            F && !F.enumerable && !J || (O[M] = q(_[M], B - 1), F.enumerable || Object.defineProperty(O, M, {
              enumerable: !1
            }));
          }
        if (J)
          for (var K = Object.getOwnPropertyNames(_), W = 0; W < K.length; W++) {
            var Q = K[W], F = Object.getOwnPropertyDescriptor(_, Q);
            F && F.enumerable || (O[Q] = q(_[Q], B - 1), Object.defineProperty(O, Q, {
              enumerable: !1
            }));
          }
        return O;
      }
      return q(p, A);
    }
    o.clonePrototype = function(m) {
      if (m === null)
        return null;
      var A = function() {
      };
      return A.prototype = m, new A();
    };
    function l(p) {
      return Object.prototype.toString.call(p);
    }
    o.__objToStr = l;
    function f(p) {
      return typeof p == "object" && l(p) === "[object Date]";
    }
    o.__isDate = f;
    function h(p) {
      return typeof p == "object" && l(p) === "[object Array]";
    }
    o.__isArray = h;
    function d(p) {
      return typeof p == "object" && l(p) === "[object RegExp]";
    }
    o.__isRegExp = d;
    function g(p) {
      var m = "";
      return p.global && (m += "g"), p.ignoreCase && (m += "i"), p.multiline && (m += "m"), m;
    }
    return o.__getRegExpFlags = g, o;
  }();
  r.exports && (r.exports = t);
})(hr);
var vt = hr.exports, dt = function r(t, e) {
  if (t === e) return !0;
  if (t && e && typeof t == "object" && typeof e == "object") {
    if (t.constructor !== e.constructor) return !1;
    var i, s, a;
    if (Array.isArray(t)) {
      if (i = t.length, i != e.length) return !1;
      for (s = i; s-- !== 0; )
        if (!r(t[s], e[s])) return !1;
      return !0;
    }
    if (t.constructor === RegExp) return t.source === e.source && t.flags === e.flags;
    if (t.valueOf !== Object.prototype.valueOf) return t.valueOf() === e.valueOf();
    if (t.toString !== Object.prototype.toString) return t.toString() === e.toString();
    if (a = Object.keys(t), i = a.length, i !== Object.keys(e).length) return !1;
    for (s = i; s-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(e, a[s])) return !1;
    for (s = i; s-- !== 0; ) {
      var o = a[s];
      if (!r(t[o], e[o])) return !1;
    }
    return !0;
  }
  return t !== t && e !== e;
}, yt = $ && $.__awaiter || function(r, t, e, i) {
  function s(a) {
    return a instanceof e ? a : new e(function(o) {
      o(a);
    });
  }
  return new (e || (e = Promise))(function(a, o) {
    function l(d) {
      try {
        h(i.next(d));
      } catch (g) {
        o(g);
      }
    }
    function f(d) {
      try {
        h(i.throw(d));
      } catch (g) {
        o(g);
      }
    }
    function h(d) {
      d.done ? a(d.value) : s(d.value).then(l, f);
    }
    h((i = i.apply(r, t || [])).next());
  });
}, re = $ && $.__generator || function(r, t) {
  var e = { label: 0, sent: function() {
    if (a[0] & 1) throw a[1];
    return a[1];
  }, trys: [], ops: [] }, i, s, a, o;
  return o = { next: l(0), throw: l(1), return: l(2) }, typeof Symbol == "function" && (o[Symbol.iterator] = function() {
    return this;
  }), o;
  function l(h) {
    return function(d) {
      return f([h, d]);
    };
  }
  function f(h) {
    if (i) throw new TypeError("Generator is already executing.");
    for (; e; ) try {
      if (i = 1, s && (a = h[0] & 2 ? s.return : h[0] ? s.throw || ((a = s.return) && a.call(s), 0) : s.next) && !(a = a.call(s, h[1])).done) return a;
      switch (s = 0, a && (h = [h[0] & 2, a.value]), h[0]) {
        case 0:
        case 1:
          a = h;
          break;
        case 4:
          return e.label++, { value: h[1], done: !1 };
        case 5:
          e.label++, s = h[1], h = [0];
          continue;
        case 7:
          h = e.ops.pop(), e.trys.pop();
          continue;
        default:
          if (a = e.trys, !(a = a.length > 0 && a[a.length - 1]) && (h[0] === 6 || h[0] === 2)) {
            e = 0;
            continue;
          }
          if (h[0] === 3 && (!a || h[1] > a[0] && h[1] < a[3])) {
            e.label = h[1];
            break;
          }
          if (h[0] === 6 && e.label < a[1]) {
            e.label = a[1], a = h;
            break;
          }
          if (a && e.label < a[2]) {
            e.label = a[2], e.ops.push(h);
            break;
          }
          a[2] && e.ops.pop(), e.trys.pop();
          continue;
      }
      h = t.call(r, e);
    } catch (d) {
      h = [6, d], s = 0;
    } finally {
      i = a = 0;
    }
    if (h[0] & 5) throw h[1];
    return { value: h[0] ? h[1] : void 0, done: !0 };
  }
}, C = $ && $.__values || function(r) {
  var t = typeof Symbol == "function" && Symbol.iterator, e = t && r[t], i = 0;
  if (e) return e.call(r);
  if (r && typeof r.length == "number") return {
    next: function() {
      return r && i >= r.length && (r = void 0), { value: r && r[i++], done: !r };
    }
  };
  throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
}, me = $ && $.__read || function(r, t) {
  var e = typeof Symbol == "function" && r[Symbol.iterator];
  if (!e) return r;
  var i = e.call(r), s, a = [], o;
  try {
    for (; (t === void 0 || t-- > 0) && !(s = i.next()).done; ) a.push(s.value);
  } catch (l) {
    o = { error: l };
  } finally {
    try {
      s && !s.done && (e = i.return) && e.call(i);
    } finally {
      if (o) throw o.error;
    }
  }
  return a;
}, ae = $ && $.__spread || function() {
  for (var r = [], t = 0; t < arguments.length; t++) r = r.concat(me(arguments[t]));
  return r;
}, Fe = $ && $.__importDefault || function(r) {
  return r && r.__esModule ? r : { default: r };
};
Object.defineProperty(c, "__esModule", { value: !0 });
c.cached = c.curry = c.call = c.mapToObj = c.len = c.keys = c.set = c.zipToDict = c.dict = _r = c.list = c.isAsyncIter = c.isIter = c.trustType = c.assertType = c.assert = c.parse = c.json = c.float = c.str = c.int = c.insert = c.max = c.min = c.sample = c.extract = c.byIdx = c.sorted = c.shuffle = c.cartesian = c.zip = c.error = c.print = c.equal = c.not = c.all = c.any = c.enumerate = c.range = c.randint = c.delay = void 0;
function pt(r) {
  return yt(this, void 0, void 0, function() {
    return re(this, function(t) {
      return [2, new Promise(function(e) {
        setTimeout(function() {
          e();
        }, r);
      })];
    });
  });
}
c.delay = pt;
function Ie(r) {
  return Math.floor(Math.random() * r) % r;
}
c.randint = Ie;
function se(r, t, e) {
  var i;
  return re(this, function(s) {
    switch (s.label) {
      case 0:
        return t == null && e == null ? [5, C(se(0, 1, r))] : [3, 2];
      case 1:
        return s.sent(), [3, 8];
      case 2:
        return e != null ? [3, 4] : [5, C(se(r, 1, t))];
      case 3:
        return s.sent(), [3, 8];
      case 4:
        i = r, s.label = 5;
      case 5:
        return i < e ? [4, i] : [3, 8];
      case 6:
        s.sent(), s.label = 7;
      case 7:
        return i += t, [3, 5];
      case 8:
        return [2];
    }
  });
}
c.range = se;
function _t(r) {
  var t, e, i, s, a, o, l;
  return re(this, function(f) {
    switch (f.label) {
      case 0:
        t = 0, f.label = 1;
      case 1:
        f.trys.push([1, 6, 7, 8]), e = C(r), i = e.next(), f.label = 2;
      case 2:
        return i.done ? [3, 5] : (s = i.value, [4, [t++, s]]);
      case 3:
        f.sent(), f.label = 4;
      case 4:
        return i = e.next(), [3, 2];
      case 5:
        return [3, 8];
      case 6:
        return a = f.sent(), o = { error: a }, [3, 8];
      case 7:
        try {
          i && !i.done && (l = e.return) && l.call(e);
        } finally {
          if (o) throw o.error;
        }
        return [7];
      case 8:
        return [2];
    }
  });
}
c.enumerate = _t;
function We(r) {
  var t, e;
  try {
    for (var i = C(r), s = i.next(); !s.done; s = i.next()) {
      var a = s.value;
      if (a)
        return !0;
    }
  } catch (o) {
    t = { error: o };
  } finally {
    try {
      s && !s.done && (e = i.return) && e.call(i);
    } finally {
      if (t) throw t.error;
    }
  }
  return !1;
}
c.any = We;
function gt(r) {
  return !We(vr(r));
}
c.all = gt;
function vr(r) {
  var t, e, i = [];
  try {
    for (var s = C(r), a = s.next(); !a.done; a = s.next()) {
      var o = a.value;
      i.push(!o);
    }
  } catch (l) {
    t = { error: l };
  } finally {
    try {
      a && !a.done && (e = s.return) && e.call(s);
    } finally {
      if (t) throw t.error;
    }
  }
  return i;
}
c.not = vr;
function bt(r, t) {
  var e, i, s, a, o = [];
  if (Symbol.iterator in t)
    try {
      for (var l = C(Ue(r, t)), f = l.next(); !f.done; f = l.next()) {
        var h = me(f.value, 2), d = h[0], g = h[1];
        o.push(d.__equal__(g));
      }
    } catch (A) {
      e = { error: A };
    } finally {
      try {
        f && !f.done && (i = l.return) && i.call(l);
      } finally {
        if (e) throw e.error;
      }
    }
  else
    try {
      for (var p = C(r), m = p.next(); !m.done; m = p.next()) {
        var d = m.value;
        pr(t) && o.push(d.__equal__(t));
      }
    } catch (A) {
      s = { error: A };
    } finally {
      try {
        m && !m.done && (a = p.return) && a.call(p);
      } finally {
        if (s) throw s.error;
      }
    }
  return o;
}
c.equal = bt;
function mt() {
  for (var r = [], t = 0; t < arguments.length; t++)
    r[t] = arguments[t];
  console.log.apply(console, ae(r));
}
c.print = mt;
function wt(r) {
  throw r === void 0 && (r = ""), new Error(r);
}
c.error = wt;
function Ue() {
  var r, t, e, i, s, a, o, l, f = [];
  for (r = 0; r < arguments.length; r++)
    f[r] = arguments[r];
  return re(this, function(h) {
    switch (h.label) {
      case 0:
        if (P(f) == 0)
          return [2];
        P(f) == 1 && (f = f[0]), t = [];
        try {
          for (e = C(f), i = e.next(); !i.done; i = e.next())
            s = i.value, t.push(s[Symbol.iterator]());
        } catch (d) {
          o = { error: d };
        } finally {
          try {
            i && !i.done && (l = e.return) && l.call(e);
          } finally {
            if (o) throw o.error;
          }
        }
        h.label = 1;
      case 1:
        return a = t.map(function(d) {
          return d.next();
        }), We(a.map(function(d) {
          return d.done;
        })) ? [2, void 0] : [3, 2];
      case 2:
        return [4, a.map(function(d) {
          return d.value;
        })];
      case 3:
        h.sent(), h.label = 4;
      case 4:
        return [3, 1];
      case 5:
        return [2];
    }
  });
}
c.zip = Ue;
function ar(r, t) {
  var e, i, s, a, o, l, f, h, d, g, p, m, A, Y, J;
  return re(this, function(x) {
    switch (x.label) {
      case 0:
        e = [], i = !0, x.label = 1;
      case 1:
        x.trys.push([1, 13, 14, 15]), s = C(r), a = s.next(), x.label = 2;
      case 2:
        if (a.done) return [3, 12];
        o = a.value, l = i ? t : e, x.label = 3;
      case 3:
        x.trys.push([3, 8, 9, 10]), f = (Y = void 0, C(l)), h = f.next(), x.label = 4;
      case 4:
        return h.done ? [3, 7] : (d = h.value, [4, [o, d]]);
      case 5:
        x.sent(), i && e.push(d), x.label = 6;
      case 6:
        return h = f.next(), [3, 4];
      case 7:
        return [3, 10];
      case 8:
        return g = x.sent(), Y = { error: g }, [3, 10];
      case 9:
        try {
          h && !h.done && (J = f.return) && J.call(f);
        } finally {
          if (Y) throw Y.error;
        }
        return [7];
      case 10:
        i = !1, x.label = 11;
      case 11:
        return a = s.next(), [3, 2];
      case 12:
        return [3, 15];
      case 13:
        return p = x.sent(), m = { error: p }, [3, 15];
      case 14:
        try {
          a && !a.done && (A = s.return) && A.call(s);
        } finally {
          if (m) throw m.error;
        }
        return [7];
      case 15:
        return [2];
    }
  });
}
function dr() {
  var r, t, e, i, s, a, o, l, f, h = [];
  for (r = 0; r < arguments.length; r++)
    h[r] = arguments[r];
  return re(this, function(d) {
    switch (d.label) {
      case 0:
        return P(h) != 2 ? [3, 2] : [5, C(ar(h[0], h[1]))];
      case 1:
        return d.sent(), [3, 9];
      case 2:
        d.trys.push([2, 7, 8, 9]), t = C(ar(h[0], dr.apply(void 0, ae(h.slice(1))))), e = t.next(), d.label = 3;
      case 3:
        return e.done ? [3, 6] : (i = me(e.value, 2), s = i[0], a = i[1], [4, ae([s], a)]);
      case 4:
        d.sent(), d.label = 5;
      case 5:
        return e = t.next(), [3, 3];
      case 6:
        return [3, 9];
      case 7:
        return o = d.sent(), l = { error: o }, [3, 9];
      case 8:
        try {
          e && !e.done && (f = t.return) && f.call(t);
        } finally {
          if (l) throw l.error;
        }
        return [7];
      case 9:
        return [2];
    }
  });
}
c.cartesian = dr;
var Rt = Fe(ht);
function yr(r) {
  var t, e, i = new Rt.default(), s = z(r), a = z(se(P(s)));
  a.forEach(function(p) {
    return i.push(p);
  });
  var o = new Array(P(s));
  try {
    for (var l = C(s), f = l.next(); !f.done; f = l.next()) {
      var h = f.value, d = Ie(P(i)), g = i.get(d);
      i.removeOne(d), o[g] = h;
    }
  } catch (p) {
    t = { error: p };
  } finally {
    try {
      f && !f.done && (e = l.return) && e.call(l);
    } finally {
      if (t) throw t.error;
    }
  }
  return o;
}
c.shuffle = yr;
function Et(r, t, e) {
  t === void 0 && (t = null);
  var i = z(r).sort(function(s, a) {
    var o = me([-t(s), -t(a)], 2), l = o[0], f = o[1];
    return l - f;
  });
  return i;
}
c.sorted = Et;
function $e(r, t) {
  var e = z(r), i = t.map(function(s) {
    return e[s];
  });
  return i;
}
c.byIdx = $e;
function Ot(r, t) {
  var e = z(r), i = yr(se(P(e))).slice(0, t);
  return $e(e, i);
}
c.extract = Ot;
function xt(r, t) {
  var e = z(r), i = z(se(P(e))).map(function(s) {
    return Ie(P(e));
  });
  return $e(e, i);
}
c.sample = xt;
c.min = Math.min;
c.max = Math.max;
function St(r, t, e) {
  var i = [], s = z(r);
  return s.forEach(function(a, o) {
    t == o && i.push(e), i.push(a);
  }), P(s) == t && i.push(e), i;
}
c.insert = St;
function Tt(r) {
  return typeof r == "string" ? parseInt(r) : typeof r == "number" ? r | 0 : "toInt" in r ? r.toInt() : 0;
}
c.int = Tt;
function jt(r) {
  return Me(r, "object") ? r.toString() : Me(r, "string") ? r : new Number(r).toString();
}
c.str = jt;
function kt(r) {
  return typeof r == "string" ? parseFloat(r) : typeof r == "number" ? r : "toFloat" in r ? r.toFloat() : 0;
}
c.float = kt;
function At(r) {
  return JSON.stringify(r);
}
c.json = At;
function Pt(r) {
  return JSON.parse(r);
}
c.parse = Pt;
function Ct(r, t) {
  if (!r)
    throw new Error(t ?? "错误");
}
c.assert = Ct;
function Me(r, t) {
  if (typeof t == "string")
    return typeof r == t;
  if (typeof t == "function")
    return r instanceof t;
}
c.assertType = Me;
function pr(r) {
  return !0;
}
c.trustType = pr;
function Mt(r) {
  return Symbol.iterator in r;
}
c.isIter = Mt;
function Dt(r) {
  return Symbol.asyncIterator in r && !(Symbol.iterator in r);
}
c.isAsyncIter = Dt;
function z(r) {
  var t, e;
  if (r == null)
    return z([]);
  var i = [];
  try {
    for (var s = C(r), a = s.next(); !a.done; a = s.next()) {
      var o = a.value;
      i.push(o);
    }
  } catch (l) {
    t = { error: l };
  } finally {
    try {
      a && !a.done && (e = s.return) && e.call(s);
    } finally {
      if (t) throw t.error;
    }
  }
  return i;
}
var _r = c.list = z;
function gr(r) {
  return new Map(r);
}
c.dict = gr;
function Ft(r, t) {
  return gr(Ue(r, t));
}
c.zipToDict = Ft;
function It(r) {
  return new Set(r);
}
c.set = It;
function Wt(r) {
  var t, e, i, s, a, o, l, f, h, d;
  return re(this, function(g) {
    switch (g.label) {
      case 0:
        if (!(r instanceof Map)) return [3, 9];
        g.label = 1;
      case 1:
        g.trys.push([1, 6, 7, 8]), t = C(r.keys()), e = t.next(), g.label = 2;
      case 2:
        return e.done ? [3, 5] : (i = e.value, [4, i]);
      case 3:
        g.sent(), g.label = 4;
      case 4:
        return e = t.next(), [3, 2];
      case 5:
        return [3, 8];
      case 6:
        return s = g.sent(), h = { error: s }, [3, 8];
      case 7:
        try {
          e && !e.done && (d = t.return) && d.call(t);
        } finally {
          if (h) throw h.error;
        }
        return [7];
      case 8:
        return [3, 13];
      case 9:
        if (typeof r != "object") return [3, 13];
        a = [];
        for (o in r)
          a.push(o);
        l = 0, g.label = 10;
      case 10:
        return l < a.length ? (f = a[l], [4, f]) : [3, 13];
      case 11:
        g.sent(), g.label = 12;
      case 12:
        return l++, [3, 10];
      case 13:
        return [2];
    }
  });
}
c.keys = Wt;
function P(r) {
  if ("length" in r)
    return r.length;
  if ("size" in r)
    return r.size;
  if ("count" in r)
    return r.count;
  if ("__len__" in r)
    return r.__len__();
  if (Symbol.iterator in r)
    return P(z(r));
  if (typeof r == "object") {
    var t = 0;
    for (var e in r)
      t++;
    return t;
  }
}
c.len = P;
function Ut(r) {
  r === void 0 && (r = /* @__PURE__ */ new Map());
  var t = new Proxy({}, {
    get: function(e, i, s) {
      return r.get(i);
    },
    set: function(e, i, s, a) {
      return r.set(i, s), !0;
    },
    has: function(e, i) {
      return r.has(i);
    },
    deleteProperty: function(e, i) {
      return r.delete(i);
    },
    defineProperty: function(e, i, s) {
      return r.set(i, s.value), !0;
    },
    ownKeys: function(e) {
      return z(r.keys());
    }
  });
  return t;
}
c.mapToObj = Ut;
function $t(r) {
  r();
}
c.call = $t;
function br(r, t) {
  return t === void 0 && (t = []), function(e) {
    var i = P(t) + 1, s = t.concat([e]);
    return i == P(r) ? r.apply(void 0, ae(s)) : br(r, s);
  };
}
function zt(r) {
  function t() {
    for (var e, i, s = [], a = 0; a < arguments.length; a++)
      s[a] = arguments[a];
    var o = r;
    try {
      for (var l = C(s), f = l.next(); !f.done; f = l.next()) {
        var h = f.value;
        o = o(h);
      }
    } catch (d) {
      e = { error: d };
    } finally {
      try {
        f && !f.done && (i = l.return) && i.call(l);
      } finally {
        if (e) throw e.error;
      }
    }
    return o;
  }
  return t;
}
function mr(r, t, e) {
  t === void 0 && (t = 0), e === void 0 && (e = null), e == null && (e = r);
  var i = br(r), s = zt(i), a = function() {
    for (var o = [], l = 0; l < arguments.length; l++)
      o[l] = arguments[l];
    var f = s.apply(void 0, ae(o));
    if (t + P(o) == P(e))
      return f;
    var h = mr(f, t + P(o), e);
    return h;
  };
  return a;
}
c.curry = mr;
var Yt = Fe(vt), qt = Fe(dt);
function Bt(r) {
  var t = !1, e = null, i = null;
  return function() {
    for (var s = [], a = 0; a < arguments.length; a++)
      s[a] = arguments[a];
    if (!t || i !== s || !qt.default(s, i))
      return t = !0, e = r.apply(void 0, ae(s)), i = Yt.default(s), e;
  };
}
c.cached = Bt;
function Ht(r) {
  const t = N();
  return V(() => r(), t, { deep: !0 }), r();
}
function Lt(r) {
  function* t() {
    for (let e in r)
      yield r[e];
  }
  return _r(t());
}
function Vt(r) {
  const t = N(), e = be(() => {
    const s = r();
    return Lt(s).filter((o) => Kr(o) || Gr(o));
  }, [r]), i = st(() => e(), [e]);
  return V(() => i, t, { deep: !0 }), r();
}
function Nt(r) {
  const t = fr(() => r.target.setup(r.props)), e = Vt(() => t), i = r.target.render;
  return /* @__PURE__ */ ur.jsx(i, { ...e });
}
function Zt(r) {
  return (t) => /* @__PURE__ */ ur.jsx(Nt, { target: r, props: t });
}
function Qt(r) {
  const [t] = L(() => Xr(r)), e = N();
  return V(t, e, { deep: !0 }), t;
}
function en(r) {
  const [t] = L(() => Hr(r)), e = N();
  return V(t, e), t;
}
function rn(r) {
  const [t] = L(() => Zr(r)), e = N();
  return V(t, e), t;
}
function tn(r) {
  const [t] = L(() => Qr(r)), e = N();
  return V(t, e), t;
}
function nn(r) {
  const [t] = L(() => et(r)), e = N();
  return V(t, e), t;
}
function an(r) {
  const [t] = L(() => rt(r)), e = N();
  return V(t, e), t;
}
function sn(r) {
  const [t] = L(() => tt(r)), e = N();
  return V(t, e), t;
}
function on(r, t) {
  const [e] = L(() => nt(r, t)), i = N();
  return V(e, i), e;
}
function Jt(r, t = {}) {
  return sr(r, null, {
    ...t,
    onWarn: cr.warn,
    scheduler: (e) => e()
  });
}
const un = (r, t) => {
  const [e] = L(() => Jt(r, t));
  return lr(() => e.stop()), e;
};
function fn(...r) {
  const t = ie(!1), [e] = L(() => it(...r)), i = ie(e.run), s = be((a) => {
    if (!t.current)
      return t.current = !0, i.current.bind(e)(a);
  }, []);
  return e.run = s, e;
}
export {
  Nt as SetupComponentRenderer,
  vn as baseWatch,
  Zt as defineSetupComponent,
  lr as onBeforeUnmount,
  ft as onMounted,
  Xt as onUpdated,
  on as useComputed,
  rn as useCustomRef,
  fn as useEffectScope,
  tn as useReactive,
  Ht as useReactivity,
  an as useReadonly,
  Qt as useRef,
  nn as useShallowReactive,
  sn as useShallowReadonly,
  en as useShallowRef,
  V as useWatch,
  un as useWatchEffect,
  lt as watch,
  Jt as watchEffect
};
