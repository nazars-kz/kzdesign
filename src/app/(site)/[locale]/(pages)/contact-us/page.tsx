import { createPageRoute } from '@/core/content/page-route';
import { ContactUsView } from '@/site/pages/contact-us';

const route = createPageRoute('contact-us', ContactUsView);

export default route.Page;
export const generateMetadata = route.generateMetadata;
