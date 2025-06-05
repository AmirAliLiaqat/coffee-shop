
'use client';

import { useState, useEffect, type ReactElement } from 'react';
import { Toaster } from '@/components/ui/toaster';

export function ClientOnlyToaster(): ReactElement | null {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <Toaster />;
}
