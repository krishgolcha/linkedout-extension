LinkedOut is a lightweight Chrome extension that filters out humblebraggy, fluff-filled, and corporate buzzword-heavy posts from your LinkedIn feed — so you can scroll in peace.

---

## 🚀 Features

- ✅ Automatically hides posts containing annoying buzzwords
- 🎯 Customize your own keyword filter list
- ♻️ One-click reset to default keyword set
- 🌙 Built-in dark mode
- 🔢 Tracks how many posts were hidden today
- 💾 Saves everything locally – no data collection

---

## 🧪 How to Install

1. Download or clone this repo
2. Go to `chrome://extensions` in your browser
3. Enable **Developer Mode**
4. Click **Load unpacked** and select this folder
5. Visit LinkedIn and enjoy a cleaner feed 🎉

---

## 🛡️ Privacy

We do **not** collect or transmit any user data. All preferences and keyword filters are stored **locally in your browser** using `chrome.storage.local`.

Read the [Privacy Policy](https://docs.google.com/document/d/1u6K12Dtwmh7VuNj6a6na-27iFmpVqPopam8XuQAiWfY/edit?tab=t.0)

---

## 📬 Contact

Questions, ideas, or bug reports?  
Open an issue or email: golcha.krish@gmail.com

---

## 📄 License

MIT License – Free to use and modify
"""

readme_path = Path("/mnt/data/README.md")
readme_path.write_text(readme_content.strip())
readme_path
