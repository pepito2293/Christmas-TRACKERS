const DEFAULT_USER = {
  id: 'demo-user',
  email: 'demo@noeltracker.app',
  name: 'Utilisateur démo'
};

const STORE_KEY = '__base44_store__';
const USER_KEY = '__base44_user__';

const globalStore = (() => {
  if (typeof globalThis !== 'undefined') {
    if (!globalThis.__BASE44_STORE) {
      globalThis.__BASE44_STORE = { gifts: [], budgets: [] };
    }
    return globalThis.__BASE44_STORE;
  }
  return { gifts: [], budgets: [] };
})();

const ensureArrays = () => {
  if (!Array.isArray(globalStore.gifts)) {
    globalStore.gifts = [];
  }
  if (!Array.isArray(globalStore.budgets)) {
    globalStore.budgets = [];
  }
};

const loadFromLocalStorage = () => {
  if (typeof window === 'undefined' || !window.localStorage) {
    return;
  }
  try {
    const raw = window.localStorage.getItem(STORE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        globalStore.gifts = Array.isArray(parsed.gifts) ? parsed.gifts : [];
        globalStore.budgets = Array.isArray(parsed.budgets) ? parsed.budgets : [];
      }
    }
  } catch (error) {
    console.warn('Impossible de charger les données locales Base44', error);
  }
};

const persistToLocalStorage = () => {
  if (typeof window === 'undefined' || !window.localStorage) {
    return;
  }
  try {
    window.localStorage.setItem(STORE_KEY, JSON.stringify(globalStore));
  } catch (error) {
    console.warn('Impossible de sauvegarder les données locales Base44', error);
  }
};

if (typeof window !== 'undefined') {
  loadFromLocalStorage();
}

const delay = (result) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(result), 200);
  });

const generateId = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;

const matchesFilters = (item, filters = {}) =>
  Object.entries(filters).every(([key, value]) => {
    if (value === undefined || value === null || value === '') {
      return true;
    }
    return item[key] === value;
  });

const sortCollection = (items, sort) => {
  if (!sort) return items;
  const isDesc = sort.startsWith('-');
  const field = isDesc ? sort.slice(1) : sort;
  return [...items].sort((a, b) => {
    const av = a[field];
    const bv = b[field];
    if (av === bv) return 0;
    if (av == null) return 1;
    if (bv == null) return -1;
    if (av > bv) return isDesc ? -1 : 1;
    if (av < bv) return isDesc ? 1 : -1;
    return 0;
  });
};

const createEntityClient = (key) => ({
  async filter(filters = {}, sort) {
    ensureArrays();
    const filtered = globalStore[key].filter((item) => matchesFilters(item, filters));
    return delay(sortCollection(filtered, sort));
  },
  async create(data) {
    ensureArrays();
    const now = new Date().toISOString();
    const record = {
      id: generateId(),
      created_date: now,
      updated_date: now,
      ...data,
    };
    globalStore[key].push(record);
    persistToLocalStorage();
    return delay(record);
  },
  async update(id, data) {
    ensureArrays();
    const index = globalStore[key].findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error(`Enregistrement ${id} introuvable pour ${key}`);
    }
    const updated = {
      ...globalStore[key][index],
      ...data,
      id,
      updated_date: new Date().toISOString(),
    };
    globalStore[key][index] = updated;
    persistToLocalStorage();
    return delay(updated);
  },
  async delete(id) {
    ensureArrays();
    globalStore[key] = globalStore[key].filter((item) => item.id !== id);
    persistToLocalStorage();
    return delay({ success: true });
  },
});

const loadUser = () => {
  if (typeof window === 'undefined' || !window.localStorage) {
    return DEFAULT_USER;
  }
  try {
    const raw = window.localStorage.getItem(USER_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (error) {
    console.warn('Impossible de charger les informations utilisateur Base44', error);
  }
  return DEFAULT_USER;
};

const saveUser = (user) => {
  if (typeof window === 'undefined' || !window.localStorage) {
    return;
  }
  try {
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.warn('Impossible de sauvegarder les informations utilisateur Base44', error);
  }
};

export const base44 = {
  auth: {
    async me() {
      const user = loadUser();
      saveUser(user);
      return delay(user);
    },
  },
  entities: {
    Gift: createEntityClient('gifts'),
    Budget: createEntityClient('budgets'),
  },
};

export default base44;
