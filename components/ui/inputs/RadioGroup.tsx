import { FC } from "react";

export interface IRadioOption {
    id: string;
    title: string;
    checked?: boolean;
}

interface Props {
    label: string;
    subLabel?: string;
    legend?: string;
    name: string;
    options: IRadioOption[];
}

export const RadioGroup: FC<Props> = ({ label, subLabel, legend, name, options }) => {
    return (
        <div>
            <label className="text-sm font-medium text-gray-900">{label}</label>
            <p className="text-xs leading-5 text-gray-500">{subLabel}</p>
            <fieldset className="mt-4">
                <legend className="sr-only">{legend}</legend>
                <div className="space-y-4">
                    {options.map((option: IRadioOption) => (
                        <div key={option.id} className="flex items-center">
                            <input
                                id={option.id}
                                name={name}
                                type="radio"
                                defaultChecked={option.checked}
                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label htmlFor={option.id} className="ml-3 block text-sm font-medium text-gray-700">
                                {option.title}
                            </label>
                        </div>
                    ))}
                </div>
            </fieldset>
        </div>
    )
}