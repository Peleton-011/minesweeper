import React from "react";
import { useState, useEffect } from "react";
import "./Carousel.css";

const Carousel = ({ pages }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
    

	const nextSlide = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % pages.length);
		const slider = document.querySelector(".slider-container");
		const slides = slider.querySelectorAll(".slide");
		slides.forEach((slide, index) => {
			//Remove classes
			slide.classList.remove("active", "prev", "next");
			if (index === currentIndex) {
				slide.classList.add("active");
			} else if (
				index ===
				(pages.length + currentIndex - 1) % pages.length
			) {
				slide.classList.add("prev", "active");
			} else if (index === (currentIndex + 1) % pages.length) {
				slide.classList.add("next");
			} else {
				slide.classList.remove("active");
			}
		});
	};

	const prevSlide = () => {
		setCurrentIndex(
			(prevIndex) => (prevIndex - 1 + pages.length) % pages.length
		);
		const slider = document.querySelector(".slider-container");
		const slides = slider.querySelectorAll(".slide");
		slides.forEach((slide, index) => {
			//Remove classes
			slide.classList.remove("active", "prev", "next");
			if (index === currentIndex) {
				slide.classList.add("active");
			} else if (
				index ===
				(pages.length + currentIndex - 1) % pages.length
			) {
				slide.classList.add("prev");
			} else if (index === (currentIndex + 1) % pages.length) {
				slide.classList.add("next", "active");
			} else {
				slide.classList.remove("active");
			}
		});
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
		//Select elements by key
	}, [currentIndex]);

	return (
		<div className="image-slider">
			<div
				className={`slider-container ${
					currentIndex === 0 ? "" : "slide-left"
				}`}
			>
				{pages.map((page, index) => (
					<div
						key={index}
						className={
							"slide " +
							(index === currentIndex
								? "active"
								: index ===
								  (pages.length + currentIndex - 1) %
										pages.length
								? "prev"
								: index === (currentIndex + 1) % pages.length
								? "next"
								: "")
						}
					>
						{page}
					</div>
				))}
			</div>
			<button onClick={prevSlide}>Previous</button>
			<button onClick={nextSlide}>Next</button>
		</div>
	);
};

export default Carousel;
