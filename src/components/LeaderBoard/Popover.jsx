import { useState } from "react";

/*
{
    component: icon
    value: text
    onSelect: function
}
*/
const Popover = ({ elems }) => {
	const [selected, setSelected] = useState("ever");
	const [selectorOpen, setSelectorOpen] = useState(false);

	const Icon = ({ name }) => {
		const CurrIcon = elems.filter((e) => e.value == name)[0].component;

		return <CurrIcon />;
	};

	const select = (value) => {
		setSelected(value);
        setSelectorOpen(false);
		elems.filter((e) => e.value == value)[0].onSelect();
	};
	return (
		<div className="popover-wrapper">
			<button
				className="selector"
				onClick={() => setSelectorOpen(!selectorOpen)}
			>
				<Icon name={selected} />
			</button>
			<div className={"options " + (selectorOpen ? "active" : "")}>
				{elems
					.filter((e) => e.value !== selected)
					.map((e, i) => {
						return (
							<button
								className="option"
								key={i}
								onClick={() => select(e.value)}
							>
								<Icon name={e.value} />
							</button>
						);
					})}
			</div>
		</div>
	);
};

export default Popover;
