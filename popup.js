document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('toggle');
  const keywordsInput = document.getElementById('keywords');
  const countEl = document.getElementById('count');
  const themeToggle = document.getElementById('themeToggle');
  const resetBtn = document.getElementById('reset');

  const DEFAULT_KEYWORDS = [
    "i'm honored", "i am honored", "i’m thrilled", "i am thrilled",
    "humbled to", "grateful for", "i am grateful", "i’m grateful",
    "beyond excited", "so excited to", "i'm excited", "i am excited",
    "blessed", "truly blessed", "dream come true", "a proud moment",
    "so proud to", "feeling proud", "humbled and grateful",
    "honoured", "i feel honoured", "#grateful", "#blessed",
    "delighted to announce", "thrilled to be", "super excited",
    "can’t believe", "incredibly grateful", "i am beyond",
    "never thought", "overwhelmed with", "it's official",
    "happy to share", "excited to share", "i’m happy to", "i am happy to",
    "an amazing journey", "the journey has been", "my heart is full",
    "starting a new chapter", "i’m proud to share"
  ];

  chrome.storage.local.get(['enabled', 'keywords', 'count', 'lastDate', 'theme'], (data) => {
    const today = new Date().toISOString().split('T')[0];

    if (data.lastDate !== today) {
      chrome.storage.local.set({ count: 0, lastDate: today });
      data.count = 0;
    }

    toggle.checked = data.enabled ?? true;

    if (!data.keywords || data.keywords.length === 0) {
      chrome.storage.local.set({ keywords: DEFAULT_KEYWORDS });
      keywordsInput.value = DEFAULT_KEYWORDS.join(', ');
    } else {
      keywordsInput.value = data.keywords.join(', ');
    }

    countEl.textContent = "Posts hidden today: " + (data.count ?? 0);

    const defaultTheme = data.theme ?? 'dark';
    themeToggle.checked = (defaultTheme === 'dark');
    setTheme(defaultTheme);
    chrome.storage.local.set({ theme: defaultTheme });
  });

  toggle.addEventListener('change', () => {
    chrome.storage.local.set({ enabled: toggle.checked });
  });

  document.getElementById('save').addEventListener('click', () => {
    const keywords = keywordsInput.value.split(',').map(k => k.trim().toLowerCase()).filter(k => k);
    chrome.storage.local.set({ keywords });
    alert("Keywords saved!");
  });

  resetBtn.addEventListener('click', () => {
    chrome.storage.local.set({ keywords: DEFAULT_KEYWORDS });
    keywordsInput.value = DEFAULT_KEYWORDS.join(', ');
    alert("Keywords reset to default!");
  });

  themeToggle.addEventListener('change', () => {
    const theme = themeToggle.checked ? 'dark' : 'light';
    chrome.storage.local.set({ theme });
    setTheme(theme);
  });

  function setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
  }

  chrome.storage.onChanged.addListener((changes, namespace) => {
    if (changes.count) {
      countEl.textContent = "Posts hidden today: " + changes.count.newValue;
    }
  });
});