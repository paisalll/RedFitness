// ----------------------------------------------------------------------
// Content management — type definitions
//
// A page is split into sections; each section has a flat set of editable
// text fields. The schema below is the single source of truth used by both
// the public sections (default copy + rendering) and the admin editor
// (form generation). DB rows in `page_content` only override these values.
// ----------------------------------------------------------------------

export type FieldType = 'text' | 'multiline';

export interface FieldDef {
  /** Stored key inside the section's JSON content. */
  key: string;
  /** Human label shown in the admin editor. */
  label: string;
  /** Input style in the admin editor. */
  type: FieldType;
  /** Optional helper text shown under the input. */
  hint?: string;
}

export interface SectionDef {
  /** Stored `section_key` (unique within a page). */
  key: string;
  /** Human label shown in the admin editor. */
  label: string;
  /** Short description shown under the section title in the editor. */
  description?: string;
  fields: FieldDef[];
  /** Original hardcoded copy — used when no DB row exists yet. */
  defaults: SectionContent;
}

export interface PageContentSchema {
  /** Stored `page_key` — also the route used by `useBanner`. */
  pageKey: string;
  /** Human label shown in the admin editor. */
  label: string;
  sections: SectionDef[];
}

/** A section's content: a flat map of field key -> string value. */
export type SectionContent = Record<string, string>;
