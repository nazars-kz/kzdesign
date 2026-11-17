import { createPageRoute } from '@/core/content/page-route';
import { TachView } from '@/site/cases/tach/tach-view';

const route = createPageRoute('case-tach', TachView);

export default route.Page;
export const generateMetadata = route.generateMetadata;
