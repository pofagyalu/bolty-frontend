const LocalSearch = ({ keyword, setKeyword }) => {
  // step 3
  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  return (
    <input
      type='search'
      placeholder='Szűrés'
      value={keyword}
      onChange={handleSearchChange}
      className='form-control mb-4'
    />
  );
};

export default LocalSearch;
