import StarRating from "react-star-ratings";

const averageStarRating = (product) => {
  if (product?.ratings) {
    const ratingsArray = product && product.ratings;
    const total = [];
    const length = ratingsArray.length;
    // console.log("length", length);

    ratingsArray.map((rating) => total.push(rating.star));
    const totalReduced = total.reduce((prev, tot) => prev + tot, 0);
    // console.log("totalReduced", totalReduced);

    const highest = length * 5;
    // console.log("highest", highest);

    const result = (totalReduced * 5) / highest;
    // console.log("result", result);

    return (
      <div className="d-flex align-items-center justify-content-center pt-1 pb-3">
        <StarRating
          starDimension="20px"
          starSpacing="2px"
          starRatedColor="blue"
          starHoverColor="blue"
          starSelectingHoverColor="blue"
          rating={result}
          editing={false}
        />
        <span className="mt-1">
          ({product.ratings.length})
        </span>
      </div>
    );
  }
};

export default averageStarRating;