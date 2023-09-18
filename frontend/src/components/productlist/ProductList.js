import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  allProducts,
  deleteProduct,
  getSingleProduct,
  searchingProducts,
} from "../../features/product/productSlice";

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.product.products);

  const onDeleteProductHandler = async (id) => {
    dispatch(deleteProduct(id));
    dispatch(allProducts());
  };
  const onSearchHandler = async (e) => {
    let key = e.target.value;
    if (key) {
      dispatch(searchingProducts(key));
    } else {
      dispatch(allProducts());
    }
  };

  const onUpdateHandler = (id)=>{
    dispatch(getSingleProduct(id));
    navigate(`/update/${id}`)
  }

  useEffect(() => {
    dispatch(allProducts());
  }, [dispatch]);

  return (
    <div className="product-list">
      <h3>Product List</h3>
      <input
        type="text"
        className="search-product-box"
        onChange={onSearchHandler}
        placeholder="Search Product"
      />
      <ul>
        <li>S.no</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Operation</li>
      </ul>
      {products.length > 0 ? (
        products.map((item, index) => {
          return (
            <ul key={index}>
              <li>{index + 1}.</li>
              <li>{item.name}</li>
              <li>$ {item.price}</li>
              <li>{item.category}</li>
              <li>
                <button
                  onClick={() => {
                    onDeleteProductHandler(item._id);
                  }}
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    onUpdateHandler(item._id);
                  }}
                >
                  Update
                </button>
              </li>
            </ul>
          );
        })
      ) : (
        <h1>No Result Found</h1>
      )}
    </div>
  );
};

export default ProductList;
