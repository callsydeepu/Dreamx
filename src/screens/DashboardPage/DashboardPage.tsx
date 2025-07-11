import React, { useState } from "react";
import { Search, Heart, ShoppingBag, User, Filter, Bell, Star, Timer } from "lucide-react";
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
  const { user, isBrand } = useAuth();

  // Demo product data with sale prices and ratings
  const demoProducts = [
    {
      id: 1,
      name: "Oversized t shirt",
      brand: "ROCKAGE",
      originalPrice: 1399,
      salePrice: 699,
      discount: 50,
      image: "https://i.postimg.cc/fRWRqwYP/GPT-model.png",
      category: "T-Shirts",
      isNew: true,
      rating: 4.5,
      reviews: 128,
      slug: "oversized-t-shirt",
      isOnSale: true
    },
    {
      id: 2,
      name: "Honor Bound Tee",
      brand: "ROCKAGE",
      originalPrice: 1299,
      salePrice: 799,
      discount: 38,
      image: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
      category: "T-Shirts",
      isNew: false,
      rating: 4.7,
      reviews: 95,
      slug: "honor-bound-tee",
      isOnSale: true
    },
    {
      id: 3,
      name: "Genjutsu Design",
      brand: "ROCKAGE",
      originalPrice: 1499,
      salePrice: 899,
      discount: 40,
      image: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
      category: "T-Shirts",
      isNew: true,
      rating: 4.6,
      reviews: 76,
      slug: "genjutsu-design",
      isOnSale: true
    },
    {
      id: 4,
      name: "Anime Spirit Hoodie",
      brand: "ROCKAGE",
      originalPrice: 2199,
      salePrice: 1299,
      discount: 41,
      image: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
      category: "Hoodies",
      isNew: false,
      rating: 4.8,
      reviews: 142,
      slug: "anime-spirit-hoodie",
      isOnSale: true
    }
  ];

  const categories = ["All", "Shirts", "T-Shirts", "Hoodies", "Jackets", "Jeans"];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    
    setTimeout(() => {
      const results = demoProducts.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setSearchResults(results);
      setIsSearching(false);
    }, 500);
  };

  const handleProductClick = (product: typeof demoProducts[0]) => {
    navigate(`/product/${product.slug}`);
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

  // Countdown timer state (for demo)
  const [timeLeft, setTimeLeft] = useState({
    hours: 9,
    minutes: 21,
    seconds: 8
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Noise Style */}
      <header className="w-full bg-black text-white">
        <div className="w-full h-[60px] mx-auto relative flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
          {/* Menu Icon */}
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 text-white hover:bg-white/10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>

          {/* Search Icon */}
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 text-white hover:bg-white/10"
            >
              <Search className="w-6 h-6" />
            </Button>
          </div>

          {/* Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <img
              src="https://i.postimg.cc/xTVNmCps/Dream-X-Store.png"
              alt="Dream X Store"
              className="h-8 w-auto object-contain filter brightness-0 invert"
            />
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleProfileClick}
              className="h-10 w-10 text-white hover:bg-white/10"
            >
              <User className="w-6 h-6" />
            </Button>

            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCartClick}
                className="h-10 w-10 text-white hover:bg-white/10"
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
      <main className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6">
        {/* Hero Banner - Noise Style */}
        <div className="relative bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg overflow-hidden mb-8 h-[400px] sm:h-[500px]">
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-4">
              FASHION
            </h1>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-700 mb-6">
              MANIA <span className="italic">Sale</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              11th - 15th JULY | UP TO 80% OFF
            </p>
            
            {/* Product Images */}
            <div className="flex items-center gap-8 mb-8">
              <div className="w-32 h-32 bg-white rounded-lg shadow-lg flex items-center justify-center">
                <img
                  src="https://i.postimg.cc/fRWRqwYP/GPT-model.png"
                  alt="Product 1"
                  className="w-24 h-24 object-cover rounded"
                />
              </div>
              <div className="w-32 h-32 bg-white rounded-lg shadow-lg flex items-center justify-center">
                <img
                  src="https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop"
                  alt="Product 2"
                  className="w-24 h-24 object-cover rounded"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Don't Make It Last-Minute!</h3>
          <div className="flex justify-center items-center gap-4 mb-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900">{timeLeft.hours.toString().padStart(2, '0')}</div>
              <div className="text-sm text-gray-600">HOURS</div>
            </div>
            <div className="text-3xl font-bold text-gray-900">:</div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900">{timeLeft.minutes.toString().padStart(2, '0')}</div>
              <div className="text-sm text-gray-600">MINUTES</div>
            </div>
            <div className="text-3xl font-bold text-gray-900">:</div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900">{timeLeft.seconds.toString().padStart(2, '0')}</div>
              <div className="text-sm text-gray-600">SECONDS</div>
            </div>
          </div>
          <h4 className="text-xl font-semibold text-gray-800">It's Pouring Savings</h4>
        </div>

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
                        
                        {/* Rating */}
                        <div className="absolute top-2 left-2 flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(product.rating)
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="text-xs text-gray-600 ml-1">({product.reviews})</span>
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

        {/* Products Grid - Noise Style */}
        {!searchQuery && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Popular Products</h3>
              <Button variant="link" className="text-sm text-blue-600 p-0 h-auto hover:text-blue-800">
                See all
              </Button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {demoProducts.map((product) => (
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
                              i < Math.floor(product.rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="text-xs text-gray-600 ml-1">({product.reviews})</span>
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