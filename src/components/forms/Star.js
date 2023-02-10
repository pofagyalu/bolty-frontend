import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
import StarIcon from '@mui/icons-material/Star';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: 'red',
  },
  '& .MuiRating-iconEmpty': {
    color: 'red',
  },
});

const Star = ({ starClick, numberOfStars }) => {
  return (
    <div className='pt-1 pb-1'>
      <StyledRating
        value={numberOfStars}
        max={numberOfStars}
        emptyIcon={<StarIcon />}
        onChange={() => starClick(numberOfStars)}
      />
      <br />
    </div>
  );
};

export default Star;
