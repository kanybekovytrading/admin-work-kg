import FormControl from '@mui/material/FormControl'
import { styled } from '@mui/material/styles'
import { forwardRef, ReactElement, Ref, useId } from 'react'
import { useTranslation } from 'react-i18next'
import ReactSelect, {
	GroupBase,
	PropsValue,
	SelectInstance,
	StylesConfig,
	Props,
} from 'react-select'

import { RequiredSymbol } from '#shared/ui/required-symbol/RequiredSymbol'

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

const Select = <
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

			<ReactSelect
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
				{...props}
				noOptionsMessage={() => t('notFound')}
				components={{ IndicatorSeparator: null, ...props.components }}
			/>
		</FormControl>
	)
}

// @ts-expect-error
export default forwardRef(Select) as SelectFunction

Select.displayName = 'Select'

export const SELECT_STYLES: StylesConfig = {
	control: (provided) => ({
		...provided,
		borderRadius: '8px',
		borderColor: '#E3E8EC',
		height: '40px',
		cursor: 'pointer',
	}),

	menu: (provided) => ({
		...provided,
		backgroundColor: '#fff',
		zIndex: 9999,
	}),

	menuPortal: (provided) => ({
		...provided,
		zIndex: 9999,
	}),

	option: (provided, state) => ({
		...provided,
		backgroundColor: state.isSelected
			? '#E6F0FF'
			: state.isFocused
				? '#F5F7FA'
				: '#fff',
		color: '#1F2328',
		opacity: state.isDisabled ? 0.6 : 1,
		cursor: state.isDisabled ? 'not-allowed' : 'pointer',
	}),

	placeholder: (provided) => ({
		...provided,
		color: '#1F2328',
		fontSize: '14px',
	}),
}

const Label = styled('label')`
	font-size: 12px;
	font-weight: 700;
	margin-bottom: 5px;
	display: inline-block;
`
