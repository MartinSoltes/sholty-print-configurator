import React from 'react'
import OptionButton from '../OptionButton';

interface OptionButtonGroupProps {
  options: {
    label: string;
    value: string;
  }[];
  type: "radio" | "checkbox";
  selectedValue: string;
  onChange: (value: string) => void;
  className?: string;
}

const OptionButtonGroup: React.FC<OptionButtonGroupProps> = ({
  options,
  type,
  selectedValue,
  onChange,
  className
}) => {
    return (
        <div className={`grid grid-cols-2 gap-4 ${className}`}>
            {options.map((option) => (
                <OptionButton
                    key={option.value}
                    option={option}
                    type={type}
                    checked={selectedValue === option.value}
                    onChange={onChange}
                />
            ))}
        </div>
    )
}

export default OptionButtonGroup