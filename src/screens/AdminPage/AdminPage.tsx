import React, { useState } from "react";
import { ArrowLeft, Plus, Search, Filter, Eye, Edit, Trash2, Package, Users, TrendingUp, Calendar } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { useNavigate } from "react-router-dom";
import { AddBrandModal } from "../../components/AddBrandModal";
import { useCart } from "../../contexts/CartContext";
import { useBrand } from "../../contexts/BrandContext";

export const AdminPage = (): JSX.Element => {
  const navigate = useNavigate();
  const { getAllOrders } = useCart();
  const { brands, deleteBrand, updateBrand } = useBrand();
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [showAddBrand, setShowAddBrand] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Get real-time orders
  const orders = getAllOrders();

  const tabs = ["Dashboard", "Brand Accounts", "Orders", "Analytics"];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
      case "delivered":
        return "bg-green-100 text-green-700 hover:bg-green-100";
      case "pending":
        return "bg-yellow-100 text-yellow-700 hover:bg-yellow-100";
      case "shipped":
      case "processing":
        return "bg-blue-100 text-blue-700 hover:bg-blue-100";
      default:
        return "bg-gray-100 text-gray-700 hover:bg-gray-100";
    }
  };

  const filteredBrands = brands.filter(brand =>
    brand.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    brand.ownerEmail.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.brandName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteBrand = (brandId: string) => {
    if (window.confirm('Are you sure you want to delete this brand? This action cannot be undone.')) {
      deleteBrand(brandId);
    }
  };

  const handleToggleBrandStatus = (brandId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
    updateBrand(brandId, { status: newStatus as any });
  };

  const getTabContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Admin Dashboard</h2>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border border-gray-200 bg-white" style={{ borderRadius: '1px' }}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Users</p>
                      <p className="text-3xl font-bold text-gray-900">18</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 bg-white" style={{ borderRadius: '1px' }}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Brand Accounts</p>
                      <p className="text-3xl font-bold text-gray-900">{brands.length}</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <Package className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 bg-white" style={{ borderRadius: '1px' }}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Orders</p>
                      <p className="text-3xl font-bold text-gray-900">{orders.length}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Package className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 bg-white" style={{ borderRadius: '1px' }}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                      <p className="text-3xl font-bold text-gray-900">₹{brands.reduce((total, brand) => total + brand.revenue, 0).toLocaleString()}</p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-yellow-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border border-gray-200 bg-white" style={{ borderRadius: '1px' }}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
                  <div className="space-y-3">
                    {orders.slice(0, 3).map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{order.id}</p>
                          <p className="text-sm text-gray-600">{order.customerName}</p>
                        </div>
                        <Badge className={getStatusColor(order.status)} style={{ borderRadius: '1px' }}>
                          {order.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 bg-white" style={{ borderRadius: '1px' }}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Brands</h3>
                  <div className="space-y-3">
                    {brands.slice(0, 3).map((brand) => (
                      <div key={brand.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{brand.brandName}</p>
                          <p className="text-sm text-gray-600">{brand.ownerEmail}</p>
                        </div>
                        <Badge className={getStatusColor(brand.status)} style={{ borderRadius: '1px' }}>
                          {brand.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case "Brand Accounts":
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-2xl font-bold text-gray-900">Brand Accounts</h2>
              <Button
                onClick={() => setShowAddBrand(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3"
                style={{ borderRadius: '1px' }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Brand Account
              </Button>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search brands..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  style={{ borderRadius: '1px' }}
                />
              </div>
              <Button variant="outline" className="border-gray-300" style={{ borderRadius: '1px' }}>
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>

            {/* Brands Table */}
            <Card className="border border-gray-200 bg-white" style={{ borderRadius: '1px' }}>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredBrands.map((brand, index) => (
                        <tr key={brand.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{brand.brandName}</div>
                            <div className="text-sm text-gray-500">{brand.totalProducts} products</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{brand.ownerEmail}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{brand.city}, {brand.state}</div>
                            <div className="text-sm text-gray-500">{brand.pickupLocation}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge className={getStatusColor(brand.status)} style={{ borderRadius: '1px' }}>
                              {brand.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{brand.createdAt}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center gap-2">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => navigate(`/brand/${brand.brandName.toLowerCase()}`)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => handleToggleBrandStatus(brand.id, brand.status)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 text-red-600"
                                onClick={() => handleDeleteBrand(brand.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "Orders":
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-2xl font-bold text-gray-900">All Orders</h2>
              <div className="flex items-center gap-2">
                <Badge className="bg-blue-100 text-blue-700" style={{ borderRadius: '1px' }}>
                  Total: {orders.length}
                </Badge>
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                style={{ borderRadius: '1px' }}
              />
            </div>

            {/* Orders Table */}
            <Card className="border border-gray-200 bg-white" style={{ borderRadius: '1px' }}>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                            <div className="text-sm text-gray-500">{order.customerEmail}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.brandName}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{order.productName}</div>
                            <div className="text-sm text-gray-500">Qty: {order.quantity}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">₹{order.totalAmount}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge className={getStatusColor(order.status)} style={{ borderRadius: '1px' }}>
                              {order.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.orderDate}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "Analytics":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Analytics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border border-gray-200 bg-white" style={{ borderRadius: '1px' }}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Brands</h3>
                  <div className="space-y-3">
                    {brands.sort((a, b) => b.revenue - a.revenue).slice(0, 3).map((brand, index) => (
                      <div key={brand.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-purple-600">{index + 1}</span>
                          </div>
                          <span className="font-medium text-gray-900">{brand.brandName}</span>
                        </div>
                        <span className="text-sm font-medium text-gray-600">₹{brand.revenue.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 bg-white" style={{ borderRadius: '1px' }}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Status Distribution</h3>
                  <div className="space-y-3">
                    {['Delivered', 'Shipped', 'Processing', 'Pending'].map(status => {
                      const count = orders.filter(order => order.status === status).length;
                      return (
                        <div key={status} className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">{status}</span>
                          <span className={`text-sm font-medium ${getStatusColor(status).includes('green') ? 'text-green-600' : 
                            getStatusColor(status).includes('blue') ? 'text-blue-600' : 
                            getStatusColor(status).includes('yellow') ? 'text-yellow-600' : 'text-gray-600'}`}>
                            {count}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 bg-white" style={{ borderRadius: '1px' }}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Growth</h3>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-600">+24%</p>
                    <p className="text-sm text-gray-600">vs last month</p>
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
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3">
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
          
          <h1 className="text-xl font-bold text-gray-900">Dream X Store Admin</h1>
          
          <div className="w-10" />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8 p-2 bg-white border border-gray-200 overflow-x-auto scrollbar-hide" style={{ borderRadius: '1px' }}>
          {tabs.map((tab) => (
            <Button
              key={tab}
              onClick={() => setActiveTab(tab)}
              variant="ghost"
              className={`px-6 py-3 text-sm font-semibold transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                activeTab === tab 
                  ? 'bg-purple-600 text-white shadow-lg' 
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

      {/* Add Brand Modal */}
      {showAddBrand && (
        <AddBrandModal
          isOpen={showAddBrand}
          onClose={() => setShowAddBrand(false)}
        />
      )}
    </div>
  );
};