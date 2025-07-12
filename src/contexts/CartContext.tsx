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
  clearOrderHistory: () => void;
  getAllOrders: () => Order[];
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  brandName: string;
  productName: string;
  quantity: number;
  totalAmount: number;
  status: string;
  orderDate: string;
  shippingAddress: string;
  items: CartItem[];
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
  const [allOrders, setAllOrders] = useState<Order[]>([
    {
      id: "ORD001",
      customerName: "John Doe",
      customerEmail: "john@example.com",
      brandName: "ROCKAGE",
      productName: "Oversized T-shirt",
      quantity: 2,
      totalAmount: 1398,
      status: "Delivered",
      orderDate: "2025-01-15",
      shippingAddress: "123 Customer Street, Mumbai, 400002",
      items: [
        {
          id: "1",
          name: "Oversized T-shirt",
          price: 699,
          size: "M",
          quantity: 2,
          image: "https://i.postimg.cc/fRWRqwYP/GPT-model.png",
          slug: "oversized-t-shirt",
          brand: "ROCKAGE"
        }
      ]
    },
    {
      id: "ORD002",
      customerName: "Jane Smith",
      customerEmail: "jane@example.com",
      brandName: "StyleCraft",
      productName: "Designer Hoodie",
      quantity: 1,
      totalAmount: 2499,
      status: "Shipped",
      orderDate: "2025-01-20",
      shippingAddress: "456 Buyer Avenue, Delhi, 110003",
      items: [
        {
          id: "2",
          name: "Designer Hoodie",
          price: 2499,
          size: "L",
          quantity: 1,
          image: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
          slug: "designer-hoodie",
          brand: "StyleCraft"
        }
      ]
    }
  ]);

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
  
  // Clear order history (useful for testing or user logout)
  const clearOrderHistory = () => {
    setOrderHistory([]);
  };

  const getAllOrders = () => {
    return allOrders;
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
        clearOrderHistory,
        getAllOrders,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};