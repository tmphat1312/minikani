export function curry(fn) {
  return function curried(...args) {
    if (fn.length !== args.length) {
      return curried.bind(null, ...args);
    }
    return fn(...args);
  };
}

export const multipleTexts = curry(function ($, scope$, selector) {
  return scope$
    .find(selector)
    .map((_, el) => $(el).text().trim())
    .toArray();
});

export const multipleHTML = curry(function ($, scope$, selector) {
  return scope$
    .find(selector)
    .map((_, el) => $(el).html().trim())
    .toArray();
});

export const customMapping = curry(function ($, scope$, selector, fn) {
  return scope$
    .find(selector)
    .map((_, el) => fn($(el)))
    .toArray();
});

export function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
