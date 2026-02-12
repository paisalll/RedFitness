// @mui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
// _mock
import { _mapContact } from 'src/_mock';
//
import ContactMap from '../contact-map';
import ContactHero from '../contact-hero';
import ContactForm from '../contact-form';
import PersonalTrainingComparison from '../comparation';
import PersonalTrainingQuality from '../fact';

// ----------------------------------------------------------------------

export default function ContactView() {
  return (
    <>
      <ContactHero />

      <PersonalTrainingQuality />

      <ContactMap />

      <PersonalTrainingComparison/>

      <ContactForm/>
    </>
  );
}
