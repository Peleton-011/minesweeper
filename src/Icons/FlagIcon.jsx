import Icon from "../components/Icon.jsx";

const FlagIcon = () => {
    const root  = document.documentElement;
    const image = getComputedStyle(root).getPropertyValue("--flag-icon-img");
    const icon = getComputedStyle(root).getPropertyValue("--flag-icon");
	return (
		<Icon iconUrl={image} iconChar={icon} />
	);
};

export default FlagIcon;
