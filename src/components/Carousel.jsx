import React from "react";
import { useState, useEffect } from "react";
import "./Carousel.css";

const Carousel = ({ pages }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isForward, setIsForward] = useState(undefined);

	let slider;
	let slides;

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
				: "";
		} else if (isForward === undefined) {
			return index === currentIndex ? "active" : "";
		} else {
			return index === currentIndex
				? "active slide-in-left"
				: index === (currentIndex + 1 + pages.length) % pages.length
				? "slide-away-right"
				: "";
		}
	};

	return (
		<div className="image-slider">
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
			<button onClick={prevSlide} className={"prev btn "}></button>
			<button onClick={nextSlide} className="next btn"></button>
		</div>
	);
};

export default Carousel;
