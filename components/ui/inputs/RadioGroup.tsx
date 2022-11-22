import { Dispatch, FC, SetStateAction } from "react";
import { RadioGroup as HeroIconsRadioGroup } from '@headlessui/react'

export interface IRadioOption {
    id: string|number;
    name: string;
    description?: string;
}

interface Props {
    label: string;
    subLabel?: string;
    options: IRadioOption[];
    selected: IRadioOption;
    setSelected: Dispatch<SetStateAction<IRadioOption>>;
}

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ')
}

export const RadioGroup: FC<Props> = ({ label, subLabel, options, selected, setSelected }) => {
    return (
        <div>
            <label className="text-sm font-medium text-gray-900">{label}</label>
            <p className="text-xs leading-5 text-gray-500">{subLabel}</p>
            <HeroIconsRadioGroup value={selected} onChange={setSelected} className="mt-1">
                <HeroIconsRadioGroup.Label className="sr-only">{label}</HeroIconsRadioGroup.Label>
                <div className="-space-x-px bg-white grid sm:grid-cols-2 grid-cols-1">
                    {options.map((option, index) => (
                    <HeroIconsRadioGroup.Option
                        key={option.name}
                        value={option}
                        className={({ checked }) =>
                            classNames(
                                index === 0 ? 'rounded-l-md' : '',
                                index === options.length - 1 ? 'rounded-r-md' : '',
                                checked ? 'bg-indigo-50 border-indigo-200 z-10' : 'border-gray-200',
                                'relative border p-4 flex cursor-pointer focus:outline-none'
                            )
                        }
                    >
                        {({ active, checked }) => (
                        <>
                            <span
                            className={classNames(
                                checked ? 'bg-indigo-600 border-transparent' : 'bg-white border-gray-300',
                                active ? 'ring-2 ring-offset-2 ring-indigo-500' : '',
                                'mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded-full border flex items-center justify-center'
                            )}
                            aria-hidden="true"
                            >
                            <span className="rounded-full bg-white w-1.5 h-1.5" />
                            </span>
                            <span className="ml-3 flex flex-col">
                            <HeroIconsRadioGroup.Label
                                as="span"
                                className={classNames(checked ? 'text-indigo-900' : 'text-gray-900', 'block text-sm font-medium')}
                            >
                                {option.name}
                            </HeroIconsRadioGroup.Label>
                            <HeroIconsRadioGroup.Description
                                as="span"
                                className={classNames(checked ? 'text-indigo-700' : 'text-gray-500', 'block text-sm')}
                            >
                                {option.description}
                            </HeroIconsRadioGroup.Description>
                            </span>
                        </>
                        )}
                    </HeroIconsRadioGroup.Option>
                    ))}
                </div>
            </HeroIconsRadioGroup>
        </div>
    )
}
