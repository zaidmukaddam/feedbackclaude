import * as Select from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons';

type Option = {
  value: string;
  label: string;
};

type SelectProviderProps = {
  options: Option[];
  placeholder: string;
  label: string;
  value: string;
  onValueChange: (value: string) => void;
};

export default function SelectProvider({
  options,
  placeholder,
  label,
  value,
  onValueChange,
}: SelectProviderProps) {
  return (
    <Select.Root onValueChange={onValueChange} value={value}>
      <Select.Trigger className={`flex justify-between items-center border border-gray-300 rounded-md p-2 bg-white shadow-sm focus:ring-2 focus:ring-[#CB785C]`}>
        <Select.Value placeholder={placeholder} />
        <Select.Icon>
          <ChevronDownIcon className="h-5 w-5 text-gray-700" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="z-10 mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          <Select.ScrollUpButton />
          <Select.Viewport>
            <Select.Group>
              <Select.Label className="px-4 py-2 text-sm text-gray-700">{label}</Select.Label>
              {options.map((option) => (
                <Select.Item key={option.value} value={option.value} className="flex flex-row gap-3 items-center px-4 py-2 text-sm text-gray-900 cursor-default select-none hover:bg-gray-100 focus:bg-[#CB785C] focus:text-white focus:outline-none">
                  <Select.ItemText>{option.label}</Select.ItemText>
                  <Select.ItemIndicator className="inset-y-0 left-0 flex items-center pl-3">
                    <CheckIcon className="h-5 w-5" />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
