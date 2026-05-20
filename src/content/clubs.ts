import { PageContentSchema } from './types';

export const clubsContent: PageContentSchema = {
  pageKey: 'clubs',
  label: 'Clubs',
  sections: [
    {
      key: 'hero',
      label: 'Hero',
      description: 'Bagian hero halaman Clubs.',
      fields: [
        { key: 'eyebrow', label: 'Eyebrow / Tag', type: 'text' },
        { key: 'title', label: 'Judul', type: 'text' },
        { key: 'title_highlight', label: 'Judul (merah)', type: 'text' },
        { key: 'description', label: 'Deskripsi', type: 'multiline' },
        { key: 'button1', label: 'Teks Tombol 1', type: 'text' },
        { key: 'button2', label: 'Teks Tombol 2', type: 'text' },
      ],
      defaults: {
        eyebrow: 'Premium Grounds',
        title: 'World-Class',
        title_highlight: 'Facilities.',
        description: 'Train with the best. Our state-of-the-art equipment, spacious zones, and dedicated performance areas are designed to push your limits.',
        button1: 'Explore Zones',
        button2: 'Virtual Tour',
      },
    },
    {
      key: 'cta',
      label: 'Dual CTA',
      description: 'Dua kotak CTA: Free Trial dan Corporate.',
      fields: [
        { key: 'trial_eyebrow', label: 'CTA Free Trial — Eyebrow', type: 'text' },
        { key: 'trial_title', label: 'CTA Free Trial — Judul', type: 'text' },
        { key: 'trial_title_highlight', label: 'CTA Free Trial — Judul (merah)', type: 'text' },
        { key: 'trial_description', label: 'CTA Free Trial — Deskripsi', type: 'multiline' },
        { key: 'trial_button', label: 'CTA Free Trial — Teks Tombol', type: 'text' },
        { key: 'corp_eyebrow', label: 'CTA Corporate — Eyebrow', type: 'text' },
        { key: 'corp_title', label: 'CTA Corporate — Judul', type: 'text' },
        { key: 'corp_title_highlight', label: 'CTA Corporate — Judul (merah)', type: 'text' },
        { key: 'corp_description', label: 'CTA Corporate — Deskripsi', type: 'multiline' },
        { key: 'corp_button', label: 'CTA Corporate — Teks Tombol', type: 'text' },
      ],
      defaults: {
        trial_eyebrow: 'Trial Access',
        trial_title: 'Try Us For',
        trial_title_highlight: 'Free.',
        trial_description: 'Experience the standard of elite training with an exclusive trial.',
        trial_button: 'Claim Free Trial',
        corp_eyebrow: 'B2B Solutions',
        corp_title: 'Corporate',
        corp_title_highlight: 'Deal.',
        corp_description: "Elevate your team's performance with our tailored corporate memberships.",
        corp_button: 'Get Proposal',
      },
    },
  ],
};
