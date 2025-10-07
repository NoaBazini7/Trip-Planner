  const mainColors: Map<string, string> = new Map([
    ['museum', 'oklch(93.2% 0.032 255.585)'], //blue-100
    ['landmark', 'oklch(96.7% 0.001 286.375)'], //zinc-100
    ['cultural', 'oklch(96.2% 0.059 95.617)'], //amber-100
    ['nature', 'oklch(96.2% 0.044 156.743)'], //green-100
    ['entertainment', 'oklch(93.6% 0.032 17.717)'], //red-100
    ['meal', 'oklch(94.6% 0.033 307.174)'], //purple-100
  ]);
  const secondaryColors: Map<string, string> = new Map([
    ['museum', 'oklch(70.2% 0.12 255.585)'], //blue-600
    ['landmark', 'oklch(36.3% 0.14 286.375)'], //zinc-600
    ['cultural', 'oklch(74.1% 0.22 95.617)'], //amber-600
    ['nature', 'oklch(49.2% 0.18 156.743)'], //green-600
    ['entertainment', 'oklch(56.5% 0.12 17.717)'], //red-600
    ['meal', 'oklch(48.2% 0.13 307.174)'], //purple-600
  ]);

  export { mainColors, secondaryColors };