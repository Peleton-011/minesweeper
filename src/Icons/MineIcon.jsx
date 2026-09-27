import Icon from "../components/Icon.jsx";

const MineIcon = () => {
    const root  = document.documentElement;
    const image = getComputedStyle(root).getPropertyValue("--bomb-icon-img");
    const icon = getComputedStyle(root).getPropertyValue("--bomb-icon");

	return (
		<Icon iconUrl={image} iconChar={icon} />
	);
};

export default MineIcon;
