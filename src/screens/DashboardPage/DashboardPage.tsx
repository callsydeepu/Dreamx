import React, { useState } from "react";
import { Search, Heart, ShoppingBag, User, Filter, Bell } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";

export const DashboardPage = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  const { getTotalItems } = useCart();
  const { user, logout } = useAuth();

  // Demo product data
  const demoProduct = {
    id: 1,
    name: "Supima Shirt: Classic Red",
    brand: "Supima Shirts",
    price: 1499,
    originalPrice: 1999,
    discount: 25,
    image: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
    category: "Shirts",
    isNew: true,
    rating: 4.5,
    reviews: 128,
    slug: "supima-shirt-classic-red"
  };

  const categories = ["All", "Shirts", "T-Shirts", "Hoodies", "Jackets", "Jeans"];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    
    // Simulate search functionality
    setTimeout(() => {
      // For demo, only show the demo product if search matches
      const results = searchQuery.toLowerCase().includes('shirt') || 
                     searchQuery.toLowerCase().includes('red') || 
                     searchQuery.toLowerCase().includes('supima')
        ? [demoProduct]
        : [];
      
      setSearchResults(results);
      setIsSearching(false);
    }, 500);
  };

  const handleProductClick = () => {
    navigate(`/product/${demoProduct.slug}`);
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const totalCartItems = getTotalItems();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modified Header - Same as original but with Profile and Cart only */}
      <header className="w-full h-[100px] bg-white border-b border-gray-100 shadow-sm">
        <div className="w-full h-full mx-auto relative flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <img
              src="https://i.postimg.cc/xTVNmCps/Dream-X-Store.png"
              alt="Dream X Store"
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </div>

          {/* Desktop Navigation - Only Profile and Cart */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 2xl:gap-8 flex-shrink-0">
            {/* Profile Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleProfileClick}
              className="h-12 w-12 rounded-[40px] hover:bg-gray-100"
            >
              <User className="h-6 w-6 text-gray-600" />
            </Button>

            {/* Cart Icon with Count */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCartClick}
                className="h-12 w-12 rounded-[40px] hover:bg-gray-100"
              >
                <ShoppingBag className="h-6 w-6 text-gray-600" />
              </Button>
              
              {totalCartItems > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-sm">
                  {totalCartItems > 99 ? '99+' : totalCartItems}
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Navigation - Profile and Cart */}
          <div className="lg:hidden flex items-center gap-3">
            {/* Profile Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleProfileClick}
              className="h-12 w-12 rounded-[40px] hover:bg-gray-100"
            >
              <User className="h-6 w-6 text-gray-600" />
            </Button>

            {/* Mobile Cart Icon */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCartClick}
                className="h-12 w-12 rounded-[40px] hover:bg-gray-100"
              >
                <ShoppingBag className="h-6 w-6 text-gray-600" />
              </Button>
              
              {totalCartItems > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-sm">
                  {totalCartItems > 99 ? '99+' : totalCartItems}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-3">
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products, brands..."
              className="w-full h-10 pl-10 pr-12 bg-gray-50 border border-gray-200 rounded-[1px] text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#f1ff8c] focus:border-[#f1ff8c] focus:bg-white transition-all"
            />
            <Button
              type="submit"
              disabled={isSearching}
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 bg-[#f1ff8c] hover:bg-[#e9f87a] text-black rounded-[1px] p-0"
            >
              {isSearching ? (
                <div className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Search className="h-3 w-3" />
              )}
            </Button>
          </div>
        </form>
      </div>

      {/* Main Content */}
      <main className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6">
        {/* Search Results */}
        {searchQuery && (
          <div className="mb-8">
            <h2 className="text-xl font-medium text-gray-900 mb-4">
              Search Results for "{searchQuery}"
            </h2>
            
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {searchResults.map((product) => (
                  <Card 
                    key={product.id}
                    className="border border-gray-200 rounded-[1px] overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                    onClick={handleProductClick}
                  >
                    <CardContent className="p-0">
                      <div className="relative">
                        {/* Product Image */}
                        <div className="aspect-[4/5] bg-gray-100 overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                          
                          {/* Badges */}
                          <div className="absolute top-3 left-3 flex flex-col gap-2">
                            {product.isNew && (
                              <Badge className="bg-[#f1ff8c] text-black hover:bg-[#f1ff8c] text-xs px-2 py-1 rounded-[1px]">
                                NEW
                              </Badge>
                            )}
                            <Badge className="bg-red-500 text-white hover:bg-red-500 text-xs px-2 py-1 rounded-[1px]">
                              -{product.discount}%
                            </Badge>
                          </div>

                          {/* Heart Icon */}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-3 right-3 h-8 w-8 bg-white/80 hover:bg-white rounded-[1px]"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Handle wishlist
                            }}
                          >
                            <Heart className="h-4 w-4 text-gray-600" />
                          </Button>
                        </div>

                        {/* Product Info */}
                        <div className="p-4">
                          <div className="mb-2">
                            <p className="text-xs text-gray-500 mb-1">{product.brand}</p>
                            <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                              {product.name}
                            </h4>
                          </div>

                          {/* Rating */}
                          <div className="flex items-center gap-1 mb-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <span
                                  key={i}
                                  className={`text-xs ${
                                    i < Math.floor(product.rating)
                                      ? "text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                >
                                  ★
                                </span>
                              ))}
                            </div>
                            <span className="text-xs text-gray-500">
                              ({product.reviews})
                            </span>
                          </div>

                          {/* Price */}
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-gray-900">
                              ₹{product.price}
                            </span>
                            <span className="text-xs text-gray-500 line-through">
                              ₹{product.originalPrice}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-sm text-gray-500">
                  Try searching with different keywords
                </p>
              </div>
            )}
          </div>
        )}

        {/* Hero Banner - Only show when not searching */}
        {!searchQuery && (
          <Card className="mb-8 bg-gradient-to-r from-[#f1ff8c] to-[#e9f87a] border-0 rounded-[1px] overflow-hidden">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                    Men's Fashion Collection
                  </h2>
                  <p className="text-sm sm:text-base text-gray-700">
                    Discount up to 60%
                  </p>
                </div>
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl sm:text-3xl">👔</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Categories - Only show when not searching */}
        {!searchQuery && (
          <div className="mb-8">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  onClick={() => setActiveCategory(category)}
                  className={`flex-shrink-0 h-9 px-4 rounded-[1px] text-sm font-medium transition-all ${
                    activeCategory === category
                      ? "bg-[#f1ff8c] text-black border-black hover:bg-[#e9f87a]"
                      : "bg-white text-gray-600 border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Popular Section - Only show when not searching */}
        {!searchQuery && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Popular</h3>
              <Button variant="link" className="text-sm text-blue-600 p-0 h-auto hover:text-blue-800">
                See all
              </Button>
            </div>

            {/* Demo Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <Card 
                className="border border-gray-200 rounded-[1px] overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                onClick={handleProductClick}
              >
                <CardContent className="p-0">
                  <div className="relative">
                    {/* Product Image */}
                    <div className="aspect-[4/5] bg-gray-100 overflow-hidden">
                      <img
                        src={demoProduct.image}
                        alt={demoProduct.name}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {demoProduct.isNew && (
                          <Badge className="bg-[#f1ff8c] text-black hover:bg-[#f1ff8c] text-xs px-2 py-1 rounded-[1px]">
                            NEW
                          </Badge>
                        )}
                        <Badge className="bg-red-500 text-white hover:bg-red-500 text-xs px-2 py-1 rounded-[1px]">
                          -{demoProduct.discount}%
                        </Badge>
                      </div>

                      {/* Heart Icon */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-3 right-3 h-8 w-8 bg-white/80 hover:bg-white rounded-[1px]"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle wishlist
                        }}
                      >
                        <Heart className="h-4 w-4 text-gray-600" />
                      </Button>
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <div className="mb-2">
                        <p className="text-xs text-gray-500 mb-1">{demoProduct.brand}</p>
                        <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                          {demoProduct.name}
                        </h4>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-xs ${
                                i < Math.floor(demoProduct.rating)
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">
                          ({demoProduct.reviews})
                        </span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-900">
                          ₹{demoProduct.price}
                        </span>
                        <span className="text-xs text-gray-500 line-through">
                          ₹{demoProduct.originalPrice}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Empty State Message - Only show when not searching */}
        {!searchQuery && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              More Products Coming Soon!
            </h3>
            <p className="text-sm text-gray-500 max-w-sm mx-auto">
              Brands will add their amazing products here. This is just a demo product to show the layout.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};