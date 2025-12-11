// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Category from "./pages/category/Category";
import { useContext } from "react";
import ProductsContextProvider, {
  ProductsContext,
} from "./contexts/ProductsContext";
import { FavoritesProvider } from "./contexts/FavoritesContext";

import ProductDetail from "./pages/product-detail/ProductDetail";
import DesignStyles from "./pages/design-styles/DesignStyles";
import DesignDetails from "./pages/design-details/DesignDetails";
import About from "./pages/about/About";
import Designers from "./pages/designers/Designers";
import DesignersDetails from "./pages/designers-details/DesignersDetails";
import Favorite from "./pages/favorites/Favorites";
import Contact from "./pages/contact/Contact";
import Dashboard from "./pages/dashboard/Dashboard";
import Navbar from "./components/layout/navbar/Navbar";
import Footer from "./components/layout/footer/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/home/Home";

const App = () => {
  return (
    <FavoritesProvider>
      <ProductsContextProvider>
        <Router>
        <ScrollToTop/>
          <MainRoutes />
        </Router>
      </ProductsContextProvider>
    </FavoritesProvider>
  );
};

const MainRoutes = () => {
  const products = useContext(ProductsContext);

  const categories = Array.isArray(products)
    ? [...new Set(products.map((product) => product.category))]
    : [];
    
  const subcategories = Array.isArray(products)
    ? [...new Set(products.map((product) => product.subcategory))]
    : [];

  const categoriesRoutes =
    categories.length > 0
      ? categories.map((category) => (
          <Route
            key={category}
            path={`/${category.replace(/\s+/g, "-").toLowerCase()}`}
            element={<Category category={category} />}
          />
        ))
      : null;

  const subcategoriesRoutes =
    subcategories.length > 0
      ? subcategories.map((subcategory) => (
          <Route
            key={subcategory}
            path={`/${subcategory.replace(/\s+/g, "-").toLowerCase()}`}
            element={<subCategory subcategory={subcategory} />}
          />
        ))
      : null;

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/design" element={<DesignStyles />} />
        <Route path="/design/:id" element={<DesignDetails />} />
        <Route path="/designers" element={<Designers />} />
        <Route path="/designers/:id" element={<DesignersDetails />} />
        {/* <Route path="/" element={<Home />} /> */}
        {categoriesRoutes}
        {subcategoriesRoutes}
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
