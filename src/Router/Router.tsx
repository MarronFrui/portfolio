import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../Home/Home';
import About from '../About/About';
import Error from '../Error/Error';
import Layout from '../Layout/Layout';
import Item from '../Item/Item';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/item/:id" element={<Item />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
