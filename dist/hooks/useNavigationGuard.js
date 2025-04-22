"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useNavigationGuard = useNavigationGuard;
const react_1 = require("react");
const NavigationGuardProviderContext_1 = require("../components/NavigationGuardProviderContext");
const useIsomorphicLayoutEffect_1 = require("./useIsomorphicLayoutEffect");
// Should memoize callback func
function useNavigationGuard(options) {
    const callbackId = (0, react_1.useId)();
    const guardMapRef = (0, react_1.useContext)(NavigationGuardProviderContext_1.NavigationGuardProviderContext);
    if (!guardMapRef)
        throw new Error("useNavigationGuard must be used within a NavigationGuardProvider");
    const [pendingState, setPendingState] = (0, react_1.useState)(null);
    (0, useIsomorphicLayoutEffect_1.useIsomorphicLayoutEffect)(() => {
        const callback = (params) => {
            if (options.confirm) {
                return options.confirm(params);
            }
            return new Promise((resolve) => {
                setPendingState({ resolve });
            });
        };
        const enabled = options.enabled;
        guardMapRef.current.set(callbackId, {
            enabled: typeof enabled === "function" ? enabled : () => enabled !== null && enabled !== void 0 ? enabled : true,
            callback,
        });
        return () => {
            guardMapRef.current.delete(callbackId);
        };
    }, [options.confirm, options.enabled]);
    const active = pendingState !== null;
    const accept = (0, react_1.useCallback)(() => {
        if (!pendingState)
            return;
        pendingState.resolve(true);
        setPendingState(null);
    }, [pendingState]);
    const reject = (0, react_1.useCallback)(() => {
        if (!pendingState)
            return;
        pendingState.resolve(false);
        setPendingState(null);
    }, [pendingState]);
    return { active, accept, reject };
}
