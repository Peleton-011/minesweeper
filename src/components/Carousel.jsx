import React from "react";
import { useState, useEffect } from "react";
import "./Carousel.css";
import { useSwipeable } from "react-swipeable";

import useDeviceType from "../hooks/useDeviceType";

const Carousel = ({ pages, title }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isForward, setIsForward] = useState(undefined);

	let slider;
	let slides;

	const [leftButtonAnimation, setLeftButtonAnimation] = useState(false);
	const [rightButtonAnimation, setRightButtonAnimation] = useState(false);

	const handlers = useSwipeable({
		onSwipedLeft: () => nextSlide(),
		onSwipedRight: () => prevSlide(),
	});

	const deviceType = useDeviceType();

	const leftButtonToggle = () => {
		setLeftButtonAnimation(true);
		setTimeout(() => {
			setLeftButtonAnimation(false);
		}, 500); // 0.5 seconds
	};

	const rightButtonToggle = () => {
		setRightButtonAnimation(true);
		setTimeout(() => {
			setRightButtonAnimation(false);
		}, 500); // 0.5 seconds
	};

	const nextSlide = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % pages.length);

		setIsForward(true);
	};

	const prevSlide = () => {
		setCurrentIndex(
			(prevIndex) => (prevIndex - 1 + pages.length) % pages.length
		);
		setIsForward(false);
	};

	//Auto slide
	// useEffect(() => {
	// 	const interval = setInterval(() => {
	// 		nextSlide();
	// 	}, 3000);
	// 	return () => clearInterval(interval);
	// }, [currentIndex, pages.length]);

	//Set classes upon index change
	useEffect(() => {
		slider = document.querySelector(".slider-container");
		slides = slider.querySelectorAll(".slide");
	}, []);

	const getSlideClass = (index) => {
		if (isForward) {
			return index === currentIndex
				? "active slide-in-right"
				: index === (currentIndex - 1 + pages.length) % pages.length
				? "slide-away-left"
				: "inactive";
		} else if (isForward === undefined) {
			return index === currentIndex ? "active" : "inactive";
		} else {
			return index === currentIndex
				? "active slide-in-left"
				: index === (currentIndex + 1 + pages.length) % pages.length
				? "slide-away-right"
				: "inactive";
		}
	};

	return (
		<div className="image-slider" {...handlers}>
			<h2 className="slider-title">{title}</h2>
			<div className="slider-container">
				{pages.map((page, index) => (
					<div
						key={index}
						className={"slide " + getSlideClass(index)}
					>
						{page}
					</div>
				))}
			</div>
			{deviceType === "desktop" && (
				<>
					<button
						onClick={() => {
							prevSlide();
							leftButtonToggle();
						}}
						className={
							"prev btn " + (leftButtonAnimation ? "active" : "")
						}
					></button>
					<button
						onClick={() => {
							nextSlide();
							rightButtonToggle();
						}}
						className={
							"next btn " + (rightButtonAnimation ? "active" : "")
						}
					></button>
				</>
			)}
		</div>
	);
};

export default Carousel;
