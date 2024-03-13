import React from "react";
import Carousel from "./Carousel";

const ConfigSelector = () => {
	return (
		<div>
			<h2>Config Selector</h2>
			<Carousel pages={[<h1>One</h1>, <h2>Two</h2>, <h3>Three</h3>]} />
		</div>
	);
};

export default ConfigSelector;
