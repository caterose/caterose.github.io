import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import useScrollTrigger from '@mui/material/useScrollTrigger';

const pages = [
    { label: 'about', path: '#about' }, // ! FIX PATH
    { label: 'experience', path: '#experience' }, // ! FIX PATH
    { label: 'projects', path: '#projects' }, // ! FIX PATH
    { label: 'contact', path: '#contact' }, // ! FIX PATH
    { label: 'resume', path: '#resume' }, // ! FIX PATH
];

interface Props {
  children?: React.ReactElement<unknown>;
}

function HideOnScroll(props: Props) {
  const { children } = props;

  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children ?? <div />}
    </Slide>
  );
}


function ResponsiveAppBar() {

  return (
    <HideOnScroll>
        <AppBar position="fixed">
        <Container maxWidth="xl" disableGutters>
            <Toolbar disableGutters>
            
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' }, gap: 1, justifyContent: 'space-around' }}>
                {pages.map(({ label, path }) => (
                <Button
                    key={label}
                    component="a"
                    href={path}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                >
                    {label}
                </Button>
                ))}
            </Box>
            </Toolbar>
        </Container>
        </AppBar>
    </HideOnScroll>
  );
}
export default ResponsiveAppBar;
