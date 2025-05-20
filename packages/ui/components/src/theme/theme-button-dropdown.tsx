import { getStoredTheme, ThemeContext, TTheme } from '@dhruv-techapps/ui-context';
import { ReactComponent as CircleHalf } from 'bootstrap-icons/icons/circle-half.svg';
import { ReactComponent as Moon } from 'bootstrap-icons/icons/moon-stars-fill.svg';
import { ReactComponent as Sun } from 'bootstrap-icons/icons/sun-fill.svg';
import { useContext, useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { DropDirection } from 'react-bootstrap/esm/DropdownContext';

type TThemeDropdownProps = {
  drop?: DropDirection;
};

export const ThemeButtonDropdown = (props: TThemeDropdownProps) => {
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
    <DropdownButton title={getIcon()} drop={drop}>
      <Dropdown.Item active={theme === 'light'} onClick={() => onClickTheme('light')}>
        <Sun /> Light
      </Dropdown.Item>
      <Dropdown.Item active={theme === 'dark'} onClick={() => onClickTheme('dark')}>
        <Moon /> Dark
      </Dropdown.Item>
      <Dropdown.Item active={theme === null} onClick={() => onClickTheme(null)}>
        <CircleHalf /> Auto
      </Dropdown.Item>
    </DropdownButton>
  );
};
