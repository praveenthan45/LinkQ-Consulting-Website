import { Navigate, Route, Routes } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import {
  About,
  ServiceDetail,
  Industries,
  IndustryDetail,
  Collaboration,
  Insights,
  InsightArticle,
  NotFound,
} from './pages/Pages';
import { Contact } from './pages/Contact';
import { Events, EventDetail } from './pages/Events';
import { Legal } from './pages/Legal';

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Navigate to="/industries" replace />} />
          <Route path="services/:slug" element={<ServiceDetail />} />
          <Route path="industries" element={<Industries />} />
          <Route path="industries/:slug" element={<IndustryDetail />} />
          <Route path="approach" element={<Navigate to="/collaboration" replace />} />
          <Route path="collaboration" element={<Collaboration />} />
          <Route path="insights" element={<Insights />} />
          <Route path="insights/:slug" element={<InsightArticle />} />
          <Route path="events" element={<Events />} />
          <Route path="events/:slug" element={<EventDetail />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy-policy" element={<Legal />} />
          <Route path="terms-of-use" element={<Legal />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </MotionConfig>
  );
}
