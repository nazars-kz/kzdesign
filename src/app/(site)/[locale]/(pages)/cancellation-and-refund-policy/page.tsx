import { createPageRoute } from '@/core/content/page-route';
import { PlaceholderView } from '@/site/pages/placeholder';

const route = createPageRoute('refund-policy', PlaceholderView);

export default route.Page;
export const generateMetadata = route.generateMetadata;
