// ThemeToggle.jsx
const ThemeToggle = ({ isDark, setIsDark }) => {
    return (
      <button
        onClick={() => setIsDark(!isDark)}
        className="px-4 py-2 rounded bg-yellow-400 text-black hover:bg-yellow-300 transition"
      >
        {isDark ? "🌙 Dark" : "☀️ Light"}
      </button>
    );
  };
  
  export default ThemeToggle;
  