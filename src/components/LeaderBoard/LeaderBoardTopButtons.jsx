import { useState } from "react";

/*
{
    component: icon
    value: text
    onSelect: function
}
*/
const Popover = ({ timeOptions, participantOptions }) => {
	const [selectedTime, setSelectedTime] = useState("ever");
	const [selectedParticipants, setSelectedParticipants] = useState("own");
	const [selectorOpen, setSelectorOpen] = useState(false);

	const Icon = ({ name }) => {
		let elem;
		elem = timeOptions.find((e) => e.value == name);
		if (!elem) elem = participantOptions.find((e) => e.value == name);
		const CurrIcon = elem.component;

		return <CurrIcon />;
	};

	const selectTime = (value) => {
		setSelectedTime(value);
		setSelectorOpen(false);
		timeOptions.filter((e) => e.value == value)[0].onSelect();
	};

	const selectParticipant = (value) => {
		setSelectedParticipants(value);
		participantOptions.filter((e) => e.value == value)[0].onSelect();
	};
	return (
		<>
			<div className="lb-top-buttons">
				<div className="pill-buttons">
					{participantOptions.map((e, i) => {
						return (
							<button
								key={i}
								className={
									e.value +
									(selectedParticipants === e.value
										? " active"
										: "")
								}
								onClick={() => selectParticipant(e.value)}
							>
								<Icon name={e.value} />
								{selectedParticipants === e.value ? (
									<span>{" " || e.description}</span>
								) : (
									""
								)}
							</button>
						);
					})}
				</div>

				<div className="lb-top-selector">
					<button
						className="selector pill-button active"
						onClick={() => setSelectorOpen(!selectorOpen)}
					>
						<Icon name={selectedTime} />
					</button>
					<div
						className={"options " + (selectorOpen ? "active" : "")}
					>
						{timeOptions
							.filter((e) => e.value !== selectedTime)
							.map((e, i) => {
								return (
									<button
										className="option pill-button"
										key={i}
										onClick={() => selectTime(e.value)}
									>
										<Icon name={e.value} />
									</button>
								);
							})}
					</div>
				</div>
			</div>
		</>
	);
};

export default Popover;
