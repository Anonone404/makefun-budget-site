// HomeBase app logic: renders the pages, keeps the household's numbers,
// and saves every change in localStorage (with an in-memory fallback).
// No network requests: the seed data in data.js is the whole dataset.

import { HOUSEHOLD, INCOME, BUDGETS, TRANSACTIONS, GOALS, HISTORY } from './data.js';
import { drawDonut, drawBars, drawColumns } from './charts.js';

const STORE_KEY = 'homebase-v1';
let memoryStore = null;

function loadStore() {
  try {
    const raw = window.localStorage.getItem(STORE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) { /* storage unavailable: keep going in memory */ }
  return memoryStore || { added: [], budgetEdits: {}, goalAdds: {} };
}

function saveStore(store) {
  memoryStore = store;
  try { window.localStorage.setItem(STORE_KEY, JSON.stringify(store)); } catch (e) { /* ignore */ }
}

let store = loadStore();

const money = (n) => '$' + Math.round(n).toLocaleString('en-US');
const moneyCents = (n) => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function categoryOf(id) {
  return BUDGETS.find((b) => b.id === id) || { label: id, color: '#999' };
}

function allTransactions() {
  return TRANSACTIONS.concat(store.added).sort((a, b) => b.date - a.date || b.id - a.id);
}

function plannedFor(budget) {
  return store.budgetEdits[budget.id] ?? budget.planned;
}

function savedFor(goal) {
  return goal.saved + (store.goalAdds[goal.id] || 0);
}

function totals() {
  const income = INCOME.reduce((s, i) => s + i.amount, 0);
  const spent = allTransactions().reduce((s, t) => s + t.amount, 0);
  const planned = BUDGETS.reduce((s, b) => s + plannedFor(b), 0);
  return { income, spent, planned, left: income - spent };
}

function spentByCategory() {
  const out = {};
  for (const t of allTransactions()) out[t.category] = (out[t.category] || 0) + t.amount;
  return out;
}

// ---- shared bits -------------------------------------------------------

function pageShell(title, intro, inner) {
  return `<h1>${title}</h1><p class="lede">${intro}</p>${inner}`;
}

function summaryCards() {
  const t = totals();
  const savedThisMonth = Math.max(0, t.income - t.spent);
  return `<section class="cards" aria-label="Month at a glance">
    <article class="card"><span class="card-label">Money in</span>
      <strong class="card-value">${money(t.income)}</strong>
      <span class="card-note">Pay + market stall, November</span></article>
    <article class="card"><span class="card-label">Spent so far</span>
      <strong class="card-value">${money(t.spent)}</strong>
      <span class="card-note">of ${money(t.planned)} planned</span></article>
    <article class="card"><span class="card-label">Left to spend</span>
      <strong class="card-value ${t.left < 0 ? 'over' : ''}">${money(t.left)}</strong>
      <span class="card-note">${t.left < 0 ? 'Over budget — see where' : 'Still in the green'}</span></article>
    <article class="card"><span class="card-label">Set aside this month</span>
      <strong class="card-value">${money(savedThisMonth)}</strong>
      <span class="card-note">Income minus spending so far</span></article>
  </section>`;
}

// ---- pages -------------------------------------------------------------

function renderDashboard() {
  const t = totals();
  const byCat = spentByCategory();
  const slices = BUDGETS.map((b) => ({
    label: b.label, value: byCat[b.id] || 0, color: b.color,
  })).filter((s) => s.value > 0);
  const recent = allTransactions().slice(0, 6);
  const goalRows = GOALS.map((g) => {
    const saved = savedFor(g);
    const pct = Math.min(100, Math.round((saved / g.target) * 100));
    return `<li class="goal-mini"><span>${g.label}</span>
      <span class="bar"><span style="width:${pct}%"></span></span>
      <span>${money(saved)} of ${money(g.target)}</span></li>`;
  }).join('');
  const history = HISTORY.map((h) => h.month === 'Nov'
    ? { ...h, spent: t.spent, saved: Math.max(0, t.income - t.spent) } : h);

  document.getElementById('page').innerHTML = pageShell(
    'November, at a glance',
    `${HOUSEHOLD.name} — ${HOUSEHOLD.members}. Payday was the 1st, rent went out the same day, and the weekly shop is the one line we keep an eye on.`,
    summaryCards() + `
    <div class="two-col">
      <section class="panel"><h2>Where the money went</h2>
        <canvas id="donut" class="chart donut" width="300" height="300" role="img"
          aria-label="Donut chart of spending by category"></canvas>
        <ul class="legend">${slices.map((s) => `<li><span class="swatch" style="background:${s.color}"></span>${s.label} — ${money(s.value)}</li>`).join('')}</ul>
      </section>
      <section class="panel"><h2>Spending, last six months</h2>
        <canvas id="trend" class="chart columns" width="520" height="240" role="img"
          aria-label="Bar chart of monthly spending"></canvas>
        <p class="panel-note">July spiked — that was the car repair ($640) and Leo's birthday. October settled back down.</p>
      </section>
    </div>
    <div class="two-col">
      <section class="panel"><h2>Latest spending</h2>
        <ul class="tx-list">${recent.map(txRow).join('')}</ul>
        <p><a class="btn" href="#/spending">See all spending</a></p>
      </section>
      <section class="panel"><h2>Savings goals</h2>
        <ul class="goal-list">${goalRows}</ul>
        <p><a class="btn" href="#/goals">Open savings goals</a></p>
      </section>
    </div>`,
  );
  drawDonut(document.getElementById('donut'), slices, 'Spent', money(t.spent));
  drawColumns(document.getElementById('trend'), history.map((h, i) => ({
    label: h.month, value: h.spent, color: i === history.length - 1 ? '#2f6f5e' : '#9db8a8',
  })));
}

function txRow(t) {
  const cat = categoryOf(t.category);
  return `<li><span class="tx-date">Nov ${t.date}</span>
    <span class="tx-label">${escapeHtml(t.label)}</span>
    <span class="tx-cat" style="--dot:${cat.color}">${cat.label}</span>
    <strong class="tx-amount">${money(t.amount)}</strong></li>`;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function renderBudget() {
  const byCat = spentByCategory();
  const rows = BUDGETS.map((b) => {
    const spent = byCat[b.id] || 0;
    const planned = plannedFor(b);
    const pct = planned > 0 ? Math.round((spent / planned) * 100) : 0;
    const left = planned - spent;
    return `<tr>
      <td><span class="swatch" style="background:${b.color}"></span> ${b.label}
        <small>${b.note}</small></td>
      <td><label class="sr-only" for="plan-${b.id}">Planned amount for ${b.label}</label>
        <input id="plan-${b.id}" class="plan-input" type="number" min="0" step="1"
          value="${planned}" data-budget="${b.id}"></td>
      <td>${money(spent)}</td>
      <td class="${left < 0 ? 'over' : ''}">${left < 0 ? '−' : ''}${money(Math.abs(left))} ${left < 0 ? 'over' : 'left'}</td>
      <td><span class="bar"><span style="width:${Math.min(100, pct)}%;${pct > 100 ? 'background:#b3402e' : ''}"></span></span> ${pct}%</td>
    </tr>`;
  }).join('');
  const t = totals();
  document.getElementById('page').innerHTML = pageShell(
    'The budget',
    `Planned: ${money(t.planned)} a month against ${money(t.income)} coming in. Change any planned amount below and the dashboard updates straight away — nothing is set in stone.`,
    `<section class="panel"><table class="budget-table">
      <thead><tr><th>Category</th><th>Planned</th><th>Spent</th><th>Remaining</th><th>Used</th></tr></thead>
      <tbody>${rows}</tbody></table>
      <p class="panel-note">Tip: groceries run about $180 a week. If the weekly shop keeps landing over $190, the month ends tight — that is the line worth watching.</p>
      <p><button class="btn" id="reset-budgets" type="button">Reset to the Parkers' original plan</button></p>
    </section>`,
  );
  document.querySelectorAll('.plan-input').forEach((input) => {
    input.addEventListener('change', () => {
      const value = Math.max(0, Math.round(Number(input.value) || 0));
      store.budgetEdits[input.dataset.budget] = value;
      saveStore(store);
      renderBudget();
    });
  });
  document.getElementById('reset-budgets').addEventListener('click', () => {
    store.budgetEdits = {};
    saveStore(store);
    renderBudget();
  });
}

function renderSpending() {
  const txs = allTransactions();
  const byCat = spentByCategory();
  const options = BUDGETS.map((b) => `<option value="${b.id}">${b.label}</option>`).join('');
  document.getElementById('page').innerHTML = pageShell(
    'Spending',
    `${txs.length} purchases logged so far in November, ${money(totals().spent)} in total. Add one below and it shows up everywhere — the dashboard, the charts, the budget bars.`,
    `<section class="panel"><h2>Add spending</h2>
      <form id="add-tx" class="form-grid">
        <label>Date in November <input id="tx-date" type="number" min="1" max="30" value="26" required></label>
        <label>Category <select id="tx-category">${options}</select></label>
        <label>What was it? <input id="tx-label" type="text" maxlength="60" placeholder="e.g. Weekly shop — GreenMart" required></label>
        <label>Amount ($) <input id="tx-amount" type="number" min="0.01" step="0.01" placeholder="0.00" required></label>
        <button class="btn primary" type="submit">Add it</button>
      </form>
      <p class="form-note" id="tx-note" role="status"></p>
    </section>
    <section class="panel"><h2>Every purchase</h2>
      <label class="filter">Show only
        <select id="tx-filter"><option value="">All categories</option>${options}</select></label>
      <ul class="tx-list" id="tx-list">${txs.map(txRow).join('')}</ul>
    </section>
    <section class="panel"><h2>By category</h2>
      <canvas id="catbars" class="chart bars" width="640" height="290" role="img"
        aria-label="Bar chart of spending by category"></canvas>
    </section>`,
  );
  drawBars(document.getElementById('catbars'), BUDGETS.map((b) => ({
    label: b.label, value: byCat[b.id] || 0, max: plannedFor(b), color: b.color,
  })));
  document.getElementById('add-tx').addEventListener('submit', (event) => {
    event.preventDefault();
    const amount = Number(document.getElementById('tx-amount').value);
    const label = document.getElementById('tx-label').value.trim();
    const date = Math.min(30, Math.max(1, Number(document.getElementById('tx-date').value) || 26));
    if (!label || !(amount > 0)) return;
    const nextId = Math.max(0, ...allTransactions().map((t) => t.id)) + 1;
    store.added.push({ id: nextId, date, category: document.getElementById('tx-category').value, label, amount });
    saveStore(store);
    document.getElementById('tx-note').textContent = `Added ${label} — ${moneyCents(amount)}. Total spent is now ${money(totals().spent)}.`;
    renderSpending();
    document.getElementById('tx-note').textContent = `Added ${label} — ${moneyCents(amount)}. Total spent is now ${money(totals().spent)}.`;
  });
  document.getElementById('tx-filter').addEventListener('change', (event) => {
    const picked = event.target.value;
    const list = picked ? txs.filter((t) => t.category === picked) : txs;
    document.getElementById('tx-list').innerHTML = list.length
      ? list.map(txRow).join('')
      : '<li class="empty">Nothing in this category yet this month.</li>';
  });
}

function renderGoals() {
  const t = totals();
  const spare = Math.max(0, t.income - t.spent);
  const cards = GOALS.map((g) => {
    const saved = savedFor(g);
    const pct = Math.min(100, Math.round((saved / g.target) * 100));
    const remaining = Math.max(0, g.target - saved);
    return `<article class="panel goal-card"><h2>${g.label}</h2>
      <p class="goal-amount"><strong>${money(saved)}</strong> of ${money(g.target)} <span>(${pct}%)</span></p>
      <p class="bar big"><span style="width:${pct}%"></span></p>
      <p>${g.note}</p>
      <p class="goal-remaining">${remaining > 0 ? `${money(remaining)} to go.` : 'Done — fully funded.'}</p></article>`;
  }).join('');
  const options = GOALS.map((g) => `<option value="${g.id}">${g.label}</option>`).join('');
  document.getElementById('page').innerHTML = pageShell(
    'Savings goals',
    `Three pots, three reasons. The household puts aside what is left after spending — right now that is ${money(spare)} for November — and splits it between these.`,
    `<div class="goal-grid">${cards}</div>
    <section class="panel"><h2>Put money in a pot</h2>
      <form id="add-saving" class="form-grid">
        <label>Which pot? <select id="goal-pick">${options}</select></label>
        <label>Amount ($) <input id="goal-amount" type="number" min="1" step="1" placeholder="50" required></label>
        <button class="btn primary" type="submit">Add to the pot</button>
      </form>
      <p class="form-note" id="goal-note" role="status"></p>
      <p class="panel-note">Rule the Parkers live by: the emergency cushion gets filled first. Holidays and the car wait until it is back above $4,000.</p>
    </section>`,
  );
  document.getElementById('add-saving').addEventListener('submit', (event) => {
    event.preventDefault();
    const amount = Math.round(Number(document.getElementById('goal-amount').value));
    const goalId = document.getElementById('goal-pick').value;
    if (!(amount > 0)) return;
    store.goalAdds[goalId] = (store.goalAdds[goalId] || 0) + amount;
    saveStore(store);
    const goal = GOALS.find((g) => g.id === goalId);
    renderGoals();
    document.getElementById('goal-note').textContent = `Added ${money(amount)} to ${goal.label} — now ${money(savedFor(goal))} of ${money(goal.target)}.`;
  });
}

function renderTips() {
  document.getElementById('page').innerHTML = pageShell(
    'What actually works',
    'No lectures, no jargon — just the habits that keep this household out of the red. Each one is something the Parkers do, not something they read somewhere.',
    `<section class="panel"><h2>The 50 / 30 / 20 split, in plain English</h2>
      <p>Half the money goes on needs (rent, bills, food, getting to work), about a third on wants (pizza night, the cinema, new shoes that are not strictly needed), and a fifth gets put aside before anything else. On $6,030 coming in, that is roughly $3,015 / $1,810 / $1,205. The Parkers are not there yet — rent alone eats nearly a quarter — so they aim for it slowly, $50 more into savings each month.</p></section>
    <section class="panel"><h2>Groceries: one shop, one list, no second trips</h2>
      <p>The weekly shop is $180 on the list and $210 without one. The rule is simple: meals planned on Sunday, list written, one shop, no midweek top-ups unless something actually ran out. November's shops so far: $186, $172, $191, $164, $149, $178 — averaging $173 a shop, $7 under the $180 target. Even so, six shops by the 25th puts groceries $320 over the $720 plan: November has five weekends, and the last shop was a big freezer stock-up for December. That one was planned, not a slip — and it is why the budget page shows groceries in the red instead of pretending otherwise.</p></section>
    <section class="panel"><h2>Pay yourself first, even if it is $25</h2>
      <p>On payday, $150 moves to the emergency cushion before anything is spent. Not because $150 changes everything — because it happens every month without thinking. Eleven months of it is $1,650 of the $4,210 in the cushion; the rest came from the tax refund in April and selling Dan's old motorbike. Slow and boring beats big and never.</p></section>
    <section class="panel"><h2>The 48-hour rule for anything over $60</h2>
      <p>Anything that is not food, fuel or a bill waits two days. Most of it never gets bought. The car service ($140 on the 24th) passed the test — brakes are not a want. The second pair of trainers did not.</p></section>
    <section class="panel"><h2>One number to check on Sunday night</h2>
      <p>Not the whole budget — just "money left until payday". If it is above $400 with a week to go, the week is easy. Below $200, cook from the freezer and skip the takeaway. November 25th: $2,588 left, five days to go. Easy week.</p></section>
    <section class="panel"><h2>Where the numbers come from</h2>
      <p>Every figure on this site is the Parker household's own November 2026 record — pay slips, the rent statement, and the receipts from GreenMart and the market. Change any of it on the Budget or Spending pages and the site re-computes from your numbers instead.</p></section>`,
  );
}

// ---- routing -----------------------------------------------------------

const ROUTES = {
  '/dashboard': { render: renderDashboard, label: 'Dashboard' },
  '/budget': { render: renderBudget, label: 'Budget' },
  '/spending': { render: renderSpending, label: 'Spending' },
  '/goals': { render: renderGoals, label: 'Savings goals' },
  '/tips': { render: renderTips, label: 'Tips that work' },
};

function currentRoute() {
  const hash = window.location.hash.replace(/^#/, '') || '/dashboard';
  return ROUTES[hash] ? hash : '/dashboard';
}

function render() {
  const route = currentRoute();
  document.querySelectorAll('.site-nav a').forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + route);
    if (link.getAttribute('href') === '#' + route) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  ROUTES[route].render();
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', render);
render();
