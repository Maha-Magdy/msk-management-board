import "@testing-library/jest-dom";

// Polyfill structuredClone for Jest
if (typeof global.structuredClone === "undefined") {
  global.structuredClone = (val) => JSON.parse(JSON.stringify(val));
}

// Mock window.matchMedia for Chakra and responsive components
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

Object.defineProperty(HTMLElement.prototype, "scrollTo", {
  configurable: true,
  value: () => {}, // noop
});

global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// globalThis.fetch = require('jest-fetch-mock');
