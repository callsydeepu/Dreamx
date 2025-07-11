import React, { useState } from "react";
import { ArrowLeft, Settings, LogOut, Package, Heart, Star, Edit3, MapPin, Share2, MessageCircle, Globe, Linkedin, Twitter, Plus } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import { AddProductModal } from "../../components/AddProductModal";

export const ProfilePage = (): JSX.Element => {
  const navigate = useNavigate();
  const { user, logout, isBrand } = useAuth();
  const { cartItems } = useCart();
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [activeTab, setActiveTab] = useState("Products");

  if (!user) {
    navigate('/auth');
    return <div></div>;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Mock orders data - in real app, this would come from API
  const userOrders = [
    {
      id: "ORD001",
      productName: "Oversized t shirt",
      brand: "ROCKAGE",
      price: 699,
      status: "Delivered",
      date: "2024-01-15",
      image: "https://i.postimg.cc/fRWRqwYP/GPT-model.png"
    },
    {
      id: "ORD002", 
      productName: "Honor Bound Tee",
      brand: "ROCKAGE",
      price: 799,
      status: "Shipped",
      date: "2024-01-20",
      image: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop"
    }
  ];

  const brandProducts = [
    {
      id: 1,
      name: "Oversized t shirt",
      price: 699,
      originalPrice: 1399,
      image: "https://i.postimg.cc/fRWRqwYP/GPT-model.png",
      sales: 45
    },
    {
      id: 2,
      name: "Honor Bound Tee",
      price: 799,
      originalPrice: 1299,
      image: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
      sales: 32
    },
    {
      id: 3,
      name: "Genjutsu Design",
      price: 899,
      originalPrice: 1499,
      image: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
      sales: 28
    }
  ];

  const tabs = isBrand 
    ? ["Products", "Analytics", "Settings"]
    : ["Orders", "Wishlist", "Settings"];

  const getTabContent = () => {
    switch (activeTab) {
      case "Products":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold text-gray-900">Recent Designs</h3>
              <Button
                onClick={() => setShowAddProduct(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white rounded-[1px]"
              >
                Add Product
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {brandProducts.map((product) => (
                <Card key={product.id} className="border border-gray-200 rounded-[1px] overflow-hidden hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="aspect-[4/5] bg-gray-100 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-medium text-gray-900 mb-2">{product.name}</h4>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-gray-900">₹{product.price}</span>
                          <span className="text-xs text-gray-500 line-through">₹{product.originalPrice}</span>
                        </div>
                        <span className="text-xs text-gray-500">{product.sales} sold</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case "Orders":
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-900">My Orders</h3>
            <div className="space-y-4">
              {userOrders.map((order) => (
                <Card key={order.id} className="border border-gray-200 rounded-[1px] overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-[1px] overflow-hidden flex-shrink-0">
                        <img
                          src={order.image}
                          alt={order.productName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900 truncate">{order.productName}</h4>
                            <p className="text-sm text-gray-500">by {order.brand}</p>
                            <p className="text-sm text-gray-500">Order #{order.id} • {order.date}</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="font-semibold text-gray-900">₹{order.price}</p>
                            <Badge 
                              className={`text-xs ${
                                order.status === 'Delivered' 
                                  ? 'bg-green-100 text-green-600 hover:bg-green-100' 
                                  : 'bg-blue-100 text-blue-600 hover:bg-blue-100'
                              } rounded-[1px]`}
                            >
                              {order.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {userOrders.length === 0 && (
                <div className="text-center py-12">
                  <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                  <p className="text-gray-500">Start shopping to see your orders here!</p>
                </div>
              )}
            </div>
          </div>
        );

      case "Analytics":
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-900">Analytics</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card className="border border-gray-200 rounded-[1px]">
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-gray-900">105</p>
                  <p className="text-sm text-gray-500">Total Sales</p>
                </CardContent>
              </Card>
              <Card className="border border-gray-200 rounded-[1px]">
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-gray-900">₹73,500</p>
                  <p className="text-sm text-gray-500">Revenue</p>
                </CardContent>
              </Card>
              <Card className="border border-gray-200 rounded-[1px]">
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-gray-900">4.8</p>
                  <p className="text-sm text-gray-500">Avg Rating</p>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case "Wishlist":
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-900">My Wishlist</h3>
            <div className="text-center py-12">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
              <p className="text-gray-500">Save items you love to see them here!</p>
            </div>
          </div>
        );

      case "Settings":
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-900">Settings</h3>
            <div className="space-y-4">
              <Card className="border border-gray-200 rounded-[1px]">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Account Settings</h4>
                      <p className="text-sm text-gray-500">Update your account information</p>
                    </div>
                    <Button variant="outline" className="rounded-[1px]">
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card className="border border-gray-200 rounded-[1px]">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Privacy Settings</h4>
                      <p className="text-sm text-gray-500">Manage your privacy preferences</p>
                    </div>
                    <Button variant="outline" className="rounded-[1px]">
                      <Settings className="h-4 w-4 mr-2" />
                      Manage
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
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
          
          <h1 className="text-lg font-medium">
            {isBrand ? 'Brand Profile' : 'Profile'}
          </h1>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            className="h-10 w-10 rounded-[1px] hover:bg-gray-100 text-red-600"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Profile Header Card - White background with ROCKAGE content in p-8 */}
        <Card className="border border-gray-200 rounded-[1px] overflow-hidden mb-8 bg-white">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row items-start gap-8">
              {/* Profile Image */}
              <div className="flex flex-col items-center lg:items-start">
                <div className="w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                  {isBrand ? user.brandName?.charAt(0) || 'R' : user.username.charAt(0).toUpperCase()}
                </div>
                
                {/* Verified Brand Badge */}
                <Badge className="bg-blue-500 text-white hover:bg-blue-500 rounded-full px-4 py-2 text-sm font-medium">
                  <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                  Verified Brand
                </Badge>
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center lg:text-left">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {isBrand ? user.brandName : user.username}
                    </h1>
                    <p className="text-gray-600 text-lg">@{user.username}</p>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 justify-center lg:justify-end">
                    {isBrand && (
                      <Button
                        onClick={() => navigate(`/brand/${user.brandName}`)}
                        variant="outline"
                        className="rounded-[1px] border-gray-300"
                      >
                        VISIT BRAND PAGE
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      className="rounded-[1px] border-gray-300"
                    >
                      <Edit3 className="h-4 w-4 mr-2" />
                      EDIT PROFILE
                    </Button>
                  </div>
                </div>

                {/* ROCKAGE Description */}
                <div className="mb-6">
                  <p className="text-gray-600 leading-relaxed">
                    Rockage: Where fashion meets fearless attitude! Celebrate individuality with our premium 100% cotton, 250gsm oversized anime tees. Bold designs like "HONOR BOUND" and "GENJUTSU" in sizes S-XXL. Wear your attitude. Rock your age!
                  </p>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-6 text-sm text-gray-600 mb-6">
                  <span>Joined 2024-01-15</span>
                  <span>•</span>
                  <span>3 Products</span>
                  <span>•</span>
                  <span>3 Designs</span>
                </div>

                {/* Collaborators */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Collaborators</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 rounded-full bg-purple-100 hover:bg-purple-200"
                  >
                    <Plus className="h-3 w-3 text-purple-600" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons (Brand only) */}
        {isBrand && (
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <Button
              onClick={() => setShowAddProduct(true)}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white rounded-[1px] h-12 text-base font-medium"
            >
              Add your Product
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-gray-300 rounded-[1px] h-12 text-base font-medium"
            >
              DASHBOARD
            </Button>
          </div>
        )}

        {/* Navigation Tabs - Removed "My Story" */}
        <div className="flex flex-wrap gap-1 mb-8 border-b border-gray-200">
          {tabs.map((tab) => (
            <Button
              key={tab}
              onClick={() => setActiveTab(tab)}
              variant="ghost"
              className={`rounded-none px-6 py-3 text-sm font-medium border-b-2 transition-all ${
                activeTab === tab 
                  ? 'border-gray-900 text-gray-900' 
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              {tab}
            </Button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white">
          {getTabContent()}
        </div>
      </main>

      {/* Add Product Modal */}
      {showAddProduct && (
        <AddProductModal
          isOpen={showAddProduct}
          onClose={() => setShowAddProduct(false)}
          brandName={user.brandName || ''}
        />
      )}
    </div>
  );
};