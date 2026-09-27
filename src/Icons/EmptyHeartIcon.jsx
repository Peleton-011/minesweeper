import Icon from "../components/Icon.jsx";

const EmptyHeartIcon = () => {
	const root = document.documentElement;
	const image = getComputedStyle(root).getPropertyValue("--empty-heart-icon-img");
	const icon = getComputedStyle(root).getPropertyValue("--empty-heart-icon");

	return <Icon iconUrl={image} iconChar={icon} />;
};

export default EmptyHeartIcon;
