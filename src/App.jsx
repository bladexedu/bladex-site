import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { useLayoutEffect } from 'react';
import { pagesConfig } from './pages.config';
import PageNotFound from './lib/PageNotFound';

// ponytail: useLayoutEffect so scroll resets before paint; otherwise whileInView
// mounts off-screen and stays opacity:0 until hard refresh.
function ScrollToTop() {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const { Pages, Layout, mainPage } = pagesConfig;
const mainPageKey = mainPage ?? Object.keys(Pages)[0];
const MainPage = mainPageKey ? Pages[mainPageKey] : <></>;

const LayoutWrapper = ({ children, currentPageName }) => Layout ?
  <Layout currentPageName={currentPageName}>{children}</Layout>
  : <>{children}</>;

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={
          <LayoutWrapper currentPageName={mainPageKey}>
            <MainPage />
          </LayoutWrapper>
        } />
        {Object.entries(Pages).map(([path, Page]) => (
          <Route
            key={path}
            path={`/${path}`}
            element={
              <LayoutWrapper currentPageName={path}>
                <Page />
              </LayoutWrapper>
            }
          />
        ))}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
