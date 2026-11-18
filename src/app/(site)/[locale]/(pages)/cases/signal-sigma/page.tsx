import { createPageRoute } from '@/core/content/page-route';
import { SignalSigmaView } from '@/site/cases/signal-sigma/sigma-view';

const route = createPageRoute('case-signal-sigma', SignalSigmaView);

export default route.Page;
export const generateMetadata = route.generateMetadata;
