import React from 'react';
import { useParams } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  countInStock: number;
}

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = React.useState<Product | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [quantity, setQuantity] = React.useState(1);

  React.useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`);
      const data = await response.json();
      setProduct(data.data.product);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch product details');
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    // Implement cart functionality
    console.log('Adding to cart:', { productId: id, quantity });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">{error || 'Product not found'}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative">
          <img
            src={product.image || 'https://images.pexels.com/photos/19090/pexels-photo.jpg'}
            alt={product.name}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <p className="text-3xl font-bold text-blue-600 mb-6">
            ${product.price}
          </p>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Quantity:</label>
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="block w-full md:w-1/3 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            >
              {[...Array(product.countInStock)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleAddToCart}
            className="w-full md:w-auto bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;