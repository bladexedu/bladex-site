// Page routing — add imports and PAGES entries when adding routes.
import About from './pages/About';
import BladeXAI from './pages/BladeXAI';
import Consultants from './pages/Consultants';
import Home from './pages/Home';
import Programs from './pages/Programs';
import Social from './pages/Social';
import __Layout from './Layout.jsx';

export const PAGES = {
  About,
  BladeXAI,
  Consultants,
  Home,
  Programs,
  Social,
};

export const pagesConfig = {
  mainPage: 'Home',
  Pages: PAGES,
  Layout: __Layout,
};
