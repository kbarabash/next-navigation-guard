import {
  AppRouterContext,
  AppRouterInstance,
} from "next/dist/shared/lib/app-router-context.shared-runtime";
import { MutableRefObject, useContext, useMemo } from "react";
import { GuardDef } from "../types";

export function useInterceptedAppRouter({
  guardMapRef,
}: {
  guardMapRef: MutableRefObject<Map<string, GuardDef>>;
}) {
  const origRouter = useContext(AppRouterContext);

  return useMemo((): AppRouterInstance | null => {
    if (!origRouter) return null;

    const guarded = async (
      type: any, //"push" | "replace" | "refresh" | "forward" | "back",
      to: string,
      accepted: () => void
    ) => {
      const defs = [...guardMapRef.current.values()];
      for (const { enabled, callback } of defs) {
        if (!enabled({ to, type })) continue;

        const confirm = await callback({ to, type });
        if (!confirm) return;
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
