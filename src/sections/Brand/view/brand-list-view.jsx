'use client';
import { useState, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useSetState } from 'src/hooks/use-set-state';

import { orderBy } from 'src/utils/helper';

import { DashboardContent } from 'src/layouts/dashboard';
import { _jobs, JOB_SORT_OPTIONS } from 'src/_mock';

import { Iconify } from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { BrandList } from '../brand-list';
import { BrandSort } from '../brand-sort';
import { BrandSearch } from '../brand-search';

// ----------------------------------------------------------------------

export function BrandListView() {
  const [sortBy, setSortBy] = useState('latest');

  const search = useSetState({ query: '', results: [] });

  const dataFiltered = orderBy(
    _jobs,
    sortBy === 'latest' ? ['createdAt'] : sortBy === 'oldest' ? ['createdAt'] : ['totalViews'],
    sortBy === 'latest' || sortBy === 'popular' ? ['desc'] : ['asc']
  );

  const notFound = !dataFiltered.length && search.state.query;

  const handleSortBy = useCallback((newValue) => {
    setSortBy(newValue);
  }, []);

  const handleSearch = useCallback(
    (inputValue) => {
      search.setState({ query: inputValue });

      if (inputValue) {
        const results = _jobs.filter(
          (job) => job.title.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
        );

        search.setState({ results });
      }
    },
    [search]
  );

  const renderFilters = (
    <Stack
      spacing={3}
      justifyContent="space-between"
      alignItems={{ xs: 'flex-end', sm: 'center' }}
      direction={{ xs: 'column', sm: 'row' }}
    >
      <BrandSearch search={search} onSearch={handleSearch} />
      <BrandSort sort={sortBy} onSort={handleSortBy} sortOptions={JOB_SORT_OPTIONS} />
    </Stack>
  );

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="List"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Job', href: paths.dashboard.job.root },
          { name: 'List' },
        ]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.brand.new}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            Create New Brand
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Stack spacing={2.5} sx={{ mb: { xs: 3, md: 5 } }}>
        {renderFilters}
      </Stack>

      {notFound && <EmptyContent filled sx={{ py: 10 }} />}

      <BrandList jobs={dataFiltered} />
    </DashboardContent>
  );
}
