import { createRulesManager } from '../src/rules-manager';
import { createClientStyleElement } from '../src/style-element';

describe('createRulesManager', () => {
  test('should has 2 rules', () => {
    const styleElement = createClientStyleElement();

    const rulesManager = createRulesManager(styleElement);

    // first rule
    rulesManager.add('a', 'b', 'c');
    expect(styleElement.cssRules.length).toBe(1);
    const firstRule = styleElement.cssRules[0] as any;
    expect(firstRule.selectorText).toBe('.a');
    expect(firstRule.style['b']).toBe('c');

    // second rule
    rulesManager.add('d', 'e', 'f');
    expect(styleElement.cssRules.length).toBe(2);
    const secondRule = styleElement.cssRules[1] as any;
    expect(secondRule.selectorText).toBe('.d');
    expect(secondRule.style['e']).toBe('f');

    expect(rulesManager.getStyleSheet()).toBe(`.a {b: c;}
.d {e: f;}`);

    expect(rulesManager.getStyleTags()).toBe(`<style>
.a {b: c;}
.d {e: f;}
</style>`);
  });

  test('should handle Pseudo Elements', () => {
    const styleElement = createClientStyleElement();
    const rulesManager = createRulesManager(styleElement);

    [
      '::after',
      '::before',
      '::first-letter',
      '::first-line',
      '::marker',
      '::selection',
    ].forEach((pseudoElement, index) => {
      const selector = `a${pseudoElement}`; // a::after and ...
      rulesManager.add(selector, 'b', 'c');
      expect(styleElement.cssRules.length).toBe(index + 1);
      const firstRule = styleElement.cssRules[index] as any;
      expect(firstRule.selectorText).toBe(`.${selector}`);
      expect(firstRule.style['b']).toBe('c');
    });

    expect(rulesManager.getStyleSheet()).toBe(`.a::after {b: c;}
.a::before {b: c;}
.a::first-letter {b: c;}
.a::first-line {b: c;}
.a::marker {b: c;}
.a::selection {b: c;}`);

    expect(rulesManager.getStyleTags()).toBe(`<style>
.a::after {b: c;}
.a::before {b: c;}
.a::first-letter {b: c;}
.a::first-line {b: c;}
.a::marker {b: c;}
.a::selection {b: c;}
</style>`);
  });

  test('should handle Pseudo Classes', () => {
    const styleElement = createClientStyleElement();
    const rulesManager = createRulesManager(styleElement);

    [
      ':active',
      ':first-child',
      ':first-of-type',
      ':lang(it)',
      ':not(p)',
      ':nth-child(2)',
    ].forEach((pseudoElement, index) => {
      const selector = `a${pseudoElement}`; // a:active and ...
      rulesManager.add(selector, 'b', 'c');
      expect(styleElement.cssRules.length).toBe(index + 1);
      const firstRule = styleElement.cssRules[index] as any;
      expect(firstRule.selectorText).toBe(`.${selector}`);
      expect(firstRule.style['b']).toBe('c');
    });

    expect(rulesManager.getStyleSheet()).toBe(`.a:active {b: c;}
.a:first-child {b: c;}
.a:first-of-type {b: c;}
.a:lang(it) {b: c;}
.a:not(p) {b: c;}
.a:nth-child(2) {b: c;}`);

    expect(rulesManager.getStyleTags()).toBe(`<style>
.a:active {b: c;}
.a:first-child {b: c;}
.a:first-of-type {b: c;}
.a:lang(it) {b: c;}
.a:not(p) {b: c;}
.a:nth-child(2) {b: c;}
</style>`);
  });
});
