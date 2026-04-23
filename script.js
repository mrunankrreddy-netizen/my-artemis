const missions = {
  artemis1: {
    title: "Artemis I",
    summary: "The uncrewed 2022 test flight proved Orion and SLS could travel to the Moon and return.",
    status: "Completed November 2022",
    destination: "Uncrewed Moon mission",
    duration: "25.5 days",
    impact: "Opened the path for later crewed flights",
    meter: 52,
  },
  artemis2: {
    title: "Artemis II",
    summary: "NASA's first crewed Artemis mission performed a lunar flyby and validated human deep-space operations.",
    status: "Completed April 2026",
    destination: "Crewed lunar flyby",
    duration: "9 days",
    impact: "Validates systems for future lunar operations",
    meter: 74,
  },
  artemis3: {
    title: "Artemis III",
    summary: "NASA currently describes Artemis III as a 2027 mission to test integrated operations with commercial spacecraft.",
    status: "Targeting 2027",
    destination: "Low Earth orbit operations test",
    duration: "TBD by NASA",
    impact: "Prepares future surface and docking operations",
    meter: 83,
  },
};

const systems = {
  orion: {
    title: "Orion spacecraft",
    text: "Orion is the crew capsule designed to keep astronauts alive during long trips away from Earth.",
  },
  sls: {
    title: "Space Launch System",
    text: "SLS is NASA's heavy-lift rocket that can launch Orion, astronauts, and cargo in one shot toward the Moon.",
  },
  lander: {
    title: "Human landing systems",
    text: "NASA is working with industry on landers that can move astronauts between lunar orbit and the Moon's surface.",
  },
  gateway: {
    title: "Gateway",
    text: "Gateway is NASA's planned lunar-orbit outpost, intended to support science and future Moon-to-Mars missions.",
  },
};

const factPool = [
  "Artemis is named after Apollo's twin sister in Greek mythology.",
  "Artemis II became NASA's first crewed lunar flyby mission in more than 50 years.",
  "NASA describes Artemis as a Moon-to-Mars campaign, not just a single launch.",
  "Gateway is planned as a small space station orbiting the Moon.",
];

const missionTitle = document.getElementById("missionTitle");
const missionSummary = document.getElementById("missionSummary");
const missionStatus = document.getElementById("missionStatus");
const missionDestination = document.getElementById("missionDestination");
const missionDuration = document.getElementById("missionDuration");
const missionImpact = document.getElementById("missionImpact");
const meterFill = document.getElementById("meterFill");
const meterValue = document.getElementById("meterValue");
const readiness = document.getElementById("readiness");
const readinessOutput = document.getElementById("readinessOutput");
const systemTitle = document.getElementById("systemTitle");
const systemText = document.getElementById("systemText");
const factChip = document.getElementById("factChip");
const scene = document.querySelector(".scene");
const launchClip = document.getElementById("launchClip");
const pageSelect = document.getElementById("pageSelect");

function updateMission(key) {
  const mission = missions[key];
  if (!mission) return;

  missionTitle.textContent = mission.title;
  missionSummary.textContent = mission.summary;
  missionStatus.textContent = mission.status;
  missionDestination.textContent = mission.destination;
  missionDuration.textContent = mission.duration;
  missionImpact.textContent = mission.impact;
  meterFill.style.width = `${mission.meter}%`;
  meterValue.textContent = `${mission.meter}%`;

  document.querySelectorAll(".timeline-item").forEach((item) => {
    const active = item.dataset.mission === key;
    item.classList.toggle("active", active);
    item.setAttribute("aria-selected", String(active));
  });
}

function updateSystem(key) {
  const system = systems[key];
  if (!system) return;

  systemTitle.textContent = system.title;
  systemText.textContent = system.text;

  document.querySelectorAll(".chip").forEach((chip) => {
    chip.classList.toggle("active", chip.dataset.system === key);
  });
}

function describeReadiness(value) {
  if (value < 35) return "early-stage energy";
  if (value < 65) return "steady progress";
  if (value < 85) return "strong forward momentum";
  return "launch-window optimism";
}

document.querySelectorAll(".timeline-item").forEach((button) => {
  button.addEventListener("click", () => updateMission(button.dataset.mission));
});

document.querySelectorAll(".chip").forEach((button) => {
  button.addEventListener("click", () => updateSystem(button.dataset.system));
});

if (readiness && readinessOutput) {
  readiness.addEventListener("input", (event) => {
    const value = Number(event.target.value);
    readinessOutput.textContent = `${value}% - ${describeReadiness(value)}`;
  });
}

const toggleFactsButton = document.getElementById("toggleFacts");
if (toggleFactsButton && factChip) {
  toggleFactsButton.addEventListener("click", () => {
    const next = factPool[Math.floor(Math.random() * factPool.length)];
    factChip.textContent = next;
  });
}

const focusArtemis2Button = document.getElementById("focusArtemis2");
if (focusArtemis2Button) {
  focusArtemis2Button.addEventListener("click", () => {
    updateMission("artemis2");
    document.getElementById("missions")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

if (pageSelect) {
  pageSelect.addEventListener("change", (event) => {
    const nextPage = event.target.value;
    if (nextPage) {
      window.location.href = nextPage;
    }
  });
}

document.querySelectorAll(".explorer-button").forEach((button) => {
  button.addEventListener("click", () => {
    const titleTarget = document.getElementById(button.dataset.titleTarget);
    const bodyTarget = document.getElementById(button.dataset.bodyTarget);
    const group = button.closest(".article-explorer");

    if (group) {
      group.querySelectorAll(".explorer-button").forEach((item) => item.classList.remove("active"));
    }

    button.classList.add("active");

    if (titleTarget) {
      titleTarget.textContent = button.dataset.panelTitle || "";
    }

    if (bodyTarget) {
      bodyTarget.textContent = button.dataset.panelBody || "";
    }
  });
});

if (launchClip) {
  launchClip.muted = true;
  launchClip.playsInline = true;

  launchClip.addEventListener("timeupdate", () => {
    if (launchClip.currentTime >= 3) {
      launchClip.currentTime = 0;
      launchClip.play().catch(() => {});
    }
  });

  launchClip.addEventListener("loadeddata", () => {
    launchClip.currentTime = 0;
  });
}

if (scene && launchClip && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          launchClip.play().catch(() => {});
        } else {
          launchClip.pause();
        }
      });
    },
    { threshold: 0.45 }
  );

  observer.observe(scene);
}

if (missionTitle) {
  updateMission("artemis2");
}

if (systemTitle) {
  updateSystem("orion");
}
