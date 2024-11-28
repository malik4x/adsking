import { CONFIG } from 'src/config-global';

import { BrandCreateView } from 'src/sections/Brand/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Create a new Brand | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <BrandCreateView />;
}
