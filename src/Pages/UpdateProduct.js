import {
  Alert,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../Contexts/AuthContext';

const UpdateProduct = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { idProduct } = useParams();
  const [product, setProduct] = useState({ quantitySell: 0 });
  const [image, setImage] = useState();
  const [send, setSend] = useState(false);
  const [errorForm, setErrorForm] = useState(false);
  const [successFrom, setSuccessFrom] = useState(false);
  const vertical = 'bottom';
  const horizontal = 'center';

  useEffect(() => {
    getProduct();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === 'available') {
      if (e.target.value.toLowerCase() === 'true') {
        e.target.value.replace('true', true);
      } else {
        e.target.value.replace('false', false);
      }
    }
    setProduct((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      Object.keys(product).length === 13
    ) {
      setSend(true);
      setErrorForm(false);
      const data = new FormData();
      data.append('product', JSON.stringify(product));
      data.append('image', image);
      axios
        .put('https://khamez-empire-api.herokuapp.com/products/' + idProduct, data, {
          userId: user.userId,
          headers: { Authorization: `Bearer ${user.token}` }
        })
        .then((response) => {
          setSuccessFrom(true);
          setSend(false);
          setTimeout(() => {
            document.getElementById('formProduct').reset();
          }, 2000);
          setTimeout(() => {
            navigate('/admin/products');
          }, 4000);
        })
        .catch((error) => {
          setSend(false);
          setErrorForm(true);
        });
    } else {
      setErrorForm(true);
      setSend(false);
    }
  };

  const getProduct = () => {
    axios.get('https://khamez-empire-api.herokuapp.com/products/' + idProduct)
      .then((response) => setProduct(response.data.product))
      .catch((e) => {
        return null;
      });
  };

  return (
    <Container sx={{ ml: 'auto', mt: '70px', mr: 'auto' }}>
      <form encType='multipart/form-data' method='post' id='formProduct'>
        <Typography
          componet='div'
          variant='h6'
          sx={{ textAlign: 'center', mb: '30px' }}
        >
          Update product
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <TextField
              variant='outlined'
              fullWidth
              name='name'
              label='Name'
              value={product.name}
              type='text'
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextField
              variant='outlined'
              fullWidth
              name='price'
              label='Price'
              type='number'
              value={product.price}
              required
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextField
              variant='outlined'
              fullWidth
              name='weight'
              label='Weight'
              type='number'
              value={product.weight}
              required
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextField
              variant='outlined'
              fullWidth
              name='quantity'
              label='quantity'
              type='number'
              value={product.quantity}
              required
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextField
              variant='outlined'
              fullWidth
              name='size'
              label='Size'
              type='text'
              value={product.size}
              required
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextField
              variant='outlined'
              fullWidth
              name='matter'
              label='Matter'
              type='text'
              value={product.matter}
              required
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Available</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={product.available}
                label='Available'
                name='available'
                required
                onChange={handleChange}
              >
                <MenuItem value='true'>True</MenuItem>
                <MenuItem value='false'>False</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} lg={6}>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Category</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={product.category}
                label='Category'
                name='category'
                required
                onChange={handleChange}
              >
                <MenuItem value='shoe'>Shoe</MenuItem>
                <MenuItem value='clothe'>Cloth</MenuItem>
                <MenuItem value='accessory'>Accessory</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item lg={12} xs={12}>
            <TextField
              variant='outlined'
              fullWidth
              name='image'
              label='Image'
              type='file'
              required
              onChange={handleImage}
            />
          </Grid>
          <Grid item lg={12}>
            <TextField
              variant='outlined'
              fullWidth
              value={product.description}
              name='description'
              label='Description'
              multiline
              rows={3}
              required
              onChange={handleChange}
            />
          </Grid>
          <Grid item lg={12} xs={12} sx={{ mb: '10px' }}>
            <Button
              variant='contained'
              fullWidth
              color='primary'
              onClick={handleSubmit}
              disabled={send}
            >
              {send ? <CircularProgress color='primary' /> : 'Ajouter'}
            </Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={successFrom}
        autoHideDuration={2000}
        onClose={() => {
        }}
        message='I love snacks'
        key={'bottom' + 'center'}
      >
        <Alert severity='success' variant='filled' sx={{ width: '100%' }}>
          Product update with success
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={errorForm}
        autoHideDuration={2000}
        onClose={() => {
          setTimeout(() => {
            setErrorForm(false);
          }, 2000);
        }}
        message='I love snacks'
        key={'bottom' + 'centre'}
      >
        <Alert severity='error' variant='filled' sx={{ width: '100%' }}>
          Some fields are incorrectly filled in
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UpdateProduct;
