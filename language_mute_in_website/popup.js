document.getElementById('apply').addEventListener('click', () => {
    // �I�����ꂽ������擾
    const selectedLanguages = Array.from(document.querySelectorAll('input[name="language"]:checked'))
        .map(el => el.value);

    // �X�g���[�W�ɕۑ�
    chrome.storage.local.set({ languages: selectedLanguages }, () => {
        alert('Language selection applied!');
        // ���݂̃^�u�ɑ΂��ăX�N���v�g���Ď��s����
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                files: ['content.js']
            });
        });
    });
});
