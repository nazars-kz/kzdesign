import { createPageRoute } from '@/core/content/page-route';
import { ReviewsView } from '@/site/pages/reviews';

const route = createPageRoute('reviews', ReviewsView);

export default route.Page;
export const generateMetadata = route.generateMetadata;
