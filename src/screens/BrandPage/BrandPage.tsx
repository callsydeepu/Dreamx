import React, { useState } from "react";
import { ArrowLeft, Heart, Star, MapPin, Globe, Instagram, Twitter, Facebook } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";

export const BrandPage = (): JSX.Element => {
  const navigate = useNavigate();
  const { brandSlug } = useParams<{ brandSlug: string }>();
  const { getTotalItems } = useCart();
  const [activeTab, setActiveTab] = useState("Products");

  // Mock brand data - in real app, fetch based on brandSlug
  const getBrandData = (slug: string | undefined) => {
    const brands = {
      "rockage": {
        id: 1,
        name: "ROCKAGE",
        slug: "rockage",
        description: "Rockage: Where fashion meets fearless attitude! Celebrate individuality with our premium 100% cotton, 250gsm oversized anime tees. Bold designs like \"HONOR BOUND\" and \"GENJUTSU\" in sizes S-XXL. Wear your attitude. Rock your age!",
        logo: "https://i.postimg.cc/xTVNmCps/Dream-X-Store.png",
        coverImage: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop",
        location: "Mumbai, India",
        website: "https://rockage.com",
        email: "rockage112@gmail.com",
        phone: "+91 98765 43210",
        founded: "2024",
        followers: 1250,
        following: 89,
        totalProducts: 5,
        totalSales: 156,
        rating: 4.8,
        reviews: 89,
        socialMedia: {
          instagram: "https://instagram.com/rockage",
          twitter: "https://twitter.com/rockage",
          facebook: "https://facebook.com/rockage"
        },
        products: [
          {
            id: 1,
            name: "Oversized t shirt",
            price: 699,
            originalPrice: 1399,
            image: "https://i.postimg.cc/fRWRqwYP/GPT-model.png",
            slug: "oversized-t-shirt",
            rating: 4.5,
            reviews: 28
          },
          {
            id: 2,
            name: "Honor Bound Tee",
            price: 799,
            originalPrice: 1299,
            image: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
            slug: "honor-bound-tee",
            rating: 4.7,
            reviews: 35
          },
          {
            id: 3,
            name: "Genjutsu Design",
            price: 899,
            originalPrice: 1499,
            image: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
            slug: "genjutsu-design",
            rating: 4.6,
            reviews: 22
          }
        ]
      }
    };

    return brands[slug || "rockage"] || brands["rockage"];
  };

  const brand = getBrandData(brandSlug);
  const totalCartItems = getTotalItems();

  const handleProductClick = (productSlug: string) => {
    navigate(`/product/${productSlug}`);
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  const tabs = ["Products", "About", "Reviews"];

  const getTabContent = () => {
    switch (activeTab) {
      case "Products":
        return (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {brand.products.map((product) => (
              <Card 
                key={product.id}
                className="border border-gray-200 rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleProductClick(product.slug)}
              >
                <CardContent className="p-0">
                  <div className="relative">
                    <div className="aspect-square bg-gray-100 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    {/* Heart Icon */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="absolute top-2 right-2 h-8 w-8 bg-white/80 hover:bg-white rounded-full"
                    >
                      <Heart className="h-4 w-4 text-gray-600" />
                    </Button>

                    {/* Product Info */}
                    <div className="p-3">
                      <h4 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
                        {product.name}
                      </h4>
                      
                      <div className="flex items-center gap-1 mb-2">
                        <div className="flex items-center">
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
                        </div>
                        <span className="text-xs text-gray-500">({product.reviews})</span>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-bold text-gray-900">₹{product.price}</span>
                        <span className="text-xs text-gray-500 line-through">₹{product.originalPrice}</span>
                        <span className="text-xs text-green-600 font-medium">
                          {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );

      case "About":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">About {brand.name}</h3>
              <p className="text-gray-600 leading-relaxed">{brand.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Contact Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span>{brand.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-gray-500" />
                    <a href={brand.website} className="text-blue-600 hover:underline">{brand.website}</a>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Brand Stats</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Founded:</span>
                    <span className="font-medium">{brand.founded}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Products:</span>
                    <span className="font-medium">{brand.totalProducts}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Sales:</span>
                    <span className="font-medium">{brand.totalSales}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "Reviews":
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">{brand.rating}</div>
                <div className="flex items-center justify-center mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(brand.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <div className="text-sm text-gray-600">{brand.reviews} reviews</div>
              </div>
            </div>
            
            <div className="text-center py-8">
              <p className="text-gray-500">No reviews yet. Be the first to review this brand!</p>
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
            className="h-10 w-10 rounded-[40px] hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <h1 className="text-lg font-medium text-center flex-1 mx-4 truncate">
            {brand.name}
          </h1>
          
          {/* Cart Icon */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCartClick}
              className="h-10 w-10 rounded-[40px] hover:bg-gray-100"
            >
              <div className="w-6 h-6 text-gray-600" />
            </Button>
            
            {totalCartItems > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {totalCartItems > 99 ? '99+' : totalCartItems}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto">
        {/* Brand Header */}
        <div className="relative">
          {/* Cover Image */}
          <div className="h-48 sm:h-64 bg-gray-200 overflow-hidden">
            <img
              src={brand.coverImage}
              alt={brand.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Brand Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
            <div className="flex items-end gap-4">
              <div className="w-20 h-20 bg-white rounded-lg overflow-hidden border-4 border-white">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-white">
                <h1 className="text-2xl font-bold">{brand.name}</h1>
                <p className="text-white/90">{brand.location}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Stats */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 text-sm">
              <div className="text-center">
                <div className="font-bold text-gray-900">{brand.totalProducts}</div>
                <div className="text-gray-600">Products</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-gray-900">{brand.followers}</div>
                <div className="text-gray-600">Followers</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-gray-900">{brand.totalSales}</div>
                <div className="text-gray-600">Sales</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-[30px]">
                Follow
              </Button>
              <div className="flex items-center gap-1">
                {brand.socialMedia.instagram && (
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Instagram className="h-4 w-4" />
                  </Button>
                )}
                {brand.socialMedia.twitter && (
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Twitter className="h-4 w-4" />
                  </Button>
                )}
                {brand.socialMedia.facebook && (
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Facebook className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white border-b border-gray-200 px-6">
          <div className="flex gap-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white p-6">
          {getTabContent()}
        </div>
      </main>
    </div>
  );
};