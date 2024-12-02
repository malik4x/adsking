import { CONFIG } from 'src/config-global';

import { BrandListView } from 'src/sections/brand/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Brand list | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <BrandListView />;
}
