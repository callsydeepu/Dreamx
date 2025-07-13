import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Brand {
  id: string;
  brandName: string;
  ownerEmail: string;
  password: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  pickupLocation: string;
  createdAt: string;
  status: 'Active' | 'Pending' | 'Inactive';
  totalProducts: number;
  totalOrders: number;
  revenue: number;
  brandDescription?: string;
  brandLogo?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountedPrice?: number;
  category: string;
  sizes: string[];
  images: string[];
  brandId: string;
  brandName: string;
  isPublic: boolean;
  createdAt: string;
  slug: string;
  rating?: number;
  reviews?: number;
}

interface BrandContextType {
  brands: Brand[];
  products: Product[];
  addBrand: (brand: Omit<Brand, 'id' | 'createdAt' | 'totalProducts' | 'totalOrders' | 'revenue'>) => void;
  updateBrand: (id: string, updates: Partial<Brand>) => void;
  deleteBrand: (id: string) => void;
  getBrandByEmail: (email: string) => Brand | undefined;
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'slug'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProductsByBrand: (brandId: string) => Product[];
  getAllPublicProducts: () => Product[];
}

const BrandContext = createContext<BrandContextType | undefined>(undefined);

export const useBrand = () => {
  const context = useContext(BrandContext);
  if (!context) {
    throw new Error('useBrand must be used within a BrandProvider');
  }
  return context;
};

export const BrandProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [brands, setBrands] = useState<Brand[]>([
    {
      id: 'brand-1',
      brandName: 'ROCKAGE',
      ownerEmail: 'rockage112@gmail.com',
      password: 'Abhishek@123',
      phone: '+91 98765 43210',
      address: '123 Fashion Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      pincode: '400001',
      pickupLocation: 'Mumbai Central',
      createdAt: '2025-07-01',
      status: 'Active',
      totalProducts: 1,
      totalOrders: 23,
      revenue: 45600,
      brandDescription: 'Rockage: Where fashion meets fearless attitude! Celebrate individuality with our premium 100% cotton, 250gsm oversized anime tees.',
      brandLogo: 'https://i.postimg.cc/xTVNmCps/Dream-X-Store.png'
    },
    {
      id: 'brand-2',
      brandName: 'StyleCraft',
      ownerEmail: 'style@craft.com',
      password: 'password123',
      phone: '+91 87654 32109',
      address: '456 Design Avenue',
      city: 'Delhi',
      state: 'Delhi',
      country: 'India',
      pincode: '110001',
      pickupLocation: 'Connaught Place',
      createdAt: '2025-06-27',
      status: 'Active',
      totalProducts: 0,
      totalOrders: 15,
      revenue: 32400
    },
    {
      id: 'brand-3',
      brandName: 'UrbanWear',
      ownerEmail: 'urban@wear.com',
      password: 'password123',
      phone: '+91 76543 21098',
      address: '789 Trend Road',
      city: 'Bangalore',
      state: 'Karnataka',
      country: 'India',
      pincode: '560001',
      pickupLocation: 'MG Road',
      createdAt: '2025-06-28',
      status: 'Pending',
      totalProducts: 0,
      totalOrders: 7,
      revenue: 18900
    }
  ]);

  const [products, setProducts] = useState<Product[]>([
    {
      id: 'product-1',
      name: 'Oversized t shirt',
      description: 'Rock the fandom with the "FANDOM" T-shirt! This rich green beauty, crafted from 100% cotton and a 250gsm fabric, provides an oversized fit that\'s perfect for casual coolness.',
      price: 1399,
      discountedPrice: 699,
      category: 'T-Shirts',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      images: ['https://i.postimg.cc/fRWRqwYP/GPT-model.png'],
      brandId: 'brand-1',
      brandName: 'ROCKAGE',
      isPublic: true,
      createdAt: '2025-07-01',
      slug: 'oversized-t-shirt',
      rating: 4.5,
      reviews: 128
    }
  ]);

  const addBrand = (brandData: Omit<Brand, 'id' | 'createdAt' | 'totalProducts' | 'totalOrders' | 'revenue'>) => {
    const newBrand: Brand = {
      ...brandData,
      id: `brand-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      totalProducts: 0,
      totalOrders: 0,
      revenue: 0
    };
    setBrands(prev => [...prev, newBrand]);
  };

  const updateBrand = (id: string, updates: Partial<Brand>) => {
    setBrands(prev => prev.map(brand => 
      brand.id === id ? { ...brand, ...updates } : brand
    ));
  };

  const deleteBrand = (id: string) => {
    setBrands(prev => prev.filter(brand => brand.id !== id));
    setProducts(prev => prev.filter(product => product.brandId !== id));
  };

  const getBrandByEmail = (email: string) => {
    return brands.find(brand => brand.ownerEmail === email);
  };

  const addProduct = (productData: Omit<Product, 'id' | 'createdAt' | 'slug'>) => {
    const slug = productData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const newProduct: Product = {
      ...productData,
      id: `product-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      slug: `${slug}-${Date.now()}`
    };
    setProducts(prev => [...prev, newProduct]);
    
    // Update brand's total products count
    setBrands(prev => prev.map(brand => 
      brand.id === productData.brandId 
        ? { ...brand, totalProducts: brand.totalProducts + 1 }
        : brand
    ));
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(product => 
      product.id === id ? { ...product, ...updates } : product
    ));
  };

  const deleteProduct = (id: string) => {
    const product = products.find(p => p.id === id);
    if (product) {
      setProducts(prev => prev.filter(p => p.id !== id));
      
      // Update brand's total products count
      setBrands(prev => prev.map(brand => 
        brand.id === product.brandId 
          ? { ...brand, totalProducts: Math.max(0, brand.totalProducts - 1) }
          : brand
      ));
    }
  };

  const getProductsByBrand = (brandId: string) => {
    return products.filter(product => product.brandId === brandId);
  };

  const getAllPublicProducts = () => {
    return products.filter(product => product.isPublic);
  };

  return (
    <BrandContext.Provider
      value={{
        brands,
        products,
        addBrand,
        updateBrand,
        deleteBrand,
        getBrandByEmail,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductsByBrand,
        getAllPublicProducts
      }}
    >
      {children}
    </BrandContext.Provider>
  );
};