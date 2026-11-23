import { Route, Routes } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import {
  About,
  Services,
  ServiceDetail,
  Industries,
  Approach,
  Insights,
  InsightArticle,
  NotFound,
} from './pages/Pages';
import { Contact } from './pages/Contact';
import { Legal } from './pages/Legal';
export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="services/:slug" element={<ServiceDetail />} />
          <Route path="industries" element={<Industries />} />
          <Route path="approach" element={<Approach />} />
          <Route path="insights" element={<Insights />} />
          <Route path="insights/:slug" element={<InsightArticle />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy-policy" element={<Legal />} />
          <Route path="terms-of-use" element={<Legal />} />
          <Route path="cookie-policy" element={<Legal />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </MotionConfig>
  );
}
