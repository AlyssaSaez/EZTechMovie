// Cart state + rules. I keep a single-subscription policy here
// so the UI logic can stay simple and just reflect state.

export const initialState = { items: [], warning: null };

export function cartReducer(state, action) {
  switch (action.type) {
    case 'HYDRATE_FROM_LS': {
      // On load, pull persisted state if present
      return action.payload || initialState;
    }

    case 'ADD_ITEM': {
      const item = action.payload;
      const isSub = item.type === 'subscription';

      if (isSub) {
        // Enforce one-subscription rule at the reducer level.
        const existingSub = state.items.find(i => i.type === 'subscription');
        if (existingSub) {
          // Don’t add or increment another subscription; just warn.
          return { ...state, warning: 'Only one subscription can be added at a time.' };
        }
        // First subscription: force qty to 1 regardless of incoming payload.
        return {
          ...state,
          items: [...state.items, { ...item, qty: 1 }],
          warning: null
        };
      }

      // Accessories: normal stacking behavior
      const existing = state.items.find(i => i.id === item.id);
      const items = existing
        ? state.items.map(i => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i))
        : [...state.items, { ...item, qty: 1 }];

      return { ...state, items, warning: null };
    }

    case 'INC_QTY': {
      const id = action.payload;
      const target = state.items.find(i => i.id === id);

      // If the target is a subscription, don’t allow qty > 1.
      if (target?.type === 'subscription') {
        return { ...state, warning: 'Subscription quantity is limited to 1.' };
      }

      const items = state.items.map(i =>
        i.id === id ? { ...i, qty: i.qty + 1 } : i
      );
      return { ...state, items };
    }

    case 'DEC_QTY': {
      const id = action.payload;
      const items = state.items
        .map(i => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
        .filter(i => i.qty > 0); // drop if it hits 0
      return { ...state, items };
    }

    case 'REMOVE_ITEM': {
      const id = action.payload;
      const items = state.items.filter(i => i.id !== id);
      return { ...state, items };
    }

    case 'CLEAR_CART': {
      return { ...state, items: [] };
    }

    case 'CLEAR_WARNING': {
      // Clear any warning when the user dismisses the toast
      return { ...state, warning: null };
    }

    default:
      return state;
  }
}
