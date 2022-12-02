import React, {
	useState,
	ChangeEvent,
	KeyboardEvent,
	FocusEvent,
	forwardRef,
} from 'react';
import styles from './Input.module.css';

interface IInput {
	type: string;
	label?: string;
	id: string;
	value?: string;
	placeholder: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
	onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
	onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
	onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
	onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
	errorText?: string;
	helperText?: string;
	disabled?: boolean | false;
	readonly?: boolean | false;
	maxlength?: number;
	required?: boolean | false;
	tabindex?: number;
	style?: React.CSSProperties;
	variant?: 'flushed';
}

export const Input = forwardRef<HTMLInputElement, IInput>((props, ref) => {
	const {
		type,
		label,
		id,
		value,
		placeholder,
		onChange,
		onKeyDown,
		onKeyUp,
		onKeyPress,
		onBlur,
		onFocus,
		errorText,
		helperText,
		disabled,
		readonly,
		maxlength,
		required,
		tabindex,
		style,
		variant,
	} = props;

	const [showPassword, setShowPassword] = useState<boolean>(false);

	const clickPassword = () => {
		setShowPassword(!showPassword);
	};

	const getContainerClassName = () => {
		let className = styles.input_frame;

		if (variant === 'flushed') {
			className = styles.input_container_flushed;
		}

		return className;
	};

	const getInputClassName = () => {
		let className = styles.input_content;

		if (variant === 'flushed') {
			className = styles.input_flushed;
		}

		if (disabled) {
			className += ` ${styles.input_content_disabled}`;
		}

		if (errorText) {
			className += ` ${styles.input_content_error}`;
		}

		if (type === 'password' && !showPassword) {
			className += ` ${styles.input_content_password}`;
		}

		if (type === 'password') {
			className += ` ${styles.password_padding}`;
		}

		return className;
	};

	const getLabelClassName = () => {
		let className = styles.input_label;

		if (variant === 'flushed') {
			className = styles.input_label_flushed;
		}

		if (disabled) {
			className += ` ${styles.input_label_disabled}`;
		}

		if (errorText) {
			className += ` ${styles.input_label_error}`;
		}

		return className;
	};

	const passwordEyeIcon = showPassword
		? '/images/eye-password-off.svg'
		: '/images/eye-password.svg';
	const inputType = type === 'password' && showPassword ? 'text' : type;

	const showHelperText = helperText && !errorText;
	const enableOnChange = !disabled && !readonly && !!onChange;
	const enableOnKeyDown = !disabled && !readonly && !!onKeyDown;
	const enableOnKeyUp = !disabled && !readonly && !!onKeyUp;
	const enableOnKeyPress = !disabled && !readonly && !!onKeyPress;
	const enableOnBlur = !disabled && !readonly && !!onBlur;
	const enableOnFocus = !disabled && !readonly && !!onFocus;
	const isReadOnly = (value && !onChange) || readonly;

	return (
		<div className={getContainerClassName()} data-cy={`input-${id}`}>
			{showHelperText && (
				<small className={styles.input_helper_text}>{helperText}</small>
			)}
			{errorText && (
				<div className={styles.input_error}>
					<img
						src='/images/input-error.svg'
						alt='error'
						width={10}
						height={10}
					/>
					<span className={styles.input_error_text}>{errorText}</span>
				</div>
			)}

			{type === 'password' && (
				<span className={styles.icon_eye_frame} data-cy='ic-show-password'>
					<img
						src={passwordEyeIcon}
						alt='hide'
						onClick={clickPassword}
						width={17}
						height={12}
						className={styles.icon_eye_password}
					/>
				</span>
			)}

			<input
				type={inputType}
				className={getInputClassName()}
				onChange={
					enableOnChange
						? (event: ChangeEvent<HTMLInputElement>) => onChange(event)
						: undefined
				}
				onKeyDown={
					enableOnKeyDown
						? (event: KeyboardEvent<HTMLInputElement>) => onKeyDown(event)
						: undefined
				}
				onKeyUp={
					enableOnKeyUp
						? (event: KeyboardEvent<HTMLInputElement>) => onKeyUp(event)
						: undefined
				}
				onKeyPress={
					enableOnKeyPress
						? (event: KeyboardEvent<HTMLInputElement>) => onKeyPress(event)
						: undefined
				}
				onBlur={
					enableOnBlur
						? (event: FocusEvent<HTMLInputElement>) => onBlur(event)
						: undefined
				}
				onFocus={
					enableOnFocus
						? (event: FocusEvent<HTMLInputElement>) => onFocus(event)
						: undefined
				}
				id={id}
				name={id}
				placeholder={placeholder}
				maxLength={maxlength}
				required={required}
				tabIndex={tabindex}
				style={style}
				value={value}
				readOnly={isReadOnly}
				ref={ref}
				autoComplete="off"
			/>

			<label htmlFor={id} className={getLabelClassName()}>
				{label}
			</label>
		</div>
	);
});

Input.displayName = 'Input';
