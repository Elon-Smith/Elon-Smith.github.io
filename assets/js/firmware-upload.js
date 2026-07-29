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

  const renderBootNotice = (option) => {
    const target = document.querySelector("[data-firmware-boot]");
    if (!target) {
      return;
    }

    const notice = option.dataset.boot || "";
    const driverLabel = "下载CH340驱动";
    const driverIndex = notice.indexOf(driverLabel);
    target.textContent = "";

    if (!option.dataset.driverUrl || driverIndex < 0) {
      target.textContent = notice;
      return;
    }

    const driverLink = document.createElement("a");
    driverLink.href = option.dataset.driverUrl;
    driverLink.target = "_blank";
    driverLink.rel = "noopener noreferrer";
    driverLink.textContent = driverLabel;

    target.append(
      document.createTextNode(notice.slice(0, driverIndex)),
      driverLink,
      document.createTextNode(
        notice.slice(driverIndex + driverLabel.length),
      ),
    );
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
    setText("[data-firmware-offset]", option.dataset.offset || "");
    renderBootNotice(option);
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
