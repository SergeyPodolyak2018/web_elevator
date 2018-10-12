function hidePreloader () {
	let preloader=document.getElementById('container_fountainG')
	preloader.style.cssText='display:none';
}

function showPreloader () {
	let preloader=document.getElementById('container_fountainG')
	preloader.removeAttribute("style");
}