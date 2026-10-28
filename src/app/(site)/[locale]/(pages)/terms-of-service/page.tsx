import { createPageRoute } from '@/core/content/page-route';
import { PlaceholderView } from '@/site/pages/placeholder';

const route = createPageRoute('terms-of-service', PlaceholderView);

export default route.Page;
export const generateMetadata = route.generateMetadata;
