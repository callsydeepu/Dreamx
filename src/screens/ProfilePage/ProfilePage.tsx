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
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold text-gray-900">Recent Designs</h3>
              <Button
                onClick={() => setShowAddProduct(true)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {brandProducts.map((product) => (
                <Card key={product.id} className="border-0 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-0">
                    <div className="aspect-[4/5] bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-5">
                      <h4 className="font-semibold text-gray-900 mb-3">{product.name}</h4>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
                          <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                        </div>
                        <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 rounded-full px-3 py-1">
                          {product.sales} sold
                        </Badge>
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
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold text-gray-900">My Orders</h3>
            <div className="space-y-4">
              {userOrders.map((order) => (
                <Card key={order.id} className="border-0 rounded-2xl overflow-hidden bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                        <img
                          src={order.image}
                          alt={order.productName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-900 truncate">{order.productName}</h4>
                            <p className="text-sm text-gray-600">by {order.brand}</p>
                            <p className="text-sm text-gray-500">Order #{order.id} • {order.date}</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="font-bold text-gray-900">₹{order.price}</p>
                            <Badge 
                              className={`text-xs rounded-full px-3 py-1 ${
                                order.status === 'Delivered' 
                                  ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100' 
                                  : 'bg-blue-100 text-blue-700 hover:bg-blue-100'
                              }`}
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
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Package className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h3>
                  <p className="text-gray-600">Start shopping to see your orders here!</p>
                </div>
              )}
            </div>
          </div>
        );

      case "Analytics":
        return (
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold text-gray-900">Analytics</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <Card className="border-0 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <p className="text-3xl font-bold text-blue-700 mb-2">105</p>
                  <p className="text-sm text-blue-600 font-medium">Total Sales</p>
                </CardContent>
              </Card>
              <Card className="border-0 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <p className="text-3xl font-bold text-emerald-700 mb-2">₹73,500</p>
                  <p className="text-sm text-emerald-600 font-medium">Revenue</p>
                </CardContent>
              </Card>
              <Card className="border-0 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <p className="text-3xl font-bold text-amber-700 mb-2">4.8</p>
                  <p className="text-sm text-amber-600 font-medium">Avg Rating</p>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case "Wishlist":
        return (
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold text-gray-900">My Wishlist</h3>
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-pink-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
              <p className="text-gray-600">Save items you love to see them here!</p>
            </div>
          </div>
        );

      case "Settings":
        return (
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold text-gray-900">Settings</h3>
            <div className="space-y-4">
              <Card className="border-0 rounded-2xl bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Account Settings</h4>
                      <p className="text-sm text-gray-600">Update your account information</p>
                    </div>
                    <Button variant="outline" className="rounded-xl border-gray-200 hover:bg-gray-50">
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 rounded-2xl bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Privacy Settings</h4>
                      <p className="text-sm text-gray-600">Manage your privacy preferences</p>
                    </div>
                    <Button variant="outline" className="rounded-xl border-gray-200 hover:bg-gray-50">
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 px-4 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="h-10 w-10 rounded-xl hover:bg-gray-100/80"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <h1 className="text-lg font-semibold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            {isBrand ? 'Brand Profile' : 'Profile'}
          </h1>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            className="h-10 w-10 rounded-xl hover:bg-red-50 text-red-600"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Profile Header Card - Modern gradient design */}
        <Card className="border-0 rounded-3xl overflow-hidden mb-8 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/50 backdrop-blur-sm shadow-xl">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row items-start gap-8">
              {/* Profile Image */}
              <div className="flex flex-col items-center lg:items-start">
                <div className="w-28 h-28 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold mb-4 shadow-lg">
                  {isBrand ? user.brandName?.charAt(0) || 'R' : user.username.charAt(0).toUpperCase()}
                </div>
                
                {/* Verified Brand Badge */}
                <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 rounded-full px-4 py-2 text-sm font-medium shadow-lg">
                  <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                  Verified Brand
                </Badge>
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center lg:text-left">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
                      {isBrand ? user.brandName : user.username}
                    </h1>
                    <p className="text-gray-600 text-lg">@{user.username}</p>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 justify-center lg:justify-end">
                    {isBrand && (
                      <Button
                        variant="outline"
                        className="rounded-xl border-gray-200 hover:bg-gray-50 px-6"
                      >
                        VIEW PUBLIC PROFILE
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      className="rounded-xl border-gray-200 hover:bg-gray-50 px-6"
                    >
                      <Edit3 className="h-4 w-4 mr-2" />
                      EDIT PROFILE
                    </Button>
                  </div>
                </div>

                {/* ROCKAGE Description */}
                <div className="mb-6">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    Rockage: Where fashion meets fearless attitude! Celebrate individuality with our premium 100% cotton, 250gsm oversized anime tees. Bold designs like "HONOR BOUND" and "GENJUTSU" in sizes S-XXL. Wear your attitude. Rock your age!
                  </p>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-6 text-sm text-gray-600 mb-6">
                  <span className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    Joined 2024-01-15
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    3 Products
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    3 Designs
                  </span>
                </div>

                {/* Collaborators */}
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600 font-medium">Collaborators</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 hover:from-purple-200 hover:to-blue-200"
                  >
                    <Plus className="h-4 w-4 text-purple-600" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons (Brand only) */}
        {isBrand && (
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button
              onClick={() => setShowAddProduct(true)}
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-2xl h-14 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add your Product
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-gray-200 rounded-2xl h-14 text-base font-semibold hover:bg-gray-50"
            >
              DASHBOARD
            </Button>
          </div>
        )}

        {/* Navigation Tabs - Modern design */}
        <div className="flex flex-wrap gap-2 mb-8 p-2 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200/50">
          {tabs.map((tab) => (
            <Button
              key={tab}
              onClick={() => setActiveTab(tab)}
              variant="ghost"
              className={`rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                activeTab === tab 
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/80'
              }`}
            >
              {tab}
            </Button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50">
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