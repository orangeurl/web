'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function DarkModeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="relative overflow-hidden group"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all duration-500 ease-in-out dark:rotate-180 dark:scale-0 group-active:rotate-90" />
      <Moon className="absolute h-4 w-4 rotate-180 scale-0 transition-all duration-500 ease-in-out dark:rotate-0 dark:scale-100 group-active:dark:rotate-[-90deg]" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
} 