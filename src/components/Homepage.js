import React, { useEffect, useState } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Button, Tooltip, MenuItem, Grid, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link, useNavigate } from 'react-router-dom';
import getUser from '../components/userService';
import { styled } from '@mui/system';
import { Element } from 'react-scroll';
import { motion } from 'framer-motion';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import './Homepage.css';
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

const FooterContainer = styled(Box)({
  backgroundColor: primaryDark,
  color: commonWhite,
  padding: '48px 0',
});

function Homepage() {
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

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
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

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
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
                <MenuItem onClick={() => { handleClose(); handleProfileClick(); }}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </ToolbarContainer>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 50 }}>
        <Element name="about-us">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h5" gutterBottom>
              Our Mission
            </Typography>
            <Typography variant="body1" paragraph>
              Our mission is to empower individuals to lead healthier lives through personalized diet and nutrition plans. We believe in a holistic approach to health and wellness, combining balanced nutrition, regular exercise, and positive lifestyle changes.
            </Typography>
          </motion.div>
        </Element>

        <Element name="our-values">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Typography variant="h5" gutterBottom>
              Our Values
            </Typography>
            <Typography variant="body1" paragraph>
              We value integrity, transparency, and dedication to our clients' well-being. Our team is committed to providing evidence-based advice and support to help you reach your health goals.
            </Typography>
          </motion.div>
        </Element>

        <Element name="healthy-lifestyle-tips">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Typography variant="h5" gutterBottom>
              Healthy Lifestyle Tips
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <Box textAlign="center">
                  <Avatar sx={{ bgcolor: primaryMain, width: 60, height: 60, margin: 'auto' }}>
                    🌿
                  </Avatar>
                  <Typography variant="h6" gutterBottom>
                    Eat More Greens
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Incorporating more green vegetables into your diet can boost your immune system and provide essential nutrients.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Box textAlign="center">
                  <Avatar sx={{ bgcolor: primaryMain, width: 60, height: 60, margin: 'auto' }}>
                    💧
                  </Avatar>
                  <Typography variant="h6" gutterBottom>
                    Stay Hydrated
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Drinking enough water daily helps maintain your energy levels and supports overall health.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Box textAlign="center">
                  <Avatar sx={{ bgcolor: primaryMain, width: 60, height: 60, margin: 'auto' }}>
                    💤
                  </Avatar>
                  <Typography variant="h6" gutterBottom>
                    Get Adequate Sleep
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Quality sleep is crucial for physical recovery, mental clarity, and emotional balance.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </motion.div>
        </Element>

        <Element name="interactive-health-quiz">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Typography variant="h5" gutterBottom>
              Interactive Health Quiz
            </Typography>
            <Typography variant="body1" paragraph>
              Test your health knowledge and learn more about how to lead a balanced lifestyle with our fun and informative quiz!
            </Typography>
            <Link to="/quiz"><Button className='quiz-btn' variant="contained" sx={{
                  mt: 2,
                  backgroundColor: 'teal',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  transition: 'background-color 0.3s',
                  '&:hover': {
                    backgroundColor: 'rgb(8, 75, 75)', // Hover color
                  },
                }}>
              Take the Quiz
            </Button></Link>
          </motion.div>
        </Element>
      </Container>
<br></br>
      <FooterContainer>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom>
                About Us
              </Typography>
              <Typography variant="body1" paragraph>
                NourishNow is dedicated to helping individuals achieve their health goals through personalized nutrition plans and expert advice.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom>
                Follow Us
              </Typography>
              <Box display="flex" gap={2}>
                <IconButton aria-label="Facebook" color="inherit">
                  <FacebookIcon />
                </IconButton>
                <IconButton aria-label="Twitter" color="inherit">
                  <TwitterIcon />
                </IconButton>
                <IconButton aria-label="Instagram" color="inherit">
                  <InstagramIcon />
                </IconButton>
                <IconButton aria-label="LinkedIn" color="inherit">
                  <LinkedInIcon />
                </IconButton>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom>
                Contact Us
              </Typography>
              <Typography variant="body1" paragraph>
                Email: support@nourishnow.com <br />
                Phone: (123) 456-7890
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </FooterContainer>
    </div>
  );
}

export default Homepage;
/*import React, { useEffect, useState } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Button, MenuItem, Grid, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from './AuthService'; // Ensure this handles your authentication
import { GoogleLogin } from '@react-oauth/google';
import { styled } from '@mui/system';
import { Element } from 'react-scroll';
import { motion } from 'framer-motion';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import './Homepage.css';

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
const FooterContainer = styled(Box)({
  backgroundColor: primaryDark,
  color: commonWhite,
  padding: '48px 0',
});
function Homepage() {
  const [auth, setAuth] = useState(false);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuth(true);
      // Optionally fetch user data if necessary
    }
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    try {
      await AuthService.logout(); // Ensure you have this method
      localStorage.removeItem('token');
      setAuth(false);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleGoogleSuccess = async (response) => {
    try {
      const token = response.credential;
      const googleResponse = await AuthService.googleLogin(token);
      localStorage.setItem('token', googleResponse.data.token); // Store token
      setUser(googleResponse.data.user); // Store user data if available
      setAuth(true);
      navigate('/profile'); // Redirect to profile page
    } catch (error) {
      console.error('Google login error:', error);
      setAuth(false);
    }
  };

  const handleGoogleFailure = (error) => {
    console.error('Google Login Error:', error);
    setAuth(false);
  };

  return (
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
                onClick={handleOpenUserMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={() => { handleCloseUserMenu(); navigate('/profile'); }}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </ToolbarContainer>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 50 }}>
        <Element name="about-us">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h5" gutterBottom>
              Our Mission
            </Typography>
            <Typography variant="body1" paragraph>
              Our mission is to empower individuals to lead healthier lives through personalized diet and nutrition plans. We believe in a holistic approach to health and wellness, combining balanced nutrition, regular exercise, and positive lifestyle changes.
            </Typography>
          </motion.div>
        </Element>

        <Element name="our-values">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Typography variant="h5" gutterBottom>
              Our Values
            </Typography>
            <Typography variant="body1" paragraph>
              We value integrity, transparency, and dedication to our clients' well-being. Our team is committed to providing evidence-based advice and support to help you reach your health goals.
            </Typography>
          </motion.div>
        </Element>

        <Element name="healthy-lifestyle-tips">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Typography variant="h5" gutterBottom>
              Healthy Lifestyle Tips
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <Box textAlign="center">
                  <Avatar sx={{ bgcolor: primaryMain, width: 60, height: 60, margin: 'auto' }}>
                    🌿
                  </Avatar>
                  <Typography variant="h6" gutterBottom>
                    Eat More Greens
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Incorporating more green vegetables into your diet can boost your immune system and provide essential nutrients.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Box textAlign="center">
                  <Avatar sx={{ bgcolor: primaryMain, width: 60, height: 60, margin: 'auto' }}>
                    💧
                  </Avatar>
                  <Typography variant="h6" gutterBottom>
                    Stay Hydrated
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Drinking enough water daily helps maintain your energy levels and supports overall health.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Box textAlign="center">
                  <Avatar sx={{ bgcolor: primaryMain, width: 60, height: 60, margin: 'auto' }}>
                    💤
                  </Avatar>
                  <Typography variant="h6" gutterBottom>
                    Get Adequate Sleep
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Quality sleep is crucial for physical recovery, mental clarity, and emotional balance.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </motion.div>
        </Element>

        <Element name="interactive-health-quiz">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Typography variant="h5" gutterBottom>
              Interactive Health Quiz
            </Typography>
            <Typography variant="body1" paragraph>
              Test your health knowledge and learn more about how to lead a balanced lifestyle with our fun and informative quiz!
            </Typography>
            <Link to="/quiz"><Button className='quiz-btn' variant="contained" sx={{
                  mt: 2,
                  backgroundColor: 'teal',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  transition: 'background-color 0.3s',
                  '&:hover': {
                    backgroundColor: 'rgb(8, 75, 75)', // Hover color
                  },
                }}>
              Take the Quiz
            </Button></Link>
          </motion.div>
        </Element>
      </Container>
<br></br>
      <FooterContainer>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom>
                About Us
              </Typography>
              <Typography variant="body1" paragraph>
                NourishNow is dedicated to helping individuals achieve their health goals through personalized nutrition plans and expert advice.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom>
                Follow Us
              </Typography>
              <Box display="flex" gap={2}>
                <IconButton aria-label="Facebook" color="inherit">
                  <FacebookIcon />
                </IconButton>
                <IconButton aria-label="Twitter" color="inherit">
                  <TwitterIcon />
                </IconButton>
                <IconButton aria-label="Instagram" color="inherit">
                  <InstagramIcon />
                </IconButton>
                <IconButton aria-label="LinkedIn" color="inherit">
                  <LinkedInIcon />
                </IconButton>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom>
                Contact Us
              </Typography>
              <Typography variant="body1" paragraph>
                Email: support@nourishnow.com <br />
                Phone: (123) 456-7890
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </FooterContainer>
    </div>
  );
}

export default Homepage;*/
