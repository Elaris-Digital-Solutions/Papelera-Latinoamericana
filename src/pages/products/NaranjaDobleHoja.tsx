import React from 'react';
import ProductPage from './ProductPage';
import naranjaDobleHojaImage from '../../assets/naranja doble hoja.jpg';

const NaranjaDobleHoja: React.FC = () => {
  return (
    <ProductPage
      name="Naranja Doble Hoja"
      category="Papel institucional"
      description="Papel institucional de doble hoja, resistente y de alta calidad."
      presentation="Paquete de 500 hojas, doble hoja."
      image={naranjaDobleHojaImage}
    />
  );
};

export default NaranjaDobleHoja;