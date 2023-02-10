import { Select } from 'antd';

const ProductCreateForm = ({
  handleSubmit,
  handleChange,
  handleCategoryChange,
  subOptions,
  showSubs,
  values,
  setValues,
}) => {
  //destructure
  const {
    title,
    description,
    price,
    categories,
    category,
    subs,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
  } = values;

  return (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <label>Megnevezés</label>
        <input
          type='text'
          name='title'
          className='form-control'
          value={title}
          onChange={handleChange}
        />
      </div>

      <div className='form-group'>
        <label>Leírás</label>
        <input
          type='text'
          name='description'
          className='form-control'
          value={description}
          onChange={handleChange}
        />
      </div>

      <div className='form-group'>
        <label>Ár</label>
        <input
          type='number'
          name='price'
          className='form-control'
          value={price}
          onChange={handleChange}
        />
      </div>

      <div className='form-group'>
        <label>Szállítás</label>
        <select
          name='shipping'
          className='form-control'
          onChange={handleChange}
        >
          <option value='No'>Nem</option>
          <option value='Yes'>Igen</option>
        </select>
      </div>

      <div className='form-group'>
        <label>Mennyiség</label>
        <input
          type='number'
          name='quantity'
          className='form-control'
          value={quantity}
          onChange={handleChange}
        />
      </div>

      <div className='form-group'>
        <label>Színek</label>
        <select name='color' className='form-control' onChange={handleChange}>
          <option>Kérem válasszon</option>
          {colors.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className='form-group'>
        <label>Gyártó</label>
        <select name='brand' className='form-control' onChange={handleChange}>
          <option>Kérem válasszon</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <div className='form-group'>
        <label>Kategória</label>
        <select
          name='category'
          className='form-control'
          onChange={handleCategoryChange}
        >
          <option>Kérem válasszon</option>
          {categories.length > 0 &&
            categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      {showSubs && (
        <div>
          <label>Alkategória</label>

          <Select
            mode='multiple'
            style={{ width: '100%' }}
            placeholder='Kérem válasszon'
            value={subs}
            // name='subs'
            onChange={(value) => setValues({ ...values, subs: value })}
            options={subOptions.map((sub) => ({
              label: sub.name,
              value: sub._id,
            }))}
          ></Select>
        </div>
      )}

      <button className='btn btn-outline mt-3'>Mentés</button>
    </form>
  );
};
export default ProductCreateForm;
