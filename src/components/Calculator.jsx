import React, { useState } from 'react';

import Wrapper from './components/Wrapper';
import Screen from './components/Screen';
import ButtonBox from './components/ButtonBox';
import Button from './components/Button';

const btnValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '+', '-', '*', '/', '=', 'C'];

const toLocaleString = (num) =>
	String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1 ');

const removeSpaces = (num) => num.toString().replace(/\s/g, '');

const math = (a, b, sign) =>
	sign === '+' ? a + b : sign === '-' ? a - b : sign === 'X' ? a * b : a / b;

const zeroDivisionError = "Can't divide with 0";

const Calculator = () => {
	let [calc, setCalc] = useState({
		sign: '',
		num: '',
		res: '',
	});
	//Num click handler
	const numClickHandler = (e) => {
		e.preventDefault();
		const value = e.target.innerHTML;
		if (removeSpaces(calc.num).length < 16) {
			setCalc({
				...calc,
				num:
					removeSpaces(calc.num) % 1 === 0 && !calc.num.toString().includes('.')
						? toLocaleString(Number(removeSpaces(calc.num + value)))
						: toLocaleString(calc.num + value),
				res: !calc.sign ? 0 : calc.res,
			});
		}
	};
	//Comma click handler
	const comaClickHandler = (e) => {
		e.preventDefault();
		const value = e.target.innerHTML;

		setCalc({
			...calc,
			num: !calc.num.toString().includes('.') ? calc.num + value : calc.num,
		});
	};
	//Sign click handler
	const signClickHandler = (e) => {
		setCalc({
			...calc,
			sign: e.target.innerHTML,
			res: !calc.num
				? calc.res
				: !calc.res
				? calc.num
				: toLocaleString(
						math(
							Number(removeSpaces(calc.res)),
							Number(removeSpaces(calc.num)),
							calc.sign,
						),
				  ),
			num: 0,
		});
	};
	//Equals click handler
	const equalsClickHandler = () => {
		if (calc.sign && calc.num) {
			setCalc({
				...calc,
				res:
					calc.num === '0' && calc.sign === '/'
						? zeroDivisionError
						: toLocaleString(
								math(
									Number(removeSpaces(calc.res)),
									Number(removeSpaces(calc.num)),
									calc.sign,
								),
						  ),
				sign: '',
				num: 0,
			});
		}
	};
	//Invert click handler
	const invertClickHandler = () => {
		setCalc({
			...calc,
			num: calc.num ? toLocaleString(removeSpaces(calc.num) * -1) : 0,
			res: calc.res ? toLocaleString(removeSpaces(calc.res) * -1) : 0,
			sign: '',
		});
	};

	//Invert click handler
	const percentClickHandler = () => {
		let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
		let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;
		setCalc({
			...calc,
			num: (num /= Math.pow(100, 1)),
			res: (res /= Math.pow(100, 1)),
			sign: '',
		});
	};
	//Reset click handler
	const resetClickHandler = () => {
		setCalc({
			...calc,
			sign: '',
			num: '',
			res: '',
		});
	};
	//Button click handler
	const buttonClickHandler = (e, btn) => {
		btn === 'C' || calc.res === zeroDivisionError
			? resetClickHandler()
			: btn === '+-'
			? invertClickHandler()
			: btn === '%'
			? percentClickHandler()
			: btn === '='
			? equalsClickHandler()
			: btn === '/' || btn === 'X' || btn === '-' || btn === '+'
			? signClickHandler(e)
			: btn === '.'
			? comaClickHandler(e)
			: numClickHandler(e);
	};

	return (
		<Wrapper>
			<Screen value={calc.num ? calc.num : calc.res} />
			<ButtonBox>
				{btnValues.map((btn, i) => {
					return (
						<Button
							key={i}
                          className={
								btn === '='
									? `eq`
									: btn === 'C'
									? `clear`
									: btn === '+'
									? `op-add`
									: btn === '-'
									? `op-sub`
									: btn === '/'
									? `op-div`
									: btn === '*'
									? `op-mul`
									: `digit-${btn}`
							}
							value={btn}
							onClick={(e) => buttonClickHandler(e, btn)}
						/>
					);
				})}
			</ButtonBox>
		</Wrapper>
	);
};

export default Calculator;
