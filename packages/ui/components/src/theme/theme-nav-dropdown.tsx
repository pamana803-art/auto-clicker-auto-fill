import { getStoredTheme, ThemeContext, TTheme } from '@dhruv-techapps/ui-context';
import { ReactComponent as CircleHalf } from 'bootstrap-icons/icons/circle-half.svg';
import { ReactComponent as Moon } from 'bootstrap-icons/icons/moon-stars-fill.svg';
import { ReactComponent as Sun } from 'bootstrap-icons/icons/sun-fill.svg';
import { useContext, useState } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { DropDirection } from 'react-bootstrap/esm/DropdownContext';

type TThemeDropdownProps = {
  drop?: DropDirection;
};

export const ThemeNavDropdown = (props: TThemeDropdownProps) => {
  const { drop } = props;
  const [theme, setTheme] = useState(getStoredTheme());
  const { updateTheme } = useContext(ThemeContext);

  const onClickTheme = (theme: TTheme | null) => {
    setTheme(theme);
    updateTheme(theme);
  };

  const getIcon = () => {
    if (theme === 'light') {
      return <Sun />;
    }
    if (theme === 'dark') {
      return <Moon />;
    }
    return <CircleHalf />;
  };

  return (
    <NavDropdown title={getIcon()} drop={drop}>
      <NavDropdown.Item active={theme === 'light'} className='d-flex align-items-center gap-2' onClick={() => onClickTheme('light')}>
        <Sun /> Light
      </NavDropdown.Item>
      <NavDropdown.Item active={theme === 'dark'} className='d-flex align-items-center gap-2' onClick={() => onClickTheme('dark')}>
        <Moon /> Dark
      </NavDropdown.Item>
      <NavDropdown.Item active={theme === null} className='d-flex align-items-center gap-2' onClick={() => onClickTheme(null)}>
        <CircleHalf /> Auto
      </NavDropdown.Item>
    </NavDropdown>
  );
};
