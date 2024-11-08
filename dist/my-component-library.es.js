const s = "5";
typeof window < "u" && (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(s);
const l = 2;
let i = null;
var d;
// @__NO_SIDE_EFFECTS__
function c(e) {
  return d.call(e);
}
function u(e) {
  var t = document.createElement("template");
  return t.innerHTML = e, t.content;
}
function f(e, t) {
  var r = (
    /** @type {Effect} */
    i
  );
  r.nodes_start === null && (r.nodes_start = e, r.nodes_end = t);
}
// @__NO_SIDE_EFFECTS__
function _(e, t) {
  var r = (t & l) !== 0, n, a = !e.startsWith("<!>");
  return () => {
    n === void 0 && (n = u(a ? e : "<!>" + e), n = /** @type {Node} */
    /* @__PURE__ */ c(n));
    var o = (
      /** @type {TemplateNode} */
      r ? document.importNode(n, !0) : n.cloneNode(!0)
    );
    return f(o, o), o;
  };
}
function v(e, t) {
  e !== null && e.before(
    /** @type {Node} */
    t
  );
}
var m = /* @__PURE__ */ _(`<div class="banner bg-cover bg-center text-white p-8 rounded-lg shadow-lg svelte-1nt1mql" style="background-image: url('../assets/recent-hero.jpg');"><img src="../assets/Bitmap-logo.png" alt="Logo" class="w-16 h-16 mb-4"> <h1 class="text-2xl font-bold">TEST</h1> <p class="mt-2">TEST</p></div>`);
function g(e) {
  var t = m();
  v(e, t);
}
export {
  g as Banner
};
