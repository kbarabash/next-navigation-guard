"use client";
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterceptPagesRouterProvider = InterceptPagesRouterProvider;
const router_context_shared_runtime_1 = require("next/dist/shared/lib/router-context.shared-runtime");
const react_1 = __importDefault(require("react"));
const useInterceptedPagesRouter_1 = require("../hooks/useInterceptedPagesRouter");
function InterceptPagesRouterProvider({ guardMapRef, children, }) {
    const interceptedRouter = (0, useInterceptedPagesRouter_1.useInterceptedPagesRouter)({ guardMapRef });
    if (!interceptedRouter) {
        return react_1.default.createElement(react_1.default.Fragment, null, children);
    }
    return (react_1.default.createElement(router_context_shared_runtime_1.RouterContext.Provider, { value: interceptedRouter }, children));
}
