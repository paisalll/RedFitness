import { m } from 'framer-motion';
// @mui
import Masonry from '@mui/lab/Masonry';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import Stack, { StackProps } from '@mui/material/Stack';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
// utils
import { fDate } from 'src/utils/format-time';
// _mock
import { _testimonials } from 'src/_mock';
// theme
import { hideScroll } from 'src/theme/css';
// components
import Iconify from 'src/components/iconify';
import { MotionViewport, varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

const RED = '#DF2026';
const BLACK = '#060606';

export default function AboutTestimonials() {
  const mdUp = useResponsive('up', 'md');

  const renderLink = (
    <Button 
      endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
      sx={{ 
        color: RED, 
        fontFamily: 'monospace', 
        fontWeight: 800, 
        letterSpacing: 1, 
        textTransform: 'uppercase',
        borderRadius: 0,
        '&:hover': { bgcolor: alpha(RED, 0.1) }
      }}
    >
      Read more testimonials
    </Button>
  );

  const renderDescription = (
    <Box
      sx={{
        maxWidth: { md: 360 },
        textAlign: { xs: 'center', md: 'unset' },
      }}
    >
      <m.div variants={varFade().inUp}>
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
            <Box sx={{ width: 28, height: 2, bgcolor: RED }} />
            <Typography sx={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: 4, textTransform: 'uppercase', color: RED, fontFamily: 'monospace' }}>
                Testimonials
            </Typography>
        </Stack>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Typography 
            variant="h2" 
            sx={{ 
                my: 3, 
                color: '#fff',
                fontWeight: 800,
                textTransform: 'uppercase',
                fontFamily: "'Poppins', sans-serif",
                letterSpacing: -2,
                lineHeight: 0.95
            }}
        >
          Who Love <br />
          <Box component="span" sx={{ fontStyle: 'italic', color: RED }}>Our Work.</Box>
        </Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Typography sx={{ color: alpha('#fff', 0.6), fontSize: '0.9rem', lineHeight: 1.8 }}>
          Our goal is to create a product and service that you’re satisfied with and use it every
          day. This is why we’re constantly working on our services to make it better every day and
          really listen to what our users has to say.
        </Typography>
      </m.div>

      {!mdUp && (
        <Box
          component={m.div}
          variants={varFade().inUp}
          sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}
        >
          {renderLink}
        </Box>
      )}
    </Box>
  );

  const renderContent = (
    <Box
      sx={{
        py: { md: 10 },
        height: { md: 1 },
        ...(mdUp && {
          ...hideScroll.y,
        }),
      }}
    >
      <Masonry spacing={3} columns={{ xs: 1, md: 2 }} sx={{ ml: 0 }}>
        {_testimonials.map((testimonial) => (
          <m.div key={testimonial.name} variants={varFade().inUp}>
            <TestimonialCard testimonial={testimonial} />
          </m.div>
        ))}
      </Masonry>
    </Box>
  );

  return (
    <Box
      sx={{
        bgcolor: BLACK,
        position: 'relative',
        overflow: 'hidden',
        height: { md: 840 },
        py: { xs: 10, md: 0 },
        borderTop: `1px solid ${alpha(RED, 0.15)}`
      }}
    >
      {/* Background Grid Pattern - Opsional untuk menambah tekstur */}
      <Box sx={{ position: 'absolute', top: 0, left: 0, width: 1, height: 1, opacity: 0.03, backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px', zIndex: 0 }} />

      <Container component={MotionViewport} sx={{ position: 'relative', height: 1, zIndex: 1 }}>
        <Grid
          container
          spacing={5}
          alignItems="center"
          justifyContent={{ xs: 'center', md: 'space-between' }}
          sx={{ height: 1 }}
        >
          <Grid xs={12} md={4}>
            {renderDescription}
          </Grid>

          <Grid
            xs={12}
            md={7}
            lg={6}
            alignItems="center"
            sx={{ height: 1 }}
          >
            {renderContent}
          </Grid>
        </Grid>

        {mdUp && (
          <Box
            component={m.div}
            variants={varFade().inUp}
            sx={{ bottom: 60, position: 'absolute' }}
          >
            {renderLink}
          </Box>
        )}
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

type TestimonialCardProps = StackProps & {
  testimonial: {
    name: string;
    content: string;
    postedDate: Date;
    avatarUrl: string;
    ratingNumber: number;
  };
};

function TestimonialCard({ testimonial, sx, ...other }: TestimonialCardProps) {
  const { name, ratingNumber, postedDate, content, avatarUrl } = testimonial;

  return (
    <Stack
      spacing={3}
      sx={{
        bgcolor: '#080808',
        border: `1px solid ${alpha(RED, 0.15)}`,
        borderLeft: `3px solid ${RED}`,
        p: 4,
        borderRadius: 0, // Sharp
        color: '#fff',
        transition: 'all 0.3s ease',
        '&:hover': {
            transform: 'translateY(-4px)',
            borderColor: alpha(RED, 0.4),
            bgcolor: '#0c0c0c'
        },
        ...sx,
      }}
      {...other}
    >
      <Iconify icon="mingcute:quote-left-fill" width={40} sx={{ color: RED, opacity: 0.5 }} />

      <Typography sx={{ fontSize: '0.9rem', lineHeight: 1.8, color: alpha('#fff', 0.8) }}>{content}</Typography>

      <Rating 
        value={ratingNumber} 
        readOnly 
        size="small" 
        sx={{ '& .MuiRating-iconFilled': { color: RED }, '& .MuiRating-iconEmpty': { color: alpha('#fff', 0.2) } }} 
      />

      <Stack direction="row" alignItems="center">
        <Avatar alt={name} src={avatarUrl} sx={{ mr: 2, borderRadius: 0, border: `1px solid ${alpha('#fff', 0.2)}` }} />

        <ListItemText
          primary={name.toUpperCase()}
          secondary={fDate(postedDate)}
          primaryTypographyProps={{
            fontWeight: 800,
            fontFamily: "'Poppins', sans-serif",
            mb: 0.5,
          }}
          secondaryTypographyProps={{
            typography: 'caption',
            fontFamily: 'monospace',
            sx: { opacity: 0.5, color: '#fff' },
          }}
        />
      </Stack>
    </Stack>
  );
}