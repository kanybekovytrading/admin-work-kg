import FormControl from '@mui/material/FormControl'
import { styled } from '@mui/material/styles'
import { forwardRef, ReactElement, Ref, useId } from 'react'
import { useTranslation } from 'react-i18next'
import {
	GroupBase,
	PropsValue,
	SelectInstance,
	StylesConfig,
	Props,
} from 'react-select'
import RSCreatableSelect from 'react-select/creatable'

import { RequiredSymbol } from '#shared/ui/required-symbol/RequiredSymbol'
import { SELECT_STYLES } from './Select'

type SelectFunction = <
	T = unknown,
	R extends boolean = false,
	E extends GroupBase<T> = GroupBase<T>,
>(
	p: SelectProps<T, R, E> & { ref?: Ref<SelectInstance<T, R, E>> },
) => ReactElement

type SelectProps<
	Option = unknown,
	IsMulti extends boolean = false,
	Group extends GroupBase<Option> = GroupBase<Option>,
> = Omit<Props<Option, IsMulti, Group>, 'onChange'> & {
	label?: string
	width?: string

	onChange: IsMulti extends true
		? (newValue: Option[]) => void
		: (newValue: Option) => void
}

const CreatableSelect = <
	T = unknown,
	R extends boolean = false,
	E extends GroupBase<T> = GroupBase<T>,
>(
	{
		width,
		placeholder = '',
		label,
		required,
		value,
		styles,
		...props
	}: SelectProps<T, R, E>,
	ref?: SelectInstance<T, R, E>,
) => {
	const id = useId()
	const { t } = useTranslation('common')

	return (
		<FormControl sx={{ width }}>
			{label && (
				<Label htmlFor={id}>
					{label} {required && <RequiredSymbol>*</RequiredSymbol>}
				</Label>
			)}

			<RSCreatableSelect
				// @ts-expect-error
				ref={ref}
				styles={
					{ ...SELECT_STYLES, ...styles } as unknown as StylesConfig<
						T,
						R,
						E
					>
				}
				instanceId={id}
				placeholder={placeholder}
				id={id}
				value={(value || '') as PropsValue<T>}
				formatCreateLabel={(option) => option}
				{...props}
				noOptionsMessage={() => t('notFound')}
				components={{ IndicatorSeparator: null, ...props.components }}
			/>
		</FormControl>
	)
}

// @ts-expect-error
export default forwardRef(CreatableSelect) as SelectFunction

CreatableSelect.displayName = 'Select'

const Label = styled('label')`
	font-size: 12px;
	font-weight: 700;
	margin-bottom: 5px;
	display: inline-block;
`
