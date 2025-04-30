import { useSearchParams, useLocation } from "react-router-dom";

export const ProductList = () => {
  const [searchParams] = useSearchParams();

  const location = useLocation();
  return <div className="component">Product List</div>;
};
