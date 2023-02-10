import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: 'red',
  },
});

export const showAverage = (product) => {
  if (product && product.ratings) {
    let ratingsArray = product && product.ratings;

    const average =
      ratingsArray.reduce((acc, rating) => acc + rating.star, 0) /
      ratingsArray.length;
    // console.log(average);
    return (
      <div className='text-center pt-1 pb-3'>
        <StyledRating value={average} precision={0.5} readOnly />(
        {product.ratings.length})
      </div>
    );
  }
};
