import { createPageRoute } from '@/core/content/page-route';
import { ApproachView } from '@/site/pages/approach';

const route = createPageRoute('approach', ApproachView);

export default route.Page;
export const generateMetadata = route.generateMetadata;
