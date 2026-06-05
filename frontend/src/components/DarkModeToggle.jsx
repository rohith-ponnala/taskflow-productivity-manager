function DarkModeToggle() {

  const toggleTheme = () => {

    document.body.classList.toggle(
      "dark"
    );

    localStorage.setItem(
      "theme",
      document.body.classList.contains(
        "dark"
      )
        ? "dark"
        : "light"
    );

  };

  return (

    <button
      onClick={toggleTheme}
    >
      🌙
    </button>

  );

}

export default DarkModeToggle;