import { Avatar, Box, Button, CircularProgress, Container, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import '../styles/style.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const DetailProduct = (props) => {
  const navigate = useNavigate();
  const { idProduct } = useParams();
  const [product, setProduct] = useState({});
  const [circular, setCircular] = useState(true);

  useEffect(() => {
    getProduct();
    return null;
  }, []);

  const getProduct = () => {
    axios.get('https://khamez-empire-api.herokuapp.com/products/' + idProduct)
      .then((response) => {
        setProduct(response.data.product);
        setCircular(false);
      })
      .catch((e) => setCircular(false));
  };

  return (
    <Container>
      {circular ? <CircularProgress color='primary' sx={{ mt: '90%', ml: '40%', mr: '40%' }} /> :
        <Box sx={{
          mt: '150px',
          backgroundColor: 'background.paper',
          border: '2px solid #ffffff',
          p: 4
        }}
             className='box'
        >
          <Grid container spacing={2}>
            <Grid item lg={6} md={6} sm={6} xs={12}
                  sx={{
                    ml: { xs: 'auto' },
                    mr: { xs: 'auto' }
                  }}>
              <Avatar src={product.image} alt='b.b.w'
                      sx={{
                        width: 200,
                        height: 200,
                        border: 'transparent'
                      }} />
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12}>
              <Typography sx={{ borderBottom: '1px solid rgba(0,0,0,0.6)' }}>
                Name
                <Typography variant='h6' component='span'
                            sx={{ fontWeight: 'bolder', fontSize: '18px' }}>
                  {'   ' + product.name}
                </Typography>
              </Typography>
              <Typography sx={{ borderBottom: '1px solid rgba(0,0,0,0.6)' }}>
                Category
                <Typography variant='h6' component='span'
                            sx={{ fontWeight: 'bolder', fontSize: '18px' }}>
                  {'   ' + product.category}
                </Typography>
              </Typography>
              <Typography sx={{ borderBottom: '1px solid rgba(0,0,0,0.6)' }}>
                Size
                <Typography variant='h6' component='span'
                            sx={{ fontWeight: 'bolder', fontSize: '18px' }}>
                  {'   ' + product.size}
                </Typography>
              </Typography>
              <Typography sx={{ borderBottom: '1px solid rgba(0,0,0,0.6)' }}>
                Quantity
                <Typography variant='h6' component='span'
                            sx={{ fontWeight: 'bolder', fontSize: '18px' }}>
                  {'   ' + product.quantity}
                </Typography>
              </Typography>
              <Typography sx={{ borderBottom: '1px solid rgba(0,0,0,0.6)' }}>
                Price
                <Typography variant='h6' component='span'
                            sx={{ fontWeight: 'bolder', fontSize: '18px' }}>
                  {'   ' + product.price + ' XAF'}
                </Typography>
              </Typography>
              <Typography sx={{ borderBottom: '1px solid rgba(0,0,0,0.6)' }}>
                Matter
                <Typography variant='h6' component='span'
                            sx={{ fontWeight: 'bolder', fontSize: '18px' }}>
                  {'   ' + product.matter}
                </Typography>
              </Typography>
              <Typography sx={{ borderBottom: '1px solid rgba(0,0,0,0.6)' }}>
                Weight
                <Typography variant='h6' component='span'
                            sx={{ fontWeight: 'bolder', fontSize: '18px' }}>
                  {'   ' + product.weight + ' g'}
                </Typography>
              </Typography>
              <Typography sx={{ color: 'rgba(0,0,0,0.7)', fontSize: '12px' }}>
                {product.description}
              </Typography>
              <Button color='primary' variant='contained' sx={{}} fullWidth
                      onClick={() => navigate(`/admin/products/update-product/${product._id}`)}>
                Update
              </Button>
            </Grid>
          </Grid>
        </Box>
      }
    </Container>
  );
};
export default DetailProduct;