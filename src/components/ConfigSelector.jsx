import React from "react";
import Carousel from "./Carousel";

const ConfigSelector = () => {
	return (
		<div>
			<h2>Config Selector</h2>
			<Carousel pages={[<h1>One</h1>, <h1>Two</h1>, <h1>Three</h1>]} />
		</div>
	);
};

export default ConfigSelector;
