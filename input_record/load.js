



// ------------------------------------------------------------
// 保存されている要素を取得する
chrome.storage.sync.get(null, (options) => {

  // 
  // 処理判定 ======
  // ストレージに保存している対象のサイトではない場合リターン
  if (location.host !== options.site_host) return
  if (location.pathname !== options.site_pathname) return

  // 
  // スタイルを付与しておく =======
  def_init_history_style()

  // 
  // 取得 ======

  let target_html_str = ""
  target_html_str = options.input_text_string

  const target_elem = Array.from(document.getElementsByTagName("input")).filter((val, ind) => {
    return val.outerHTML === target_html_str
  })

  // 
  // 初期化 ======

  // 履歴要素追加用のアウター挿入
  target_elem[0].insertAdjacentHTML("afterend", def_history_outer_str)


  // 履歴要素連続挿入
  if (options.history_text_list.length !== 0) {
    def_init_tag_show(options)
    def_init_tag_event(target_elem[0], options)
  }

  // 
  // イベント付与 ======
  target_elem[0].removeEventListener("change", def_add_and_render)
  target_elem[0].addEventListener("change", def_add_and_render, false)

});









