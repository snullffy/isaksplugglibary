const SUBJECTS = ["Alla", "Kemi", "Matematik", "Fysik", "Engelska", "Svenska", "Samhällskunskap", "Biologi"];

const ITEMS = [
  {
    title: "Plugga joner",
    subject: "Kemi",
    desc: "28 viktiga joner – namn och formel. Quiz, kort och miniquiz.",
    href: "https://28joner.vercel.app",
    live: true,
    tags: ["joner", "kemi", "formel", "läxförhör", "quiz"]
  },
  {
    title: "Matematik",
    subject: "Matematik",
    desc: "Kommer snart.",
    href: null,
    live: false,
    tags: ["matte", "math", "räkna"]
  },
  {
    title: "Fysik",
    subject: "Fysik",
    desc: "Kommer snart.",
    href: null,
    live: false,
    tags: ["fysik", "physics"]
  },
  {
    title: "English Vocabulary",
    subject: "Engelska",
    desc: "16 glosor från On the Other Side, Viewpoints 1. Flashcards, luckor och test.",
    href: "https://isaks-englishvocab.vercel.app",
    live: true,
    tags: ["english", "engelska", "vocab", "glosor", "ord", "viewpoints"]
  },
  {
    title: "Ideologi och politik",
    subject: "Samhällskunskap",
    desc: "Valspecial för Samhällskunskap 1. Ideologier, demokrati, riksdag och valsystem.",
    href: "https://ideologiochpolitik.vercel.app",
    live: true,
    tags: ["samhällskunskap", "so", "ideologi", "politik", "demokrati", "riksdag", "val", "te26"]
  },
  {
    title: "Svenska",
    subject: "Svenska",
    desc: "Kommer snart.",
    href: null,
    live: false,
    tags: ["svenska"]
  },
  {
    title: "Biologi",
    subject: "Biologi",
    desc: "Kommer snart.",
    href: null,
    live: false,
    tags: ["biologi"]
  }
];

const q = document.getElementById("q");
const chips = document.getElementById("chips");
const grid = document.getElementById("grid");
const count = document.getElementById("count");
const empty = document.getElementById("empty");
let subject = "Alla";

function norm(s) {
  return (s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function matches(item, query) {
  if (subject !== "Alla" && item.subject !== subject) return false;
  if (!query) return true;
  const hay = norm([item.title, item.subject, item.desc, ...(item.tags || [])].join(" "));
  return query.split(/\s+/).every((w) => hay.includes(w));
}

function render() {
  const query = norm(q.value.trim());
  const list = ITEMS.filter((it) => matches(it, query));
  count.textContent = list.length === 1 ? "1 resultat" : list.length + " resultat";
  empty.classList.toggle("hidden", list.length > 0);
  grid.innerHTML = list.map((it) => {
    const inner = `
      <div class="subj">${it.subject}</div>
      <h2>${it.title}</h2>
      <p>${it.desc}</p>
      <span class="badge ${it.live ? "live" : "wait"}">${it.live ? "Öppna" : "Kommer snart"}</span>`;
    if (it.live && it.href) {
      return `<a class="card" href="${it.href}">${inner}</a>`;
    }
    return `<article class="card soon">${inner}</article>`;
  }).join("");
}

SUBJECTS.forEach((name) => {
  const b = document.createElement("button");
  b.className = "chip" + (name === "Alla" ? " active" : "");
  b.type = "button";
  b.textContent = name;
  b.addEventListener("click", () => {
    subject = name;
    chips.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
    b.classList.add("active");
    render();
  });
  chips.appendChild(b);
});

q.addEventListener("input", render);
render();
q.focus();
