'use client';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { BrandNewEditForm } from './brand-new-edit-form';
import { WebsiteScannerBox } from './website-scanner';

// ----------------------------------------------------------------------

export function BrandCreateView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Create a new Brand"
        links={[{ name: 'Dashboard' }, { name: 'Brand' }, { name: 'New Brand' }]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <WebsiteScannerBox />
      <BrandNewEditForm />
    </DashboardContent>
  );
}
