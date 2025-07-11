import React, { useState } from "react";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  brandName: string;
}

export const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  brandName
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    discountedPrice: "",
    category: "T-Shirts",
    sizes: {
      S: false,
      M: false,
      L: false,
      XL: false,
      XXL: false
    },
    images: [] as File[],
    makePublic: true
  });

  const [dragActive, setDragActive] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      if (name === 'makePublic') {
        setFormData(prev => ({ ...prev, makePublic: checkbox.checked }));
      } else {
        // Handle size checkboxes
        setFormData(prev => ({
          ...prev,
          sizes: { ...prev.sizes, [name]: checkbox.checked }
        }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files);
      setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }));
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }));
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Product data:", formData);
    // Handle product upload
    alert("Product uploaded successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-[1px] border-0">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Upload Design</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 rounded-[1px] hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full h-12 px-4 border border-gray-300 rounded-[1px] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-[1px] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
                required
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full h-12 px-4 border border-gray-300 rounded-[1px] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>

            {/* Discounted Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discounted Price
              </label>
              <input
                type="number"
                name="discountedPrice"
                value={formData.discountedPrice}
                onChange={handleInputChange}
                placeholder="Enter discounted price (optional)"
                className="w-full h-12 px-4 border border-gray-300 rounded-[1px] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-500"
              />
            </div>

            {/* Available Sizes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Available Sizes
              </label>
              <div className="flex gap-3">
                {Object.entries(formData.sizes).map(([size, checked]) => (
                  <label key={size} className="flex items-center">
                    <input
                      type="checkbox"
                      name={size}
                      checked={checked}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
                    />
                    <span className="ml-2 text-sm text-gray-700">{size}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full h-12 px-4 border border-gray-300 rounded-[1px] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white"
              >
                <option value="T-Shirts">T-Shirts</option>
                <option value="Hoodies">Hoodies</option>
                <option value="Shirts">Shirts</option>
                <option value="Jackets">Jackets</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>

            {/* Upload Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Upload Images
              </label>
              
              {/* Drag and Drop Area */}
              <div
                className={`relative border-2 border-dashed rounded-[1px] p-8 text-center transition-colors ${
                  dragActive 
                    ? 'border-purple-500 bg-purple-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                    <Upload className="h-6 w-6 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Choose files or drag and drop</p>
                    <p className="text-xs text-gray-500">PNG, JPG up to 10MB each</p>
                  </div>
                </div>
              </div>

              {/* Image Preview */}
              {formData.images.length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {formData.images.map((file, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square bg-gray-100 rounded-[1px] overflow-hidden">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 h-6 w-6 bg-red-500 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Make Public Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="makePublic"
                checked={formData.makePublic}
                onChange={handleInputChange}
                className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
              />
              <label className="ml-2 text-sm text-gray-700">
                Make this design public
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 h-12 border-gray-300 rounded-[1px]"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 h-12 bg-purple-600 hover:bg-purple-700 text-white rounded-[1px]"
              >
                Upload Design
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};