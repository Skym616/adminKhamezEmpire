import InventoryIcon from '@mui/icons-material/Inventory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const drawerItem = [
  {
    id: 1,
    text: 'Product management',
    icon: <InventoryIcon color='primary' />,
    path: '/admin/products'
  },
  {
    id: 2,
    text: 'Order management',
    icon: <LocalShippingIcon color='primary' />,
    path: '/admin/commande'
  }
  /*{
    id: 3,
    text: 'Messages',
    icon: <InventoryIcon color='primary' />,
    path: '/admin/message'
  }*/
];

export default drawerItem;
