import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";
import Home from "./components/Home";

const PageRouter = () => {
  return (
    <BrowserRouter
      basename={import.meta.env.DEV ? '/' : '/100107-DowellEmailExtractor/'}
    >
    <Switch>
      <Route path="/" element={<Home />} />
    </Switch>
    </BrowserRouter>
  );
};

export default PageRouter;