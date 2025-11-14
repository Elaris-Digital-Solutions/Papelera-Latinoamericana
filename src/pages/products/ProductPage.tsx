import React from 'react';
import { useParams, Link } from 'react-router-dom';
import products from '../../data/products';

const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return <div className="text-center text-red-500">Producto no encontrado</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-64 object-cover rounded-t-lg mb-4"
      />
      <h1 className="text-2xl font-bold text-blue-600 mb-2">{product.name}</h1>
      <h2 className="text-lg text-gray-600 mb-4">Categoría: {product.category}</h2>
      <p className="text-gray-700 mb-4">{product.description}</p>
      {product.specifications && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Especificaciones técnicas:</h3>
          <p className="text-gray-700">{product.specifications}</p>
        </div>
      )}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Presentación:</h3>
        <p className="text-gray-700">{product.presentation}</p>
      </div>
      <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Añadir al carrito
      </button>
      <div className="mt-8">
        <h2 className="text-xl font-bold text-blue-600 mb-4">Otros Productos</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products
            .filter((p) => p.id !== productId) // Exclude the current product
            .map((product) => (
              <li key={product.id} className="border rounded-lg p-4 shadow hover:shadow-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-t-lg mb-2"
                />
                <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
                <p className="text-sm text-gray-600">{product.category}</p>
                <Link
                  to={`/product/${product.id}`}
                  className="mt-2 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Ver Producto
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductPage;