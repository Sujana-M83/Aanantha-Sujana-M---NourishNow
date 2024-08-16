import { Box, Button, Typography, Radio, RadioGroup, FormControlLabel, FormControl, LinearProgress, Container, Card, CardContent, CardActions } from '@mui/material';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, IconButton, Menu, Tooltip, MenuItem, Grid, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link, useNavigate } from 'react-router-dom';
import getUser from '../components/userService';
import './Homepage.css';


import { styled } from '@mui/system';
import { Element } from 'react-scroll';
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
const questions = [
  {
    question: 'What’s your idea of a workout?',
    options: [
      { answer: 'Running a marathon', points: 3 },
      { answer: 'A vigorous dance party', points: 2 },
      { answer: 'Chasing the ice cream truck', points: 1 },
      { answer: 'Lifting the remote control', points: 0 },
    ],
  },
  {
    question: 'How would you describe your diet?',
    options: [
      { answer: 'Like a gourmet chef’s masterpiece', points: 3 },
      { answer: 'A mix of salad and the occasional pizza', points: 2 },
      { answer: 'Takeout and snacks galore', points: 1 },
      { answer: 'Dessert first, always', points: 0 },
    ],
  },
  {
    question: 'How much water do you drink daily?',
    options: [
      { answer: 'More than a fish', points: 3 },
      { answer: 'I’m a fan of hydration', points: 2 },
      { answer: 'Only when I’m thirsty', points: 1 },
      { answer: 'Water? What’s that?', points: 0 },
    ],
  },
  {
    question: 'How many hours do you sleep at night?',
    options: [
      { answer: 'Like a bear in hibernation', points: 3 },
      { answer: 'I could use a bit more', points: 2 },
      { answer: 'I nap like a cat', points: 1 },
      { answer: 'Sleep is overrated', points: 0 },
    ],
  },
  {
    question: 'How often do you feel stressed?',
    options: [
      { answer: 'Only when my Wi-Fi is down', points: 3 },
      { answer: 'When the coffee pot is empty', points: 2 },
      { answer: 'When the dog ate my homework', points: 1 },
      { answer: 'My middle name should be Stress', points: 0 },
    ],
  },
];

function Quiz() {
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

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleAnswerSubmit = () => {
    const selectedAnswer = questions[currentQuestion].options.find(
      (option) => option.answer === selectedOption
    );

    if (selectedAnswer) {
      setScore(score + selectedAnswer.points);
      setFeedback(`You chose: ${selectedAnswer.answer}. Nice choice!`);
    }

    setTimeout(() => {
      setFeedback('');
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption('');
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const renderResult = () => {
    let resultMessage = '';

    if (score > 12) {
      resultMessage = 'You’re a health superhero! Keep rocking that healthy lifestyle!';
    } else if (score > 8) {
      resultMessage = 'You’re doing great, but there’s always room for a little extra fun and fitness!';
    } else {
      resultMessage = 'It’s time to put the fun in functional health! Let’s start making some positive changes!';
    }

    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Box textAlign="center">
          <Typography variant="h4" mb={3}>Your Health Score</Typography>
          <Typography variant="body1" mb={2}>{resultMessage}</Typography>
          <Typography variant="body2" color="textSecondary">
            Your Score: {score} / {questions.length * 3}
          </Typography>
        </Box>
      </motion.div>
    );
  };

  return (
    <><AppBar position="fixed" style={{ backgroundColor: primaryMain, height: '64px', zIndex: 1201 }}>
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
    </AppBar><Container maxWidth="sm">
        {showResult ? (
          renderResult()
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Question {currentQuestion + 1} of {questions.length}
                </Typography>
                <Typography variant="h6" mb={2}>{questions[currentQuestion].question}</Typography>
                <FormControl component="fieldset">
                  <RadioGroup
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                  >
                    {questions[currentQuestion].options.map((option, index) => (
                      <FormControlLabel
                        key={index}
                        value={option.answer}
                        control={<Radio />}
                        label={option.answer} />
                    ))}
                  </RadioGroup>
                </FormControl>
                {feedback && (
                  <Typography variant="body2" color="primary" mt={2}>
                    {feedback}
                  </Typography>
                )}
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAnswerSubmit}
                  disabled={!selectedOption}
                >
                  {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Result'}
                </Button>
              </CardActions>
              <Box mt={2}>
                <LinearProgress variant="determinate" value={(currentQuestion / questions.length) * 100} />
              </Box>
            </Card>
          </motion.div>
        )}
      </Container></>
  );
}

export default Quiz;
