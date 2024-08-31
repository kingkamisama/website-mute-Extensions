function hideTextByLanguage(node, regex) {
    if (node.nodeType === Node.TEXT_NODE) {
        if (regex.test(node.textContent)) {
            node.parentNode.style.display = 'none';
        }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
        node.childNodes.forEach(child => hideTextByLanguage(child, regex));
    }
}

// ストレージからユーザーの選択を取得
chrome.storage.local.get('languages', (data) => {
    const languages = data.languages || [];
    const regexes = {
        ar: /[\u0600-\u06FF]/, // アラビア語
        th: /[\u0E00-\u0E7F]/, // タイ語
        en: /[a-zA-Z]/,       // 英語
        ja: /[\u3040-\u309F\u30A0-\u30FF\u31F0-\u31FF\u4E00-\u9FAF]/, // 日本語
        sa: /[\u0900-\u097F]/, // サンスクリット語 (デーヴァナーガリー文字)
        vi: /[\u0102-\u0103\u1E00-\u1E9F\u2C60-\u2C7F]/ // ベトナム語
    };

    // 選択された言語に応じた正規表現を適用
    languages.forEach(lang => {
        const regex = regexes[lang];
        if (regex) {
            hideTextByLanguage(document.body, regex);
        }
    });

    // 動的に追加されるコンテンツにも対応
    const observer = new MutationObserver(() => {
        languages.forEach(lang => {
            const regex = regexes[lang];
            if (regex) {
                hideTextByLanguage(document.body, regex);
            }
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });
});
