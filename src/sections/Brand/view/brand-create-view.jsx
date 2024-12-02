'use client'; // For client-side rendering

import React, { useState } from 'react';
import { DashboardContent } from 'src/layouts/dashboard';
import Typography from '@mui/material/Typography';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { BrandNewEditForm } from './brand-new-edit-form';
import { WebsiteScannerBox } from './website-scanner';

export function BrandCreateView() {
  const [fetchTrigger, setFetchTrigger] = useState('');

  const handleSuccessfulPost = (websiteLink) => {
    console.log('Setting fetchTrigger:', websiteLink); // Debugging
    setFetchTrigger(websiteLink);
  };

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Create a new Brand"
        links={[{ name: 'Dashboard' }, { name: 'Brand' }, { name: 'New Brand' }]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <WebsiteScannerBox onSuccessfulPost={handleSuccessfulPost} />
      <BrandNewEditForm fetchTrigger={fetchTrigger} />
    </DashboardContent>
  );
}
