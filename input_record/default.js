

const def_history_style_str = `
<style id="addon_historytag_style">
.addon_historytag {
  user-select: none;
  cursor: pointer;
  color: #296fa8;
  align-items: center;
  border-radius: .375em;
  border: 2px solid #eff5fb;
  display: inline-flex;
  font-size: .75rem;
  height: 2em;
  justify-content: center;
  white-space: nowrap;
}
.addon_historytag_primary, .addon_historytag_delete {
  height: 100%;
  text-align: center;
  line-height: 1.6rem;
  outline: 0;
}
.addon_historytag_primary{
  background-color: #eff5fb;
  padding-left: 0.75em;
  padding-right: 0.75em;
}
.addon_historytag_delete{
  background-color: white;
  width: 16px;
  font-size: .5rem;
  font-weight: bold;
}
</style>
`
// 
// スタイルが存在するかチェックして追加
const def_init_history_style = () => {
  console.log(document.getElementById("addon_historytag_style"))
  if (document.getElementById("addon_historytag_style") === null || document.getElementById("addon_historytag_style") === undefined) {
    document.getElementsByTagName("head")[0].insertAdjacentHTML("beforeend", def_history_style_str)
  }
}
// 
// 履歴要素追加用のアウター
const def_history_outer_str = `
<div id="addon_history_outer" style="margin: .2em;"></div>
`
//
// インナー要素を返す関数を定義
const def_output_inner_base = (text_content) => {
  return `
    <span class="addon_historytag">
    <span class="addon_historytag_primary" data-addon-historytag-event="false" data-addon-historytag-text="${text_content}">
    ${text_content}
    </span>
    <span class="addon_historytag_delete" data-addon-historytag-event="false" data-addon-historytag-text="${text_content}">✕</span>
    </span>
    `
}
// 
// 初期化➤連続追加
const def_init_tag_show = (options) => {
  document.getElementById("addon_history_outer").innerText = ""
  options.history_text_list.forEach((val) => {
    document.getElementById("addon_history_outer").insertAdjacentHTML("beforeend", def_output_inner_base(val))
  })
}
// 
// タグ全てにイベントを付与する
const def_init_tag_event = (target_el, options) => {
  // promary
  Array.from(document.getElementsByClassName("addon_historytag_primary")).forEach((val) => {
    if (val.dataset.addonHistorytagEvent === "false") {
      val.addEventListener("click", (e) => {
        target_el.value = e.target.dataset.addonHistorytagText
      })
      val.dataset.addonHistorytagEvent = "true"
    }
  })
  // delete
  Array.from(document.getElementsByClassName("addon_historytag_delete")).forEach((val) => {
    if (val.dataset.addonHistorytagEvent === "false") {
      val.addEventListener("click", (e) => {
      	
        // 配列から削除
        options.history_text_list = options.history_text_list.filter((val) => {
          return val !== e.target.dataset.addonHistorytagText
        })
        // 保存
        chrome.storage.sync.set(options)
        // 再表示 再イベント付与
        def_init_tag_show(options)
        def_init_tag_event(target_el, options)
      })
      val.dataset.addonHistorytagEvent = "true"
    }
  })
}

// 
// 取得 => 保存 => 反映、のイベント定義
const def_add_and_render = (e) => {
  chrome.storage.sync.get(null, (options) => {
    console.log([e, e.target, e.target.value])
    // HTMLが異なる input 要素のイベント発火の場合は処理しない
    if (e.target.outerHTML !== options.input_text_string) return
    // 空白の場合は追加しない
    if (e.target.value === "") return
    // 配列にすでに含まれる場合は追加しない
    if (options.history_text_list.indexOf(e.target.value) !== -1) return
    // 配列追加
    options.history_text_list.push(e.target.value)
    // 保存
    chrome.storage.sync.set(options)
    // 反映 履歴要素連続挿入
    def_init_tag_show(options)
    def_init_tag_event(e.target, options)
  })
}