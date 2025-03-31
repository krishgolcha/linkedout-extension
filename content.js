let BLOCK_KEYWORDS = [
  "i’m honored", "i’m thrilled", "humbled to", "grateful for",
  "beyond excited", "blessed", "dream come true",
  "so proud to", "honoured", "#grateful", "#blessed"
];

let enabled = true;
let hiddenCount = 0;

function hideFluffPosts() {
  if (!enabled) return;

  const posts = document.querySelectorAll('div.feed-shared-update-v2');

  posts.forEach(post => {
    if (post.dataset.cleaned) return; // prevent double-processing

    const text = post.innerText.toLowerCase();
    const shouldHide = BLOCK_KEYWORDS.some(keyword => text.includes(keyword));

    if (shouldHide) {
      post.style.display = "none";
      post.dataset.cleaned = "true";
      hiddenCount++;
      chrome.storage.local.set({ count: hiddenCount });
      console.log("🧹 Hid a post:", text.slice(0, 60));
    }
  });
}

function loadSettingsAndRun() {
  chrome.storage.local.get(['enabled', 'keywords', 'count'], (data) => {
    enabled = data.enabled ?? true;
    BLOCK_KEYWORDS = (data.keywords && data.keywords.length > 0)
      ? data.keywords
      : BLOCK_KEYWORDS;
    hiddenCount = data.count ?? 0;

    hideFluffPosts();

    const observer = new MutationObserver(hideFluffPosts);
    observer.observe(document.body, { childList: true, subtree: true });
  });
}

loadSettingsAndRun();