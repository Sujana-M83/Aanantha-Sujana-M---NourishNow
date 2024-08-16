import React, { useState } from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {
  AppBar,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  IconButton,
  Menu,
  MenuItem,
  Box,
} from '@mui/material';
import axios from 'axios';
import { styled } from '@mui/system';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
const pages = ['Home', 'Food Log', 'RecipeFinder', 'NutritionalInfo', 'Diet Plan'];

const NUTRITIONIX_API_URL = 'https://trackapi.nutritionix.com/v2/natural/nutrients';
const NUTRITIONIX_APP_ID = '29987720'; 
const NUTRITIONIX_API_KEY = '1d8813c967f6bf155869a01d02a513fd'; 
const primaryMain = '#00796b';

function NutritionalInfo() {
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(true);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [food, setFood] = useState('');
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();


  const ToolbarContainer = styled(Container)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  });
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user data
    setUser(null); // Clear user state
    navigate('/login'); // Redirect to login
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const fetchNutritionalInfo = async () => {
    if (!food.trim()) {
      setError('Please enter a food item.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(
        NUTRITIONIX_API_URL,
        { query: food },
        {
          headers: {
            'x-app-id': NUTRITIONIX_APP_ID,
            'x-app-key': NUTRITIONIX_API_KEY,
            'Content-Type': 'application/json',
          },
        }
      );
      const data = response.data.foods[0];
      setInfo({
        name: data.food_name,
      quantity: data.serving_qty ? `${data.serving_qty} serving(s)` : 'Quantity information not available',
      calories: `${data.nf_calories} kcal`,
      protein: `${data.nf_protein} g`,
      fat: `${data.nf_total_fat} g`,
      carbs: `${data.nf_total_carbohydrate} g`,
      fiber: `${data.nf_dietary_fiber} g`,
      sugars: `${data.nf_sugars} g`,
      cholesterol: `${data.nf_cholesterol} mg`,
      });
    } catch (error) {
      setError('Error fetching nutritional info. Please try again.');
      console.error('Error fetching nutritional info:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setFood('');
    setInfo(null);
    setError('');
  };

  return (
    <><div>
      <AppBar position="fixed" style={{ backgroundColor: primaryMain, height: '64px', zIndex: 1201 }}>
        <ToolbarContainer maxWidth="xl">
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            NourishNow
          </Typography>

          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            NourishNow
          </Typography>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
            {pages.map((page) => (
              <Button
                key={page}
                component={Link}
                to={`/${page.toLowerCase().replace(' ', '')}`}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => { handleClose(); navigate('/profile'); } }>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </ToolbarContainer>
      </AppBar>
    </div><Container
      maxWidth="md"
      sx={{
        mt: 4,
        backgroundImage: 'url(https://wallpaperaccess.com/full/1189777.jpg)', // Replace with your background image URL
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '20px',
        borderRadius: '8px',
        position: 'relative',
        overflow: 'hidden',
        color: 'white'
      }}
    >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dark overlay for better readability
            zIndex: 1
          }} />
        <Box sx={{ position: 'relative', zIndex: 2 }}>
          <Typography variant="h4" gutterBottom>
            Nutritional Information
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <TextField
              label="Food Item"
              variant="outlined"
              value={food}
              onChange={(e) => setFood(e.target.value)}
              sx={{ flexGrow: 1, mr: 2, backgroundColor: 'white' }}
              error={Boolean(error)}
              helperText={error} />
            <Button
              variant="contained"
              style={{ backgroundColor: 'teal', color: 'white' }}
              onClick={fetchNutritionalInfo}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Get Info'}
            </Button>
            <Button
              variant="outlined"
              style={{ marginLeft: '10px', color: 'white', borderColor: 'white' }}
              onClick={handleClear}
            >
              Clear
            </Button>
          </Box>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {info && (
  <Card sx={{ mt: 2, p: 2, borderRadius: 2, boxShadow: 3, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        {info.name}
      </Typography>
      <Typography>Quantity: {info.quantity}</Typography>
      <Typography>Calories: {info.calories}</Typography>
      <Typography>Protein: {info.protein}</Typography>
      <Typography>Fat: {info.fat}</Typography>
      <Typography>Carbohydrates: {info.carbs}</Typography>
      <Typography>Fiber: {info.fiber}</Typography>
      <Typography>Sugars: {info.sugars}</Typography>
      <Typography>Cholesterol: {info.cholesterol}</Typography>
    </CardContent>
  </Card>
)}
        </Box>
      </Container></>
  );
}

export default NutritionalInfo;
