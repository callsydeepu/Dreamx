# Full-Stack Integration Guide

## Backend Setup Verification

### 1. Backend Server Configuration

**Main Backend (API-Backend/app.js)**
- **Port**: 3000 (configurable via PORT environment variable)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based authentication

**Payment Scheduler API (API-Backend/Payment-SchedulerAPI/app.js)**
- **Port**: 3004 (configurable via PORT environment variable)
- **Payment Gateway**: Razorpay integration
- **Shipping**: Shiprocket API integration

### 2. MongoDB Connection Status
```javascript
// Check connection in API-Backend/app.js
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection error:', error));
```

### 3. API Endpoints Documentation

#### Authentication Endpoints (Main Backend)
```
POST /api/auth/register - User registration
POST /api/auth/login - User login
POST /api/auth/verify-email - Email verification
GET /api/auth/google - Google OAuth
GET /api/auth/google/callback - Google OAuth callback
```

#### User Management
```
GET /api/user/profile - Get user profile
POST /api/user/profile/update - Update user profile
POST /api/user/stats - Get user statistics
POST /api/user/top-brands - Get top brand users
```

#### Design Management
```
GET /api/profile - Get user's designs
POST /api/adddesign - Add new design
GET /api/design/:id - Get design by ID
POST /api/editdesign/:id - Edit design
DELETE /api/deletedesign/:id - Delete design
GET /api/public - Get public designs
GET /api/publicBranded - Get branded public designs
```

#### Payment & Orders (Payment Scheduler API)
```
POST /getorderid - Generate Razorpay order ID
POST /verifypayment - Verify payment
POST /add-brand-account - Add brand account
GET /delivered-orders - Get delivered orders
POST /vendor-sales - Get vendor sales data
POST /vendor-orders - Get vendor orders
```

#### Shipping Integration (Shiprocket)
```
POST /orders/add-pickup-location - Add pickup location
POST /orders/get-delivery-price - Get delivery pricing
POST /orders/place-order - Place shipping order
POST /orders/request-pickup - Request pickup
GET /orders/track-shipment/:id - Track shipment
POST /orders/invoice - Generate invoice
```

### 4. Database Schema

#### User Model
```javascript
{
  email: String (required, unique),
  password: String,
  username: String,
  lastName: String,
  authType: String (enum: ['email', 'google', 'facebook']),
  isVerified: Boolean,
  verificationToken: String,
  verificationTokenExpiry: Date,
  bio: String,
  isabrand: Boolean,
  hero_image: String,
  pickup_location: String,
  pincode: Number,
  bank_ac: String,
  ifsc: String,
  phone: String,
  address: String,
  city: String,
  state: String,
  country: String,
  collab: [String]
}
```

#### Design Model
```javascript
{
  title: String (required),
  description: String,
  designer: ObjectId (ref: 'User'),
  sizes: [String],
  brand_upload: Boolean,
  colabs: String,
  pickup_location: String,
  pincode: Number,
  price: Number (required),
  discount: Number,
  category: String (required),
  images: [String],
  image_1: String,
  image_2: String,
  image_3: String,
  image_4: String,
  isPublic: Boolean,
  ratings: [{
    user: ObjectId (ref: 'User'),
    rating: Number,
    review: String,
    date: Date
  }]
}
```

#### Order Model
```javascript
{
  User: ObjectId,
  vendor: ObjectId,
  address: String (required),
  items: [{
    title: String,
    category: String,
    size: String,
    price: Number,
    quantity: Number
  }],
  subtotal: Number,
  tax: Number,
  shipping: Number,
  total: Number,
  billing_customer_name: String,
  billing_address: String,
  billing_city: String,
  billing_pincode: String,
  billing_state: String,
  billing_country: String,
  billing_email: String,
  billing_phone: String,
  status: String (default: 'Pending'),
  paymentid: String,
  shipment_id: String,
  pickup_location: String,
  createdAt: Date
}
```

## Frontend Configuration

### 1. Environment Variables Setup

Create `.env` file in frontend root:
```env
# API Configuration
VITE_MAIN_API_URL=http://localhost:3000
VITE_PAYMENT_API_URL=http://localhost:3004

# Authentication
VITE_JWT_SECRET=your-jwt-secret

# Payment Gateway
VITE_RAZORPAY_KEY=your-razorpay-key

# Google OAuth
VITE_GOOGLE_CLIENT_ID=your-google-client-id

# App Configuration
VITE_APP_NAME=Dream X Store
VITE_APP_URL=http://localhost:5173
```

### 2. Install Required Dependencies

```bash
npm install axios @types/axios
npm install @types/node
npm install dotenv
```

### 3. API Service Configuration

Create `src/services/api.ts`:
```typescript
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// API Base URLs
const MAIN_API_URL = import.meta.env.VITE_MAIN_API_URL || 'http://localhost:3000';
const PAYMENT_API_URL = import.meta.env.VITE_PAYMENT_API_URL || 'http://localhost:3004';

// Create axios instances
export const mainApi: AxiosInstance = axios.create({
  baseURL: MAIN_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const paymentApi: AxiosInstance = axios.create({
  baseURL: PAYMENT_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for authentication
const addAuthInterceptor = (api: AxiosInstance) => {
  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = localStorage.getItem('authToken');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};

// Response interceptor for error handling
const addResponseInterceptor = (api: AxiosInstance) => {
  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('authToken');
        window.location.href = '/auth';
      }
      return Promise.reject(error);
    }
  );
};

// Apply interceptors
addAuthInterceptor(mainApi);
addAuthInterceptor(paymentApi);
addResponseInterceptor(mainApi);
addResponseInterceptor(paymentApi);

export default { mainApi, paymentApi };
```

### 4. Authentication Service

Create `src/services/authService.ts`:
```typescript
import { mainApi } from './api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  username: string;
  lastName?: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
  lastName?: string;
  isVerified: boolean;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<{ token: string; user: User }> {
    const response = await mainApi.post('/api/auth/login', credentials);
    return response.data;
  },

  async register(userData: RegisterData): Promise<{ message: string; user: User }> {
    const response = await mainApi.post('/api/auth/register', userData);
    return response.data;
  },

  async verifyEmail(token: string): Promise<{ token: string; user: User }> {
    const response = await mainApi.post('/api/auth/verify-email', { token });
    return response.data;
  },

  async getProfile(): Promise<User> {
    const response = await mainApi.get('/api/auth/profile');
    return response.data.user;
  },

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await mainApi.post('/api/auth/change-password', {
      currentPassword,
      newPassword,
    });
  },
};
```

### 5. Design Service

Create `src/services/designService.ts`:
```typescript
import { mainApi } from './api';

export interface Design {
  _id: string;
  title: string;
  description: string;
  price: number;
  discount?: number;
  category: string;
  images: string[];
  sizes: string[];
  isPublic: boolean;
  designer: string;
  pickup_location: string;
  pincode: number;
}

export const designService = {
  async getPublicDesigns(): Promise<Design[]> {
    const response = await mainApi.get('/api/publicBranded');
    return response.data.designs;
  },

  async getUserDesigns(): Promise<Design[]> {
    const response = await mainApi.get('/api/profile');
    return response.data.designs;
  },

  async getDesignById(id: string): Promise<Design> {
    const response = await mainApi.get(`/api/design/${id}`);
    return response.data;
  },

  async createDesign(formData: FormData): Promise<Design> {
    const response = await mainApi.post('/api/adddesign', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.design;
  },

  async updateDesign(id: string, formData: FormData): Promise<Design> {
    const response = await mainApi.post(`/api/editdesign/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.design;
  },

  async deleteDesign(id: string): Promise<void> {
    await mainApi.delete(`/api/deletedesign/${id}`);
  },
};
```

### 6. Payment Service

Create `src/services/paymentService.ts`:
```typescript
import { paymentApi } from './api';

export interface OrderData {
  address: string;
  items: Array<{
    title: string;
    category: string;
    size: string;
    price: number;
    quantity: number;
  }>;
  totals: {
    subtotal: number;
    tax: number;
    shipping: number;
    total: number;
  };
  billing_customer_name: string;
  billing_address: string;
  billing_city: string;
  billing_pincode: string;
  billing_state: string;
  billing_country: string;
  billing_email: string;
  billing_phone: string;
  pickup_location: string;
}

export const paymentService = {
  async createOrder(orderData: OrderData): Promise<{ orderid: any; purchaseid: string; email: string }> {
    const response = await paymentApi.post('/getorderid', orderData);
    return response.data;
  },

  async verifyPayment(paymentData: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }, orderId: string, email: string): Promise<void> {
    await paymentApi.post(`/verifypayment?id=${orderId}&email=${email}`, paymentData);
  },

  async getDeliveryPrice(pickupPostcode: string, deliveryPostcode: string): Promise<any> {
    const response = await paymentApi.post('/orders/get-delivery-price', {
      pickup_postcode: pickupPostcode,
      delivery_postcode: deliveryPostcode,
    });
    return response.data;
  },

  async getVendorSales(): Promise<any> {
    const response = await paymentApi.post('/orders/vendor-sales');
    return response.data;
  },

  async getVendorOrders(): Promise<any> {
    const response = await paymentApi.post('/orders/vendor-orders');
    return response.data;
  },
};
```

### 7. User Service

Create `src/services/userService.ts`:
```typescript
import { mainApi } from './api';

export interface UserProfile {
  id: string;
  username: string;
  lastName?: string;
  email: string;
  bio: string;
  isabrand: boolean;
  hero_image: string;
  collab: string[];
}

export const userService = {
  async getProfile(): Promise<UserProfile> {
    const response = await mainApi.get('/api/user/profile');
    return response.data.user;
  },

  async updateProfile(formData: FormData): Promise<UserProfile> {
    const response = await mainApi.post('/api/user/profile/update', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.user;
  },

  async getTopBrands(): Promise<any[]> {
    const response = await mainApi.post('/api/user/top-brands');
    return response.data.brands;
  },

  async getOtherBrands(): Promise<any[]> {
    const response = await mainApi.post('/api/user/other-brands');
    return response.data.brands;
  },

  async addCollab(id: string): Promise<void> {
    await mainApi.post('/api/user/add-collab', { id });
  },

  async sendNotification(data: {
    name: string;
    phone: string;
    email: string;
    subject: string;
  }): Promise<void> {
    await mainApi.post('/api/user/send-notification', data);
  },
};
```

### 8. Error Handling Utility

Create `src/utils/errorHandler.ts`:
```typescript
import { AxiosError } from 'axios';

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

export const handleApiError = (error: unknown): ApiError => {
  if (error instanceof AxiosError) {
    return {
      message: error.response?.data?.message || error.message || 'An error occurred',
      status: error.response?.status,
      code: error.code,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
    };
  }

  return {
    message: 'An unknown error occurred',
  };
};

export const showErrorToast = (error: unknown) => {
  const apiError = handleApiError(error);
  // Implement your toast notification here
  console.error('API Error:', apiError);
  alert(apiError.message); // Replace with proper toast notification
};
```

### 9. Payment Gateway Integration

Create `src/utils/razorpay.ts`:
```typescript
declare global {
  interface Window {
    Razorpay: any;
  }
}

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: any) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
}

export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const initiatePayment = async (options: RazorpayOptions): Promise<void> => {
  const isLoaded = await loadRazorpayScript();
  
  if (!isLoaded) {
    throw new Error('Failed to load Razorpay SDK');
  }

  const razorpay = new window.Razorpay(options);
  razorpay.open();
};
```

### 10. Updated AuthContext Integration

Update `src/contexts/AuthContext.tsx`:
```typescript
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService, User } from '../services/authService';
import { handleApiError } from '../utils/errorHandler';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: any) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      authService.getProfile()
        .then(setUser)
        .catch(() => {
          localStorage.removeItem('authToken');
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await authService.login({ email, password });
      localStorage.setItem('authToken', response.token);
      setUser(response.user);
      return true;
    } catch (error) {
      console.error('Login error:', handleApiError(error));
      return false;
    }
  };

  const register = async (userData: any): Promise<boolean> => {
    try {
      await authService.register(userData);
      return true;
    } catch (error) {
      console.error('Registration error:', handleApiError(error));
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
```

## Security Best Practices

### 1. Environment Variables
- Never commit `.env` files to version control
- Use different environment files for development, staging, and production
- Validate environment variables on application startup

### 2. Authentication Security
- Store JWT tokens securely (consider httpOnly cookies for production)
- Implement token refresh mechanism
- Add rate limiting to authentication endpoints
- Use HTTPS in production

### 3. API Security
- Implement CORS properly
- Add request validation middleware
- Use helmet.js for security headers
- Implement API rate limiting

### 4. Database Security
- Use MongoDB connection with authentication
- Implement proper data validation
- Use parameterized queries to prevent injection attacks
- Regular database backups

## Testing the Integration

### 1. Backend Testing
```bash
# Test main backend
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'

# Test payment API
curl -X POST http://localhost:3004/status \
  -H "Content-Type: application/json"
```

### 2. Frontend Testing
```bash
# Start frontend development server
npm run dev

# Test API integration in browser console
fetch('/api/user/profile', {
  headers: {
    'Authorization': 'Bearer ' + localStorage.getItem('authToken')
  }
})
```

### 3. End-to-End Testing
1. Register a new user
2. Verify email (if implemented)
3. Login with credentials
4. Create a design
5. Place an order
6. Process payment
7. Track shipment

## Deployment Considerations

### 1. Environment Configuration
- Set production environment variables
- Configure database connection strings
- Set up SSL certificates
- Configure domain and CORS settings

### 2. Performance Optimization
- Implement caching strategies
- Optimize database queries
- Use CDN for static assets
- Implement lazy loading

### 3. Monitoring and Logging
- Set up error tracking (e.g., Sentry)
- Implement application logging
- Monitor API performance
- Set up health checks

This integration guide provides a complete setup for connecting your Node.js backend with the React frontend, ensuring secure communication and proper error handling throughout the application.