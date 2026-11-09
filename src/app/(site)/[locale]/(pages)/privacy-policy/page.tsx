import { createPageRoute } from '@/core/content/page-route';
import { LegalView } from '@/site/pages/legal';

const route = createPageRoute('privacy-policy', LegalView);

export default route.Page;
export const generateMetadata = route.generateMetadata;
