import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useConfirm } from 'material-ui-confirm';
import { useAuthContext } from '../Contexts/AuthContext';

const GestionProduct = () => {
  const { user } = useAuthContext();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [circular, setCircular] = useState(true);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const confirm = useConfirm();

  useEffect(() => {
    getAllProduct();
  }, [circular]);

  const getAllProduct = () => {
    axios
      .get('https://khamez-empire-api.herokuapp.com/products')
      .then((response) => {
        const products = response.data.products;
        setProducts([...products]);
        removeCategory();
        setCircular(false);
      })
      .catch((error) => console.log(error));
  };

  const removeCategory = () => {
    const tab = [...new Set(products.map(item => item.category))];
    setCategory(tab);
  };

  const deleteProduct = (idProduct) => {
    confirm({ title: 'Do you want to delete this product?' }).then(() => {
      axios.delete(`https://khamez-empire-api.herokuapp.com/products/${idProduct}`, {
        userId: user.userId,
        headers: { Authorization: `Bearer ${user.token}` }
      }).then((response) => {
        window.location.reload();
      }).catch((error) => {
        return null;
      });
    }).catch(() => {
      return null;
    });
  };

  return (
    <Container sx={{ ml: 'auto', mt: '70px', mr: 'auto' }}>
      {circular ? <CircularProgress color='primary' size={50} sx={{ ml: '50%', mt: '30%' }} /> :
        <>
          <Button
            color='primary'
            variant='contained'
            sx={{ ml: 'auto', mb: '20px' }}
            onClick={() => navigate('/admin/products/add-product')}
          >
            ADD
          </Button>
          {category.length > 0 && category.map((item) => (
            <Grid container spacing={2} key={item}>
              <Typography
                variant='h6'
                sx={{
                  textAlign: 'center',
                  backgroundColor: '#fe4c50',
                  color: '#ffffff',
                  width: '100%',
                  fontWeight: 'bold'
                }}>
                {item.toUpperCase()}
              </Typography>
              {products.filter((i) => i.category === item).map((product) => (
                <Grid item lg={3} xs={12} md={4} sm={6} key={product._id}>
                  <Card
                    sx={{
                      maxWidth: 221,
                      height: { xs: 'auto', lg: 350 },
                      borderRight: '1px solid rgb(233, 233, 233)',
                      borderLeft: '1px solid rgb(233, 233, 233)',
                      borderRadius: 1,
                      cursor: 'pointer',
                      mb: '40px',
                      ml: { xs: 'auto' },
                      mr: { xs: 'auto' }
                    }}

                    elevation={0}
                    className='card'
                  >
                    <CardHeader
                      subheader={product.size}
                      action={
                        <IconButton aria-label='settings' onClick={() => deleteProduct(product._id)}>
                          <DeleteIcon color='primary' />
                        </IconButton>
                      }
                    />
                    <CardMedia
                      component='img'
                      height='140'
                      image={product.image}
                      alt={'image' + product.name}
                      onClick={() => navigate(`/admin/products/detail-product/${product._id}`)}
                    />
                    <CardContent>
                      <Typography sx={{ textAlign: 'center' }}>{product.name}</Typography>
                      <Typography
                        color='primary'
                        sx={{ textAlign: 'center' }}
                      >
                        {product.price + 'XAF'} | {product.category} | {product.quantity + 'pcs'}
                      </Typography>
                      <Typography
                        variant='body2'
                        color='text.secondary'
                        sx={{ textAlign: 'center' }}
                      >
                        {product.description}
                      </Typography>
                      <Button
                        variant='contained'
                        fullWidth
                        sx={{
                          marginTop: '10px',
                          backgroundColor: '#c40027'
                        }}
                        onClick={() => navigate(`/admin/products/update-product/${product._id}`)}
                      >
                        update
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>))}
            </Grid>
          ))}
        </>}
    </Container>
  );
};

export default GestionProduct;
