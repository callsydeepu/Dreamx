import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
  image: string;
  slug: string;
  brand?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getOrderHistory: () => CartItem[];
  addToOrderHistory: (items: CartItem[]) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orderHistory, setOrderHistory] = useState<CartItem[]>([]);

  const addToCart = (item: Omit<CartItem, 'id'>) => {
    const id = `${item.name}-${item.size}-${Date.now()}`;
    const existingItem = cartItems.find(
      cartItem => cartItem.name === item.name && cartItem.size === item.size
    );

    if (existingItem) {
      updateQuantity(existingItem.id, existingItem.quantity + item.quantity);
    } else {
      setCartItems(prev => [...prev, { ...item, id }]);
    }
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getOrderHistory = () => {
    return orderHistory;
  };

  const addToOrderHistory = (items: CartItem[]) => {
    setOrderHistory(prev => [...prev, ...items]);
  };
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
        getOrderHistory,
        addToOrderHistory,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};