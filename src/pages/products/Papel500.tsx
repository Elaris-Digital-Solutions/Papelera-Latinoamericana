import React from 'react';
import ProductPage from './ProductPage';
import papel500Image from '../../assets/papel 500.jpg';

const Papel500: React.FC = () => {
  return (
    <ProductPage
      name="Papel 500"
      category="Papel institucional"
      description="Papel institucional de alta calidad, ideal para oficinas y uso diario."
      presentation="Paquete de 500 hojas."
      image={papel500Image}
    />
  );
};

export default Papel500;