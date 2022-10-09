import "./productSkeleton.css";

const ProductSkeleton = () => {
  return (
    <div className="skeleton-product">
      <div className="skeleton-productImage"></div>
      <div className="skeleton-productBottom">
        <p className="skeleton-product_description"></p>
        <div className="skeleton-priceContainer">
          <div className="skeleton-product_price"> </div>
          <div className="skeleton-product_price_discount"></div>
          <div className="skeleton-discountValue"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
