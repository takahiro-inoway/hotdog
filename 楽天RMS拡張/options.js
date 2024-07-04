window.onload = () => {
  let addon_options = null

  chrome.storage.sync.get(null, (options) => {
    addon_options = options
    Array.from(document.getElementsByClassName('addon_options')).forEach((val, ind) => {
      // チェック状態
      try {
        val.checked = addon_options.addon_options_status[val.dataset.opname]
      } catch {
        val.checked = false
      }
      // イベント付与
      val.addEventListener('change', (e) => {
        addon_options.addon_options_status = { ...addon_options.addon_options_status, [e.target.dataset.opname]: e.target.checked }
        // 保存
        chrome.storage.sync.set(addon_options);
      }, false)
    })

  });


}