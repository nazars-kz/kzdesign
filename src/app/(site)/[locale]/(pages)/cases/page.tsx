import { createPageRoute } from '@/core/content/page-route';
import { CasesView } from '@/site/pages/cases';

const route = createPageRoute('cases', CasesView);

export default route.Page;
export const generateMetadata = route.generateMetadata;
