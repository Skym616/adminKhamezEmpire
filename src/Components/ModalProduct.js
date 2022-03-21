import { Avatar, Backdrop, Box, Button, Fade, Grid, IconButton, Modal, Typography } from '@mui/material';
import { useEffect } from 'react';
import '../styles/style.css';
import MenuIcon from '@mui/icons-material/Menu';

const ModalProduct = (props) => {
  useEffect(() => {
    console.log(props);
  }, []);

  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      open={props.open}
      onClose={() => {
        props.setOpen(false);
      }}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={true}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { lg: 400, xs: 250 },
          backgroundColor: 'background.paper',
          border: '2px solid #ffffff',
          boxShadow: 24,
          borderRadius: 2,
          p: 4,
          pt: 0
        }}
             className='box'
        >
          <IconButton
            size='large'
            edge='end'
            color='primary'
            aria-label='menu'
            sx={{ ml: 'auto' }}
            onClick={() => props.setOpen(false)}
          >
            <MenuIcon />
          </IconButton>
          <Grid container spacing={2}>
            <Grid item lg={6} md={6} sm={6} xs={12}
                  sx={{
                    ml: { xs: 'auto' },
                    mr: { xs: 'auto' },
                    position: 'relative',
                    borderTop: { lg: '180px solid #ff817c', xs: '150px solid #ff817c' },
                    borderRight: { lg: '180px solid transparent', xs: '250px solid transparent' },
                    zIndex: 0,
                    height: 150
                  }}>
              <Avatar src='http://localhost:8080/images/product1647017544899product_5.png' alt='b.b.w'
                      sx={{
                        position: 'absolute',
                        top: { lg: -200, xs: -170 },
                        left: { lg: 20, xs: 20 },
                        zIndex: '4',
                        width: 200,
                        height: 200,
                        border: 'transparent'
                      }} />
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12}>
              <Typography variant='h5' sx={{ fontWeight: 'bolder' }}>
                UA CURRY 3
              </Typography>
              <Typography variant='h6' sx={{ fontWeight: 'bold', fontSize: { xs: '10px', lg: '15px' } }}>
                Mens's Basketball Shoes
              </Typography>
              <Typography variant='h6' component='p' sx={{ color: 'rgba(0,0,0,0.8)', fontSize: '10px' }}>
                ThreadBorne upper delivers lightweight directional strength to support the games most brilliant player
                Stephen curry
              </Typography>
              <Typography variant='h6' sx={{ fontWeight: 'bolder', fontSize: '15px' }}>
                Size available
                <Typography variant='h6' sx={{ fontWeight: '0', fontSize: { xs: '10px', lg: '15px' } }}>
                  XL 4XL L
                </Typography>
                <Typography variant='h4' sx={{ fontWeight: '0' }}>
                  250 XAF
                </Typography>
              </Typography>
              <Button color='primary' variant='contained' sx={{}} fullWidth>
                Update
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Modal>
  )
    ;
};
export default ModalProduct;