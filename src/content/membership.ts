import { PageContentSchema } from './types';

// ----------------------------------------------------------------------
// Membership page (/membership) — content schema + default copy.
// Sections map 1:1 to the components under src/sections/about/.
// ----------------------------------------------------------------------

export const membershipContent: PageContentSchema = {
  pageKey: 'membership',
  label: 'Membership',
  sections: [
    // ── Hero ────────────────────────────────────────────────────────────
    {
      key: 'hero',
      label: 'Hero',
      description: 'Bagian paling atas dengan judul besar dan tombol.',
      fields: [
        { key: 'eyebrow', label: 'Eyebrow / Tag', type: 'text' },
        { key: 'title_line1', label: 'Judul — Baris 1', type: 'text' },
        { key: 'title_line2', label: 'Judul — Baris 2 (merah)', type: 'text' },
        { key: 'title_line3', label: 'Judul — Baris 3', type: 'text' },
        { key: 'description', label: 'Deskripsi', type: 'multiline' },
        { key: 'button', label: 'Teks Tombol', type: 'text' },
      ],
      defaults: {
        eyebrow: 'Membership',
        title_line1: 'GET YOUR',
        title_line2: 'STAR POWER',
        title_line3: 'ON.',
        description:
          "You're in charge. Get pumped with your choice of classes. Experience elite training tailored to your goals.",
        button: 'LEARN MORE',
      },
    },

    // ── Stats + Join steps ──────────────────────────────────────────────
    {
      key: 'what',
      label: 'Statistik & Langkah Bergabung',
      description: 'Deretan angka statistik dan 3 langkah pendaftaran.',
      fields: [
        { key: 'stat1_value', label: 'Statistik 1 — Angka', type: 'text' },
        { key: 'stat1_label', label: 'Statistik 1 — Label', type: 'text' },
        { key: 'stat2_value', label: 'Statistik 2 — Angka', type: 'text' },
        { key: 'stat2_label', label: 'Statistik 2 — Label', type: 'text' },
        { key: 'stat3_value', label: 'Statistik 3 — Angka', type: 'text' },
        { key: 'stat3_label', label: 'Statistik 3 — Label', type: 'text' },
        { key: 'stat4_value', label: 'Statistik 4 — Angka', type: 'text' },
        { key: 'stat4_label', label: 'Statistik 4 — Label', type: 'text' },
        { key: 'stat5_value', label: 'Statistik 5 — Angka', type: 'text' },
        { key: 'stat5_label', label: 'Statistik 5 — Label', type: 'text' },
        { key: 'steps_eyebrow', label: 'Langkah — Eyebrow / Tag', type: 'text' },
        { key: 'steps_title', label: 'Langkah — Judul', type: 'text' },
        { key: 'steps_title_highlight', label: 'Langkah — Judul (merah)', type: 'text' },
        { key: 'step1_title', label: 'Langkah 1 — Judul', type: 'text' },
        { key: 'step1_desc', label: 'Langkah 1 — Deskripsi', type: 'multiline' },
        { key: 'step2_title', label: 'Langkah 2 — Judul', type: 'text' },
        { key: 'step2_desc', label: 'Langkah 2 — Deskripsi', type: 'multiline' },
        { key: 'step3_title', label: 'Langkah 3 — Judul', type: 'text' },
        { key: 'step3_desc', label: 'Langkah 3 — Deskripsi', type: 'multiline' },
      ],
      defaults: {
        stat1_value: '25',
        stat1_label: 'CLUBS',
        stat2_value: '7',
        stat2_label: 'CLASS TYPES',
        stat3_value: '85',
        stat3_label: 'CLASSES',
        stat4_value: '7,000',
        stat4_label: 'CLASSES PER MONTH',
        stat5_value: '45,000',
        stat5_label: 'MEMBERS',
        steps_eyebrow: 'Join Us',
        steps_title: 'Join Online in',
        steps_title_highlight: '3 Easy Steps.',
        step1_title: 'GET STARTED',
        step1_desc: 'Fill in your details and select your preferred club.',
        step2_title: 'SELECT CLUB ACCESS',
        step2_desc: 'Choose a Home Club or add Passport Access to all clubs.',
        step3_title: 'SELECT BRAND ACCESS',
        step3_desc: 'Confirm your personal details and make payment.',
      },
    },

    // ── Rockstar workouts ───────────────────────────────────────────────
    {
      key: 'vision',
      label: 'Rockstar Workouts',
      description: 'Bagian dengan gambar dan daftar fitur kelas.',
      fields: [
        { key: 'eyebrow', label: 'Eyebrow / Tag', type: 'text' },
        { key: 'title', label: 'Judul', type: 'text' },
        { key: 'title_highlight', label: 'Judul (merah)', type: 'text' },
        { key: 'description', label: 'Deskripsi', type: 'multiline' },
        { key: 'feature1', label: 'Fitur 1', type: 'text' },
        { key: 'feature2', label: 'Fitur 2', type: 'text' },
        { key: 'feature3', label: 'Fitur 3', type: 'text' },
        { key: 'feature4', label: 'Fitur 4', type: 'text' },
        { key: 'button', label: 'Teks Tombol', type: 'text' },
      ],
      defaults: {
        eyebrow: 'Elite Training',
        title: 'Rockstar-Worthy',
        title_highlight: 'Workouts.',
        description:
          'Our group classes totally rock! Killer workouts. Ultimate training... everything worthy of a rockstar.',
        feature1: 'Unlimited group fitness classes',
        feature2: 'Unlimited HIIT classes',
        feature3: 'Unlimited Mind and Body sessions',
        feature4: 'Unlimited Cycling experiences',
        button: 'Discover More',
      },
    },

    // ── Goals + dual CTA ────────────────────────────────────────────────
    {
      key: 'team',
      label: 'Personal Training & CTA',
      description: 'Bagian "Crush Those Goals" dan dua kotak CTA di bawahnya.',
      fields: [
        { key: 'goals_eyebrow', label: 'Goals — Eyebrow / Tag', type: 'text' },
        { key: 'goals_title', label: 'Goals — Judul', type: 'text' },
        { key: 'goals_title_highlight', label: 'Goals — Judul (merah)', type: 'text' },
        { key: 'goals_description', label: 'Goals — Deskripsi', type: 'multiline' },
        { key: 'goals_point1', label: 'Goals — Poin 1', type: 'multiline' },
        { key: 'goals_point2', label: 'Goals — Poin 2', type: 'multiline' },
        { key: 'goals_button', label: 'Goals — Teks Tombol', type: 'text' },
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
        goals_eyebrow: 'Personal Training',
        goals_title: 'Crush Those',
        goals_title_highlight: 'Goals.',
        goals_description:
          'Ready for a fresh twist to your routine? Make it personal with our StarMakers Personal Training Packages.',
        goals_point1:
          'Your road to greatness includes a personalized plan tailored to your goals, strengths and style.',
        goals_point2:
          'Get motivating feedback and supercharged, supervised workouts for maximum results and total fun.',
        goals_button: 'Discover More',
        trial_eyebrow: 'Trial Access',
        trial_title: 'Try Us For',
        trial_title_highlight: 'Free.',
        trial_description: 'Get an exclusive FREE TRIAL experience. No strings attached.',
        trial_button: 'Try Now',
        corp_eyebrow: 'B2B Solutions',
        corp_title: 'Corporate',
        corp_title_highlight: 'Deal.',
        corp_description:
          "Elevate your team's performance with our tailored corporate memberships.",
        corp_button: 'Check Out Now',
      },
    },
  ],
};
