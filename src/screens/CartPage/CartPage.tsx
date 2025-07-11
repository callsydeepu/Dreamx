import React from 'react';
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { useCart } from '../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

export const CartPage: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotalItems, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const handleProductClick = (slug: string) => {
    navigate(`/product/${slug}`);
  };

  const handleCheckout = () => {
    // Handle checkout functionality
    console.log('Proceeding to checkout with items:', cartItems);
    alert(`Proceeding to checkout with ${getTotalItems()} items\nTotal: ₹${getTotalPrice()}`);
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="h-10 w-10 rounded-[40px] hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-gray-700" />
            <h1 className="text-lg font-semibold">Shopping Bag</h1>
            {getTotalItems() > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {getTotalItems()}
              </span>
            )}
          </div>
          
          <div className="w-10" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {cartItems.length === 0 ? (
          /* Empty Cart State */
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <ShoppingBag className="w-24 h-24 text-gray-300 mb-6" />
            <h2 className="text-2xl font-medium text-gray-900 mb-2">Your bag is empty</h2>
            <p className="text-gray-500 mb-6 max-w-md">
              Looks like you haven't added anything to your bag yet. Start shopping to fill it up!
            </p>
            <Button 
              onClick={handleContinueShopping}
              className="bg-black text-white hover:bg-gray-800 px-8 py-3 rounded-[30px]"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          /* Cart Items */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Items in your bag</h2>
                <Button
                  variant="ghost"
                  onClick={clearCart}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Clear all
                </Button>
              </div>

              {cartItems.map((item) => (
                <Card key={item.id} className="border border-gray-200 rounded-[1px] overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div 
                        className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-100 rounded-[1px] overflow-hidden cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0"
                        onClick={() => handleProductClick(item.slug)}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <h3 
                            className="font-medium text-lg text-gray-900 cursor-pointer hover:text-blue-600 transition-colors"
                            onClick={() => handleProductClick(item.slug)}
                          >
                            {item.name}
                          </h3>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 h-8 w-8 flex-shrink-0"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <p className="text-sm text-gray-500 mb-2">Size: {item.size}</p>
                        <p className="text-lg font-semibold text-gray-900 mb-4">₹{item.price}</p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-600">Quantity:</span>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="h-8 w-8 rounded-[1px]"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-8 w-8 rounded-[1px]"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="border border-gray-200 rounded-[1px] sticky top-24">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal ({getTotalItems()} items)</span>
                      <span>₹{getTotalPrice()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax</span>
                      <span>₹0</span>
                    </div>
                    <hr className="my-3" />
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>₹{getTotalPrice()}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button 
                      onClick={handleCheckout}
                      className="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-[30px] h-12 text-base font-medium"
                    >
                      Proceed to Checkout
                    </Button>
                    
                    <Button 
                      onClick={handleContinueShopping}
                      variant="outline"
                      className="w-full border-black text-black hover:bg-gray-50 rounded-[30px] h-12 text-base font-medium"
                    >
                      Continue Shopping
                    </Button>
                  </div>

                  {/* Security Badge */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span>Secure checkout guaranteed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};