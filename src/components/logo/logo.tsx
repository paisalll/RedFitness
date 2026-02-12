import { forwardRef } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import Link from '@mui/material/Link';
import Box, { BoxProps } from '@mui/material/Box';
// routes
import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

export interface LogoProps extends BoxProps {
  disabledLink?: boolean;
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ disabledLink = false, sx, ...other }, ref) => {
    
    // Pastikan path ini sesuai dengan lokasi file di folder public kamu.
    // Jika file ada di public/assets/Asset 1.png, maka path-nya adalah:
    const logo = (
      <Box
        component="img"
        src="/assets/Asset 1.png"
        alt="Red Fitness Logo"
        sx={{ 
          width: 'auto', // Gunakan auto agar aspek rasio terjaga
          height: 15,    // Sesuaikan tinggi dengan kebutuhan Navbar
          cursor: 'pointer', 
          ...sx 
        }}
      />
    );

    const logoWrapper = (
      <Box
        ref={ref}
        component="div"
        sx={{
          display: 'inline-flex',
          ...sx,
        }}
        {...other}
      >
        {logo}
      </Box>
    );

    if (disabledLink) {
      return logoWrapper;
    }

    return (
      <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
        {logoWrapper}
      </Link>
    );
  }
);

export default Logo;