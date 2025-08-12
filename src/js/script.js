document.addEventListener("DOMContentLoaded", function () {
	const navToggler = document.querySelector(".nav__toggler");
	const navMobile = document.querySelector(".nav__mobile");
	const allMobileLi = document.querySelectorAll(".nav__mobile-li");
	const overlay = document.querySelector(".overlay");

	const handleNav = () => {
		const isOpened = navToggler.getAttribute("aria-expanded");

		if (isOpened === "false") {
			showNav();
			navToggler.classList.add("active");
			navToggler.setAttribute("aria-expanded", "true");
			navToggler.setAttribute("aria-label", "Close mobile navigation");
		} else {
			showNav();
			navToggler.classList.remove("active");
			navToggler.classList.add("unactive");
			navToggler.setAttribute("aria-expanded", "false");
			navToggler.setAttribute("aria-label", "Show mobile navigation");
			setTimeout(() => {
				navToggler.classList.remove("unactive");
			}, 400);
		}
	};

	const showNav = () => {
		const isOpened = navToggler.getAttribute("aria-expanded");

		if (isOpened === "false") {
			navMobile.style.height = navMobile.scrollHeight + "px";
			navMobile.classList.add("opened");
			allMobileLi.forEach((li) => {
				li.classList.add("active");
			});
		} else {
			requestAnimationFrame(() => {
				navMobile.style.height = 0 + "px";
			});
			navMobile.classList.remove("opened");

			const removeActive = () => {
				allMobileLi.forEach((li) => li.classList.remove("active"));
				navMobile.removeEventListener("transitionend", removeActive);
			};
			navMobile.addEventListener("transitionend", removeActive);
		}
	};
	navToggler.addEventListener("click", handleNav);
});
