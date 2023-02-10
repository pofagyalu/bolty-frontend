import Resizer from 'react-image-file-resizer';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Avatar, Badge, Space } from 'antd';

const FileUpload = ({ values, setValues, setLoading }) => {
  const user = useSelector((state) => state.user.currentUser);

  const fileUploadAndResize = (e) => {
    const files = e.target.files;

    let allUploadedFiles = values.images;

    // resize
    if (files) {
      setLoading(true);
      for (const file of files) {
        Resizer.imageFileResizer(
          file,
          720,
          720,
          'JPEG',
          95,
          0,
          (uri) => {
            // console.log(uri);
            axios
              .post(
                `${process.env.REACT_APP_API}/uploadimages`,
                { image: uri },
                {
                  headers: {
                    authtoken: user ? user.token : '',
                  },
                }
              )
              .then((res) => {
                // console.log('IMAGE UPLOAD RES DATA', res);
                setLoading(false);
                allUploadedFiles.push(res.data);
                setValues((prevValues) => ({
                  ...prevValues,
                  images: allUploadedFiles,
                }));
              })
              .catch((err) => {
                setLoading(false);
                console.log('Cloudinary UPLOAD ERROR', err);
              });
          },
          'base64'
        );
      }
    }

    // send back to server to upload to cloudinary
    // set url to iamges[] in the parent component - ProductCreate
  };

  const handleImageRemove = (public_id) => {
    setLoading(true);
    console.log('remove image', public_id);
    axios
      .post(
        `${process.env.REACT_APP_API}/removeImage`,
        { public_id },
        {
          headers: {
            authtoken: user ? user.token : '',
          },
        }
      )
      .then((res) => {
        setLoading(false);
        const { images } = values;
        let filteredImages = images.filter(
          (image) => image.public_id !== public_id
        );
        setValues((prevValues) => ({ ...prevValues, images: filteredImages }));
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        //
      });
  };

  return (
    <>
      <div className='row mb-3'>
        <Space size='middle'>
          {values.images &&
            values.images.map((image) => (
              <Badge
                key={image.public_id}
                style={{ cursor: 'pointer' }}
                count='X'
                onClick={() => handleImageRemove(image.public_id)}
              >
                <Avatar src={image.url} size={100} shape='square' />
              </Badge>
            ))}
        </Space>
      </div>
      <div className='row'>
        <label className='btn btn-primary'>
          Kép(ek) hozzáadása
          <input
            type='file'
            multiple
            hidden
            accept='images/*'
            onChange={fileUploadAndResize}
          />
        </label>
      </div>
    </>
  );
};

export default FileUpload;
