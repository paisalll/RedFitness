import { useState, useEffect } from 'react';
import { supabase } from 'src/utils/supabase';

export function useBanner(pageKey: string): string | undefined {
  const [imageUrl, setImageUrl] = useState<string | undefined>();

  useEffect(() => {
    supabase
      .from('banners')
      .select('image_url')
      .eq('page_key', pageKey)
      .single()
      .then(({ data }) => {
        if (data?.image_url) setImageUrl(data.image_url);
      });
  }, [pageKey]);

  return imageUrl;
}
