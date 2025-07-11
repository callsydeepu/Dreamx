import React, { useState } from "react";
import { ArrowLeft, Star, MapPin, MessageSquare, Share2, Globe, Twitter, Linkedin, Dribbble, Mail } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export const BrandProfilePage = (): JSX.Element => {
  const navigate = useNavigate();
  const { brandName } = useParams<{ brandName: string }>();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("My Story");

  // If user is not authenticated, redirect to auth page
  if (!user) {
    navigate('/auth');
    return <div></div>;
  }

  // Get brand data based on authenticated user or URL parameter
  const getBrandData = () => {
    // If viewing own profile or if brandName matches user's brand
    if (!brandName || brandName === user.brandName || brandName === user.username) {
      return {
        name: user.isBrand ? user.brandName || user.username : user.username,
        username: user.username,
        email: user.email,
        profileImage: user.brandLogo || "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
        role: user.isBrand ? "Brand Owner" : "Design",
        experience: "10 years",
        location: "Chicago, IL",
        verified: true,
        lookingForWork: !user.isBrand,
        isBrand: user.isBrand,
        brandDescription: user.brandDescription || "Passionate about creating amazing designs and experiences.",
        joinedDate: user.joinedDate,
        superpowerSkills: user.isBrand ? [
          "Brand Design",
          "Product Development", 
          "Fashion Design"
        ] : [
          "Interaction Design",
          "Figma",
          "User Research"
        ],
        totalProducts: 3,
        totalSales: 105,
        story: {
          intro: user.isBrand 
            ? user.brandDescription || "We are passionate about creating unique and high-quality products that resonate with our customers."
            : "In 20+ years, I've built and led teams, shipped product at scale, and helped organizations rediscover how to work together.",
          description: user.isBrand
            ? "Our brand focuses on delivering exceptional quality and innovative designs that stand out in the market."
            : "I'm a systems thinker that takes pride in bringing world-class consumer grade user experiences to business tools and products that tread new territory or reimagine tired and inadequate norms.",
          details: user.isBrand
            ? "We believe in the power of creativity and craftsmanship to create products that not only look great but also tell a story."
            : "Working at the micro and macro level, I balance short term tactical decisions with long-term strategic vision."
        },
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
    } else {
      // Viewing another brand's profile - in real app, fetch from API
      return {
        name: brandName,
        username: brandName,
        email: `${brandName}@example.com`,
        profileImage: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
        role: "Brand Owner",
        experience: "5 years",
        location: "New York, NY",
        verified: true,
        lookingForWork: false,
        isBrand: true,
        brandDescription: "Creating innovative fashion designs for the modern world.",
        joinedDate: "2023-01-01",
        superpowerSkills: [
          "Brand Design",
          "Product Development",
          "Fashion Design"
        ],
        totalProducts: 2,
        totalSales: 50,
        story: {
          intro: "We are a creative brand focused on bringing unique designs to life.",
          description: "Our mission is to create products that inspire and connect with people on a personal level.",
          details: "Every piece we create tells a story and represents our commitment to quality and innovation."
        },
        products: [
          {
            id: 1,
            name: "Designer Collection",
            price: 999,
            originalPrice: 1499,
            image: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
            slug: "designer-collection"
          }
        ]
      };
    }
  };

  const brandData = getBrandData();
  const tabs = ["My Story", "Skills", "Projects", "Experience"];

  const handleProductClick = (slug: string) => {
    navigate(`/product/${slug}`);
  };

  const getTabContent = () => {
    switch (activeTab) {
      case "My Story":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-light text-gray-900 mb-6">My Story</h2>
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p className="text-lg">
                {brandData.story.intro}
              </p>
              <p className="text-lg">
                {brandData.story.description}
              </p>
              <p className="text-lg">
                {brandData.story.details}
              </p>
            </div>
          </div>
        );
      case "Skills":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-light text-gray-900 mb-6">Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {brandData.superpowerSkills.map((skill, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="font-medium">{skill}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case "Projects":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-light text-gray-900 mb-6">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {brandData.products.map((product) => (
                <Card 
                  key={product.id}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  onClick={() => handleProductClick(product.slug)}
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      <div className="aspect-[4/5] bg-gray-100 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
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
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      case "Experience":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-light text-gray-900 mb-6">Experience</h2>
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Senior Designer</h3>
                <p className="text-gray-600 mb-2">Dream X Store • 2020 - Present</p>
                <p className="text-gray-700">Leading design initiatives for fashion e-commerce platform, focusing on user experience and brand identity.</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Product Designer</h3>
                <p className="text-gray-600 mb-2">Fashion Tech Co • 2018 - 2020</p>
                <p className="text-gray-700">Designed user interfaces for mobile and web applications in the fashion industry.</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #fce7f3 0%, #f3e8ff 50%, #fef3cd 100%)' }}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
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

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Profile Header Card */}
        <Card className="bg-white/95 backdrop-blur-sm border border-white/30 shadow-xl rounded-3xl overflow-hidden mb-8">
          <CardContent className="p-0">
            {/* Decorative Background Pattern */}
            <div className="relative" style={{ background: 'linear-gradient(135deg, #fce7f3 0%, #f3e8ff 50%, #fef3cd 100%)' }}>
              {/* Geometric Pattern Overlay */}
              <div className="absolute inset-0 opacity-20">
                <svg width="100%" height="100%" viewBox="0 0 400 300" className="w-full h-full">
                  <defs>
                    <pattern id="geometric" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                      <polygon points="20,0 40,20 20,40 0,20" fill="white" opacity="0.3"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#geometric)" />
                </svg>
              </div>
              
              {/* Profile Content */}
              <div className="relative z-10 flex flex-col items-center text-center space-y-6 p-12">
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
                    <h1 className="text-3xl font-bold text-gray-900">{brandData.name}</h1>
                    {brandData.verified && (
                      <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                        <Star className="w-4 h-4 text-white fill-current" />
                      </div>
                    )}
                  </div>
                  
                  {/* Username and Email */}
                  <div className="text-center space-y-1">
                    <p className="text-gray-600 text-lg">@{brandData.username}</p>
                    <p className="text-gray-500 text-sm">{brandData.email}</p>
                    {brandData.joinedDate && (
                      <p className="text-gray-500 text-xs">Joined {new Date(brandData.joinedDate).toLocaleDateString()}</p>
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
                <div className="flex items-center gap-12 text-center">
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
                  <div className="flex flex-wrap justify-center gap-3">
                    {brandData.superpowerSkills.map((skill, index) => (
                      <div 
                        key={index}
                        className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-gray-700 border border-white/30"
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

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-lg border border-white/30">
            {tabs.map((tab) => (
              <Button 
                key={tab}
                variant="ghost"
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
                  activeTab === tab 
                    ? 'bg-white shadow-sm text-gray-900' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab}
              </Button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/30">
          {getTabContent()}
        </div>
      </div>
    </div>
  );
};