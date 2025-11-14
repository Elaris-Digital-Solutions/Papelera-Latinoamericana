import React from 'react';
import ProductPage from './ProductPage';
import papel550Image from '../../assets/papel 550.jpg';

const Papel550: React.FC = () => {
  return (
    <ProductPage
      name="Papel 550"
      category="Papel institucional"
      description="Papel institucional con mayor cantidad de hojas, ideal para grandes consumos."
      presentation="Paquete de 550 hojas."
      image={papel550Image}
    />
  );
};

export default Papel550;