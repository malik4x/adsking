import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';

import { BrandItem } from './brand-item';

export function BrandList() {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/brands/') // Adjust URL as needed
      .then((response) => setBrands(response.data))
      .catch((error) => console.error('Error fetching brands:', error));
  }, []);

  const handleDeleteSuccess = (id) => {
    setBrands((currentBrands) => currentBrands.filter((brand) => brand.id !== id));
  };

  return (
    <Box
      gap={3}
      display="grid"
      gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
    >
      {brands.map((brand) => (
        <BrandItem key={brand.id} brand={brand} onDeleteSuccess={handleDeleteSuccess} />
      ))}
    </Box>
  );
}
