(() => {
  const firmwareSelect = document.getElementById("firmwareSelect");
  const installer = document.getElementById("installer");
  const serialSupport = document.getElementById("serialSupport");
  const secureSupport = document.getElementById("secureSupport");

  if (!firmwareSelect || !installer) {
    return;
  }

  const setText = (selector, value) => {
    const target = document.querySelector(selector);
    if (target) {
      target.textContent = value;
    }
  };

  const updateFirmwareDetails = () => {
    const option = firmwareSelect.selectedOptions[0];
    if (!option) {
      return;
    }

    installer.setAttribute("manifest", option.value);
    setText("[data-firmware-chip]", option.dataset.chip || "");
    setText("[data-firmware-file]", option.dataset.file || "");
    setText("[data-firmware-manifest]", option.dataset.manifest || "");
    setText("[data-firmware-boot]", option.dataset.boot || "");
  };

  firmwareSelect.addEventListener("change", updateFirmwareDetails);
  updateFirmwareDetails();

  if (serialSupport) {
    serialSupport.textContent = "serial" in navigator
      ? "Web Serial 可用"
      : "Web Serial 不可用";
  }

  if (secureSupport) {
    secureSupport.textContent = window.isSecureContext
      ? "HTTPS / localhost 环境正常"
      : "需要 HTTPS 或 localhost";
  }
})();
