import Icon from "../components/Icon.jsx";

const FullHeartIcon = () => {
    const root  = document.documentElement;
    const image = getComputedStyle(root).getPropertyValue("--full-heart-icon-img");
    const icon = getComputedStyle(root).getPropertyValue("--full-heart-icon");
	return (
		<Icon iconUrl={image} iconChar={icon} />
	);
};

export default FullHeartIcon;
