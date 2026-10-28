import { createCollectionListRoute } from '@/core/collections/list-route';
import { CasesView } from '@/site/pages/cases';

const route = createCollectionListRoute('cases', 'cases', CasesView);

export default route.Page;
export const generateMetadata = route.generateMetadata;
/** The query (`?page=`) decides the status code, so the list renders per request (data is cached). */
export const instant = false;
