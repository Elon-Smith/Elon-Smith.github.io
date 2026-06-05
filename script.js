const canvas = document.getElementById("telemetryChart");
const ctx = canvas.getContext("2d");

function drawChart() {
  const width = canvas.width;
  const height = canvas.height;
  ctx.clearRect(0, 0, width, height);

  const padding = { top: 18, right: 12, bottom: 26, left: 34 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  ctx.lineWidth = 1;
  ctx.font = "12px Microsoft YaHei, Arial";
  ctx.fillStyle = "rgba(200,215,222,0.58)";

  for (let i = 0; i <= 4; i += 1) {
    const y = padding.top + (chartH / 4) * i;
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(width - padding.right, y);
    ctx.stroke();
    ctx.fillText(String(30 - i * 5), 6, y + 4);
  }

  const labels = ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "24:00"];
  labels.forEach((label, index) => {
    const x = padding.left + (chartW / (labels.length - 1)) * index;
    ctx.fillText(label, x - 16, height - 6);
  });

  const temp = [24, 24, 25, 24, 26, 27, 24, 23, 24, 25, 26, 24, 25, 26, 25, 24, 24];
  const humid = [20, 21, 22, 21, 20, 19, 17, 18, 20, 21, 22, 22, 21, 20, 21, 22, 21];

  function pathFor(data, color) {
    ctx.beginPath();
    data.forEach((value, index) => {
      const x = padding.left + (chartW / (data.length - 1)) * index;
      const y = padding.top + chartH - ((value - 15) / 15) * chartH;
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();

    data.forEach((value, index) => {
      const x = padding.left + (chartW / (data.length - 1)) * index;
      const y = padding.top + chartH - ((value - 15) / 15) * chartH;
      ctx.beginPath();
      ctx.arc(x, y, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    });
  }

  pathFor(temp, "#31b8ff");
  pathFor(humid, "#35ed83");
}

drawChart();

const tabs = document.querySelectorAll(".filter-tabs button");
const rows = document.querySelectorAll(".project-row");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");
    const filter = tab.dataset.filter;

    rows.forEach((row) => {
      row.hidden = filter !== "all" && row.dataset.kind !== filter;
    });
  });
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
