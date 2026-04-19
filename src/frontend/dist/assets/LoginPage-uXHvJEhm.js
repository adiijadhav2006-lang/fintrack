import { c as createLucideIcon, l as useInternetIdentity, j as jsxRuntimeExports } from "./index-Cx3uc6F2.js";
import { B as Button } from "./button-BbigOgdv.js";
import { m as motion } from "./proxy-DQTY6X4E.js";
import { Z as Zap } from "./zap-C4lVPQCP.js";
import { L as LoaderCircle } from "./loader-circle-DiPeDmhz.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const ShieldCheck = createLucideIcon("shield-check", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
const TrendingUp = createLucideIcon("trending-up", __iconNode);
const features = [
  { icon: Zap, label: "Instant expense logging" },
  { icon: TrendingUp, label: "Real-time spending insights" },
  { icon: ShieldCheck, label: "Secure & private on-chain" }
];
function LoginPage() {
  const { login, loginStatus } = useInternetIdentity();
  const isLoading = loginStatus === "logging-in";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen flex flex-col items-center justify-between bg-background px-6 py-12",
      "data-ocid": "login-page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col items-center justify-center w-full max-w-sm gap-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: -20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5 },
              className: "flex flex-col items-center gap-3 text-center",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-3xl bg-primary flex items-center justify-center shadow-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl", role: "img", "aria-label": "FinTrack", children: "💰" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-display font-bold text-foreground tracking-tight", children: "FinTrack" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base mt-1.5 leading-relaxed", children: "Your personal finance companion" })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5, delay: 0.15 },
              className: "w-full space-y-3",
              children: features.map(({ icon: Icon, label }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, x: -12 },
                  animate: { opacity: 1, x: 0 },
                  transition: { delay: 0.2 + i * 0.08 },
                  className: "flex items-center gap-3 p-3.5 rounded-2xl bg-card border border-border/60 shadow-subtle",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4.5 h-4.5 text-primary", strokeWidth: 2 }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: label })
                  ]
                },
                label
              ))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5, delay: 0.4 },
              className: "w-full space-y-3",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    className: "w-full h-14 text-base font-semibold rounded-2xl shadow-elevated gap-2",
                    onClick: login,
                    disabled: isLoading,
                    "data-ocid": "get-started-btn",
                    children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                      "Signing in…"
                    ] }) : "Get Started →"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground leading-relaxed px-4", children: "Powered by Internet Identity — your data stays private and under your control." })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: 0.6 },
            className: "text-center",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "© ",
              (/* @__PURE__ */ new Date()).getFullYear(),
              ".",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`,
                  className: "underline underline-offset-2 hover:text-foreground transition-colors",
                  target: "_blank",
                  rel: "noreferrer",
                  children: "Built with love using caffeine.ai"
                }
              )
            ] })
          }
        )
      ]
    }
  );
}
export {
  LoginPage as default
};
