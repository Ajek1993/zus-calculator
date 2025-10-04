// Przykładowe dane grup emerytów - wysokość średniej emerytury (zł)
const pensionGroups = [
  {
    name: "Poniżej minimalnej",
    value: 1200,
    description:
      "Świadczeniobiorcy otrzymujący emeryturę poniżej minimalnej mają niską aktywność zawodową, nie przepracowali minimum 25 lat dla mężczyzn i 20 dla kobiet, nie nabyli prawa do gwarancji minimalnej emerytury.",
  },
  {
    name: "W okolicach średniej",
    value: 2500,
    description:
      "Większość emerytów otrzymuje świadczenie bliskie średniej krajowej.",
  },
  {
    name: "Powyżej średniej",
    value: 4000,
    description:
      "Grupa emerytów z wyższymi świadczeniami, często z dłuższym okresem pracy lub wyższymi zarobkami.",
  },
  {
    name: "Najwyższe emerytury",
    value: 7000,
    description:
      "Najbogatsi emeryci, często osoby z długoletnią karierą lub specjalistycznymi umiejętnościami.",
  },
];

// Losowa ciekawostka (przykładowa)
const randomFacts = [
  "Czy wiesz, że najwyższą emeryturę w Polsce otrzymuje mieszkaniec województwa śląskiego, wysokość jego emerytury to 12 000 zł, pracował przez 45 lat, nie był nigdy na zwolnieniu lekarskim.",
  "Średnia długość zwolnień lekarskich w Polsce to około 30 dni rocznie.",
  "Emerytury w Polsce są corocznie indeksowane względem inflacji i wzrostu przeciętnych wynagrodzeń.",
  "Mężczyźni statystycznie przepracowują dłużej i mają wyższe emerytury niż kobiety.",
];

// Init wykresu
const ctx = document.getElementById("pensionChart").getContext("2d");
const pensionChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: pensionGroups.map((g) => g.name),
    datasets: [
      {
        label: "Średnia wysokość emerytury (PLN)",
        data: pensionGroups.map((g) => g.value),
        backgroundColor: "rgba(0, 153, 63, 0.7)",
        borderColor: "rgba(255, 255, 255, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(0, 153, 63, 1)",
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: "white" },
      },
      x: {
        ticks: { color: "white" },
      },
    },
    plugins: {
      tooltip: {
        enabled: false, // wyłączamy domyślne tooltipy
        external: (context) => {
          const tooltipModel = context.tooltip;
          const groupInfo = document.getElementById("group_info");

          if (tooltipModel.opacity === 0) {
            groupInfo.innerText = "";
            return;
          }

          if (tooltipModel.dataPoints) {
            const idx = tooltipModel.dataPoints[0].dataIndex;
            groupInfo.innerText = pensionGroups[idx].description;
          } else {
            groupInfo.innerText = "";
          }
        },
      },
    },
    hover: {
      mode: "nearest",
      intersect: true,
    },
  },
});

// Wyświetlanie losowej ciekawostki
const randomFactElem = document.getElementById("random_fact");
randomFactElem.textContent =
  randomFacts[Math.floor(Math.random() * randomFacts.length)];
