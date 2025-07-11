import React from "react";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { useNavigate, useParams } from "react-router-dom";

export const BrandProfilePage = (): JSX.Element => {
  const navigate = useNavigate();
  const { brandName } = useParams<{ brandName: string }>();

  // Demo brand data - in real app, fetch based on brandName
  const brandData = {
    name: "ROCKAGE",
    description: "Rockage: Where fashion meets fearless attitude! Celebrate individuality with our premium 100% cotton, 250gsm oversized anime tees. Bold designs like \"HONOR BOUND\" and \"GENJUTSU\" in sizes S-XXL. Wear your attitude. Rock your age!",
    tagline: "WEAR YOUR ATTITUDE, ROCK YOUR AGE",
    joinedDate: "2024-01-15",
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
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800 px-4 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="h-10 w-10 rounded-[1px] hover:bg-gray-800 text-white"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <h1 className="text-lg font-medium">{brandData.name}</h1>
          
          <div className="w-10" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-black py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center space-y-6">
            {/* Brand Logo/Name */}
            <div className="space-y-4">
              <h1 className="text-6xl md:text-8xl font-bold text-white tracking-wider">
                {brandData.name}
              </h1>
              <div className="w-32 h-1 bg-white mx-auto opacity-60"></div>
            </div>

            {/* Brand Description */}
            <div className="max-w-4xl mx-auto space-y-4">
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                {brandData.description}
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-6">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-[1px] text-lg font-medium">
                Explore Collection
              </Button>
            </div>

            {/* Tagline */}
            <div className="pt-8">
              <p className="text-2xl md:text-3xl font-light text-gray-400 tracking-widest">
                {brandData.tagline}
              </p>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 opacity-10">
          <div className="text-9xl font-bold text-white transform rotate-12">
            RA
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-white text-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Our Latest Collection
            </h2>
            <p className="text-lg text-gray-600">
              Discover our premium designs crafted with passion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {brandData.products.map((product) => (
              <Card 
                key={product.id}
                className="border border-gray-200 rounded-[1px] overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
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
                      className="absolute bottom-4 right-4 w-12 h-12 bg-white hover:bg-gray-100 text-black rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
                  <div className="p-6">
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

      {/* Brand Stats */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <p className="text-4xl font-bold text-white">{brandData.totalProducts}</p>
              <p className="text-gray-400">Products</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-white">{brandData.totalSales}+</p>
              <p className="text-gray-400">Happy Customers</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-white">2024</p>
              <p className="text-gray-400">Established</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-black">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Ready to Rock Your Style?
          </h2>
          <p className="text-lg text-gray-400">
            Join thousands of customers who trust {brandData.name} for premium fashion
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/dashboard')}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-[1px] text-lg font-medium"
            >
              Shop Now
            </Button>
            <Button 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black px-8 py-3 rounded-[1px] text-lg font-medium"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              Visit Store
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};