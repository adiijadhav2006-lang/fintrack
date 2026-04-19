import { r as reactExports, j as jsxRuntimeExports, v as useSaveUserProfile, P as ProfessionStatus, F as FinancialGoal, h as ue } from "./index-Cx3uc6F2.js";
import { B as Button } from "./button-BbigOgdv.js";
import { M as MotionConfigContext, i as isHTMLElement, u as useConstant, P as PresenceContext, b as usePresence, d as useIsomorphicLayoutEffect, L as LayoutGroupContext, m as motion } from "./proxy-DQTY6X4E.js";
import { C as CircleCheck } from "./circle-check-BhWjxO8j.js";
import { L as LoaderCircle } from "./loader-circle-DiPeDmhz.js";
function setRef(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, node);
      if (!hasCleanup && typeof cleanup === "function") {
        hasCleanup = true;
      }
      return cleanup;
    });
    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup === "function") {
            cleanup();
          } else {
            setRef(refs[i], null);
          }
        }
      };
    }
  };
}
function useComposedRefs(...refs) {
  return reactExports.useCallback(composeRefs(...refs), refs);
}
class PopChildMeasure extends reactExports.Component {
  getSnapshotBeforeUpdate(prevProps) {
    const element = this.props.childRef.current;
    if (isHTMLElement(element) && prevProps.isPresent && !this.props.isPresent && this.props.pop !== false) {
      const parent = element.offsetParent;
      const parentWidth = isHTMLElement(parent) ? parent.offsetWidth || 0 : 0;
      const parentHeight = isHTMLElement(parent) ? parent.offsetHeight || 0 : 0;
      const computedStyle = getComputedStyle(element);
      const size = this.props.sizeRef.current;
      size.height = parseFloat(computedStyle.height);
      size.width = parseFloat(computedStyle.width);
      size.top = element.offsetTop;
      size.left = element.offsetLeft;
      size.right = parentWidth - size.width - size.left;
      size.bottom = parentHeight - size.height - size.top;
    }
    return null;
  }
  /**
   * Required with getSnapshotBeforeUpdate to stop React complaining.
   */
  componentDidUpdate() {
  }
  render() {
    return this.props.children;
  }
}
function PopChild({ children, isPresent, anchorX, anchorY, root, pop }) {
  var _a;
  const id = reactExports.useId();
  const ref = reactExports.useRef(null);
  const size = reactExports.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  });
  const { nonce } = reactExports.useContext(MotionConfigContext);
  const childRef = ((_a = children.props) == null ? void 0 : _a.ref) ?? (children == null ? void 0 : children.ref);
  const composedRef = useComposedRefs(ref, childRef);
  reactExports.useInsertionEffect(() => {
    const { width, height, top, left, right, bottom } = size.current;
    if (isPresent || pop === false || !ref.current || !width || !height)
      return;
    const x = anchorX === "left" ? `left: ${left}` : `right: ${right}`;
    const y = anchorY === "bottom" ? `bottom: ${bottom}` : `top: ${top}`;
    ref.current.dataset.motionPopId = id;
    const style = document.createElement("style");
    if (nonce)
      style.nonce = nonce;
    const parent = root ?? document.head;
    parent.appendChild(style);
    if (style.sheet) {
      style.sheet.insertRule(`
          [data-motion-pop-id="${id}"] {
            position: absolute !important;
            width: ${width}px !important;
            height: ${height}px !important;
            ${x}px !important;
            ${y}px !important;
          }
        `);
    }
    return () => {
      var _a2;
      (_a2 = ref.current) == null ? void 0 : _a2.removeAttribute("data-motion-pop-id");
      if (parent.contains(style)) {
        parent.removeChild(style);
      }
    };
  }, [isPresent]);
  return jsxRuntimeExports.jsx(PopChildMeasure, { isPresent, childRef: ref, sizeRef: size, pop, children: pop === false ? children : reactExports.cloneElement(children, { ref: composedRef }) });
}
const PresenceChild = ({ children, initial, isPresent, onExitComplete, custom, presenceAffectsLayout, mode, anchorX, anchorY, root }) => {
  const presenceChildren = useConstant(newChildrenMap);
  const id = reactExports.useId();
  let isReusedContext = true;
  let context = reactExports.useMemo(() => {
    isReusedContext = false;
    return {
      id,
      initial,
      isPresent,
      custom,
      onExitComplete: (childId) => {
        presenceChildren.set(childId, true);
        for (const isComplete of presenceChildren.values()) {
          if (!isComplete)
            return;
        }
        onExitComplete && onExitComplete();
      },
      register: (childId) => {
        presenceChildren.set(childId, false);
        return () => presenceChildren.delete(childId);
      }
    };
  }, [isPresent, presenceChildren, onExitComplete]);
  if (presenceAffectsLayout && isReusedContext) {
    context = { ...context };
  }
  reactExports.useMemo(() => {
    presenceChildren.forEach((_, key) => presenceChildren.set(key, false));
  }, [isPresent]);
  reactExports.useEffect(() => {
    !isPresent && !presenceChildren.size && onExitComplete && onExitComplete();
  }, [isPresent]);
  children = jsxRuntimeExports.jsx(PopChild, { pop: mode === "popLayout", isPresent, anchorX, anchorY, root, children });
  return jsxRuntimeExports.jsx(PresenceContext.Provider, { value: context, children });
};
function newChildrenMap() {
  return /* @__PURE__ */ new Map();
}
const getChildKey = (child) => child.key || "";
function onlyElements(children) {
  const filtered = [];
  reactExports.Children.forEach(children, (child) => {
    if (reactExports.isValidElement(child))
      filtered.push(child);
  });
  return filtered;
}
const AnimatePresence = ({ children, custom, initial = true, onExitComplete, presenceAffectsLayout = true, mode = "sync", propagate = false, anchorX = "left", anchorY = "top", root }) => {
  const [isParentPresent, safeToRemove] = usePresence(propagate);
  const presentChildren = reactExports.useMemo(() => onlyElements(children), [children]);
  const presentKeys = propagate && !isParentPresent ? [] : presentChildren.map(getChildKey);
  const isInitialRender = reactExports.useRef(true);
  const pendingPresentChildren = reactExports.useRef(presentChildren);
  const exitComplete = useConstant(() => /* @__PURE__ */ new Map());
  const exitingComponents = reactExports.useRef(/* @__PURE__ */ new Set());
  const [diffedChildren, setDiffedChildren] = reactExports.useState(presentChildren);
  const [renderedChildren, setRenderedChildren] = reactExports.useState(presentChildren);
  useIsomorphicLayoutEffect(() => {
    isInitialRender.current = false;
    pendingPresentChildren.current = presentChildren;
    for (let i = 0; i < renderedChildren.length; i++) {
      const key = getChildKey(renderedChildren[i]);
      if (!presentKeys.includes(key)) {
        if (exitComplete.get(key) !== true) {
          exitComplete.set(key, false);
        }
      } else {
        exitComplete.delete(key);
        exitingComponents.current.delete(key);
      }
    }
  }, [renderedChildren, presentKeys.length, presentKeys.join("-")]);
  const exitingChildren = [];
  if (presentChildren !== diffedChildren) {
    let nextChildren = [...presentChildren];
    for (let i = 0; i < renderedChildren.length; i++) {
      const child = renderedChildren[i];
      const key = getChildKey(child);
      if (!presentKeys.includes(key)) {
        nextChildren.splice(i, 0, child);
        exitingChildren.push(child);
      }
    }
    if (mode === "wait" && exitingChildren.length) {
      nextChildren = exitingChildren;
    }
    setRenderedChildren(onlyElements(nextChildren));
    setDiffedChildren(presentChildren);
    return null;
  }
  const { forceRender } = reactExports.useContext(LayoutGroupContext);
  return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: renderedChildren.map((child) => {
    const key = getChildKey(child);
    const isPresent = propagate && !isParentPresent ? false : presentChildren === renderedChildren || presentKeys.includes(key);
    const onExit = () => {
      if (exitingComponents.current.has(key)) {
        return;
      }
      if (exitComplete.has(key)) {
        exitingComponents.current.add(key);
        exitComplete.set(key, true);
      } else {
        return;
      }
      let isEveryExitComplete = true;
      exitComplete.forEach((isExitComplete) => {
        if (!isExitComplete)
          isEveryExitComplete = false;
      });
      if (isEveryExitComplete) {
        forceRender == null ? void 0 : forceRender();
        setRenderedChildren(pendingPresentChildren.current);
        propagate && (safeToRemove == null ? void 0 : safeToRemove());
        onExitComplete && onExitComplete();
      }
    };
    return jsxRuntimeExports.jsx(PresenceChild, { isPresent, initial: !isInitialRender.current || initial ? void 0 : false, custom, presenceAffectsLayout, mode, root, onExitComplete: isPresent ? void 0 : onExit, anchorX, anchorY, children: child }, key);
  }) });
};
const professions = [
  { value: ProfessionStatus.Student, emoji: "🎓", label: "Student" },
  { value: ProfessionStatus.Employee, emoji: "💼", label: "Employee" },
  {
    value: ProfessionStatus.Entrepreneur,
    emoji: "🚀",
    label: "Entrepreneur"
  },
  {
    value: ProfessionStatus.BusinessMan,
    emoji: "🏢",
    label: "Business Owner"
  },
  { value: ProfessionStatus.Freelancer, emoji: "💻", label: "Freelancer" },
  { value: ProfessionStatus.Other, emoji: "✨", label: "Other" }
];
const goals = [
  {
    value: FinancialGoal.SaveForEmergencies,
    emoji: "🛡️",
    label: "Emergency Fund",
    desc: "Build a safety net"
  },
  {
    value: FinancialGoal.PayOffDebt,
    emoji: "📉",
    label: "Pay Off Debt",
    desc: "Get financially free"
  },
  {
    value: FinancialGoal.BuildWealth,
    emoji: "📈",
    label: "Build Wealth",
    desc: "Grow my savings"
  },
  {
    value: FinancialGoal.TrackSpending,
    emoji: "🔍",
    label: "Track Spending",
    desc: "Know where money goes"
  },
  {
    value: FinancialGoal.SaveForPurchase,
    emoji: "🛒",
    label: "Save for Purchase",
    desc: "Work toward a goal"
  },
  {
    value: FinancialGoal.Other,
    emoji: "🌟",
    label: "Something Else",
    desc: "Define my own path"
  }
];
const STEP_KEYS = ["dot-0", "dot-1", "dot-2", "dot-3"];
function StepIndicator({ step, total }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: STEP_KEYS.slice(0, total).map((key, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: `h-1.5 rounded-full transition-smooth ${i < step ? "w-8 bg-primary" : i === step ? "w-8 bg-primary/60" : "w-4 bg-border"}`
    },
    key
  )) });
}
function OnboardingPage() {
  const [step, setStep] = reactExports.useState(0);
  const [selectedProfession, setSelectedProfession] = reactExports.useState(null);
  const [selectedGoals, setSelectedGoals] = reactExports.useState([]);
  const { mutateAsync: saveProfile, isPending } = useSaveUserProfile();
  function toggleGoal(goal) {
    setSelectedGoals(
      (prev) => prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  }
  async function handleFinish() {
    try {
      await saveProfile({
        professionStatus: selectedProfession,
        financialGoals: selectedGoals.length > 0 ? selectedGoals : null,
        onboardingCompleted: true
      });
    } catch {
      ue.error("Couldn't save your profile — please try again.");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed inset-0 z-50 flex flex-col bg-background overflow-y-auto",
      "data-ocid": "onboarding-page",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-h-full max-w-sm mx-auto w-full px-6 py-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: [
              "Step ",
              step + 1,
              " of 2"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StepIndicator, { step, total: 2 })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "💰" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", children: [
          step === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: 24 },
              animate: { opacity: 1, x: 0 },
              exit: { opacity: 0, x: -24 },
              transition: { duration: 0.28 },
              className: "space-y-6",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-display font-bold text-foreground leading-tight", children: "What best describes you?" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: "We'll personalize FinTrack to fit your lifestyle." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "grid grid-cols-2 gap-3",
                    "data-ocid": "profession-grid",
                    children: professions.map(({ value, emoji, label }) => {
                      const selected = selectedProfession === value;
                      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: () => setSelectedProfession(value),
                          "data-ocid": `profession-${value.toLowerCase()}`,
                          className: `relative flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-smooth text-center ${selected ? "border-primary bg-primary/8 shadow-elevated" : "border-border bg-card hover:border-primary/40 hover:bg-primary/4"}`,
                          children: [
                            selected && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "absolute top-2 right-2 w-4 h-4 text-primary" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl", children: emoji }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                className: `text-sm font-semibold leading-tight ${selected ? "text-primary" : "text-foreground"}`,
                                children: label
                              }
                            )
                          ]
                        },
                        value
                      );
                    })
                  }
                )
              ]
            },
            "step-profession"
          ),
          step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: 24 },
              animate: { opacity: 1, x: 0 },
              exit: { opacity: 0, x: -24 },
              transition: { duration: 0.28 },
              className: "space-y-6",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-display font-bold text-foreground leading-tight", children: "What are your financial goals?" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: "Select all that apply — we'll help you stay on track." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5", "data-ocid": "goals-grid", children: goals.map(({ value, emoji, label, desc }) => {
                  const selected = selectedGoals.includes(value);
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => toggleGoal(value),
                      "data-ocid": `goal-${value.toLowerCase()}`,
                      className: `w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-smooth text-left ${selected ? "border-primary bg-primary/8 shadow-subtle" : "border-border bg-card hover:border-primary/40 hover:bg-primary/4"}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl shrink-0", children: emoji }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              className: `text-sm font-semibold ${selected ? "text-primary" : "text-foreground"}`,
                              children: label
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: desc })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: `w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-smooth ${selected ? "border-primary bg-primary" : "border-border"}`,
                            children: selected && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 text-primary-foreground" })
                          }
                        )
                      ]
                    },
                    value
                  );
                }) })
              ]
            },
            "step-goals"
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-8 space-y-3", children: [
          step === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              className: "w-full h-13 text-base font-semibold rounded-2xl",
              onClick: () => setStep(1),
              disabled: !selectedProfession,
              "data-ocid": "next-btn",
              children: "Next →"
            }
          ),
          step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                className: "w-full h-13 text-base font-semibold rounded-2xl shadow-elevated gap-2",
                onClick: handleFinish,
                disabled: isPending || selectedGoals.length === 0,
                "data-ocid": "finish-btn",
                children: isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                  "Saving…"
                ] }) : "Start Tracking 🚀"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                className: "w-full h-11 rounded-2xl text-sm text-muted-foreground",
                onClick: () => setStep(0),
                disabled: isPending,
                "data-ocid": "back-btn",
                children: "← Back"
              }
            )
          ] })
        ] })
      ] })
    }
  );
}
export {
  OnboardingPage as default
};
