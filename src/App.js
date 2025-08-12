import { useEffect, useState } from "react";
import Pagination from "./components/Pagination";
import { MAX_PER_PAGE, REST_API } from "./constants";
import "./styles.css";

export default function App() {
  const [items, setItems] = useState([]);
  const [curr, setCurr] = useState(0); // current page

  // the item's start index is curr * MAX_PER_PAGE, end will be (curr+ 1) * MAX_PER_PAGE
  const [totalPages, setTotalPages] = useState(1);
  const getProducts = async () => {
    const res = await fetch(`${REST_API}`);
    const products = await res.json();
    return products;
  };
  const goToNextPage = () => {
    setCurr((prev) => prev + 1);
  };
  const goToPrevPage = () => {
    setCurr((prev) => prev - 1);
  };
  useEffect(() => {
    async function getData() {
      const pro = await getProducts();
      setItems(pro.products);
      setTotalPages(Math.ceil(pro.products.length / MAX_PER_PAGE));
    }
    getData();
  }, []);

  return (
    <div className="App">
      <h1>Hello pagination</h1>
      <h2>Show a list of items using pagination!</h2>
      <Pagination
        pages_number={totalPages}
        setCurr={setCurr}
        curr={curr}
        goToPrevPage={goToPrevPage}
        goToNextPage={goToNextPage}
      ></Pagination>
      <div className="products-field">
        {console.log(`${curr}, ${totalPages},${items.length}`)}
        {items
          .slice(curr * MAX_PER_PAGE, (curr + 1) * MAX_PER_PAGE)
          .map((item) => (
            <div key={item.id} className="products-container">
              <img
                src={item.thumbnail}
                alt="A product"
                className="products-img"
              />
              <div className="products-title">{item.title}</div>
            </div>
          ))}
      </div>
    </div>
  );
}
