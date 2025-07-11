import React from "react";
import { ArrowLeft, ExternalLink, Star, MapPin, MessageSquare, Share2, Globe, Twitter, Linkedin, Dribbble, Mail } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { useNavigate, useParams } from "react-router-dom";

export const BrandProfilePage = (): JSX.Element => {
  const navigate = useNavigate();
  const { brandName } = useParams<{ brandName: string }>();

  // Demo brand data - in real app, fetch based on brandName
  const brandData = {
    name: "Brooklyn Simmons",
    profileImage: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
    role: "Design",
    experience: "10 years",
    location: "Chicago, IL",
    verified: true,
    lookingForWork: true,
    superpowerSkills: [
      "Interaction Design",
      "Figma",
      "User Research"
    ],
    totalProducts: 3,
    totalSales: 105,
    products: [
      {
        id: 1,
        name: "Oversized t shirt",
        price: 699,
        originalPrice: 1399,
        image: "https://i.postimg.cc/fRWRqwYP/GPT-model.png",
        slug: "oversized-t-shirt"
      },
      {
        id: 2,
        name: "Honor Bound Tee",
        price: 799,
        originalPrice: 1299,
        image: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
        slug: "honor-bound-tee"
      },
      {
        id: 3,
        name: "Genjutsu Design",
        price: 899,
        originalPrice: 1499,
        image: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
        slug: "genjutsu-design"
      }
    ]
  };

  const handleProductClick = (slug: string) => {
    navigate(`/product/${slug}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="h-10 w-10 rounded-full hover:bg-gray-100 text-gray-700"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <h1 className="text-lg font-medium text-gray-900">Profile</h1>
          
          <div className="w-10" />
        </div>
      </header>

      {/* Profile Card */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl rounded-3xl overflow-hidden">
          <CardContent className="p-0">
            {/* Decorative Background Pattern */}
            <div className="relative bg-gradient-to-br from-pink-100 to-orange-100 p-8">
              <div className="absolute inset-0 opacity-10">
                <div className="grid grid-cols-8 gap-4 h-full">
                  {Array.from({ length: 32 }).map((_, i) => (
                    <div key={i} className="bg-white rounded-lg"></div>
                  ))}
                </div>
              </div>
              
              {/* Profile Content */}
              <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                {/* Profile Image */}
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <img
                      src={brandData.profileImage}
                      alt={brandData.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Looking for Work Badge */}
                  {brandData.lookingForWork && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      <div className="bg-green-500 text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        Looking for Work
                      </div>
                    </div>
                  )}
                </div>

                {/* Name and Verification */}
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <h1 className="text-2xl font-bold text-gray-900">{brandData.name}</h1>
                    {brandData.verified && (
                      <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                        <Star className="w-4 h-4 text-white fill-current" />
                      </div>
                    )}
                  </div>
                  
                  {/* Location */}
                  <div className="flex items-center justify-center gap-1 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{brandData.location}</span>
                  </div>
                </div>

                {/* Social Icons */}
                <div className="flex items-center gap-3">
                  <Button 
                    size="icon"
                    variant="outline"
                    className="w-10 h-10 rounded-full border-gray-300 hover:bg-gray-100"
                  >
                    <Globe className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="icon"
                    variant="outline"
                    className="w-10 h-10 rounded-full border-gray-300 hover:bg-gray-100"
                  >
                    <Twitter className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="icon"
                    variant="outline"
                    className="w-10 h-10 rounded-full border-gray-300 hover:bg-gray-100"
                  >
                    <Linkedin className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="icon"
                    variant="outline"
                    className="w-10 h-10 rounded-full border-gray-300 hover:bg-gray-100"
                  >
                    <Dribbble className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="icon"
                    className="w-10 h-10 rounded-full bg-gray-900 hover:bg-gray-800 text-white"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="icon"
                    className="w-10 h-10 rounded-full bg-gray-900 hover:bg-gray-800 text-white"
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>

                {/* Role and Experience */}
                <div className="flex items-center gap-8 text-center">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600 font-medium">Role</p>
                    <p className="text-2xl font-bold text-gray-900">{brandData.role}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600 font-medium">Experience</p>
                    <p className="text-2xl font-bold text-gray-900">{brandData.experience}</p>
                  </div>
                </div>

                {/* Superpower Skills */}
                <div className="space-y-3">
                  <p className="text-sm text-gray-600 font-medium">Superpower Skills</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {brandData.superpowerSkills.map((skill, index) => (
                      <div 
                        key={index}
                        className="flex items-center gap-1 bg-white/60 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-gray-700"
                      >
                        <Star className="w-3 h-3 text-yellow-500" />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-4xl mx-auto px-4 mb-8">
        <div className="flex justify-center">
          <div className="flex bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-lg">
            <Button 
              variant="ghost"
              className="rounded-full px-6 py-2 text-sm font-medium"
            >
              Skills
            </Button>
            <Button 
              variant="ghost"
              className="rounded-full px-6 py-2 text-sm font-medium bg-white shadow-sm"
            >
              Projects
            </Button>
            <Button 
              variant="ghost"
              className="rounded-full px-6 py-2 text-sm font-medium"
            >
              Experience
            </Button>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brandData.products.map((product) => (
              <Card 
                key={product.id}
                className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
                onClick={() => handleProductClick(product.slug)}
              >
                <CardContent className="p-0">
                  <div className="relative">
                    {/* Product Image */}
                    <div className="aspect-[4/5] bg-gray-100 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Cart Button */}
                    <Button
                      size="icon"
                      className="absolute bottom-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-900 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle add to cart
                      }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0h15M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z" />
                      </svg>
                    </Button>
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-3">
                      <span className="text-xl font-bold text-gray-900">
                        ₹{product.price}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        ₹{product.originalPrice}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};