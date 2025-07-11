import React, { useState } from "react";
import { ArrowLeft, Settings, LogOut, Package, Heart, Star, Edit3, MapPin, Share2, MessageCircle, Globe, Linkedin, Twitter, Plus, Camera, Save, X } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import { AddProductModal } from "../../components/AddProductModal";

// Edit Profile Modal Component
const EditProfileModal = ({ isOpen, onClose, user, isBrand, onSave }) => {
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    brandName: user?.brandName || '',
    brandDescription: user?.brandDescription || '',
    location: 'Chicago, IL',
    website: '',
    bio: isBrand 
      ? user?.brandDescription || "Rockage: Where fashion meets fearless attitude! Celebrate individuality with our premium 100% cotton, 250gsm oversized anime tees. Bold designs like \"HONOR BOUND\" and \"GENJUTSU\" in sizes S-XXL. Wear your attitude. Rock your age!"
      : "Fashion enthusiast and style curator. Love discovering new brands and unique designs.",
    socialLinks: {
      instagram: '',
      twitter: '',
      linkedin: '',
      website: ''
    }
  });

  const [profileImage, setProfileImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('social_')) {
      const socialPlatform = name.replace('social_', '');
      setFormData(prev => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [socialPlatform]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setProfileImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Call the onSave callback with updated data
    onSave(formData);
    setIsLoading(false);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={onClose} />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200 shadow-2xl" style={{ borderRadius: '1px' }}>
          <CardContent className="p-0">
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-yellow-100 to-amber-100 border-b border-yellow-200 p-6 flex items-center justify-between" style={{ borderRadius: '1px 1px 0 0' }}>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-800 to-yellow-800 bg-clip-text text-transparent">
                Edit Profile
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-10 w-10 hover:bg-yellow-200/50"
                style={{ borderRadius: '1px' }}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-8">
              {/* Profile Image Section */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg overflow-hidden" style={{ borderRadius: '1px' }}>
                    {profileImage ? (
                      <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      (isBrand ? user?.brandName?.charAt(0) || 'R' : user?.username?.charAt(0)?.toUpperCase())
                    )}
                  </div>
                  <label className="absolute -bottom-2 -right-2 w-8 h-8 bg-white border-2 border-yellow-300 flex items-center justify-center cursor-pointer hover:bg-yellow-50 transition-colors shadow-lg" style={{ borderRadius: '1px' }}>
                    <Camera className="h-4 w-4 text-amber-600" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
                <p className="text-sm text-amber-700">Click the camera icon to change your profile picture</p>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Username */}
                <div>
                  <label className="block text-sm font-medium text-amber-800 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full h-12 px-4 border border-yellow-300 bg-yellow-50/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all"
                    style={{ borderRadius: '1px' }}
                    placeholder="Enter username"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-amber-800 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full h-12 px-4 border border-yellow-300 bg-yellow-50/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all"
                    style={{ borderRadius: '1px' }}
                    placeholder="Enter email"
                  />
                </div>

                {/* Brand Name (if brand) */}
                {isBrand && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-amber-800 mb-2">
                      Brand Name
                    </label>
                    <input
                      type="text"
                      name="brandName"
                      value={formData.brandName}
                      onChange={handleInputChange}
                      className="w-full h-12 px-4 border border-yellow-300 bg-yellow-50/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all"
                      style={{ borderRadius: '1px' }}
                      placeholder="Enter brand name"
                    />
                  </div>
                )}

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-amber-800 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full h-12 px-4 border border-yellow-300 bg-yellow-50/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all"
                    style={{ borderRadius: '1px' }}
                    placeholder="Enter location"
                  />
                </div>

                {/* Website */}
                <div>
                  <label className="block text-sm font-medium text-amber-800 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="w-full h-12 px-4 border border-yellow-300 bg-yellow-50/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all"
                    style={{ borderRadius: '1px' }}
                    placeholder="https://yourwebsite.com"
                  />
                </div>
              </div>

              {/* Bio/Description */}
              <div>
                <label className="block text-sm font-medium text-amber-800 mb-2">
                  {isBrand ? 'Brand Description' : 'Bio'}
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-yellow-300 bg-yellow-50/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all resize-none"
                  style={{ borderRadius: '1px' }}
                  placeholder={isBrand ? "Describe your brand..." : "Tell us about yourself..."}
                />
                <p className="text-xs text-amber-600 mt-1">{formData.bio.length}/500 characters</p>
              </div>

              {/* Social Links */}
              <div>
                <label className="block text-sm font-medium text-amber-800 mb-4">
                  Social Links
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center" style={{ borderRadius: '1px' }}>
                        <span className="text-white text-xs font-bold">IG</span>
                      </div>
                      <span className="text-sm text-amber-700">Instagram</span>
                    </div>
                    <input
                      type="text"
                      name="social_instagram"
                      value={formData.socialLinks.instagram}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 border border-yellow-300 bg-yellow-50/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all text-sm"
                      style={{ borderRadius: '1px' }}
                      placeholder="@username"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 bg-blue-500 flex items-center justify-center" style={{ borderRadius: '1px' }}>
                        <span className="text-white text-xs font-bold">T</span>
                      </div>
                      <span className="text-sm text-amber-700">Twitter</span>
                    </div>
                    <input
                      type="text"
                      name="social_twitter"
                      value={formData.socialLinks.twitter}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 border border-yellow-300 bg-yellow-50/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all text-sm"
                      style={{ borderRadius: '1px' }}
                      placeholder="@username"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 bg-blue-700 flex items-center justify-center" style={{ borderRadius: '1px' }}>
                        <span className="text-white text-xs font-bold">in</span>
                      </div>
                      <span className="text-sm text-amber-700">LinkedIn</span>
                    </div>
                    <input
                      type="text"
                      name="social_linkedin"
                      value={formData.socialLinks.linkedin}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 border border-yellow-300 bg-yellow-50/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all text-sm"
                      style={{ borderRadius: '1px' }}
                      placeholder="linkedin.com/in/username"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Globe className="w-5 h-5 text-amber-600" />
                      <span className="text-sm text-amber-700">Website</span>
                    </div>
                    <input
                      type="url"
                      name="social_website"
                      value={formData.socialLinks.website}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 border border-yellow-300 bg-yellow-50/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all text-sm"
                      style={{ borderRadius: '1px' }}
                      placeholder="https://yoursite.com"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-gradient-to-r from-yellow-100 to-amber-100 border-t border-yellow-200 p-6 flex gap-3" style={{ borderRadius: '0 0 1px 1px' }}>
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1 h-12 border-yellow-300 hover:bg-yellow-200/50"
                style={{ borderRadius: '1px' }}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={isLoading}
                className="flex-1 h-12 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white shadow-lg"
                style={{ borderRadius: '1px' }}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Saving...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Save Changes
                  </div>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export const ProfilePage = (): JSX.Element => {
  const navigate = useNavigate();
  const { user, logout, isBrand } = useAuth();
  const { cartItems } = useCart();
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [activeTab, setActiveTab] = useState("Products"); // Always start with Products for brands, Orders for users
  const [profileData, setProfileData] = useState(user);

  // Debug logging
  console.log("ProfilePage - User:", user);
  console.log("ProfilePage - isBrand:", isBrand);
  console.log("ProfilePage - user.isBrand:", user?.isBrand);

  // Set correct initial tab based on user type
  React.useEffect(() => {
    if (user?.isBrand || isBrand) {
      setActiveTab("Products");
    } else {
      setActiveTab("Orders");
    }
  }, [user, isBrand]);

  if (!user) {
    navigate('/auth');
    return <div></div>;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSaveProfile = (updatedData) => {
    setProfileData({ ...profileData, ...updatedData });
    // Here you would typically make an API call to save the data
    console.log('Profile updated:', updatedData);
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

  // Force correct tabs based on user type
  const isActuallyBrand = user?.isBrand || isBrand;
  const tabs = isActuallyBrand 
    ? ["Products", "Analytics", "Settings"]
    : ["Orders", "Wishlist", "Settings"];

  console.log("User isBrand:", isActuallyBrand, "Tabs:", tabs, "Active tab:", activeTab);

  const getTabContent = () => {
    switch (activeTab) {
      case "Products":
        return (
          <div className="space-y-6 sm:space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <h3 className="text-xl sm:text-2xl font-semibold text-amber-900">Recent Designs</h3>
              <Button
                onClick={() => setShowAddProduct(true)}
                className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white px-4 sm:px-6 py-2 sm:py-3 shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base w-full sm:w-auto"
                style={{ borderRadius: '1px' }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </div>
            {/* Mobile: 2 columns, Tablet: 2 columns, Desktop: 3 columns */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
              {brandProducts.map((product) => (
                <Card key={product.id} className="border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 bg-white" style={{ borderRadius: '1px' }}>
                  <CardContent className="p-0">
                    <div className="aspect-square sm:aspect-[4/5] bg-gray-50 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-2 sm:p-3 md:p-4 lg:p-5">
                      <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 md:mb-3 text-xs sm:text-sm md:text-base line-clamp-2 leading-tight">{product.name}</h4>
                      <div className="flex flex-col gap-1 sm:gap-2">
                        <div className="flex items-center gap-1 flex-wrap">
                          <span className="text-xs sm:text-sm md:text-lg font-bold text-gray-900">₹{product.price}</span>
                          <span className="text-xs sm:text-xs md:text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                        </div>
                        <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 px-1 sm:px-2 md:px-3 py-0.5 sm:py-1 text-xs w-fit" style={{ borderRadius: '1px' }}>
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
          <div className="space-y-6 sm:space-y-8">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">My Orders</h3>
            <div className="space-y-3 sm:space-y-4">
              {userOrders.map((order) => (
                <Card key={order.id} className="border border-gray-200 overflow-hidden bg-white hover:shadow-lg transition-all duration-300" style={{ borderRadius: '1px' }}>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-50 overflow-hidden flex-shrink-0" style={{ borderRadius: '1px' }}>
                        <img
                          src={order.image}
                          alt={order.productName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
                          <div className="min-w-0">
                            <h4 className="font-semibold text-gray-900 truncate text-sm sm:text-base">{order.productName}</h4>
                            <p className="text-xs sm:text-sm text-gray-600">by {order.brand}</p>
                            <p className="text-xs text-gray-500">Order #{order.id} • {order.date}</p>
                          </div>
                          <div className="flex items-center justify-between sm:flex-col sm:items-end sm:text-right flex-shrink-0 gap-2">
                            <p className="font-bold text-gray-900 text-sm sm:text-base">₹{order.price}</p>
                            <Badge 
                              className={`text-xs px-2 sm:px-3 py-1 ${
                                order.status === 'Delivered' 
                                  ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100' 
                                  : 'bg-blue-100 text-blue-700 hover:bg-blue-100'
                              }`}
                              style={{ borderRadius: '1px' }}
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
                <div className="text-center py-12 sm:py-16">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 flex items-center justify-center mx-auto mb-4 sm:mb-6" style={{ borderRadius: '1px' }}>
                    <Package className="w-8 h-8 sm:w-10 sm:h-10 text-gray-500" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No orders yet</h3>
                  <p className="text-gray-600 text-sm sm:text-base">Start shopping to see your orders here!</p>
                </div>
              )}
            </div>
          </div>
        );

      case "Analytics":
        return (
          <div className="space-y-6 sm:space-y-8">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">Analytics</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <Card className="border border-gray-200 bg-white hover:shadow-lg transition-all duration-300" style={{ borderRadius: '1px' }}>
                <CardContent className="p-4 sm:p-6 text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-blue-700 mb-1 sm:mb-2">105</p>
                  <p className="text-xs sm:text-sm text-blue-600 font-medium">Total Sales</p>
                </CardContent>
              </Card>
              <Card className="border border-gray-200 bg-white hover:shadow-lg transition-all duration-300" style={{ borderRadius: '1px' }}>
                <CardContent className="p-4 sm:p-6 text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-emerald-700 mb-1 sm:mb-2">₹73,500</p>
                  <p className="text-xs sm:text-sm text-emerald-600 font-medium">Revenue</p>
                </CardContent>
              </Card>
              <Card className="border border-gray-200 bg-white hover:shadow-lg transition-all duration-300" style={{ borderRadius: '1px' }}>
                <CardContent className="p-4 sm:p-6 text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-amber-700 mb-1 sm:mb-2">4.8</p>
                  <p className="text-xs sm:text-sm text-amber-600 font-medium">Avg Rating</p>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case "Wishlist":
        return (
          <div className="space-y-6 sm:space-y-8">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">My Wishlist</h3>
            <div className="text-center py-12 sm:py-16">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 flex items-center justify-center mx-auto mb-4 sm:mb-6" style={{ borderRadius: '1px' }}>
                <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-pink-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
              <p className="text-gray-600 text-sm sm:text-base">Save items you love to see them here!</p>
            </div>
          </div>
        );

      case "Settings":
        return (
          <div className="space-y-6 sm:space-y-8">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">Settings</h3>
            <div className="space-y-3 sm:space-y-4">
              <Card className="border border-gray-200 bg-white hover:shadow-lg transition-all duration-300" style={{ borderRadius: '1px' }}>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Account Settings</h4>
                      <p className="text-xs sm:text-sm text-gray-600">Update your account information</p>
                    </div>
                    <Button 
                      onClick={() => setShowEditProfile(true)}
                      variant="outline" 
                      className="border-gray-300 hover:bg-gray-50 text-sm w-full sm:w-auto"
                      style={{ borderRadius: '1px' }}
                    >
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card className="border border-gray-200 bg-white hover:shadow-lg transition-all duration-300" style={{ borderRadius: '1px' }}>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Privacy Settings</h4>
                      <p className="text-xs sm:text-sm text-gray-600">Manage your privacy preferences</p>
                    </div>
                    <Button variant="outline" className="border-gray-300 hover:bg-gray-50 text-sm w-full sm:w-auto" style={{ borderRadius: '1px' }}>
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
      {/* Header - Mobile Optimized */}
      <header className="sticky top-0 z-50 bg-white backdrop-blur-xl border-b border-gray-200 px-3 sm:px-4 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="h-9 w-9 sm:h-10 sm:w-10 hover:bg-gray-100"
            style={{ borderRadius: '1px' }}
          >
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          
          <h1 className="text-base sm:text-lg font-semibold text-gray-900">
            {isActuallyBrand ? 'Brand Profile' : 'Profile'}
          </h1>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            className="h-9 w-9 sm:h-10 sm:w-10 hover:bg-red-100 text-red-600"
            style={{ borderRadius: '1px' }}
          >
            <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>
      </header>

      {/* Main Content - Mobile Optimized with Increased Width */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Profile Header Card - Mobile Responsive with Increased Width */}
        <Card className="border border-gray-200 overflow-hidden mb-6 sm:mb-8 bg-white shadow-lg" style={{ borderRadius: '1px' }}>
          <CardContent className="p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col items-center text-center lg:flex-row lg:items-start lg:text-left gap-4 sm:gap-6 lg:gap-8">
              {/* Profile Image */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center text-white text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 shadow-lg" style={{ borderRadius: '1px' }}>
                  {isBrand ? profileData?.brandName?.charAt(0) || 'R' : profileData?.username?.charAt(0)?.toUpperCase()}
                </div>
                
                {/* Verified Brand Badge */}
                <Badge className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white hover:from-yellow-600 hover:to-amber-600 px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium shadow-lg" style={{ borderRadius: '1px' }}>
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white mr-1 sm:mr-2" style={{ borderRadius: '1px' }}></div>
                  Verified Brand
                </Badge>
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4 sm:mb-6">
                  <div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
                      {isActuallyBrand ? profileData?.brandName : profileData?.username}
                    </h1>
                    <p className="text-gray-600 text-base sm:text-lg">@{profileData?.username}</p>
                  </div>
                  
                  {/* Action Buttons - Mobile Stacked */}
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full lg:w-auto">
                    {isActuallyBrand && (
                      <Button
                        variant="outline"
                        className="border-gray-300 hover:bg-gray-50 px-4 sm:px-6 text-xs sm:text-sm"
                        style={{ borderRadius: '1px' }}
                      >
                        VIEW PUBLIC PROFILE
                      </Button>
                    )}
                    <Button
                      onClick={() => setShowEditProfile(true)}
                      variant="outline"
                      className="border-gray-300 hover:bg-gray-50 px-4 sm:px-6 text-xs sm:text-sm"
                      style={{ borderRadius: '1px' }}
                    >
                      <Edit3 className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                      EDIT PROFILE
                    </Button>
                  </div>
                </div>

                {/* ROCKAGE Description - Mobile Optimized */}
                <div className="mb-4 sm:mb-6">
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg">
                    {profileData?.brandDescription || "Rockage: Where fashion meets fearless attitude! Celebrate individuality with our premium 100% cotton, 250gsm oversized anime tees. Bold designs like \"HONOR BOUND\" and \"GENJUTSU\" in sizes S-XXL. Wear your attitude. Rock your age!"}
                  </p>
                </div>

                {/* Stats - Mobile Responsive */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 lg:gap-6 text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
                  <span className="flex items-center gap-1 sm:gap-2">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-400" style={{ borderRadius: '1px' }}></div>
                    Joined 2024-01-15
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 sm:gap-2">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400" style={{ borderRadius: '1px' }}></div>
                    3 Products
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 sm:gap-2">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400" style={{ borderRadius: '1px' }}></div>
                    3 Designs
                  </span>
                </div>

                {/* Collaborators - Mobile Centered */}
                <div className="flex items-center justify-center lg:justify-start gap-3">
                  <span className="text-xs sm:text-sm text-gray-600 font-medium">Collaborators</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 sm:h-8 sm:w-8 bg-gray-100 hover:bg-gray-200"
                    style={{ borderRadius: '1px' }}
                  >
                    <Plus className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons (Brand only) - Mobile Responsive */}
        {isActuallyBrand && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
            <Button
              onClick={() => setShowAddProduct(true)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 sm:h-14 text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              style={{ borderRadius: '1px' }}
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              ADD PRODUCT
            </Button>
            <Button
              onClick={() => navigate('/dashboard')}
              variant="outline"
              className="w-full border-gray-300 h-12 sm:h-14 text-sm sm:text-base font-semibold hover:bg-gray-50"
              style={{ borderRadius: '1px' }}
            >
              VIEW DASHBOARD
            </Button>
          </div>
        )}

        {/* Navigation Tabs - Mobile Scrollable */}
        <div className="flex gap-1 sm:gap-2 mb-6 sm:mb-8 p-1 sm:p-2 bg-gray-100 border border-gray-200 overflow-x-auto scrollbar-hide min-w-0" style={{ borderRadius: '1px' }}>
          {tabs.map((tab) => (
            <Button
              key={tab}
              onClick={() => setActiveTab(tab)}
              variant="ghost"
              className={`px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold transition-all duration-300 whitespace-nowrap flex-shrink-0 min-w-0 ${
                activeTab === tab 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-200'
              }`}
              style={{ borderRadius: '1px' }}
            >
              {tab}
            </Button>
          ))}
        </div>

        {/* Tab Content - Mobile Optimized with Increased Width */}
        <div className="bg-white border border-gray-200 p-4 sm:p-6 lg:p-8" style={{ borderRadius: '1px' }}>
          {getTabContent()}
        </div>
      </main>

      {/* Add Product Modal */}
      {showAddProduct && (
        <AddProductModal
          isOpen={showAddProduct}
          onClose={() => setShowAddProduct(false)}
          brandName={profileData?.brandName || ''}
        />
      )}

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={showEditProfile}
        onClose={() => setShowEditProfile(false)}
        user={profileData}
        isBrand={isActuallyBrand}
        onSave={handleSaveProfile}
      />
    </div>
  );
};