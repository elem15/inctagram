import {FieldValues, useController, UseControllerProps} from 'react-hook-form'
import {SelectCustom, SelectProps} from "@/components/ui";

// @ts-ignore


export type ControlledCheckboxProps<TFieldValues extends FieldValues> =
    UseControllerProps<TFieldValues> & Omit<SelectProps, 'onChange' | 'value' >
export const ControlledSelect = <TFieldValues extends FieldValues>(
    {
        name,
        rules,
        shouldUnregister,
        control,
        defaultValue,
        options,
        ...selectProps
    }
    : ControlledCheckboxProps<TFieldValues>
) => {
    const {
        field: {onChange, value},
    } = useController({
        name,
        rules,
        shouldUnregister,
        control,
        defaultValue,
    })

    return <SelectCustom
        options={options}
        onValueChange={onChange}
        value={value}
        defaultValue={defaultValue}
        {...selectProps}
    />
}
