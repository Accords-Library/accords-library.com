function applyTheme() {
  if (!("theme" in localStorage)) {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      localStorage.theme = "dark";
    } else {
      localStorage.theme = "light";
    }
  }

  if (localStorage.theme === "dark") {
    document.documentElement.classList.add("dark");
    document.querySelector("#themeButtonIcon").innerHTML = "light_mode";
  } else {
    document.documentElement.classList.remove("dark");
    document.querySelector("#themeButtonIcon").innerHTML = "dark_mode";
  }
}

function toggleTheme() {
  if (localStorage.theme === "dark") {
    localStorage.theme = "light";
  } else {
    localStorage.theme = "dark";
  }
  applyTheme();
}

applyTheme();
document.querySelector("#themeButton").onclick = () => toggleTheme();
