import { createCollectionListRoute } from '@/core/collections/list-route';
import { ServicesView } from '@/site/pages/services';

const route = createCollectionListRoute('services', 'services', ServicesView);

export default route.Page;
export const generateMetadata = route.generateMetadata;
/** The query (`?page=`) decides the status code, so the list renders per request (data is cached). */
export const instant = false;
