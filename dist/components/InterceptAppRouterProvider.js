"use client";
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterceptAppRouterProvider = InterceptAppRouterProvider;
const app_router_context_shared_runtime_1 = require("next/dist/shared/lib/app-router-context.shared-runtime");
const react_1 = __importDefault(require("react"));
const useInterceptedAppRouter_1 = require("../hooks/useInterceptedAppRouter");
function InterceptAppRouterProvider({ guardMapRef, children, }) {
    const interceptedRouter = (0, useInterceptedAppRouter_1.useInterceptedAppRouter)({ guardMapRef });
    if (!interceptedRouter) {
        return react_1.default.createElement(react_1.default.Fragment, null, children);
    }
    return (react_1.default.createElement(app_router_context_shared_runtime_1.AppRouterContext.Provider, { value: interceptedRouter }, children));
}
