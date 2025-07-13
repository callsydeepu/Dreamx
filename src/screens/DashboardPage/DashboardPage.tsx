import React, { useState, useEffect } from "react";
import { Search, Heart, ShoppingBag, User, Filter, Bell, Star, Timer, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import { useBrand } from "../../contexts/BrandContext";

export const DashboardPage = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [currentAdSlide, setCurrentAdSlide] = useState(0);
  const navigate = useNavigate();
  const { getTotalItems } = useCart();
  const { user, isBrand } = useAuth();
  const { getAllPublicProducts } = useBrand();

  // Sliding Ads Data
  const adsData = [
    {
      id: 1,
      type: 'image',
      title: 'FASHION MANIA Sale',
      subtitle: '11th - 15th JULY | UP TO 80% OFF',
      image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
      cta: 'Shop Now',
      bgColor: 'from-gray-200 to-gray-300'
    },
    {
      id: 2,
      type: 'video',
      title: 'GET YOUR SPECIAL SALE',
      subtitle: 'UP TO 30%',
      videoUrl: 'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761',
      poster: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
      cta: 'Shop Now',
      bgColor: 'from-purple-600 to-pink-600'
    },
    {
      id: 3,
      type: 'image',
      title: 'New Collection',
      subtitle: 'Discover Latest Trends',
      image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
      cta: 'Explore',
      bgColor: 'from-blue-500 to-teal-500'
    }
  ];

  // Auto-advance ads every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdSlide((prev) => (prev + 1) % adsData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [adsData.length]);

  // Get all public products from brands
  const allProducts = getAllPublicProducts().map(product => ({
    id: product.id,
    name: product.name,
    brand: product.brandName,
    brandSlug: product.brandName.toLowerCase(),
    originalPrice: product.price,
    salePrice: product.discountedPrice || product.price,
    discount: product.discountedPrice ? Math.round(((product.price - product.discountedPrice) / product.price) * 100) : 0,
    image: product.images[0] || "https://i.postimg.cc/fRWRqwYP/GPT-model.png",
    category: product.category,
    isNew: true,
    slug: product.slug,
    isOnSale: !!product.discountedPrice,
    rating: product.rating || 4.5,
    reviews: product.reviews || 128
  }));

  const categories = ["All", "Shirts", "T-Shirts", "Hoodies", "Jackets", "Jeans"];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    
    setTimeout(() => {
      const results = allProducts.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setSearchResults(results);
      setIsSearching(false);
    }, 500);
  };

  const handleProductClick = (product: typeof allProducts[0]) => {
    navigate(`/product/${product.slug}`);
  };

  const handleBrandClick = (brandSlug: string) => {
    navigate(`/brand/${brandSlug}`);
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleProfileClick = () => {
    if (user?.isBrand) {
      navigate('/profile');
    } else {
      navigate('/user-profile');
    }
  };

  const totalCartItems = getTotalItems();

  const nextAdSlide = () => {
    setCurrentAdSlide((prev) => (prev + 1) % adsData.length);
  };

  const prevAdSlide = () => {
    setCurrentAdSlide((prev) => (prev - 1 + adsData.length) % adsData.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Logo on Left, No Hamburger Menu */}
      <header className="w-full bg-black text-white sticky top-0 z-50">
        <div className="w-full h-[60px] mx-auto relative flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
          {/* Left - Logo (replacing hamburger menu) */}
          <div className="flex items-center">
            <img
              src="https://i.postimg.cc/xTVNmCps/Dream-X-Store.png"
              alt="Dream X Store"
              className="h-8 w-auto object-contain filter brightness-0 invert"
            />
          </div>

          {/* Right - Search, Profile, Cart */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative">
              {showSearchInput ? (
                <div className="flex items-center bg-white/10 rounded-full px-3 py-1">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
                    placeholder="Search..."
                    className="bg-transparent text-white placeholder-white/70 outline-none w-32 sm:w-40 text-sm"
                    autoFocus
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowSearchInput(false)}
                    className="h-6 w-6 text-white hover:bg-white/20 ml-1"
                  >
                    ×
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowSearchInput(true)}
                  className="h-10 w-10 text-white hover:bg-white/20 transition-colors duration-200"
                >
                  <Search className="w-6 h-6" />
                </Button>
              )}
            </div>

            {/* Profile */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleProfileClick}
              className="h-10 w-10 text-white hover:bg-white/20 transition-colors duration-200"
            >
              <User className="w-6 h-6" />
            </Button>

            {/* Cart */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCartClick}
                className="h-10 w-10 text-white hover:bg-white/20 transition-colors duration-200"
              >
                <ShoppingBag className="w-6 h-6" />
              </Button>
              
              {totalCartItems > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {totalCartItems > 99 ? '99+' : totalCartItems}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Sliding Ads Banner - Full Width */}
        <section className="relative w-full h-[400px] sm:h-[500px] overflow-hidden">
          <div 
            className="flex transition-transform duration-700 ease-in-out h-full"
            style={{ transform: `translateX(-${currentAdSlide * 100}%)` }}
          >
            {adsData.map((ad, index) => (
              <div
                key={ad.id}
                className={`relative w-full h-full flex-shrink-0 bg-gradient-to-r ${ad.bgColor}`}
              >
                {ad.type === 'video' ? (
                  <div className="absolute inset-0">
                    <video
                      className="w-full h-full object-cover"
                      autoPlay
                      muted
                      loop
                      poster={ad.poster}
                    >
                      <source src={ad.videoUrl} type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-black/30" />
                  </div>
                ) : (
                  <div className="absolute inset-0">
                    <img
                      src={ad.image}
                      alt={ad.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                  </div>
                )}
                
                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 text-white">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
                    {ad.title}
                  </h1>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-light mb-6">
                    {ad.subtitle}
                  </h2>
                  
                  {ad.type === 'video' && (
                    <div className="mb-6">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Play className="w-8 h-8 text-white ml-1" />
                      </div>
                    </div>
                  )}
                  
                  <Button className="bg-white text-black hover:bg-gray-100 px-8 py-3 rounded-full font-semibold">
                    {ad.cta}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <Button
            onClick={prevAdSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-0 border-0"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </Button>
          <Button
            onClick={nextAdSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-0 border-0"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </Button>

          {/* Slide Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {adsData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentAdSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentAdSlide ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </section>

        {/* Content with padding */}
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6">
          {/* Search Results */}
          {searchQuery && (
            <div className="mb-8">
              <h2 className="text-xl font-medium text-gray-900 mb-4">
                Search Results for "{searchQuery}"
              </h2>
              
              {searchResults.length > 0 ? (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {searchResults.map((product) => (
                    <Card 
                      key={product.id}
                      className="border border-gray-200 rounded-lg overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => handleProductClick(product)}
                    >
                      <CardContent className="p-0">
                        <div className="relative">
                          <div className="aspect-square bg-gray-100 overflow-hidden">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          {/* Heart Icon */}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 h-8 w-8 bg-white/80 hover:bg-white rounded-full"
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            <Heart className="h-4 w-4 text-gray-600" />
                          </Button>

                          {/* Product Info */}
                          <div className="p-3">
                            <h4 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
                              {product.name}
                            </h4>
                            <p className="text-xs text-gray-500 mb-2">{product.brand}</p>
                            
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-sm font-bold text-gray-900">₹{product.salePrice}</span>
                              <span className="text-xs text-gray-500 line-through">₹{product.originalPrice}</span>
                              <span className="text-xs text-green-600 font-medium">{product.discount}% off</span>
                            </div>

                            {/* Sale Price Button */}
                            <div className="bg-black text-white text-xs px-3 py-1 rounded-full text-center">
                              Sale price: ₹{product.salePrice}
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

          {/* Categories - Only show when not searching */}
          {!searchQuery && (
            <div className="mb-8">
              <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={activeCategory === category ? "default" : "outline"}
                    onClick={() => setActiveCategory(category)}
                    className={`flex-shrink-0 h-9 px-4 rounded-full text-sm font-medium transition-all ${
                      activeCategory === category
                        ? "bg-black text-white hover:bg-gray-800"
                        : "bg-white text-gray-600 border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Single Product Display - Brand will add more products */}
          {!searchQuery && (
            <div className="mb-8">
              {allProducts.length > 0 && (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Featured Products</h3>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {allProducts.map((product) => (
                      <Card 
                        key={product.id}
                        className="border border-gray-200 rounded-lg overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => handleProductClick(product)}
                      >
                        <CardContent className="p-0">
                          <div className="relative">
                            <div className="aspect-square bg-gray-100 overflow-hidden">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            
                            {/* Rating */}
                            <div className="absolute top-2 left-2 flex items-center gap-1 bg-white/90 rounded px-2 py-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3 h-3 ${
                                    i < Math.floor(product.rating || 0)
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                              <span className="text-xs text-gray-600 ml-1">({product.reviews || 0})</span>
                            </div>

                            {/* Heart Icon */}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute top-2 right-2 h-8 w-8 bg-white/80 hover:bg-white rounded-full"
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                            >
                              <Heart className="h-4 w-4 text-gray-600" />
                            </Button>

                            {/* Product Info */}
                            <div className="p-3 sm:p-4">
                              <h4 className="text-sm sm:text-base font-medium text-gray-900 mb-1 line-clamp-2">
                                {product.name}
                              </h4>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleBrandClick(product.brandSlug);
                                }}
                                className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 hover:underline mb-2 text-left"
                              >
                                by {product.brand}
                              </button>
                              
                              <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3 flex-wrap">
                                <span className="text-sm sm:text-lg font-bold text-gray-900">₹{product.salePrice}</span>
                                {product.discount > 0 && (
                                  <>
                                    <span className="text-xs sm:text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                                    <span className="text-xs sm:text-sm text-green-600 font-medium">{product.discount}% off</span>
                                  </>
                                )}
                              </div>

                              {/* Sale Price Button */}
                              <div className="bg-black text-white text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-2 rounded-full text-center">
                                Sale price: ₹{product.salePrice}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

        </div>
      </main>
    </div>
  );
};