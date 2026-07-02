import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductCardSkeleton = () => {
  return (
    <div className="border p-4 rounded">
      <Skeleton height={180} />
      <Skeleton height={20} className="mt-3" />
      <Skeleton height={20} width={80} />
    </div>
  );
};

export default ProductCardSkeleton;