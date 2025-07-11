import React, { useState } from "react";
import { ArrowLeft, Settings, LogOut, Package, Heart, Star, Edit3, MapPin, Share2, MessageCircle, Globe, Linkedin, Twitter, Plus, Camera, Save, X, User, Calendar, Mail, Phone } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";

// Edit Profile Modal Component for Users
const EditUserProfileModal = ({ isOpen, onClose, user, onSave }) => {
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    firstName: '',
    lastName: '',
    phone: '',
    location: '',
    bio: "Fashion enthusiast and style curator. Love discovering new brands and unique designs.",
    dateOfBirth: '',
    gender: '',
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
        <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white border border-gray-200 shadow-2xl" style={{ borderRadius: '1px' }}>
          <CardContent className="p-0">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between" style={{ borderRadius: '1px 1px 0 0' }}>
              <h2 className="text-2xl font-bold text-gray-900">
                Edit Profile
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-10 w-10 hover:bg-gray-100"
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
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg overflow-hidden" style={{ borderRadius: '1px' }}>
                    {profileImage ? (
                      <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      user?.username?.charAt(0)?.toUpperCase() || 'U'
                    )}
                  </div>
                  <label className="absolute -bottom-2 -right-2 w-8 h-8 bg-white border-2 border-blue-300 flex items-center justify-center cursor-pointer hover:bg-blue-50 transition-colors shadow-lg" style={{ borderRadius: '1px' }}>
                    <Camera className="h-4 w-4 text-gray-600" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
                <p className="text-sm text-gray-600">Click the camera icon to change your profile picture</p>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full h-12 px-4 border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    style={{ borderRadius: '1px' }}
                    placeholder="Enter first name"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full h-12 px-4 border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    style={{ borderRadius: '1px' }}
                    placeholder="Enter last name"
                  />
                </div>

                {/* Username - Now Editable */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username <span className="text-blue-600 text-xs">(You can edit this)</span>
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full h-12 px-4 border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    style={{ borderRadius: '1px' }}
                    placeholder="Enter username"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full h-12 px-4 border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    style={{ borderRadius: '1px' }}
                    placeholder="Enter email"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full h-12 px-4 border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    style={{ borderRadius: '1px' }}
                    placeholder="Enter phone number"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full h-12 px-4 border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    style={{ borderRadius: '1px' }}
                    placeholder="Enter location"
                  />
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full h-12 px-4 border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    style={{ borderRadius: '1px' }}
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full h-12 px-4 border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    style={{ borderRadius: '1px' }}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                  style={{ borderRadius: '1px' }}
                  placeholder="Tell us about yourself..."
                />
                <p className="text-xs text-gray-500 mt-1">{formData.bio.length}/500 characters</p>
              </div>

              {/* Social Links */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Social Links
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center" style={{ borderRadius: '1px' }}>
                        <span className="text-white text-xs font-bold">IG</span>
                      </div>
                      <span className="text-sm text-gray-700">Instagram</span>
                    </div>
                    <input
                      type="text"
                      name="social_instagram"
                      value={formData.socialLinks.instagram}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
                      style={{ borderRadius: '1px' }}
                      placeholder="@username"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 bg-blue-500 flex items-center justify-center" style={{ borderRadius: '1px' }}>
                        <span className="text-white text-xs font-bold">T</span>
                      </div>
                      <span className="text-sm text-gray-700">Twitter</span>
                    </div>
                    <input
                      type="text"
                      name="social_twitter"
                      value={formData.socialLinks.twitter}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
                      style={{ borderRadius: '1px' }}
                      placeholder="@username"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 bg-blue-700 flex items-center justify-center" style={{ borderRadius: '1px' }}>
                        <span className="text-white text-xs font-bold">in</span>
                      </div>
                      <span className="text-sm text-gray-700">LinkedIn</span>
                    </div>
                    <input
                      type="text"
                      name="social_linkedin"
                      value={formData.socialLinks.linkedin}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
                      style={{ borderRadius: '1px' }}
                      placeholder="linkedin.com/in/username"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Globe className="w-5 h-5 text-gray-600" />
                      <span className="text-sm text-gray-700">Website</span>
                    </div>
                    <input
                      type="url"
                      name="social_website"
                      value={formData.socialLinks.website}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
                      style={{ borderRadius: '1px' }}
                      placeholder="https://yoursite.com"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex gap-3" style={{ borderRadius: '0 0 1px 1px' }}>
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1 h-12 border-gray-300 hover:bg-gray-50"
                style={{ borderRadius: '1px' }}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={isLoading}
                className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
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

export const UserProfilePage = (): JSX.Element => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { getOrderHistory } = useCart();
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [activeTab, setActiveTab] = useState("Profile");
  const [profileData, setProfileData] = useState(user);

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
    console.log('User profile updated:', updatedData);
  };

  // Mock orders data - in real app, this would come from API or cart context
  const userOrders = [
    {
      id: "ORD001",
      productName: "Oversized t shirt",
      brand: "ROCKAGE",
      price: 699,
      status: "Delivered",
      date: "2024-01-15",
      image: "https://i.postimg.cc/fRWRqwYP/GPT-model.png",
      orderDate: "January 15, 2024",
      deliveryDate: "January 20, 2024",
      size: "L",
      quantity: 1
    },
    {
      id: "ORD002", 
      productName: "Honor Bound Tee",
      brand: "ROCKAGE",
      price: 799,
      status: "Shipped",
      date: "2024-01-20",
      image: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
      orderDate: "January 20, 2024",
      deliveryDate: "Expected: January 25, 2024",
      size: "M",
      quantity: 1
    },
    {
      id: "ORD003",
      productName: "Genjutsu Design",
      brand: "ROCKAGE", 
      price: 899,
      status: "Processing",
      date: "2024-01-22",
      image: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
      orderDate: "January 22, 2024",
      deliveryDate: "Expected: January 28, 2024",
      size: "XL",
      quantity: 2
    }
  ];

  const tabs = ["Profile", "My Orders", "Settings"];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100';
      case 'Shipped':
        return 'bg-blue-100 text-blue-700 hover:bg-blue-100';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100';
      case 'Cancelled':
        return 'bg-red-100 text-red-700 hover:bg-red-100';
      default:
        return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
    }
  };

  const getTabContent = () => {
    switch (activeTab) {
      case "Profile":
        return (
          <div className="space-y-6 sm:space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">Profile Information</h3>
              <Button 
                onClick={() => setShowEditProfile(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 w-full sm:w-auto"
                style={{ borderRadius: '1px' }}
              >
                <Edit3 className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
            
            {/* Profile Information Cards */}
            <div className="space-y-4">
              <Card className="border border-gray-200 bg-white" style={{ borderRadius: '1px' }}>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Username</h4>
                      <p className="text-gray-600">{profileData?.username || 'Not set'}</p>
                      <Badge className="mt-2 bg-blue-100 text-blue-700 hover:bg-blue-100 text-xs" style={{ borderRadius: '1px' }}>
                        You can edit this
                      </Badge>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                      <p className="text-gray-600">{profileData?.email || 'Not set'}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Member Since</h4>
                      <p className="text-gray-600">{profileData?.joinedDate || '2024-01-15'}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Account Type</h4>
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100" style={{ borderRadius: '1px' }}>
                        Customer
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 bg-white" style={{ borderRadius: '1px' }}>
                <CardContent className="p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Bio</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Fashion enthusiast and style curator. Love discovering new brands and unique designs.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 bg-white" style={{ borderRadius: '1px' }}>
                <CardContent className="p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Statistics</h4>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-blue-600">{userOrders.length}</p>
                      <p className="text-sm text-gray-600">Total Orders</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600">0</p>
                      <p className="text-sm text-gray-600">Wishlist Items</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-purple-600">₹{userOrders.reduce((sum, order) => sum + order.price, 0)}</p>
                      <p className="text-sm text-gray-600">Total Spent</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case "My Orders":
        return (
          <div className="space-y-6 sm:space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">My Orders</h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Total Orders:</span>
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100" style={{ borderRadius: '1px' }}>
                  {userOrders.length}
                </Badge>
              </div>
            </div>
            
            <div className="space-y-4">
              {userOrders.map((order) => (
                <Card key={order.id} className="border border-gray-200 overflow-hidden bg-white hover:shadow-lg transition-all duration-300" style={{ borderRadius: '1px' }}>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Product Image */}
                      <div className="w-full h-48 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 bg-gray-50 overflow-hidden flex-shrink-0" style={{ borderRadius: '1px' }}>
                        <img
                          src={order.image}
                          alt={order.productName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Order Details */}
                      <div className="flex-1 min-w-0">
                        <div className="space-y-3 sm:space-y-4">
                          {/* Product Info */}
                          <div>
                            <h4 className="font-semibold text-gray-900 text-base sm:text-lg mb-1">{order.productName}</h4>
                            <p className="text-sm text-gray-600 mb-1">by {order.brand}</p>
                            <p className="text-xs text-gray-500">Order #{order.id}</p>
                            <div className="flex items-center gap-3 sm:gap-4 mt-2 text-xs text-gray-500">
                              <span>Size: {order.size}</span>
                              <span>Qty: {order.quantity}</span>
                            </div>
                          </div>
                          
                          {/* Order Dates and Price/Status Row */}
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                            {/* Order Dates */}
                            <div className="grid grid-cols-2 gap-4 sm:flex sm:flex-col sm:gap-1">
                              <div>
                                <p className="text-xs text-gray-500">Order Date</p>
                                <p className="text-sm font-medium text-gray-900">{order.orderDate}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Delivery</p>
                                <p className="text-sm text-gray-700">{order.deliveryDate}</p>
                              </div>
                            </div>
                            
                            {/* Price and Status */}
                            <div className="flex flex-col sm:items-end gap-2">
                              <div className="flex items-center justify-between sm:flex-col sm:items-end sm:gap-1">
                                <p className="font-bold text-gray-900 text-lg">₹{order.price}</p>
                                <Badge 
                                  className={`text-xs px-3 py-1 ${getStatusColor(order.status)}`}
                                  style={{ borderRadius: '1px' }}
                                >
                                  {order.status}
                                </Badge>
                              </div>
                              <div className="flex gap-2 mt-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-xs px-3 py-1 h-8"
                                  style={{ borderRadius: '1px' }}
                                >
                                  Track Order
                                </Button>
                                {order.status === 'Delivered' && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-xs px-3 py-1 h-8"
                                    style={{ borderRadius: '1px' }}
                                  >
                                    Review
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {userOrders.length === 0 && (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-gray-100 flex items-center justify-center mx-auto mb-6" style={{ borderRadius: '1px' }}>
                    <Package className="w-10 h-10 text-gray-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h3>
                  <p className="text-gray-600 mb-6">Start shopping to see your orders here!</p>
                  <Button
                    onClick={() => navigate('/dashboard')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3"
                    style={{ borderRadius: '1px' }}
                  >
                    Start Shopping
                  </Button>
                </div>
              )}
            </div>
          </div>
        );

      case "Settings":
        return (
          <div className="space-y-6 sm:space-y-8">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">Settings</h3>
            <div className="space-y-4">
              <Card className="border border-gray-200 bg-white hover:shadow-lg transition-all duration-300" style={{ borderRadius: '1px' }}>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Account Settings</h4>
                      <p className="text-sm text-gray-600">Update your personal information</p>
                    </div>
                    <Button 
                      onClick={() => setShowEditProfile(true)}
                      variant="outline" 
                      className="border-gray-300 hover:bg-gray-50 w-full sm:w-auto"
                      style={{ borderRadius: '1px' }}
                    >
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-gray-200 bg-white hover:shadow-lg transition-all duration-300" style={{ borderRadius: '1px' }}>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Privacy Settings</h4>
                      <p className="text-sm text-gray-600">Manage your privacy preferences</p>
                    </div>
                    <Button variant="outline" className="border-gray-300 hover:bg-gray-50 w-full sm:w-auto" style={{ borderRadius: '1px' }}>
                      <Settings className="h-4 w-4 mr-2" />
                      Manage
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 bg-white hover:shadow-lg transition-all duration-300" style={{ borderRadius: '1px' }}>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Notifications</h4>
                      <p className="text-sm text-gray-600">Configure your notification preferences</p>
                    </div>
                    <Button variant="outline" className="border-gray-300 hover:bg-gray-50 w-full sm:w-auto" style={{ borderRadius: '1px' }}>
                      <Settings className="h-4 w-4 mr-2" />
                      Configure
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white backdrop-blur-xl border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="h-10 w-10 hover:bg-gray-100"
            style={{ borderRadius: '1px' }}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <h1 className="text-lg font-semibold text-gray-900">My Profile</h1>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            className="h-10 w-10 hover:bg-red-100 text-red-600"
            style={{ borderRadius: '1px' }}
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Profile Header Card */}
        <Card className="border border-gray-200 overflow-hidden mb-8 bg-white shadow-lg" style={{ borderRadius: '1px' }}>
          <CardContent className="p-6 lg:p-8">
            <div className="flex flex-col items-center text-center lg:flex-row lg:items-start lg:text-left gap-6 lg:gap-8">
              {/* Profile Image */}
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 lg:w-28 lg:h-28 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl lg:text-3xl font-bold mb-4 shadow-lg" style={{ borderRadius: '1px' }}>
                  {profileData?.username?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 px-4 py-2 text-sm font-medium" style={{ borderRadius: '1px' }}>
                  <User className="w-4 h-4 mr-2" />
                  Customer
                </Badge>
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                      {profileData?.username || 'User'}
                    </h1>
                    <p className="text-gray-600 text-lg">{profileData?.email}</p>
                  </div>
                  
                  <Button
                    onClick={() => setShowEditProfile(true)}
                    variant="outline"
                    className="border-gray-300 hover:bg-gray-50 px-6"
                    style={{ borderRadius: '1px' }}
                  >
                    <Edit3 className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>

                {/* User Bio */}
                <div className="mb-6">
                  <p className="text-gray-700 leading-relaxed">
                    Fashion enthusiast and style curator. Love discovering new brands and unique designs.
                  </p>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-gray-600 mb-6">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Joined {profileData?.joinedDate || '2024-01-15'}
                  </span>
                  <span className="flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    {userOrders.length} Orders
                  </span>
                  <span className="flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    0 Wishlist Items
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8 p-2 bg-white border border-gray-200 overflow-x-auto scrollbar-hide" style={{ borderRadius: '1px' }}>
          {tabs.map((tab) => (
            <Button
              key={tab}
              onClick={() => setActiveTab(tab)}
              variant="ghost"
              className={`px-6 py-3 text-sm font-semibold transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                activeTab === tab 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}
              style={{ borderRadius: '1px' }}
            >
              {tab}
            </Button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white border border-gray-200 p-6 lg:p-8" style={{ borderRadius: '1px' }}>
          {getTabContent()}
        </div>
      </main>

      {/* Edit Profile Modal */}
      <EditUserProfileModal
        isOpen={showEditProfile}
        onClose={() => setShowEditProfile(false)}
        user={profileData}
        onSave={handleSaveProfile}
      />
    </div>
  );
};