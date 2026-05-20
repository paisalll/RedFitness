import { useState, useEffect } from 'react';
import { supabase } from 'src/utils/supabase';
import { getSectionDefaults, SectionContent } from 'src/content';

// ----------------------------------------------------------------------
// useSectionContent — reads editable copy for one page section.
//
// Returns the section's default copy immediately, then overrides it with
// the matching row from the `page_content` table once it loads. If no row
// exists (or the fetch fails) the defaults are kept, so the page never
// renders empty. Mirrors the pattern of `useBanner`.
// ----------------------------------------------------------------------

export function useSectionContent(pageKey: string, sectionKey: string): SectionContent {
  const [content, setContent] = useState<SectionContent>(() =>
    getSectionDefaults(pageKey, sectionKey)
  );

  useEffect(() => {
    let active = true;
    const defaults = getSectionDefaults(pageKey, sectionKey);

    supabase
      .from('page_content')
      .select('content')
      .eq('page_key', pageKey)
      .eq('section_key', sectionKey)
      .maybeSingle()
      .then(({ data }) => {
        if (!active) return;
        setContent({ ...defaults, ...((data?.content as SectionContent) || {}) });
      });

    return () => {
      active = false;
    };
  }, [pageKey, sectionKey]);

  return content;
}
