import React, { SyntheticEvent } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { ValueExtractorFlags } from '@dhruv-techapps/acf-common';

const FLAGS = [
  {
    value: 'g',
    label: () => (
      <>
        <b className='text-danger'>g</b>lobal
      </>
    ),
    sub: "Don't return after first match",
  },
  {
    value: 'm',
    label: () => (
      <>
        <b className='text-danger'>m</b>ulti line
      </>
    ),
    sub: '^ and $ match start/end of line',
  },
  {
    value: 'i',
    label: () => (
      <>
        <b className='text-danger'>i</b>nsensitive
      </>
    ),
    sub: 'Case insensitive match',
  },
  {
    value: 'x',
    label: () => (
      <>
        e<b className='text-danger'>x</b>tended
      </>
    ),
    sub: 'Ignore whitespace',
  },
  {
    value: 's',
    label: () => (
      <>
        <b className='text-danger'>s</b>ingle line
      </>
    ),
    sub: 'Dot matches newline',
  },
];

type Props = {
  valueExtractor: string;
  valueExtractorFlags: ValueExtractorFlags;
  onUpdate: (valueExtractorFlags: ValueExtractorFlags) => void;
};

type Flags = {
  [index: string]: boolean;
};

function AddonValueExtractorFlags({ valueExtractor, valueExtractorFlags, onUpdate }: Props) {
  const flags: Flags = valueExtractorFlags.split('').reduce((a, flag) => ({ ...a, [flag]: true }), {});

  const title = (label?: string) => {
    const flagTitle = Object.entries(flags)
      .filter((flag) => flag[1])
      .reduce((a, [flag]) => a + flag, '');
    return flagTitle || label;
  };

  const onFlagsClick = (e: React.MouseEvent<HTMLElement>) => {
    const flagElement = e.currentTarget;
    const {
      dataset: { flag },
      classList,
    } = flagElement;

    if (flag) {
      flags[flag] = !classList.contains('active');
      //TODO onUpdate(title());
    }
  };

  if (!valueExtractor || /^@\w+(-\w+)?$/.test(valueExtractor)) {
    return null;
  }

  return (
    <DropdownButton variant='outline-secondary' title={title('flags')} id='input-group-dropdown-2' align='end'>
      {FLAGS.map(({ value, label, sub }) => (
        <Dropdown.Item href='#' key={value} active={flags[value]} onClick={onFlagsClick} data-flag={value}>
          {label()} <br />
          <small className='fw-light'>{sub}</small>
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
}
AddonValueExtractorFlags.defaultProps = {
  valueExtractorFlags: '',
  valueExtractor: null,
};
AddonValueExtractorFlags.propTypes = {
  valueExtractorFlags: PropTypes.string,
  valueExtractor: PropTypes.string,
  onUpdate: PropTypes.func.isRequired,
};
export { AddonValueExtractorFlags };
