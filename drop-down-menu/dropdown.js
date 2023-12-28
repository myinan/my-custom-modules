import "./dropdown.css";

const dropdownBtn = document.querySelector("#custom-dropdown-button");
const dropdownList = document.querySelector("#custom-dropdown-list");

function toggleList() {
  const classL = dropdownList.classList;
  classL.contains("dropdown-visible")
    ? classL.remove("dropdown-visible")
    : classL.add("dropdown-visible");
}

function hideList(event) {
  if (event.target !== dropdownBtn && event.target !== dropdownList) {
    const classL = dropdownList.classList;
    if (classL.contains("dropdown-visible")) {
      classL.remove("dropdown-visible");
    }
  }
}

export default function dropdownListener() {
  dropdownBtn.addEventListener("click", toggleList);
  document.addEventListener("click", hideList);
}
