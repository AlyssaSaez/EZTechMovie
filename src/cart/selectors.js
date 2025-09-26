export const getCartCount = items => items.reduce((n, i) => n + i.qty, 0);
export const getCartTotal = items => items.reduce((s, i) => s + i.price * i.qty, 0);
export const hasSubscription = items => items.some(i => i.type === 'subscription');
