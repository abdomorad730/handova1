// src/components/ThemeToggle.jsx

import { useEffect, useState } from 'react';
import { Button } from 'flowbite-react';
import { FaMoon as Moon, FaSun as Sun } from 'react-icons/fa'; // للتبديل بين الأيقونات (تأكد من تثبيت react-icons)

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(
    () =>
      localStorage.getItem('theme') === 'dark' ||
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <Button
      onClick={() => setDarkMode((prev) => !prev)}
      color="gray"
      pill
      className="flex items-center gap-2"
    >
      {darkMode ? <Sun size={18} /> : <Moon size={18} />}
      {darkMode ? 'Light Mode' : 'Dark Mode'}
    </Button>
  );
};

export default ThemeToggle;
