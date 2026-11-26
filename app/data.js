// HomeBase seed data: the Parker household, November 2026.
//
// Maya (nurse, night shift) and Dan (warehouse supervisor) bring home
// $5,850 a month between them, plus about $180 from Maya's weekend
// market stall. Two kids, Leo (9) and June (6). Rent is the big fixed
// cost; groceries are the one they actually argue about. Everything here
// is the household's own numbers — edit them on the Budget page and the
// whole site re-computes.

export const HOUSEHOLD = {
  name: 'The Parker household',
  members: 'Maya, Dan, Leo (9) and June (6)',
  month: 'November 2026',
  currency: 'USD',
};

export const INCOME = [
  { source: "Maya's nursing pay", amount: 3420, note: 'Take-home, after tax' },
  { source: "Dan's warehouse pay", amount: 2430, note: 'Take-home, after tax' },
  { source: 'Weekend market stall', amount: 180, note: 'Maya sells jam and pickles' },
];

// Planned monthly budget per category, in dollars.
export const BUDGETS = [
  { id: 'housing', label: 'Housing', planned: 1450, color: '#2f6f5e', note: 'Rent + renter insurance' },
  { id: 'groceries', label: 'Groceries', planned: 720, color: '#4a9b6d', note: 'Weekly shop, ~$180 a week' },
  { id: 'utilities', label: 'Utilities', planned: 310, color: '#7fb069', note: 'Power, water, internet, phones' },
  { id: 'transport', label: 'Transport', planned: 380, color: '#e9a23b', note: 'Fuel, bus passes, car service' },
  { id: 'kids', label: 'Kids & school', planned: 340, color: '#d97b4f', note: 'Lunches, clubs, shoes that never last' },
  { id: 'health', label: 'Health', planned: 210, color: '#5b8dbf', note: 'Prescriptions, dentist, glasses' },
  { id: 'dining', label: 'Eating out', planned: 160, color: '#b07cc6', note: 'One pizza night a week, roughly' },
  { id: 'fun', label: 'Fun & treats', planned: 120, color: '#e0789a', note: 'Movies, books, the odd takeaway coffee' },
];

// What the household actually spent so far this month, one row each.
// `date` is the day of November 2026.
export const TRANSACTIONS = [
  { id: 1, date: 1, category: 'housing', label: 'Rent — November', amount: 1380 },
  { id: 2, date: 1, category: 'utilities', label: 'Internet bill', amount: 65 },
  { id: 3, date: 2, category: 'groceries', label: 'Weekly shop — GreenMart', amount: 186 },
  { id: 4, date: 3, category: 'transport', label: 'Fuel', amount: 52 },
  { id: 5, date: 4, category: 'kids', label: 'Leo school lunches (2 weeks)', amount: 48 },
  { id: 6, date: 5, category: 'dining', label: 'Pizza night', amount: 34 },
  { id: 7, date: 7, category: 'groceries', label: 'Weekly shop — GreenMart', amount: 172 },
  { id: 8, date: 8, category: 'health', label: "June's dentist check-up", amount: 85 },
  { id: 9, date: 9, category: 'transport', label: 'Bus passes — Maya & Dan', amount: 96 },
  { id: 10, date: 10, category: 'fun', label: 'Cinema — Leo + June', amount: 31 },
  { id: 11, date: 12, category: 'groceries', label: 'Weekly shop — GreenMart', amount: 191 },
  { id: 12, date: 13, category: 'utilities', label: 'Power bill', amount: 118 },
  { id: 13, date: 14, category: 'kids', label: 'June new shoes', amount: 54 },
  { id: 14, date: 15, category: 'dining', label: 'Takeaway — tired Friday', amount: 42 },
  { id: 15, date: 16, category: 'transport', label: 'Fuel', amount: 47 },
  { id: 16, date: 17, category: 'groceries', label: 'Weekly shop — GreenMart', amount: 164 },
  { id: 17, date: 18, category: 'health', label: 'Prescriptions refill', amount: 38 },
  { id: 18, date: 19, category: 'kids', label: 'Leo football club fees', amount: 60 },
  { id: 19, date: 20, category: 'fun', label: 'Books for June', amount: 22 },
  { id: 20, date: 21, category: 'groceries', label: 'Weekly shop — market', amount: 149 },
  { id: 21, date: 22, category: 'dining', label: 'Pizza night', amount: 36 },
  { id: 22, date: 23, category: 'utilities', label: 'Water bill', amount: 54 },
  { id: 23, date: 24, category: 'transport', label: 'Car service — oil + brakes', amount: 140 },
  { id: 24, date: 25, category: 'groceries', label: 'Weekly shop — GreenMart', amount: 178 },
];

// Savings goals. `saved` is what is in the pot today.
export const GOALS = [
  {
    id: 'emergency',
    label: 'Emergency cushion',
    target: 6000,
    saved: 4210,
    note: 'Three months of rent, more or less. The one we never touch unless the car dies or a shift gets cut.',
  },
  {
    id: 'holiday',
    label: 'Summer trip to the coast',
    target: 1800,
    saved: 640,
    note: 'A week by the sea in July. Leo wants to learn to surf; June wants an ice cream every single day.',
  },
  {
    id: 'car',
    label: 'Next car fund',
    target: 4500,
    saved: 1120,
    note: 'The old hatchback is on 148,000 miles. We are saving so the next one is a choice, not a panic buy.',
  },
];

// Past months, for the trend chart: total spent and total saved each month.
export const HISTORY = [
  { month: 'Jun', spent: 4180, saved: 410 },
  { month: 'Jul', spent: 4520, saved: 260 },
  { month: 'Aug', spent: 4310, saved: 390 },
  { month: 'Sep', spent: 4090, saved: 480 },
  { month: 'Oct', spent: 4275, saved: 355 },
  { month: 'Nov', spent: 0, saved: 0 }, // filled in live from this month's numbers
];
