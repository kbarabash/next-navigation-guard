"use client";
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavigationGuardProvider = NavigationGuardProvider;
const react_1 = __importStar(require("react"));
const useInterceptPageUnload_1 = require("../hooks/useInterceptPageUnload");
const useInterceptPopState_1 = require("../hooks/useInterceptPopState");
const InterceptAppRouterProvider_1 = require("./InterceptAppRouterProvider");
const InterceptPagesRouterProvider_1 = require("./InterceptPagesRouterProvider");
const NavigationGuardProviderContext_1 = require("./NavigationGuardProviderContext");
function NavigationGuardProvider({ children, }) {
    const guardMapRef = (0, react_1.useRef)(new Map());
    (0, useInterceptPopState_1.useInterceptPopState)({ guardMapRef });
    (0, useInterceptPageUnload_1.useInterceptPageUnload)({ guardMapRef });
    return (react_1.default.createElement(NavigationGuardProviderContext_1.NavigationGuardProviderContext.Provider, { value: guardMapRef },
        react_1.default.createElement(InterceptAppRouterProvider_1.InterceptAppRouterProvider, { guardMapRef: guardMapRef },
            react_1.default.createElement(InterceptPagesRouterProvider_1.InterceptPagesRouterProvider, { guardMapRef: guardMapRef }, children))));
}
