import React from 'react';
import ProductPage from './ProductPage';
import papelGofradoImage from '../../assets/papel gofrado.jpg';

const PapelGofrado: React.FC = () => {
  return (
    <ProductPage
      name="Papel Gofrado"
      category="Papel institucional"
      description="Papel institucional con textura gofrada, ideal para un acabado elegante."
      presentation="Paquete de 500 hojas, textura gofrada."
      image={papelGofradoImage}
    />
  );
};

export default PapelGofrado;