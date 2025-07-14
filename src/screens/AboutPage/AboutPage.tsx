import React from "react";
import { HeroSection } from "../LandingPage/sections/HeroSection";
import { Footer } from "../LandingPage/sections/Footer";
import { FloatingChatButton } from "../LandingPage/sections/FloatingChatButton";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Heart, Users, Shield, Truck, RotateCcw, Star, Target, Globe, Award } from "lucide-react";

export const AboutPage = (): JSX.Element => {
  const values = [
    {
      icon: Heart,
      title: "Customer-First Approach",
      description: "Your satisfaction is our priority. We put customers at the center of everything we do."
    },
    {
      icon: Shield,
      title: "Transparency & Trust",
      description: "We believe in honest communication and building lasting relationships with our customers."
    },
    {
      icon: Award,
      title: "Quality Excellence",
      description: "Every product is carefully curated to meet our high standards of quality and innovation."
    },
    {
      icon: Globe,
      title: "Global Community",
      description: "Connecting dreamers and creators from around the world through exceptional products."
    }
  ];

  const features = [
    {
      icon: Star,
      title: "Curated Selection",
      description: "Only the best products make it to our store"
    },
    {
      icon: Users,
      title: "Customer-First Approach",
      description: "Your satisfaction is our priority"
    },
    {
      icon: Truck,
      title: "Fast & Reliable Shipping",
      description: "We deliver right to your doorstep"
    },
    {
      icon: RotateCcw,
      title: "Easy Returns",
      description: "Shopping with us is risk-free"
    }
  ];

  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      description: "Passionate about connecting people with products that make a difference."
    },
    {
      name: "Michael Chen",
      role: "Head of Product",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      description: "Ensures every product meets our quality standards and customer expectations."
    },
    {
      name: "Emily Rodriguez",
      role: "Customer Experience Lead",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      description: "Dedicated to making every customer interaction exceptional and memorable."
    },
    {
      name: "David Kim",
      role: "Operations Director",
      image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      description: "Manages logistics and ensures smooth operations from order to delivery."
    }
  ];

  return (
    <div className="bg-white w-full min-h-screen">
      <div className="bg-white w-full max-w-none mx-auto relative">
        {/* Hero Section - Fixed Navigation */}
        <HeroSection />
        
        {/* Main Content */}
        <main className="pt-0">
          {/* Hero Banner */}
          <section className="w-full bg-gradient-to-br from-blue-600 to-purple-700 py-16 sm:py-20 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
              <div className="max-w-4xl mx-auto text-center space-y-6">
                <Badge className="bg-white/20 text-white hover:bg-white/30 px-4 py-2 text-sm font-medium" style={{ borderRadius: '20px' }}>
                  Founded in 2025
                </Badge>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white leading-tight">
                  About DreamX World
                </h1>
                <p className="text-xl sm:text-2xl md:text-3xl text-white/90 leading-relaxed max-w-3xl mx-auto">
                  Your new destination for unique products and seamless shopping experiences
                </p>
              </div>
            </div>
          </section>

          {/* Our Story Section */}
          <section className="w-full py-16 sm:py-20 md:py-24 lg:py-32 bg-white">
            <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                  {/* Left - Content */}
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 mb-6">
                        Our Story
                      </h2>
                      <div className="space-y-6 text-lg sm:text-xl text-gray-700 leading-relaxed">
                        <p>
                          DreamX World began with a simple idea: to bring joy, inspiration, and innovation to everyday life. Founded in 2025, we set out to create an online marketplace where quality, creativity, and customer satisfaction are at the heart of everything we do.
                        </p>
                        <p>
                          Our journey started with a passion for connecting people with products that make a difference. We believe that shopping should be more than just a transaction—it should be an experience that inspires and delights.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right - Image */}
                  <div className="relative">
                    <img
                      src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                      alt="Our Story"
                      className="w-full h-[400px] lg:h-[500px] object-cover rounded-lg shadow-xl"
                    />
                    <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-[#f1ff8c] rounded-lg border-4 border-white shadow-lg"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Who We Serve Section */}
          <section className="w-full py-16 sm:py-20 md:py-24 lg:py-32 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                  {/* Left - Image */}
                  <div className="relative order-2 lg:order-1">
                    <img
                      src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                      alt="Who We Serve"
                      className="w-full h-[400px] lg:h-[500px] object-cover rounded-lg shadow-xl"
                    />
                    <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-500 rounded-lg border-4 border-white shadow-lg"></div>
                  </div>

                  {/* Right - Content */}
                  <div className="space-y-8 order-1 lg:order-2">
                    <div>
                      <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 mb-6">
                        Who We Serve
                      </h2>
                      <div className="space-y-6 text-lg sm:text-xl text-gray-700 leading-relaxed">
                        <p>
                          We serve dreamers, creators, and everyday shoppers looking for something special. Whether you're searching for the perfect gift, upgrading your home, or treating yourself, DreamX World is here to help you discover products that stand out from the crowd.
                        </p>
                        <p>
                          Our community includes artists, entrepreneurs, families, and individuals who value quality, creativity, and authentic experiences.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Mission & Values Section */}
          <section className="w-full py-16 sm:py-20 md:py-24 lg:py-32 bg-white">
            <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 mb-6">
                    Our Mission & Values
                  </h2>
                  <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
                    Our mission is to make shopping online easy, enjoyable, and trustworthy. We believe in transparency, quality, and exceptional service.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {values.map((value, index) => (
                    <Card key={index} className="border border-gray-200 bg-white hover:shadow-lg transition-all duration-300" style={{ borderRadius: '1px' }}>
                      <CardContent className="p-8">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-[#f1ff8c] rounded-lg flex items-center justify-center flex-shrink-0">
                            <value.icon className="w-6 h-6 text-gray-900" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                              {value.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                              {value.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* How We Operate Section */}
          <section className="w-full py-16 sm:py-20 md:py-24 lg:py-32 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                  {/* Left - Content */}
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 mb-6">
                        How We Operate
                      </h2>
                      <div className="space-y-6 text-lg sm:text-xl text-gray-700 leading-relaxed">
                        <p>
                          We partner with independent creators and trusted suppliers to bring you a unique range of products. Our team works tirelessly to ensure smooth logistics, fast shipping, and responsive customer support.
                        </p>
                        <p>
                          Every product in our store is chosen with care, and every order is handled with attention to detail. We're committed to making your experience with DreamX World as effortless as possible.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right - Image */}
                  <div className="relative">
                    <img
                      src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                      alt="How We Operate"
                      className="w-full h-[400px] lg:h-[500px] object-cover rounded-lg shadow-xl"
                    />
                    <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-purple-500 rounded-lg border-4 border-white shadow-lg"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Meet the Team Section */}
          <section className="w-full py-16 sm:py-20 md:py-24 lg:py-32 bg-white">
            <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 mb-6">
                    Meet the Team
                  </h2>
                  <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
                    Behind DreamX World is a dedicated group of professionals who are passionate about what we do.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {teamMembers.map((member, index) => (
                    <Card key={index} className="border border-gray-200 bg-white hover:shadow-lg transition-all duration-300 text-center" style={{ borderRadius: '1px' }}>
                      <CardContent className="p-6">
                        <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {member.name}
                        </h3>
                        <p className="text-blue-600 font-medium mb-3">
                          {member.role}
                        </p>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {member.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Why Choose Us Section */}
          <section className="w-full py-16 sm:py-20 md:py-24 lg:py-32 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 mb-6">
                    Why Choose Us?
                  </h2>
                  <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
                    We're committed to providing an exceptional shopping experience that goes beyond expectations.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {features.map((feature, index) => (
                    <Card key={index} className="border border-gray-200 bg-white hover:shadow-lg transition-all duration-300 text-center" style={{ borderRadius: '1px' }}>
                      <CardContent className="p-8">
                        <div className="w-16 h-16 bg-[#f1ff8c] rounded-lg flex items-center justify-center mx-auto mb-4">
                          <feature.icon className="w-8 h-8 text-gray-900" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {feature.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Join Our Community CTA */}
          <section className="w-full py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-br from-purple-600 to-blue-700">
            <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
              <div className="max-w-4xl mx-auto text-center space-y-8">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight">
                  Join Our Community
                </h2>
                <p className="text-xl sm:text-2xl text-white/90 leading-relaxed">
                  Become part of the DreamX World family and discover products that inspire, delight, and make a difference in your everyday life.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-[#f1ff8c] hover:bg-[#e9f87a] text-black font-semibold px-8 py-4 rounded-full text-lg border border-black transition-all duration-300 hover:scale-105">
                    Start Shopping
                  </Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 rounded-full text-lg transition-all duration-300">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <Footer />

        {/* Floating Chat Button */}
        <FloatingChatButton />
      </div>
    </div>
  );
};