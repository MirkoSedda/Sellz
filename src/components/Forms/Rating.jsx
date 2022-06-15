
import StarRating from "react-star-ratings"

const Rating = ({ starClick, numberOfStars }) => (
    <>
        <StarRating
            changeRating={() => starClick(numberOfStars)}
            numberOfStars={numberOfStars}
            starDimension="20px"
            starSpacing="2px"
            starHoverColor="blue"
            starEmptyColor="blue"
        />
        <br />
    </>
)

export default Rating
