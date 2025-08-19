export function showLoading() {
    const preloader = document.getElementById("preloader");
    const loader = document.getElementById("loader");
    if(preloader) preloader.classList.add("active");
    if(loader) loader.classList.add("active");
}

export function hideLoading() {
    const preloader = document.getElementById("preloader");
    const loader = document.getElementById("loader");
    if(preloader) preloader.classList.remove("active");
    if(loader) loader.classList.remove("active");
}
