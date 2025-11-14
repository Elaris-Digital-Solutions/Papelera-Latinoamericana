import React from 'react';
import ProductPage from './ProductPage';
import papelIndividualImage from '../../assets/papel individual.jpg';

const PapelIndividual: React.FC = () => {
  return (
    <ProductPage
      name="Papel Individual"
      category="Papel institucional"
      description="Papel institucional individual, práctico y versátil para diferentes usos."
      presentation="Paquete de 500 hojas, individual."
      image={papelIndividualImage}
    />
  );
};

export default PapelIndividual;