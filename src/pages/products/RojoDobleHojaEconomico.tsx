import React from 'react';
import ProductPage from './ProductPage';
import rojoDobleHojaEconomicoImage from '../../assets/rojo doble hoja economico.jpg';

const RojoDobleHojaEconomico: React.FC = () => {
  return (
    <ProductPage
      name="Rojo Doble Hoja Económico"
      category="Papel institucional"
      description="Papel institucional de doble hoja, ideal para uso económico y eficiente."
      presentation="Paquete de 500 hojas, doble hoja."
      image={rojoDobleHojaEconomicoImage}
    />
  );
};

export default RojoDobleHojaEconomico;