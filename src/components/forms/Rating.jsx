
import StarRating from "react-star-ratings"


const Rating = ({ starClick, numberOfStars }) => (
    <>
        <StarRating
            changeRating={() => starClick(numberOfStars)}
            numberOfStars={numberOfStars}
            starDimension="20px"
            starSpacing="2px"
            starHoverColor="#3756e4"
            starSelectingHoverColor="#3756e4"
            starEmptyColor="#3756e4"

        />
        <br />
    </>
)

export default Rating