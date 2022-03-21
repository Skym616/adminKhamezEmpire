import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Container,
  Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableBody from '@mui/material/TableBody';
import { useConfirm } from 'material-ui-confirm';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../Contexts/AuthContext';

const GestionCommande = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const confirm = useConfirm();
  const [ordereds, setOrdereds] = useState([]);

  useEffect(() => {
    getAllOrdered();
  }, []);

  const getAllOrdered = () => {
    axios
      .get('https://khamez-empire-api.herokuapp.com/ordered', {
        userId: user.userId,
        headers: { Authorization: `Bearer ${user.token}` }
      })
      .then((response) => {
        const ordereds = response.data.ordered;
        setOrdereds([...ordereds]);
      })
      .catch((error) => {
        return null;
      });
  };

  const updateValid = (item) => {
    confirm({ title: 'Are you sure of want validated?', description: 'This operation is irreversible' }).then(() => {
      ordereds.filter((i) => i._id === item._id).map((i) => i.status = 'valid');
      const tab = ordereds.filter((i) => i._id === item._id);
      axios.put('https://khamez-empire-api.herokuapp.com/ordered', tab[0], {
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

  const updateCancel = (item) => {
    confirm({ title: 'Are you sure of want canceled?', description: 'This operation is irreversible' }).then(() => {
      ordereds.filter((i) => i._id === item._id).map((i) => i.status = 'cancel');
      const tab = ordereds.filter((i) => i._id === item._id);
      axios.put('https://khamez-empire-api.herokuapp.com/orderedc', tab[0], {
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

  return (<Container sx={{ mt: '110px' }}>
    {ordereds.map((ordered) => (
      <Accordion key={ordered._id}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
          sx={{ backgroundColor: ordered.status === '' ? '#ffffff' : ordered.status === 'cancel' ? '#c40027' : '#00c853' }}
        >
          <Typography> Ordered nᵒ{ordered._id} - {ordered.dateOrdered}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell align='right'>Name</TableCell>
                  <TableCell align='right'>Price&nbsp;(XAF)</TableCell>
                  <TableCell align='right'>Quantity</TableCell>
                  <TableCell align='right'>SubTotal&nbsp;(XAF)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {JSON.parse(ordered.ordered).map((item) => (
                  <TableRow
                    key={item._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component='th' scope='row'>
                      <Avatar src={item.image} sx={{ width: 56, height: 56 }} />
                    </TableCell>
                    <TableCell align='right'>{item.name}</TableCell>
                    <TableCell align='right'>{item.price}</TableCell>
                    <TableCell align='right'>{item.qt}</TableCell>
                    <TableCell align='right'>{item.qt * item.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography variant='h6' component='div' sx={{ textAlign: 'right', mt: '20px' }}>
            Total
            <Typography variant='h5' component='span' color='primary'>
              {ordered.total + '  XAF'}
            </Typography>
          </Typography>
          <Typography variant='h6' component='div' sx={{ textAlign: 'right', mt: '20px', w: '100%' }}>
            number customer
            <Typography variant='h5' component='span' color='primary'>
              {ordered.number}
            </Typography>
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Button variant='outlined' onClick={() => updateCancel(ordered)}
                    disabled={ordered.status !== ''}> Cancel </Button>
            <Button variant='contained' onClick={() => updateValid(ordered)}
                    disabled={ordered.status !== ''}> Valid </Button>
          </Box>
        </AccordionDetails>
      </Accordion>))}

  </Container>);
};

export default GestionCommande;