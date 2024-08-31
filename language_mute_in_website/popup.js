document.getElementById('apply').addEventListener('click', () => {
    // 選択された言語を取得
    const selectedLanguages = Array.from(document.querySelectorAll('input[name="language"]:checked'))
        .map(el => el.value);

    // ストレージに保存
    chrome.storage.local.set({ languages: selectedLanguages }, () => {
        alert('Language selection applied!');
        // 現在のタブに対してスクリプトを再実行する
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                files: ['content.js']
            });
        });
    });
});
