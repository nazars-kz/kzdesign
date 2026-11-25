import { createPageRoute } from '@/core/content/page-route';
import { PrintbuyView } from '@/site/cases/printbuy/printbuy-view';

const route = createPageRoute('case-printbuy', PrintbuyView);

export default route.Page;
export const generateMetadata = route.generateMetadata;
