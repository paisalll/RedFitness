import { membershipContent } from './membership';
import { classesContent } from './classes';
import { contactContent } from './contact';
import { highlightsContent } from './highlights';
import { careerContent } from './career';
import { timetableContent } from './timetable';
import { clubsContent } from './clubs';
import { pilatesContent } from './pilates';
import { redSeitaiContent } from './red-seitai';
import { PageContentSchema, SectionContent, SectionDef } from './types';

// ----------------------------------------------------------------------
// Content registry — add a page's schema here to make it editable.
// ----------------------------------------------------------------------

export const CONTENT_SCHEMAS: PageContentSchema[] = [
  membershipContent,
  classesContent,
  contactContent,
  highlightsContent,
  careerContent,
  timetableContent,
  clubsContent,
  pilatesContent,
  redSeitaiContent,
];

export function getPageSchema(pageKey: string): PageContentSchema | undefined {
  return CONTENT_SCHEMAS.find((p) => p.pageKey === pageKey);
}

export function getSectionSchema(
  pageKey: string,
  sectionKey: string
): SectionDef | undefined {
  return getPageSchema(pageKey)?.sections.find((s) => s.key === sectionKey);
}

/** Fresh copy of a section's default values (safe to mutate). */
export function getSectionDefaults(
  pageKey: string,
  sectionKey: string
): SectionContent {
  return { ...(getSectionSchema(pageKey, sectionKey)?.defaults ?? {}) };
}

export * from './types';
