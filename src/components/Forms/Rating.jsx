
import StarRating from "react-star-ratings"

export const Rating = ({ starClick, numberOfStars }) => (
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


