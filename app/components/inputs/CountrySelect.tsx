'use client';

import Select from 'react-select';
import { useCountries } from '../../hooks';

export type CountrySelectedValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

interface CountrySelectProps {
  value?: CountrySelectedValue;
  onChange: (value: CountrySelectedValue) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
  const { getAll } = useCountries();
  return (
    <div>
      <Select
        placeholder='Anywhere'
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as CountrySelectedValue)}
        formatOptionLabel={(option: any) => (
          <div className='flex flex-row items-center gap-3'>
            <div>{option.flag}</div>
            <div>
              {option.label},{' '}
              <span className='ml-1 text-neutral-400'>{option.region}</span>
            </div>
          </div>
        )}
        classNames={{
          control: () => 'p-3 border-2',
          input: () => 'text-lg',
          option: () => 'text-lg',
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: 'black',
            primary25: '#ffe4e6',
          },
        })}
        isClearable
      />
    </div>
  );
};

export default CountrySelect;
