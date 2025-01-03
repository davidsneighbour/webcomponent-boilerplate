// testing for Javascript code
import { describe, it, expect } from 'vitest';

describe('MyComponent', () => {
  it('should exist', () => {
    const element = document.createElement('my-component');
    expect(element).toBeDefined();
  });
});
