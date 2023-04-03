import React, { useState } from 'react';

import Wrapper from './components/Wrapper';
import Screen from './components/Screen';
import ButtonBox from './components/ButtonBox';

const btnValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '+', '-', '*', '/', '=', 'C'];

const toLocaleString = (num) =>
	String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1 ');

const removeSpaces = (num) => num.toString().replace(/\s/g, '');

const math = (a, b, sign) =>
	sign === '+'
		? a + b
		: sign === '-'
		? a - b
		: sign === '*'
		? a * b
		: Math.floor(a / b);

const zeroDivisionError = "Can't divide with 0";

const Calculator = () => {
	let [calc, setCalc] = useState({
		sign: '',
		num: '',
		res: '',
		display: '',
	});
	//Num click handler
	const numClickHandler = (e) => {
		e.preventDefault();
		const value = e.target.innerHTML;
		if (removeSpaces(calc.num).length < 16) {
			setCalc({
				...calc,
				num: calc.num + value,
				res: !calc.sign ? 0 : calc.res,
				display: calc.display + value,
			});
		}
	};

	//Sign click handler
	const signClickHandler = (e) => {
		e.preventDefault();
		const value = e.target.innerHTML;
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
			num: '',
			display: calc.display + value,
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
				display:
					calc.num === '0' && calc.sign === '/'
						? zeroDivisionError
						: toLocaleString(
								math(
									Number(removeSpaces(calc.res)),
									Number(removeSpaces(calc.num)),
									calc.sign,
								),
						  ),
			});
		}
	};

	//Reset click handler
	const resetClickHandler = () => {
		setCalc({
			...calc,
			sign: '',
			num: '',
			res: '',
			display: '',
		});
	};
	//Button click handler
	const buttonClickHandler = (e, btn) => {
		btn === 'C' || calc.display === zeroDivisionError
			? resetClickHandler()
			: btn === '='
			? equalsClickHandler()
			: btn === '/' || btn === '*' || btn === '-' || btn === '+'
			? signClickHandler(e)
			: numClickHandler(e);
	};

	return (
		<Wrapper>
			<Screen value={calc.display} />
			<ButtonBox>
				{btnValues.map((btn, i) => {
					return (
						<button
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
						>
							{btn}
						</button>
					);
				})}
			</ButtonBox>
		</Wrapper>
	);
};

export default Calculator;
