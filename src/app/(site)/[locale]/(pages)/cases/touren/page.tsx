import { createPageRoute } from '@/core/content/page-route';
import { TourenView } from '@/site/cases/touren/touren-view';

const route = createPageRoute('case-touren', TourenView);

export default route.Page;
export const generateMetadata = route.generateMetadata;
