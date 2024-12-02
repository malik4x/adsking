import { CONFIG } from 'src/config-global';

import { BrandListView } from 'src/sections/Brand/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Job list | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <BrandListView />;
}
