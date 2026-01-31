import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import Publications from '@/pages/Publications';
import PublicationDetail from '@/pages/PublicationDetail';
import Students from '@/pages/Students';
import StudentDetail from '@/pages/StudentDetail';
import DataProducts from '@/pages/DataProducts';
import Projects from '@/pages/Projects';
import Contact from '@/pages/Contact';
import './App.css';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <LanguageProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="publications" element={<Publications />} />
              <Route path="publications/:id" element={<PublicationDetail />} />
              <Route path="students" element={<Students />} />
              <Route path="students/:id" element={<StudentDetail />} />
              <Route path="data-products" element={<DataProducts />} />
              <Route path="projects" element={<Projects />} />
              <Route path="contact" element={<Contact />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
