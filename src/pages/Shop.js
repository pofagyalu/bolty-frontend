import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { searchActions } from '../store/search';
import {
  getProductsByCount,
  fetchProductsByFilter,
} from '../functions/product';
import { getCategories } from '../functions/category';
import { getSubs } from '../functions/sub';
import ProductCard from '../components/cards/ProductCard';
import { Menu, Slider, Checkbox, Radio } from 'antd';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import FormatColorFillOutlinedIcon from '@mui/icons-material/FormatColorFillOutlined';
import EuroOutlinedIcon from '@mui/icons-material/EuroOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import Star from '../components/forms/Star';

const { SubMenu, Item } = Menu;

const searchFilterInitialState = {
  queryText: '',
  priceRange: [0, 0],
  categories: '',
  subcategory: '',
  starRating: '',
  brand: '',
  color: '',
  shipping: '',
};

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState('');
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState();
  const [star, setStar] = useState('');
  const [brands, setBrands] = useState([
    'Apple',
    'Samsung',
    'Microsoft',
    'Lenovo',
    'Asus',
  ]);
  const [brand, setBrand] = useState('');
  const [colors, setColors] = useState([
    'Black',
    'Brown',
    'Silver',
    'White',
    'Blue',
  ]);
  const [color, setColor] = useState('');
  const [shipping, setShipping] = useState('');
  const [searchFilter, setSearchFilter] = useState({
    searchFilterInitialState,
  });

  const dispatch = useDispatch();
  const text = useSelector((state) => state.search.text);

  useEffect(() => {
    loadlAllProducts();
    //fetch categories
    getCategories().then((res) => setCategories(res.data));

    //fetch subcategories
    getSubs().then((res) => setSubs(res.data));
  }, []);

  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };

  // 1. load products by default on page load
  const loadlAllProducts = () => {
    setLoading(true);
    getProductsByCount(12).then((products) => {
      setProducts(products.data);
      setLoading(false);
    });
  };

  //2. load products on user search input
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchProducts({ query: text });
    }, 500);
    if (!text) {
      loadlAllProducts();
    }

    //ez a cleanup függvény
    return () => clearTimeout(delay);
  }, [text]);

  //3. load products on the price range
  useEffect(() => {
    // console.log('ok to request');
    fetchProducts({ price });
  }, [ok]);

  const handleSlider = (value) => {
    // először kiürítem a kerseő szöveget
    console.log('itt járok', value);
    dispatch(searchActions.query(''));
    setSelectedCategoryIds([]);
    setPrice(value);
    setStar('');
    setSub('');
    setBrand('');

    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  // 4. load products based on category
  // show categories in a list of checkbox
  const showCategories = () =>
    categories.map((category) => (
      <div key={category._id} className='mb-2'>
        <Checkbox
          onChange={handleCheck}
          value={category._id}
          name='category'
          checked={selectedCategoryIds.includes(category._id)}
        >
          {category.name}
        </Checkbox>
        <br />
      </div>
    ));

  const handleCheck = (e) => {
    dispatch(searchActions.query(''));
    setPrice([0, 0]);
    setStar('');
    setSub('');
    setBrand('');
    setShipping('');

    const { value } = e.target;
    let inTheState = [...selectedCategoryIds];
    let foundInTheState = inTheState.indexOf(value); // ha talál akkor index , ha nem akkor -1

    if (foundInTheState === -1) {
      inTheState.push(value);
    } else {
      inTheState.splice(foundInTheState, 1);
    }

    setSelectedCategoryIds(inTheState);
    console.log(selectedCategoryIds);
    fetchProducts({ category: inTheState });
  };

  // 5. Selection by star rating
  const handleStarClick = (num) => {
    // console.log(num);
    // nullázzuk az összes többi szűrőt
    dispatch(searchActions.query(''));
    setPrice([0, 0]);
    setSelectedCategoryIds([]);
    setSub('');
    setBrand('');
    setShipping('');
    setStar(num);
    fetchProducts({ stars: num });
  };

  // 6 show products by subcategory
  const showSubs = () =>
    subs.map((sub) => (
      <div
        key={sub._id}
        onClick={() => handleSub(sub)}
        className='p-1 m-1 badge badge-secondary'
        style={{ cursor: 'pointer' }}
      >
        {sub.name}
      </div>
    ));

  const handleSub = (sub) => {
    // console.log('SUB', sub);
    dispatch(searchActions.query(''));
    setPrice([0, 0]);
    setSelectedCategoryIds([]);
    setStar('');
    setBrand('');
    setShipping('');
    setSub(sub);
    fetchProducts({ sub });
  };

  const showStars = () => (
    <div className='pr-4 pl-4 pb-2'>
      <Star starClick={handleStarClick} numberOfStars={5} />
      <Star starClick={handleStarClick} numberOfStars={4} />
      <Star starClick={handleStarClick} numberOfStars={3} />
      <Star starClick={handleStarClick} numberOfStars={2} />
      <Star starClick={handleStarClick} numberOfStars={1} />
    </div>
  );

  // 7. Show products by brands
  const showBrands = () =>
    brands.map((b) => (
      <Radio
        key={b}
        value={b}
        checked={b === brand}
        onChange={handleBrand}
        className='d-flex'
      >
        {b}
      </Radio>
    ));

  const handleBrand = (e) => {
    dispatch(searchActions.query(''));
    setPrice([0, 0]);
    setSelectedCategoryIds([]);
    setStar('');
    setSub('');
    setShipping('');
    setBrand(e.target.value);

    fetchProducts({ brand });
  };

  // 8. Show products by color
  const showColors = () =>
    colors.map((c) => (
      <Radio
        key={c}
        value={c}
        checked={c === color}
        onChange={handleColor}
        className='d-flex'
      >
        {c}
      </Radio>
    ));

  const handleColor = (e) => {
    dispatch(searchActions.query(''));
    setPrice([0, 0]);
    setSelectedCategoryIds([]);
    setStar('');
    setSub('');
    setShipping('');
    setColor(e.target.value);

    fetchProducts({ color });
  };

  // 9. products based on shipping Yes or No
  const showShipping = () => (
    <>
      <Checkbox
        value={'Yes'}
        checked={shipping === 'Yes'}
        onChange={handleShipping}
        className='pl-2 '
      >
        Igen
      </Checkbox>
      <Checkbox
        value={'No'}
        checked={shipping === 'No'}
        onChange={handleShipping}
        className='pl-2'
      >
        Nem
      </Checkbox>
    </>
  );

  const handleShipping = (e) => {
    dispatch(searchActions.query(''));
    setPrice([0, 0]);
    setSelectedCategoryIds([]);
    setStar('');
    setSub('');
    setColor('');
    setShipping(e.target.value);

    fetchProducts({ shipping });
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-3 pt-2'>
          <h4>Keresés</h4>

          <Menu
            defaultOpenKeys={['1', '2', '3', '4', '5', '6', '7']}
            mode={'inline'}
          >
            <SubMenu key='1' title={<span className='h6'>Ár</span>}>
              <div>
                <Slider
                  tooltip={{ formatter: (v) => `${v} Ft` }}
                  range={true}
                  defaultValue={[1000, 3000]}
                  max={5000}
                  value={price}
                  onChange={handleSlider}
                  marks={{ 0: '0', 5000: '5000' }}
                />
              </div>
            </SubMenu>

            <SubMenu
              key='2'
              title={
                <span className='h6'>
                  <CategoryOutlinedIcon />
                  Kategóriák
                </span>
              }
            >
              {showCategories()}
            </SubMenu>

            <SubMenu
              key='3'
              title={
                <span className='h6'>
                  <StarBorderOutlinedIcon />
                  Értékelés
                </span>
              }
            >
              {showStars()}
            </SubMenu>

            <SubMenu
              key='4'
              title={
                <span className='h6'>
                  <CategoryOutlinedIcon />
                  Alkategóriák
                </span>
              }
            >
              {showSubs()}
            </SubMenu>

            <SubMenu
              key='5'
              title={
                <span className='h6'>
                  <CategoryOutlinedIcon />
                  Gyártók
                </span>
              }
            >
              {showBrands()}
            </SubMenu>

            <SubMenu
              key='6'
              title={
                <span className='h6'>
                  <FormatColorFillOutlinedIcon />
                  Szín
                </span>
              }
            >
              {showColors()}
            </SubMenu>

            <SubMenu
              key='7'
              title={
                <span className='h6'>
                  <FormatColorFillOutlinedIcon />
                  Szállítás
                </span>
              }
            >
              {showShipping()}
            </SubMenu>
          </Menu>
        </div>

        <div className='col-md-9 pt-2'>
          {loading ? (
            <h4 className='text-danger'>Betöltés...</h4>
          ) : (
            <h4 className='text-danger'>Termékek</h4>
          )}
          {products.length < 1 && <p>Nincs ilyen termék</p>}
          <div className='row pb-3'>
            {products.map((product) => (
              <div key={product._id} className='col-md-4 mt-3 '>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
