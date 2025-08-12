document.addEventListener("DOMContentLoaded", function () {
	const navToggler = document.querySelector(".nav__toggler");
	const navMobile = document.querySelector(".nav__mobile");
	const allMobileLi = document.querySelectorAll(".nav__mobile-li");
	const overlay = document.querySelector(".overlay");
	const allDesktopLinks = document.querySelectorAll(".nav__desktop-link");

	const showOverlay = () => {
		overlay.classList.add("active");
	};
	const hideOverlay = () => {
		setTimeout(() => {
			overlay.classList.remove("active");
		}, 300);
	};
	const handleNav = () => {
		const isOpened = navToggler.getAttribute("aria-expanded");

		if (isOpened === "false") {
			showNav();
			togglerOn();
			showOverlay();
		} else {
			showNav();
			togglerOff();
			hideOverlay();
		}
	};
	const togglerOff = () => {
		navToggler.classList.remove("active");
		navToggler.classList.add("unactive");
		navToggler.setAttribute("aria-expanded", "false");
		navToggler.setAttribute("aria-label", "Show mobile navigation");
		setTimeout(() => {
			navToggler.classList.remove("unactive");
		}, 400);
	};
	const togglerOn = () => {
		navToggler.classList.add("active");
		navToggler.setAttribute("aria-expanded", "true");
		navToggler.setAttribute("aria-label", "Close mobile navigation");
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
	const removeActive = () => {
		allDesktopLinks.forEach((link) => link.classList.remove("active"));
	};
	allDesktopLinks.forEach((link) =>
		link.addEventListener("click", (e) => {
			e.preventDefault();
			removeActive();
			link.classList.add("active");
		})
	);
	overlay.addEventListener("click", () => {
		showNav();
		togglerOff();
		hideOverlay();
	});
	navToggler.addEventListener("click", handleNav);
});
