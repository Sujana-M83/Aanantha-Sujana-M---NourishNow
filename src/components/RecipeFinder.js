import React, { useEffect, useState } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Button, Tooltip, MenuItem, Grid, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link, useNavigate } from 'react-router-dom';
import getUser from '../components/userService';
import './Homepage.css';
import axios from 'axios';

import { styled } from '@mui/system';
import { Element } from 'react-scroll';
import {
  TextField,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  CircularProgress,
  Alert,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import DOMPurify from 'dompurify'; // Import DOMPurify for sanitizing HTML

const API_KEY = '4674d48fd14b40f78db4cd446f5412e4'; 
const pages = ['Home', 'Food Log', 'RecipeFinder', 'NutritionalInfo', 'Diet plan'];
const settings = ['Profile', 'Logout'];

const primaryDark = '#004d40';
const primaryMain = '#00796b';
const commonWhite = '#ffffff';
const ToolbarContainer = styled(Container)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});
function RecipeFinder() {
  const [auth, setAuth] = useState(true);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUser(); // Replace with your authentication check
        setUser(userData);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };


  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleProfileClick = () => {
    if (user) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user data
    setUser(null); // Clear user state
    navigate('/login'); // Redirect to login
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cuisineType, setCuisineType] = useState('all');
  const [dietType, setDietType] = useState('all');

  const fetchRecipes = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
        params: {
          apiKey: API_KEY,
          query: query,
          cuisine: cuisineType !== 'all' ? cuisineType : undefined,
          diet: dietType !== 'all' ? dietType : undefined,
          number: 10,
        },
      });
      const recipes = response.data.results;
      const detailedRecipes = await Promise.all(
        recipes.map(async (recipe) => {
          const detailResponse = await axios.get(`https://api.spoonacular.com/recipes/${recipe.id}/information`, {
            params: {
              apiKey: API_KEY,
            },
          });
          return detailResponse.data;
        })
      );
      setRecipes(detailedRecipes);
      
      // Scroll to the top adjusted for the fixed header
      const headerHeight = document.querySelector('header')?.offsetHeight || 64; // Adjust this if needed
      window.scrollTo({ top: headerHeight, behavior: 'smooth' });
  
    } catch (error) {
      if (error.response?.status === 402) {
        setError('API usage limit reached or payment required. Please check your API key or try again later.');
      } else {
        setError('Error fetching recipes. Please try again.');
      }
      console.error('Error details:', error.response?.data); // Log the error response data if available
    } finally {
      setLoading(false);
    }
  };
  
  const handleClickOpen = (recipe) => {
    setSelectedRecipe(recipe);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRecipe(null);
  };

  return (
    <div><AppBar position="fixed" style={{ backgroundColor: primaryMain, height: '64px', zIndex: 1201 }}>
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
              <MenuItem onClick={() => { handleClose(); handleProfileClick(); } }>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        )}
      </ToolbarContainer>
    </AppBar><Container
      maxWidth="lg"
      sx={{
        mt: 6,
        backgroundImage: 'url(https://thumbs.dreamstime.com/b/healthy-food-background-trendy-alkaline-diet-products-fruits-vegetables-cereals-nuts-oil-dark-copy-space-115584357.jpg)', // Replace with your background image URL
        backgroundSize: 'cover',
        backgroundRepeat:'no-repeat',
        backgroundPosition: 'center',
        padding: '20px',
        borderRadius: '8px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay for better readability
            zIndex: 1
          }} />

        <Box sx={{ position: 'relative', zIndex: 2 }}>
          <Typography variant="h4" gutterBottom color="white">
            Recipe Finder
          </Typography>

          <Box sx={{ mb: 3 }}>
            <TextField
              label="Search Recipes"
              variant="outlined"
              fullWidth
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              sx={{ bgcolor: 'background.paper', color: 'white' }} />
          </Box>

          <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
            <FormControl variant="outlined" sx={{ minWidth: 120, mr: 2 }}>
              <InputLabel>Cuisine</InputLabel>
              <Select
                value={cuisineType}
                onChange={(e) => setCuisineType(e.target.value)}
                label="Cuisine"
                sx={{ bgcolor: 'background.paper' }}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="Italian">Italian</MenuItem>
                <MenuItem value="Chinese">Chinese</MenuItem>
                <MenuItem value="Mexican">Mexican</MenuItem>
                {/* Add more cuisines as needed */}
              </Select>
            </FormControl>
            <FormControl variant="outlined" sx={{ minWidth: 120 }}>
              <InputLabel>Diet</InputLabel>
              <Select
                value={dietType}
                onChange={(e) => setDietType(e.target.value)}
                label="Diet"
                sx={{ bgcolor: 'background.paper' }}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="vegetarian">Vegetarian</MenuItem>
                <MenuItem value="vegan">Vegan</MenuItem>
                <MenuItem value="gluten-free">Gluten-Free</MenuItem>
                {/* Add more diets as needed */}
              </Select>
            </FormControl>
          </Box>

          <Button
            variant="contained"
            style={{ backgroundColor: 'teal', color: 'white' }}
            onClick={fetchRecipes}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Search'}
          </Button>

          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

          <Grid container spacing={3} sx={{ mt: 2 }}>
            {recipes.length > 0 ? recipes.map((recipe) => (
              <Grid item xs={12} sm={6} md={4} key={recipe.id}>
                <Card onClick={() => handleClickOpen(recipe)} sx={{ cursor: 'pointer', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.02)' } }}>
                  <CardMedia
                    component="img"
                    alt={recipe.title}
                    height="140"
                    image={recipe.image}
                    title={recipe.title} />
                  <CardContent>
                    <Typography variant="h6">{recipe.title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Ready in {recipe.readyInMinutes} minutes
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Servings: {recipe.servings}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            )) : (
              !loading && <Typography variant="body1" color="textSecondary">No recipes found.</Typography>
            )}
          </Grid>

          <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle>{selectedRecipe?.title}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                <img src={selectedRecipe?.image} alt={selectedRecipe?.title} style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
                <Typography variant="h6" sx={{ mt: 2 }}>Ingredients:</Typography>
                <ul>
                  {selectedRecipe?.extendedIngredients.map((ingredient) => (
                    <li key={ingredient.id}>{ingredient.original}</li>
                  ))}
                </ul>
                <Typography variant="h6">Instructions:</Typography>
                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(selectedRecipe?.instructions || '') }} />
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </Box>
      </Container></div>
  );
}

export default RecipeFinder;