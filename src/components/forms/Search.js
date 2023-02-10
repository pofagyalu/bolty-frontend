import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { searchActions } from '../../store/search';

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const text = useSelector((state) => state.search.text);

  const handleChange = (event) => {
    dispatch(searchActions.query(event.target.value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/shop?${text}`);
    console.log();
  };

  return (
    <form className='form-inline my-2 my-lg-0' onSubmit={handleSubmit}>
      <span className='d-flex align-items-center '>
        <input
          type='search'
          value={text}
          className='form-control mr-sm-2'
          placeholders='Keresés'
          onChange={handleChange}
        />
        <SearchOutlinedIcon
          onClick={handleSubmit}
          style={{ cursor: 'pointer' }}
        />
      </span>
    </form>
  );
};

export default Search;
