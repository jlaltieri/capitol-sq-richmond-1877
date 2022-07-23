
function openSidepanel() {
    const sidepanel = document.getElementById("side_panel");
    sidepanel.style.width = "330px";
    sidepanel.style.border = "1px solid #369894"
  }
  
  /* Set the width of the sidebar to 0 (hide it) */
  function closeSidepanel() {
    const sidepanel  = document.getElementById("side_panel");
    sidepanel.style.width = "0";
    sidepanel.style.border = "0";
  }
  