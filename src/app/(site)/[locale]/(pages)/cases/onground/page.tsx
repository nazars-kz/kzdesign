import { createPageRoute } from '@/core/content/page-route';
import { OngroundView } from '@/site/cases/onground/onground-view';

const route = createPageRoute('case-onground', OngroundView);

export default route.Page;
export const generateMetadata = route.generateMetadata;
