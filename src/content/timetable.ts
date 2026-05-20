import { PageContentSchema } from './types';

export const timetableContent: PageContentSchema = {
  pageKey: 'timetable',
  label: 'Timetable',
  sections: [
    {
      key: 'cta',
      label: 'Dual CTA',
      description: 'Dua kotak CTA di bawah jadwal: Free Trial dan Corporate.',
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
