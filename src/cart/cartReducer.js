export const initialState = { items: [], warning: null };

export function cartReducer(state, action) {
  switch (action.type) {
    case 'HYDRATE_FROM_LS': {
      return action.payload || initialState;
    }
    case 'ADD_ITEM': {
      const item = action.payload;
      const isSub = item.type === 'subscription';
      if (isSub && state.items.some(i => i.type === 'subscription')) {
        return { ...state, warning: 'Only one subscription can be added at a time.' };
      }
      const existing = state.items.find(i => i.id === item.id);
      const items = existing
        ? state.items.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i)
        : [...state.items, { ...item, qty: 1 }];
      return { ...state, items, warning: null };
    }
    case 'INC_QTY': {
      const id = action.payload;
      const items = state.items.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i);
      return { ...state, items };
    }
    case 'DEC_QTY': {
      const id = action.payload;
      const items = state.items
        .map(i => i.id === id ? { ...i, qty: i.qty - 1 } : i)
        .filter(i => i.qty > 0);
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
      return { ...state, warning: null };
    }
    default:
      return state;
  }
}
