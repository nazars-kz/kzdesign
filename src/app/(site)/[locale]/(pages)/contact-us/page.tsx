import { createPageRoute } from '@/core/content/page-route';
import { PlaceholderView } from '@/site/pages/placeholder';

const route = createPageRoute('contact-us', PlaceholderView);

export default route.Page;
export const generateMetadata = route.generateMetadata;
