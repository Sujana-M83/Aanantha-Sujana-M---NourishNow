import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { styled } from '@mui/system';
import {
  AppBar,
  Container,
  Typography,
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  InputAdornment,
  Slider,
  Menu,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
const pages = ['Home', 'Food Log', 'RecipeFinder', 'NutritionalInfo', 'DietPlan'];
const primaryMain = '#00796b';
const ToolbarContainer = styled(Container)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

function FoodLog() {
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [foodName, setFoodName] = useState('');
  const [calories, setCalories] = useState('');
  const [foodEntries, setFoodEntries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const navigate = useNavigate();

  useEffect(() => {
    const storedEntries = JSON.parse(localStorage.getItem('foodEntries')) || [];
    setFoodEntries(storedEntries);
  }, []);

  const handleAddFood = () => {
    if (foodName && calories) {
      const newEntry = { foodName, calories: parseInt(calories, 10) };
      const updatedEntries = [...foodEntries, newEntry];
      setFoodEntries(updatedEntries);
      localStorage.setItem('foodEntries', JSON.stringify(updatedEntries));
      setFoodName('');
      setCalories('');
    }
  };
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleDelete = (index) => {
    const updatedEntries = foodEntries.filter((_, i) => i !== index);
    setFoodEntries(updatedEntries);
    localStorage.setItem('foodEntries', JSON.stringify(updatedEntries));
  };

  const filteredEntries = foodEntries
    .filter(entry => entry.foodName.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => sortOrder === 'asc' ? a.calories - b.calories : b.calories - a.calories);

  const totalCalories = foodEntries.reduce((sum, entry) => sum + entry.calories, 0);
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

  return (
    <>
    <div>
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
                <MenuItem onClick={() => { handleClose(); navigate('/profile'); }}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </ToolbarContainer>
      </AppBar>
      </div>
    
    
    <Box
      sx={{
        backgroundImage: 'url(https://i.pinimg.com/originals/ed/95/d4/ed95d410a7ae8bbea2414d6712059b3e.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4
      }}
    >
        <Container
          maxWidth="md"
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            padding: 4,
            borderRadius: 2,
            boxShadow: 3
          }}
        >
          <Typography variant="h4" gutterBottom>
            Food Log
          </Typography>

          <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
            <TextField
              label="Search Food"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ mr: 2, flexGrow: 1 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }} />
            <FormControl variant="outlined" sx={{ minWidth: 120 }}>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                label="Sort By"
              >
                <MenuItem value="asc">Calories (Low to High)</MenuItem>
                <MenuItem value="desc">Calories (High to Low)</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ display: 'flex', mb: 3 }}>
            <TextField
              label="Food Name"
              variant="outlined"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              sx={{ mr: 2, flexGrow: 1 }} />
            <TextField
              label="Calories"
              variant="outlined"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              sx={{ mr: 2, flexGrow: 1 }}
              type="number" />
            <Button variant="contained" onClick={handleAddFood} style={{ backgroundColor: 'teal' }}>
              Add
            </Button>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Typography variant="h6" gutterBottom>
            Total Calories: {totalCalories}
          </Typography>
          <Box sx={{ mb: 3 }}>
            <Slider
              value={totalCalories}
              max={10000}
              valueLabelDisplay="auto"
              sx={{ color: 'teal' }} />
          </Box>

          <List>
            {filteredEntries.length > 0 ? filteredEntries.map((entry, index) => (
              <ListItem key={index}>
                <ListItemText primary={entry.foodName} secondary={`${entry.calories} Calories`} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(index)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            )) : (
              <Typography variant="body1" color="textSecondary">No food entries match the search criteria.</Typography>
            )}
          </List>
        </Container>
      </Box></>
  );
}

export default FoodLog;
