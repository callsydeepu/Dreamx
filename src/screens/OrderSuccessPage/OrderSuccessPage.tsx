import React, { useEffect } from "react";
import { Check, Package, Truck, Home, Download, Share2, ShoppingBag } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { useNavigate, useLocation } from "react-router-dom";

export const OrderSuccessPage = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderData = location.state?.orderData;

  useEffect(() => {
    if (!orderData) {
      navigate('/');
    }
    
    // Clear the location state after component mounts to prevent back navigation issues
    const timer = setTimeout(() => {
      window.history.replaceState({}, '', window.location.pathname);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [orderData, navigate]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Order from Dream X Store',
        text: `I just placed an order for ₹${orderData?.total} at Dream X Store!`,
        url: window.location.origin
      });
    }
  };

  const handleDownloadInvoice = () => {
    // Simulate invoice download
    alert('Invoice download will be available soon!');
  };

  const handleGoToCart = () => {
    navigate('/cart');
  };

  const handleContinueShopping = () => {
    navigate('/dashboard');
  };
  if (!orderData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">Thank you for your purchase. Your order has been successfully placed.</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Info */}
            <Card className="border border-gray-200 rounded-[1px] bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Order Details</h2>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100 rounded-[1px]">
                    Confirmed
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Order Number</p>
                    <p className="font-semibold text-gray-900">{orderData.orderId}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Order Date</p>
                    <p className="font-semibold text-gray-900">{new Date().toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Payment Method</p>
                    <p className="font-semibold text-gray-900 capitalize">
                      {orderData.payment.method === 'cod' ? 'Cash on Delivery' : 
                       orderData.payment.method === 'upi' ? 'UPI Payment' : 'Card Payment'}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Total Amount</p>
                    <p className="font-semibold text-gray-900">₹{orderData.total}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card className="border border-gray-200 rounded-[1px] bg-white">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Truck className="w-5 h-5 mr-2" />
                  Shipping Address
                </h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p className="font-medium text-gray-900">
                    {orderData.shipping.firstName} {orderData.shipping.lastName}
                  </p>
                  <p>{orderData.shipping.address}</p>
                  <p>{orderData.shipping.city}, {orderData.shipping.state} {orderData.shipping.postalCode}</p>
                  <p>{orderData.shipping.country}</p>
                  <p className="mt-2">{orderData.shipping.phone}</p>
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card className="border border-gray-200 rounded-[1px] bg-white">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Package className="w-5 h-5 mr-2" />
                  Order Items
                </h3>
                <div className="space-y-4">
                  {orderData.items.map((item, index) => (
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
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
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

          {/* Order Summary & Actions */}
          <div className="lg:col-span-1 space-y-6">
            {/* Order Summary */}
            <Card className="border border-gray-200 rounded-[1px] bg-white">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">₹{orderData.total}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span className="text-gray-900">₹0</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-xl font-bold text-green-600">₹{orderData.total}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border border-gray-200 rounded-[1px] bg-white">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                
                <div className="space-y-3">
                  <Button
                    onClick={handleDownloadInvoice}
                    variant="outline"
                    className="w-full justify-start rounded-[1px]"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Invoice
                  </Button>
                  
                  <Button
                    onClick={handleShare}
                    variant="outline"
                    className="w-full justify-start rounded-[1px]"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Order
                  </Button>
                  
                  <Button
                    onClick={handleGoToCart}
                    variant="outline"
                    className="w-full justify-start rounded-[1px]"
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Go to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card className="border border-gray-200 rounded-[1px] bg-blue-50">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">What's Next?</h3>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">1</span>
                    </div>
                    <div>
                      <p className="font-medium text-blue-900">Order Confirmation</p>
                      <p className="text-blue-700">You'll receive an email confirmation shortly</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">2</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Processing</p>
                      <p className="text-gray-600">We'll prepare your order for shipping</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">3</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Delivery</p>
                      <p className="text-gray-600">Expected delivery in 3-5 business days</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Button
            onClick={handleContinueShopping}
            className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-[1px]"
          >
            <Home className="w-5 h-5 mr-2" />
            Continue Shopping
          </Button>
          
          <Button
            onClick={handleGoToCart}
            variant="outline"
            className="flex-1 h-12 border-gray-300 rounded-[1px]"
          >
            <ShoppingBag className="w-5 h-5 mr-2" />
            Go to Cart
          </Button>
        </div>
      </main>
    </div>
  );
};