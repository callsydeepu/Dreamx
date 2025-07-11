import React, { useState, useEffect } from "react";
import { ArrowLeft, Check, CreditCard, Truck, Eye, MapPin, Phone, Mail, User } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";

export const CheckoutPage = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, getTotalPrice, clearCart, addToOrderHistory } = useCart();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  // Get checkout data from location state (for direct buy)
  const directBuyItem = location.state?.directBuyItem;
  const checkoutItems = directBuyItem ? [directBuyItem] : cartItems;
  const totalAmount = directBuyItem ? directBuyItem.price * directBuyItem.quantity : getTotalPrice();

  // Form states
  const [shippingData, setShippingData] = useState({
    firstName: user?.username?.split(' ')[0] || '',
    lastName: user?.username?.split(' ')[1] || '',
    country: 'India',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    phone: '',
    useAsBilling: true
  });

  const [paymentData, setPaymentData] = useState({
    method: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  // Redirect if no items to checkout
  useEffect(() => {
    if (checkoutItems.length === 0) {
      navigate('/cart');
    }
  }, [checkoutItems, navigate]);

  const steps = [
    { id: 1, title: 'Shipping', icon: Truck },
    { id: 2, title: 'Payment', icon: CreditCard },
    { id: 3, title: 'Review', icon: Eye }
  ];

  const handleInputChange = (section: 'shipping' | 'payment', field: string, value: string) => {
    if (section === 'shipping') {
      setShippingData(prev => ({ ...prev, [field]: value }));
    } else {
      setPaymentData(prev => ({ ...prev, [field]: value }));
    }
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return shippingData.firstName && shippingData.lastName && shippingData.address && 
               shippingData.city && shippingData.state && shippingData.postalCode && shippingData.phone;
      case 2:
        return paymentData.method === 'cod' || 
               (paymentData.cardNumber && paymentData.expiryDate && paymentData.cvv && paymentData.cardName);
      default:
        return true;
    }
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Add items to order history
    addToOrderHistory(checkoutItems);
    
    // Clear cart if not direct buy
    if (!directBuyItem) {
      clearCart();
    }
    
    setIsProcessing(false);
    
    // Navigate to success page
    navigate('/order-success', {
      state: {
        orderData: {
          items: checkoutItems,
          total: totalAmount,
          shipping: shippingData,
          payment: paymentData,
          orderId: `ORD${Date.now()}`
        }
      }
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Shipping Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  value={shippingData.firstName}
                  onChange={(e) => handleInputChange('shipping', 'firstName', e.target.value)}
                  className="w-full h-12 px-4 border border-gray-300 rounded-[1px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="John"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  value={shippingData.lastName}
                  onChange={(e) => handleInputChange('shipping', 'lastName', e.target.value)}
                  className="w-full h-12 px-4 border border-gray-300 rounded-[1px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country/Region
              </label>
              <select
                value={shippingData.country}
                onChange={(e) => handleInputChange('shipping', 'country', e.target.value)}
                className="w-full h-12 px-4 border border-gray-300 rounded-[1px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                <option value="India">🇮🇳 India (INR)</option>
                <option value="United States">🇺🇸 United States (USD)</option>
                <option value="United Kingdom">🇬🇧 United Kingdom (GBP)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <input
                type="text"
                value={shippingData.address}
                onChange={(e) => handleInputChange('shipping', 'address', e.target.value)}
                className="w-full h-12 px-4 border border-gray-300 rounded-[1px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="123 Main Street, Apartment 4B"
              />
              <button className="text-blue-600 text-sm mt-2 hover:underline">
                Add another line
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <input
                  type="text"
                  value={shippingData.city}
                  onChange={(e) => handleInputChange('shipping', 'city', e.target.value)}
                  className="w-full h-12 px-4 border border-gray-300 rounded-[1px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Mumbai"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State
                </label>
                <select
                  value={shippingData.state}
                  onChange={(e) => handleInputChange('shipping', 'state', e.target.value)}
                  className="w-full h-12 px-4 border border-gray-300 rounded-[1px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  <option value="">Select State</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Gujarat">Gujarat</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Postal Code
                </label>
                <input
                  type="text"
                  value={shippingData.postalCode}
                  onChange={(e) => handleInputChange('shipping', 'postalCode', e.target.value)}
                  className="w-full h-12 px-4 border border-gray-300 rounded-[1px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="400001"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              <input
                type="tel"
                value={shippingData.phone}
                onChange={(e) => handleInputChange('shipping', 'phone', e.target.value)}
                className="w-full h-12 px-4 border border-gray-300 rounded-[1px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="+91 98765 43210"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="useAsBilling"
                checked={shippingData.useAsBilling}
                onChange={(e) => handleInputChange('shipping', 'useAsBilling', e.target.checked.toString())}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label htmlFor="useAsBilling" className="ml-2 text-sm text-gray-700">
                Use as billing address
              </label>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Payment Method</h2>
            
            {/* Payment Method Selection */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <input
                  type="radio"
                  id="card"
                  name="paymentMethod"
                  value="card"
                  checked={paymentData.method === 'card'}
                  onChange={(e) => handleInputChange('payment', 'method', e.target.value)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                />
                <label htmlFor="card" className="text-sm font-medium text-gray-700">
                  Credit/Debit Card
                </label>
              </div>
              
              <div className="flex items-center space-x-4">
                <input
                  type="radio"
                  id="upi"
                  name="paymentMethod"
                  value="upi"
                  checked={paymentData.method === 'upi'}
                  onChange={(e) => handleInputChange('payment', 'method', e.target.value)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                />
                <label htmlFor="upi" className="text-sm font-medium text-gray-700">
                  UPI Payment
                </label>
              </div>
              
              <div className="flex items-center space-x-4">
                <input
                  type="radio"
                  id="cod"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentData.method === 'cod'}
                  onChange={(e) => handleInputChange('payment', 'method', e.target.value)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                />
                <label htmlFor="cod" className="text-sm font-medium text-gray-700">
                  Cash on Delivery
                </label>
              </div>
            </div>

            {/* Card Details */}
            {paymentData.method === 'card' && (
              <div className="space-y-4 p-4 border border-gray-200 rounded-[1px] bg-gray-50">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={paymentData.cardNumber}
                    onChange={(e) => handleInputChange('payment', 'cardNumber', e.target.value)}
                    className="w-full h-12 px-4 border border-gray-300 rounded-[1px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      value={paymentData.expiryDate}
                      onChange={(e) => handleInputChange('payment', 'expiryDate', e.target.value)}
                      className="w-full h-12 px-4 border border-gray-300 rounded-[1px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="MM/YY"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      value={paymentData.cvv}
                      onChange={(e) => handleInputChange('payment', 'cvv', e.target.value)}
                      className="w-full h-12 px-4 border border-gray-300 rounded-[1px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="123"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    value={paymentData.cardName}
                    onChange={(e) => handleInputChange('payment', 'cardName', e.target.value)}
                    className="w-full h-12 px-4 border border-gray-300 rounded-[1px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="John Doe"
                  />
                </div>
              </div>
            )}

            {/* UPI Details */}
            {paymentData.method === 'upi' && (
              <div className="p-4 border border-gray-200 rounded-[1px] bg-gray-50">
                <p className="text-sm text-gray-600 mb-4">
                  You will be redirected to your UPI app to complete the payment.
                </p>
                <div className="flex items-center space-x-4">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" className="h-8" />
                  <span className="text-sm font-medium">Unified Payments Interface</span>
                </div>
              </div>
            )}

            {/* COD Details */}
            {paymentData.method === 'cod' && (
              <div className="p-4 border border-gray-200 rounded-[1px] bg-gray-50">
                <p className="text-sm text-gray-600">
                  Pay with cash when your order is delivered. Additional charges may apply.
                </p>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Review Your Order</h2>
            
            {/* Shipping Details */}
            <Card className="border border-gray-200 rounded-[1px]">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Shipping Address
                </h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p className="font-medium text-gray-900">{shippingData.firstName} {shippingData.lastName}</p>
                  <p>{shippingData.address}</p>
                  <p>{shippingData.city}, {shippingData.state} {shippingData.postalCode}</p>
                  <p>{shippingData.country}</p>
                  <p className="flex items-center mt-2">
                    <Phone className="w-4 h-4 mr-1" />
                    {shippingData.phone}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Payment Details */}
            <Card className="border border-gray-200 rounded-[1px]">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Payment Method
                </h3>
                <div className="text-sm text-gray-600">
                  {paymentData.method === 'card' && (
                    <p>Credit/Debit Card ending in {paymentData.cardNumber.slice(-4)}</p>
                  )}
                  {paymentData.method === 'upi' && <p>UPI Payment</p>}
                  {paymentData.method === 'cod' && <p>Cash on Delivery</p>}
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card className="border border-gray-200 rounded-[1px]">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Order Items</h3>
                <div className="space-y-4">
                  {checkoutItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 pb-4 border-b border-gray-200 last:border-b-0">
                      <div className="w-16 h-16 bg-gray-100 rounded-[1px] overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-600">Size: {item.size}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">₹{item.price * item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  if (checkoutItems.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="h-10 w-10 rounded-[1px] hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <h1 className="text-lg font-semibold text-gray-900">Checkout</h1>
          
          <div className="w-10" /> {/* Spacer */}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Steps */}
          <div className="lg:col-span-2">
            {/* Step Indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                      currentStep >= step.id 
                        ? 'bg-blue-600 border-blue-600 text-white' 
                        : 'border-gray-300 text-gray-400'
                    }`}>
                      {currentStep > step.id ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <step.icon className="w-5 h-5" />
                      )}
                    </div>
                    <div className="ml-3">
                      <p className={`text-sm font-medium ${
                        currentStep >= step.id ? 'text-blue-600' : 'text-gray-400'
                      }`}>
                        Step {step.id < 10 ? `0${step.id}` : step.id}
                      </p>
                      <p className={`text-lg font-semibold ${
                        currentStep >= step.id ? 'text-gray-900' : 'text-gray-400'
                      }`}>
                        {step.title}
                      </p>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`hidden sm:block w-16 h-0.5 ml-8 ${
                        currentStep > step.id ? 'bg-blue-600' : 'bg-gray-300'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Step Content */}
            <Card className="border border-gray-200 rounded-[1px] bg-white">
              <CardContent className="p-6 lg:p-8">
                {renderStepContent()}
                
                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                  <Button
                    variant="outline"
                    onClick={handlePrevStep}
                    disabled={currentStep === 1}
                    className="px-6 py-3 rounded-[1px]"
                  >
                    Previous
                  </Button>
                  
                  {currentStep < 3 ? (
                    <Button
                      onClick={handleNextStep}
                      disabled={!validateStep(currentStep)}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-[1px]"
                    >
                      Continue
                    </Button>
                  ) : (
                    <Button
                      onClick={handlePlaceOrder}
                      disabled={isProcessing}
                      className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-[1px]"
                    >
                      {isProcessing ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Processing...
                        </div>
                      ) : (
                        'Place Order'
                      )}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <Card className="border border-gray-200 rounded-[1px] bg-white sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Summary</h3>
                
                {/* Order Items */}
                <div className="space-y-4 mb-6">
                  {checkoutItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-[1px] overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                        <p className="text-xs text-gray-600">Size: {item.size} • Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-semibold text-gray-900">₹{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">₹{totalAmount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span className="text-gray-900">₹0</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Import duties</span>
                    <span className="text-gray-900">₹0</span>
                  </div>
                </div>

                {/* Total */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-blue-600">₹{totalAmount}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Import duties included</p>
                </div>

                {/* Continue Button (Mobile) */}
                {currentStep < 3 && (
                  <Button
                    onClick={handleNextStep}
                    disabled={!validateStep(currentStep)}
                    className="w-full mt-6 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-[1px] lg:hidden"
                  >
                    SAVE & CONTINUE
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};