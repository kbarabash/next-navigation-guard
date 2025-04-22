"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useInterceptedAppRouter = useInterceptedAppRouter;
const app_router_context_shared_runtime_1 = require("next/dist/shared/lib/app-router-context.shared-runtime");
const react_1 = require("react");
function useInterceptedAppRouter({ guardMapRef, }) {
    const origRouter = (0, react_1.useContext)(app_router_context_shared_runtime_1.AppRouterContext);
    return (0, react_1.useMemo)(() => {
        if (!origRouter)
            return null;
        const guarded = async (type, //"push" | "replace" | "refresh" | "forward" | "back",
        to, accepted) => {
            const defs = [...guardMapRef.current.values()];
            for (const { enabled, callback } of defs) {
                if (!enabled({ to, type }))
                    continue;
                const confirm = await callback({ to, type });
                if (!confirm)
                    return;
            }
            accepted();
        };
        return {
            ...origRouter,
            prefetch: (href, ...args) => {
                guarded("prefetch", href, () => origRouter.prefetch(href, ...args));
            },
            push: (href, ...args) => {
                guarded("push", href, () => origRouter.push(href, ...args));
            },
            replace: (href, ...args) => {
                guarded("replace", href, () => origRouter.replace(href, ...args));
            },
            refresh: (...args) => {
                guarded("refresh", location.href, () => origRouter.refresh(...args));
            },
        };
    }, [origRouter]);
}
