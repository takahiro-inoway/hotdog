

const popup = () => {
  // ------------------------------------------------------------

  document.getElementById("start_btn").addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: addevent_input_target,
    })
  })

  chrome.storage.sync.get(null, (options) => {
    document.getElementById("site_detail_tbody").insertAdjacentHTML("beforeend", `
  <td>
  URL<span class="tag is-small m_02">${options.site_host}${options.site_pathname}</span>
  <br>
  入力<span class="tag is-small m_02">${options.placeholder}</span>
  </td>
  `)
  })

  // ------------------------------------------------------------

  const addevent_input_target = () => {
    // input text のみ取得
    const inputs = Array.from(document.getElementsByTagName("input")).filter((val, ind) => {
      return val.type === "text" || val.type === "search" || val.tagName === "textarea"
    })
    console.log(inputs)
    // input text が1つもなければリターン
    if (inputs === null) {
      alert("有効な入力箇所がありませんでした。")
      return
    }
    if (inputs.length === 0) {
      alert("有効な入力箇所がありませんでした。")
      return
    }
    // スタイルを付与しておく
    def_init_history_style()
    // target をストレージに格納しつつ、イベント削除、スタイル戻し を行う
    const set_target = (e) => {
      // ストレージに保存
      const options = {
        input_text_string: e.target.outerHTML,
        history_text_list: [],
        site_host: location.host,
        site_pathname: location.pathname,
        placeholder: e.target.getAttribute("placeholder")
      }
      chrome.storage.sync.set(options)
      // 今存在している履歴要素追加用のアウターを削除
      if (document.getElementById("addon_history_outer") !== null) document.getElementById("addon_history_outer").remove()
      // 履歴要素追加用のアウター挿入
      e.target.insertAdjacentHTML("afterend", def_history_outer_str)

      // 全ての input text のチェンジイベントを削除
      inputs.forEach((val, ind) => {
        val.removeEventListener("change", def_add_and_render)
      })

      // 入力時用に新たにイベント付与
      e.target.addEventListener("change", def_add_and_render, false)

      // 全ての input text のクリックイベントを削除
      inputs.forEach((val, ind) => {
        val.removeEventListener("click", set_target)
      })

    }
    // 全ての input text にイベントを付与、他をする
    inputs.forEach((val, ind) => {
      // イベントを付与
      val.addEventListener("click", set_target, false)
    })
  }
}

window.onload = () => {
  // 実行
  popup()
}
