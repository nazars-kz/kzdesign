import { createPageRoute } from '@/core/content/page-route';
import { FilmtoroView } from '@/site/cases/filmtoro/filmtoro-view';

const route = createPageRoute('case-filmtoro', FilmtoroView);

export default route.Page;
export const generateMetadata = route.generateMetadata;
