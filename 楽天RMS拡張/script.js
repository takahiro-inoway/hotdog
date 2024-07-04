
// flaner 277064 flaner 277064 f
// kitchin 274608 smartkitchen 274608 s
// baby 338542 flaner-baby 338542 b 
// passage 260492 passageshop p
// mens 338541 passage-mens z
// nail 247858 nailco
// gourmet tokusen-gourmet

const SHOP_DESC = {
  "smartkitchen": 277064,
  277064: {
    code: 277064,
    name: "flaner",
    imgname: "flaner",
    ini: "f",
    yahoo: "flaner-y"
  },
  "smartkitchen": 274608,
  274608: {
    code: 274608,
    name: "kitchen",
    imgname: "smartkitchen",
    ini: "s",
    yahoo: "smartkitchen"
  },
  "flaner-baby": 338542,
  338542: {
    code: 338542,
    name: "baby",
    imgname: "flaner-baby",
    ini: "b",
    yahoo: "flaner-baby"
  },
  "passageshop": 260492,
  260492: {
    code: 260492,
    name: "passage",
    imgname: "passageshop",
    ini: "p",
    yahoo: "passageshop"
  },
  "passage-mens": 338541,
  338541: {
    code: 338541,
    name: "mens",
    imgname: "passage-mens",
    ini: "z",
    yahoo: "passage-mens"
  },
  "nailco": 247858,
  247858: {
    code: 247858,
    name: "nail",
    imgname: "nailco",
    ini: "n",
    yahoo: "nailco"
  },
  "tokusen-gourmet": 111111,
  111111: {
    code: 111111,
    name: "gourmet",
    imgname: "tokusen-gourmet",
    ini: "n",
    yahoo: "tokusen-gourmet"
  },
}


// 画面読み込みが終わってから実行し始める
window.onload = function () {
  console.log("onload")

  // XPathを使って要素を取得する関数
  const getElementByXPath = (xpath, context) => {
    context = context || document;
    var result = document.evaluate(xpath, context, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    return result.singleNodeValue;
  }
  // ----------------------------------------------------------------
  // 処理定義
  // ----------------------------------------------------------------


  // ----------------------------------------------------------------
  // RMS
  // ----------------------------------------------------------------
  //
  // CSVダウンロード画面
  const addon_rms_item_download = () => {


    // head タグの要素取得、これを起点にボタンを配置する
    // ※なぜheadなのか➤まだ読み込みされていない要素がある可能性があるので、確実そうなheadを起点にしておく
    const target_head = Array.from(document.getElementsByTagName("head"))[0]
    // UIkit(CSSライブラリ)のCDN(インポート)をheadに配置
    // ※ボタンなどのスタイルをきれいにする＋UIkitの機能を使ってNotificationを表示したりするのに使う
    // ※詳しくは公式を確認➤https://getuikit.com/docs/notification#html-message
    // 配置する文字列
    const uikit_cdn = `
      <!-- UIkit CSS -->
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/uikit@3.19.2/dist/css/uikit.min.css" />
      
      <!-- UIkit JS -->
      <script src="https://cdn.jsdelivr.net/npm/uikit@3.19.2/dist/js/uikit.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/uikit@3.19.2/dist/js/uikit-icons.min.js"></script>

      <style>
      #addon_area {
        z-index: 2147483645;
        position: fixed;
        bottom: 80px;
        left: 25px;
        cursor: pointer;
      }
      .addon_btn{
        margin-bottom: 0.5rem;
      }
      .uk-table-small td{
        padding: 2px !important;
        background: white;
      }
      </style>
    `
    // headの内側に追加
    target_head.insertAdjacentHTML("afterbegin", uikit_cdn)
    // ボタンを配置
    // 配置する文字列
    const checkarr = [
      '商品番号',
      'システム連携用SKU番号',
      '在庫切れ時の注文受付',
      '在庫切れ時納期管理番号',
      '販売価格',
      '消費税',
      '送料',
      '配送方法セット管理番号',
      'ポイント変倍率',
      '商品名'
    ]
    const addon_btn_1 = `
      <div id="addon_area">
      <table id="addon_table" class="uk-table uk-table-small" style="display: none;">
      <tbody style="font-size: 11px;">
      ${"<tr><td class='addon_td'>" + checkarr.join('</td><td style="color: red;">-</td></tr><tr><td class="addon_td">') + "</td><td style='color: red;'>-</td></tr>"}
      </tbody>
      </table>
      <button id='addon_btn_1' class='addon_btn uk-button uk-button-primary uk-button-small'>早朝DL一括選択(お試し版)</button>
      <br>
      <button id='addon_btn_2' class='addon_btn uk-button uk-button-primary uk-button-small'>全選択(お試し版)</button>  
      <br>
      <button id='addon_btn_3' class='addon_btn uk-button uk-button-primary uk-button-small'>あす楽(お試し版)</button>  
      </div>
    `
    // HTMLに挿入
    target_head.nextElementSibling.firstChild.insertAdjacentHTML('afterbegin', addon_btn_1)


    //
    // 文字列の配列を受け取って合致するものをチェック
    // 
    const play_checked = (arr) => {

      let rms_check_label_arr = Array.from(document.getElementsByClassName("rms-check-label"))

      let names = rms_check_label_arr.map(val => val.firstChild.getAttribute("name"))
      let name_elem_arr = {}
      rms_check_label_arr.forEach((val, ind) => {
        name_elem_arr[val.firstChild.getAttribute("name")] = val
      })

      let err = ""
      arr.forEach((val, ind) => {
        // 存在チェック
        if (names.indexOf(val) === -1) {
          err += "【" + val + "】が選択できませんでした。 "
          return
        }
        // クリック操作
        name_elem_arr[val].click()

        // 表に✓を入れる
        Array.from(document.getElementsByClassName("addon_td")).forEach((td_val, td_ind) => {
          if (td_val.textContent === val) {
            if (td_val.nextElementSibling.textContent === "✓") {
              td_val.nextElementSibling.textContent = "-"
            } else {
              td_val.nextElementSibling.textContent = "✓"
            }
          }
        })

      })

      // アラート
      if (err !== "") alert(err)

      // 最終更新日にフォーカスを合わせておく
      document.getElementsByClassName("rms-datepicker")[0].firstChild.value = ""
      document.getElementsByClassName("rms-datepicker")[0].firstChild.focus()

    }

    // ボタンにイベントを付与
    document.getElementById("addon_btn_1").addEventListener("click", () => {
      /*
      取込項目
      ・商品番号 12
      ・システム連携用SKU番号 13
      ・在庫切れ時の注文受付 17
      ・在庫切れ時納期管理番号 24
      ・販売価格 27
      ・消費税 30
      ・送料 33
      ・配送方法セット管理番号 39
      ・ポイント変倍率 43
      ・商品名 55
      */
      // チェックテーブル表示
      document.getElementById("addon_table").style.display = "table"
      play_checked([
        '商品番号',
        'システム連携用SKU番号',
        '在庫切れ時の注文受付',
        '在庫切れ時納期管理番号',
        '販売価格',
        '消費税',
        '送料',
        '配送方法セット管理番号',
        'ポイント変倍率',
        '商品名'
      ])
    }, false)



    // ボタンにイベントを付与
    document.getElementById("addon_btn_2").addEventListener("click", () => {
      /*
      取込項目
      ・商品番号 12
      ・システム連携用SKU番号 13
      ・在庫切れ時の注文受付 17
      ・在庫切れ時納期管理番号 24
      ・販売価格 27
      ・消費税 30
      ・送料 33
      ・配送方法セット管理番号 39
      ・ポイント変倍率 43
      ・商品名 55
      */
      // チェックテーブル非表示
      document.getElementById("addon_table").style.display = "none"
      play_checked([
        '管理',
        '在庫',
        '納期・最短お届け可能日表示',
        '価格',
        '配送',
        'ポイント変倍',
        '注文',
        '説明文',
        '画像・動画',
        '表示設定',
        'レイアウト',
        '製品情報',
        'バリエーション',
        '商品オプション'
      ])
    }, false)



    // ボタンにイベントを付与
    document.getElementById("addon_btn_3").addEventListener("click", () => {
      // あす楽設定作業用
      // チェックテーブル非表示
      document.getElementById("addon_table").style.display = "none"
      play_checked([
        '在庫数',
        '在庫切れ時の注文受付',
        '在庫あり時納期管理番号',
        'あす楽配送管理番号',
        '商品名'
      ])
    }, false)

  }


  //
  // 商品一覧 画面
  const addon_rms_shopsitems = () => {
    console.log("addon_rms_shopsitems")

    //
    // 画面表示後処理開始
    // 指定した時間（ミリ秒）待ってから処理を開始
    const addon_datatool_link_add = () => {
      const addon_datatool_link = () => {
        setTimeout(() => {
          try {
            // 分析ページへのリンクを表示
            const tr_arr = Array.from(document.getElementsByClassName("rms-table-data")[0].getElementsByTagName("tr"))
            tr_arr.forEach((val, ind) => {
              // 先頭2行はとばす
              if (ind < 2) return
              // もうすでに分析が入っている場合はとばす
              console.log(val.children[1].children.length)
              if (val.children[1].children.length > 3) return
              // 編集、コピーの下に表示
              const kanri_no = val.children[2].children[2].children[0].textContent
              console.log(kanri_no)
              const insert_html = `
                  <span class="color-default white-space nowrap">
                    <span style="cursor: pointer;" class="addon_datatool_link" data-kanrino="${kanri_no}" target="_blank" rel="noreferrer" class="link--2GfPp">
                      分析
                    </span>
                  </span>
                `
              val.children[1].insertAdjacentHTML("beforeend", insert_html)
            })
            Array.from(document.getElementsByClassName("addon_datatool_link")).forEach((val, ind) => {
              val.addEventListener("click", (e) => {
                // 別タブで分析画面を開く
                window.open('https://datatool.rms.rakuten.co.jp/access/item?kanrino=' + e.target.dataset.kanrino, '_blank')
              }, false)
            })
          } catch {
          }
        }, 1000);
      }
      addon_datatool_link()
      setTimeout(() => {
        // 検索、クリアボタンに分析表示イベント付与
        const searchtabs = document.getElementsByClassName("rms-search-tabs-content-footer")[0]
        Array.from(searchtabs.getElementsByTagName("button")).forEach((val, ind) => {
          val.addEventListener("click", addon_datatool_link, false)
        })
        // キーワード検索入力欄に分析表示イベント付与
        const searchfield = document.getElementsByClassName("rms-search-field rms-block")[0]
        Array.from(searchfield.getElementsByTagName("input")).forEach((val, ind) => {
          val.addEventListener("change", addon_datatool_link, false)
        })
        document.getElementById("sortingDropDown").addEventListener("change", addon_datatool_link, false)
      }, 1000);
    }
    if (addon_options.addon_options_status.r2_1) {
      addon_datatool_link_add()
    }


    // head タグの要素取得、これを起点にボタンを配置する
    // ※なぜheadなのか➤まだ読み込みされていない要素がある可能性があるので、確実そうなheadを起点にしておく
    const target_head = Array.from(document.getElementsByTagName("head"))[0]
    // UIkit(CSSライブラリ)のCDN(インポート)をheadに配置
    // ※ボタンなどのスタイルをきれいにする＋UIkitの機能を使ってNotificationを表示したりするのに使う
    // ※詳しくは公式を確認➤https://getuikit.com/docs/notification#html-message
    // 配置する文字列
    const uikit_cdn = `
      <!-- UIkit CSS -->
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/uikit@3.19.2/dist/css/uikit.min.css" />
      
      <!-- UIkit JS -->
      <script src="https://cdn.jsdelivr.net/npm/uikit@3.19.2/dist/js/uikit.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/uikit@3.19.2/dist/js/uikit-icons.min.js"></script>

      <style>
      #addon_area {
        z-index: 2147483645;
        position: fixed;
        bottom: 80px;
        left: 25px;
        cursor: pointer;
      }
      .addon_btn{
        margin-bottom: 0.5rem;
      }
      .uk-table-small td{
        padding: 2px !important;
        background: white;
      }
      .addon_rms-table-data{
        background-color: #fff;
        border: 1px solid #b2b2b2;
        border-collapse: collapse;
        margin-bottom: 16px;
      }
      .addon_rms-table-data thead tr {
        background-color: #f1f1f1;
      }
      .addon_rms-table-data tbody td,
      .addon_rms-table-data tbody th,
      .addon_rms-table-data thead td,
      .addon_rms-table-data thead th {
        padding: 4px;
        border: 1px solid #d0d0d0;
        background-clip: padding-box;
      }
      .addon_rms-table-data tbody th+td,
      .addon_rms-table-data tbody th[rowspan],
      .addon_rms-table-data thead th+td,
      .addon_rms-table-data thead th[rowspan] {
        border-left: 1px solid #b2b2b2;
      }
      #addon_save_table_outer{
        overflow: auto;
        height: 340px;
        margin-bottom: 20px;
        border-top: 1px solid #b2b2b2;
        border-bottom: 1px solid #b2b2b2;
        box-sizing: border-box;
      }
      #addon_save_table th{
        border-top: 1px solid #b2b2b2;
        position: sticky;
        top: -1px;
        left: 0;
        z-index: 999;
      }
      #addon_save_table thead tr th{
        background-color: #FFDFDF;
      }
      #addon_save_tbody tr{
        background-color: #FFF8F8;
      }
      .addon_rms-table-data tbody td{
        padding: 2px !important;
      }
      .addon_rms-table-data .ma-t-6{
        margin-top: 0 !important;
      }
      .bdrd_6{
        border-radius: 6px !important;
      }
      </style>
    `
    // headの内側に追加
    target_head.insertAdjacentHTML("afterbegin", uikit_cdn)

    // ボタンを配置
    const addon_btn_1 = `
      <div id="addon_area">
        <div id="addon_main_btn_area" class="uk-animation-slide-left" style="display: block;">
          <button id='addon_btn_1' class='addon_btn uk-button uk-button-primary uk-button-small bdrd_6'>拡張を開始</button>
          <br>
          <button id='addon_btn_2' class='addon_btn uk-button uk-button-muted uk-button-small bdrd_6'>リセット</button>
        </div>
        <button id='addon_btn_areaview' class='addon_btn uk-button uk-button-small bdrd_6' style='border: solid 1px #eee;background: white;font-size: 1.4rem;'>≪</button>
      </div>
    `
    // HTMLに挿入
    target_head.nextElementSibling.firstChild.insertAdjacentHTML('afterbegin', addon_btn_1)
    // ボタンエリア表示非表示
    document.getElementById("addon_btn_areaview").addEventListener("click", (e) => {
      if (e.target.textContent === "≪") {
        e.target.textContent = "≫"
        document.getElementById("addon_main_btn_area").style.display = "none"
      } else {
        e.target.textContent = "≪"
        document.getElementById("addon_main_btn_area").style.display = "block"
      }
    }, false)


    //
    // 文字列の配列を受け取って合致するものをチェック
    // 
    const play = (arr) => {

      // 拡張開始ボタンを消す
      document.getElementById("addon_btn_1").style.display = "none";

      // 検索ボックスまわりの要素を flex で囲って横並び可能にしておく
      const rms_content = document.getElementsByClassName("rms-content")[0].firstChild
      rms_content.insertAdjacentHTML("beforebegin", "<div id='addon_outerdiv' style='display: flex;'></div>")
      document.getElementById("addon_outerdiv").appendChild(rms_content)

      // 拡張要素のhtml
      const addon_kanren_area = `
      <div id="addon_kanren_div" class="rms-content-fixed--1V6OD" style="padding: 10px;">
      <div class="rms-grid pa-lr-0">
        <div class="rms-row">
          <div class="rms-col">
            <div class="ma-t-8">
              <div class="heading-selector">
                <div class="rms-heading-group rms-heading-group--cK-0e">
                  <h1>
                    <div class="rms-heading-group-content">Lstyle拡張機能</div>
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="rms-row">
          <div class="rms-col"></div>
        </div>
      </div>
      <div class="rms-search">
        <div class="rms-search-tabs">
          <ul class="nav nav-tabs nav-justified">
            <li class="nav-item">
              <a class="nav-link active">
                <p>関連リンク作成<span style="font-size: 0.7rem; color: red;">※プレビューのタイトル部分がうまく表示されない場合がありますがそのままコピペして問題ありません。</span></p>
              </a>
            </li>
          </ul>
    
          <div class="rms-search-tabs-content tab-content">
            <div class="tab-pane active">
              <div class="rms-search-tabs-content-pane">
                <div class="rms-form rms-form--1f23A form-padding-clear ma-b-0 form-full">
                  <div class="rms-form-col rms-form-col--mu3T6 rms-col">
                    <div class="rms-form-col-content">
                      <div class="rms-grid pa-lr-0">
                        <div class="rms-row align-items-center">

                          <div>
                            <div style="overflow-y: scroll; overflow-x: clip; height: 300px; background: white; width: 430px; margin: 2px;">
                              <div class="rms-row align-items-center">
                                <div id="addon_kanren_result">
                                </div>
                              </div>
                            </div>
                          </div>

                          <div>
                            <div>
                              <button onclick="document.getElementById('addon_reset_btn').click()" class="rms-btn btn-default btn-width-sm bdrd_6" style="width: 75px;">クリア</button>
                              <button onclick="document.getElementById('addon_close_btn').click()" class="rms-btn btn-red btn-fill btn-md btn-width-md bdrd_6" style="width: 116px;">拡張を閉じる</button>
                              <button id="addon_catch_btn_false" class="rms-btn btn-default btn-width-sm bdrd_6" style="display: inline-block;">ｷｬｯﾁ無</button>
                              <button id="addon_catch_btn_true" class="rms-btn btn-default btn-width-sm bdrd_6" style="background: #07c; color: white; display: none;">ｷｬｯﾁ有</button>
                            </div>
                            <div>
                              <textarea id="addon_kanren_textarea" rows="11" type="text" style="width: 280px; text-align: left !important; border: 1px solid #c5c6ca;" class="rms-input input-block text-right">
                              </textarea>
                            </div>
                            <div style="display: flex;">
                              <input id="addon_copy_btn" class="uk-button uk-button-primary uk-button-small bdrd_6" type="button" value="コピー">
                              <input id="addon_kanren_input" type="number" class="rms-input input-block text-right" maxlength="1" value="3" style="width: 4rem; text-align: left !important;">
                              個横並び
                            </div>
                          </div>

                          <div>
                            <div>
                              <font style="font-size: large; background: skyblue; color: white; font-weight: bold; font-family: Yu Gothic; padding: 0.5px 8px; font-style: italic;">ステッカー</font>
                              <br>(SP画面には挿入できない
                              <br>場合があります。)
                            </div>
                            <div id="addon_pop_btn_01" style="background: red; color: white; font-weight: bold; font-family: Yu Gothic; padding: 0.5px 8px; font-style: italic;" draggable="true">売れてます!!</div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

      `
      // flexで囲った要素内に要素が複数存在する場合は、関連リンク表示が既にあるので、関連リンク表示を一旦削除
      if (document.getElementById("addon_outerdiv").children.length > 1) {
        document.getElementById("addon_kanren_div").parentNode.removeChild(document.getElementById("addon_kanren_div"))
      }
      // 関連リンク表示を挿入
      document.getElementById("addon_outerdiv").insertAdjacentHTML("beforeend", addon_kanren_area)

      // 保存ボタンと保存テーブルの処理
      // 一旦元の要素は消す 検索結果要素に一つのテーブルしかなければしない
      if (Array.from(document.getElementById("searchResult").children).length > 1) {
        document.getElementById("addon_save_btn").parentNode.removeChild(document.getElementById("addon_save_btn"))
        document.getElementById("addon_save_table").parentNode.removeChild(document.getElementById("addon_save_table"))
      }
      // HTML文字列 ボタンエリアと保持テーブル
      const searchResult_save_html = `
      <div id="addon_btn_div">
        <button id="addon_selectend_btn" style="background: #07c; color: white; display: none;" class="rms-btn btn-blue btn-width-sm bdrd_6">選択終了</button>
        <button id="addon_selectstart_btn" style="display: inline-block;" class="rms-btn btn-blue btn-width-sm bdrd_6">選択開始</button>
        <button id="addon_reset_btn" class="rms-btn btn-default btn-width-sm bdrd_6">クリア</button>
        <button id="addon_close_btn" class="rms-btn btn-red btn-fill btn-md btn-width-md bdrd_6">拡張を閉じる</button>
      </div>
      <div id="addon_save_table_outer">
        <table id="addon_save_table" class="addon_rms-table-data">
          ${document.getElementsByClassName("rms-table-data")[0].children[0].outerHTML}
          <tbody id="addon_save_tbody">
          </tbody>
        </table>
      </div>
      `
      // 挿入
      document.getElementById("searchResult").insertAdjacentHTML("afterbegin", searchResult_save_html)
      // thを調整
      /*
      console.log(document.getElementById("addon_save_tbody").previousElementSibling.firstChild.nextElementSibling)
      Array.from((document.getElementById("addon_save_table").previousElementSibling).getElementsByTagName("tr")[1].getElementsByTagName("th")).forEach((val, ind) => {
        val.style.top = "5px"
      })
      */

      //
      //
      // ドラックドロップイベント判別用の変数を定義
      let Dd_Event = {
        Code: null,
        Target: null
      }
      //
      // 引数の要素内のimg全てに入れ替えイベントを付与する
      const img_dragdrop_exchange = (outer_element) => {
        let sta = null
        let end = null
        const dragstart = (e) => {
          Dd_Event.Code = "img_dragdrop_exchange"
          sta = e.target
          end = null
        }
        const dragover = (e) => {
          e.preventDefault();
        }
        const drop = (e) => {
          // イベント判別用変数の値でドロップ時の処理を分岐
          // 画像同士の場合
          if (Dd_Event.Code === "img_dragdrop_exchange") {
            end = e.target
            exchangerow_local(sta.dataset.index, end.dataset.index)
          }
          // ポップの場合
          if (Dd_Event.Code === "img_dragdrop_popinsert") {
            sta = Dd_Event.Target
            end = e.target
            codeinsert_local("savedPops", e.target.dataset.code)
            kanren_output()
          }
        }
        const imgs = outer_element.getElementsByTagName("img")
        Array.from(imgs).forEach((val, ind) => {
          val.draggable = true
          val.dataset.index = ind
          val.addEventListener("dragstart", dragstart, false)
          val.addEventListener("dragover", dragover, false)
          val.addEventListener("drop", drop, false)
        }, false)
      }

      //
      // 引数の要素内のimg全てにポップ表示イベントを付与する
      const img_dragdrop_popinsert = (pop_element, outer_element) => {
        const pop_dragstart = (e) => {
          Dd_Event.Code = "img_dragdrop_popinsert"
          Dd_Event.Target = e.target
        }
        pop_element.addEventListener("dragstart", pop_dragstart, false)
        // ポップにイベント付与
        const ptags = outer_element.getElementsByTagName("p")
        Array.from(ptags).forEach((val, ind) => {
          val.addEventListener("click", (e) => {
            codedelete_local("savedPops", e.target.nextElementSibling.dataset.code)
            kanren_output()
          }, false)
        })
      }

      //
      // キーごとに管理番号を追加保存する
      const codeinsert_local = (key, addcode) => {
        // ローカルストレージから取得
        let tmp = JSON.parse(localStorage.getItem(key))
        if (!tmp) {
          tmp = [addcode]
        } else {
          tmp = String(tmp).split(",")
          tmp.push(addcode)
        }
        // 重複を削除しつつ、ローカルストレージに保存
        localStorage.setItem(key, JSON.stringify([...new Set(tmp)]));
      }
      //
      // キーごとに指定の管理番号を削除保存する
      const codedelete_local = (key, delcode) => {
        // ローカルストレージから取得
        let tmp = JSON.parse(localStorage.getItem(key))
        if (!tmp) {
          tmp = []
        }
        // 対象の要素を検索して排除
        tmp = tmp.filter(val => String(val) != String(delcode))
        console.log(tmp, key, delcode)
        // 重複を削除しつつ、ローカルストレージに保存
        localStorage.setItem(key, JSON.stringify([...new Set(tmp)]));
      }


      //
      // ローカルストレージから取得して表示しなおす
      const tbody_render = () => {
        // これに tr 要素を入れていく
        let savearr = [];
        // ストレージにデータあれば取得
        if (localStorage.getItem("savedElements")) {
          savearr = JSON.parse(localStorage.getItem("savedElements"))
        }
        // tr を画面上に挿入する
        // 一旦削除して挿入
        document.getElementById("addon_save_tbody").innerText = ""
        document.getElementById("addon_save_tbody").insertAdjacentHTML("beforeend", savearr.join(""))
        // 一旦全部ボタンを消す
        Array.from(document.getElementsByClassName("addon_select_rowbtn")).forEach((val, ind) => {
          val.parentNode.removeChild(val)
        })
        // 選択中であればボタンを再表示
        if (document.getElementById("addon_selectend_btn").style.display === "inline-block") {
          selectrow_btn_set()
        }
        // imgに属性とイベント付与
        img_dragdrop_exchange(document.getElementById("addon_save_tbody"))

      }
      tbody_render()

      //
      // 関連リンクの文字列を表示する + HTML表示
      const kanren_output = () => {

        // 各商品ごとにHTML用の要素を配列として作成する
        let arr = Array.from(document.getElementById("addon_save_tbody").children).map((val, ind) => {
          // 商品名の作成
          let name = val.children[4].getElementsByTagName("a")[0].parentNode.getAttribute("title")
          // キーワード除去
          // 【 、と、】、 の間に任意の文字が 0個以上含まれるパターンを表す正規表現で除去
          name = name.replace(/【[^】]+】/g, "")
          // ( or（ 以降の除去
          if (name.indexOf("(") !== -1) {
            name = name.split("(")[0]
          }
          if (name.indexOf("（") !== -1) {
            name = name.split("（")[0]
          }
          // 50文字に丸める
          name = name.slice(0, 50)
          // imgパスを作成
          let imgarr = val.getElementsByTagName("img")[0].getAttribute("src").split("/")
          imgarr = {
            filename: imgarr[imgarr.length - 1],
            shopkihon: imgarr[imgarr.length - 4] + "/" + imgarr[imgarr.length - 3] + "/" + imgarr[imgarr.length - 2]
          }
          // HTML用の要素を配列として返す
          return {
            url: val.children[4].getElementsByTagName("a")[0].getAttribute("href"),
            img: `https://thumbnail.image.rakuten.co.jp/@0_mall/${imgarr.shopkihon}/${imgarr.filename}`,
            name: name,
            catch: val.children[4].getElementsByClassName("color-gray")[0].textContent.replace(/【[^】]+】/g, "")
          }
        })
        // N個並びを取得
        const col = Number(document.getElementById("addon_kanren_input").value)
        // widthを何％にするのか
        let width = Math.floor(100 / col)
        // 管理番号の配列を作成する
        const codearr = Array.from(document.getElementById("addon_save_tbody").children).map((val, ind) => {
          return val.children[2].getElementsByClassName("ma-t-8")[0].firstChild.innerText
        })
        // ローカルストレージから管理番号の配列を取得
        let Pops = JSON.parse(localStorage.getItem("savedPops"))
        if (!Pops) Pops = []
        //
        // 商品のHTML文字列を作成
        let htmlarr = arr.map((val, ind) => {
          let tmp = ""
          if ((ind) % col === 0) {
            tmp = `</tr><tr valign="top" align="center">`
          }
          tmp = tmp + `<td width="${width}%">`
          // 売れてます!!アイコンの表示可否
          if (Pops.indexOf(codearr[ind]) !== -1) {
            tmp = tmp + `<a href="${val.url}" target="_blank" style="position: relative; display: block;">`
            tmp = tmp + `<p style="position: absolute; top:0%; left:0%; transform: translate(0%,-100%); background: red; color: white; font-weight: bold; font-family: Yu Gothic; padding: 0.5px 8px; font-style: italic;">売れてます!!</p>`
          } else {
            tmp = tmp + `<a href="${val.url}" target="_blank">`
          }
          tmp = tmp + `<img src="${val.img}" width="100%"><br><b>${val.name}</b>`
          tmp = tmp + `</a>`

          if (document.getElementById("addon_catch_btn_true").style.display === "inline-block") {
            tmp = tmp + `<br><font size="2" color="#666">${val.catch}</font>`
          }

          return tmp + "</td>"
        })
        //
        // タイトル部分のHTMLを作成
        let kanren_title
        // flaner 277064
        // kitchin 274608 【p0508】 【4/24 20時～ 限定クーポン】【ポイント10倍/送料無料】【NY】
        // baby 338542 【メーカー直送 送料無料 ポイント10倍】【Piks】
        // passage 260492
        // mens 338541
        // nail 247858
        // gourmet 

        // -------------------------
        // default
        kanren_title = `<table width="100%" border="0" bgcolor="#eee" cellspacing="0" cellpadding="6">
<tr><th><font color="#000">●関連商品</font></th></tr>
</table>`
        // -------------------------
        // flaner 277064
        if (window.location.href.indexOf("277064") !== -1) {
          kanren_title = `<table width="100%" border="0" bgcolor="#eee" cellspacing="0" cellpadding="6">
<tr><th><font color="#000">●関連商品</font></th></tr>
</table>`
        }
        // -------------------------
        // kitchin 274608
        if (window.location.href.indexOf("274608") !== -1) {
          kanren_title = `<table width="100%" border="0" bgcolor="#675b48" cellspacing="0" cellpadding="6">
<tr><th><font color="#fff">関連商品</font></th></tr>
</table>`
        }
        // -------------------------
        // passage 260492
        if (window.location.href.indexOf("260492") !== -1) {
          kanren_title = `<table width="100%" border="0" bgcolor="#eee" cellspacing="0" cellpadding="6">
<tr><th><font color="#000">●関連商品</font></th></tr>
</table>`
        }
        // -------------------------
        // nail
        if (window.location.href.indexOf("247858") !== -1) {
          kanren_title = `<table width="100%" border="0" bgcolor="#333" cellspacing="0" cellpadding="6">
<tr><th><font color="white">関連商品</font></th></tr>
</table>
<table width="100%" border="3" bordercolor="#efb0c5" bgcolor="#efb0c5" cellspacing="0" cellpadding="6">
</table>`
        }
        // -------------------------
        // mens 338541
        if (window.location.href.indexOf("338541") !== -1) {
          kanren_title = `<table width="100%" border="0" bgcolor="#A5A2A2" cellspacing="0" cellpadding="6">
<tr><th><font color="white" size="4">おすすめ関連商品</font></th></tr>
</table>`
        }
        // -------------------------
        // baby 338542
        if (window.location.href.indexOf("338542") !== -1) {
          kanren_title = `<table width="100%" border="0" bgcolor="#eee" cellspacing="0" cellpadding="6">
<tr><th><font color="#000">関連商品</font></th></tr>
</table>`
        }
        // -------------------------
        // gourmet 
        if (window.location.href.indexOf("000000") !== -1) {
          kanren_title = `<table width="100%" border="0" bgcolor="#eee" cellspacing="0" cellpadding="6">
<tr><th><font color="#000">●関連商品</font></th></tr>
</table>`
        }
        // -------------------------


        //
        // タイトルと商品のHTMLを合体
        const str = `${kanren_title}
<table width="100%" border="0" cellspacing="10">
<tr valign="top">${htmlarr.join("")}</tr>
</table>
`
        // テキストエリアに代入
        document.getElementById("addon_kanren_textarea").value = str
        // HTML表示を一旦削除して挿入
        document.getElementById("addon_kanren_result").innerText = ""
        document.getElementById("addon_kanren_result").insertAdjacentHTML("afterbegin", str)

        //
        // 挿入後、実行 --------------
        //
        // aタグのリンクを切っておく
        const atags = document.getElementById("addon_kanren_result").getElementsByTagName("a")
        Array.from(atags).forEach((val, ind) => {
          val.removeAttribute("href")
        }, false)
        // プレビューの画像に管理番号を付与
        const imgs = document.getElementById("addon_kanren_result").getElementsByTagName("img")
        Array.from(imgs).forEach((val, ind) => {
          val.dataset.code = codearr[ind]
        }, false)
        // プレビュー上のimgにドラッグドロップイベントを付与
        img_dragdrop_exchange(document.getElementById("addon_kanren_result"))
        img_dragdrop_popinsert(document.getElementById("addon_pop_btn_01"), document.getElementById("addon_kanren_result"))

      }
      kanren_output()


      //
      // 対象行をローカルストレージに保存、画面上にも表示する
      const saverow_local = (row) => {
        // ローカルストレージの保存処理
        // 保存する要素を取得
        const firstchild = document.getElementsByClassName("rms-table-data")[0].children[1].children[row]
        // これに tr 要素を入れていく
        let savearr = [];
        // ストレージにデータあれば取得
        if (localStorage.getItem("savedElements")) {
          savearr = JSON.parse(localStorage.getItem("savedElements"))
        }
        // 空の要素を削除
        savearr = savearr.filter(val => val !== "")
        // HTML文字列を配列に格納
        savearr.push(firstchild.outerHTML)
        // 配列を文字列に変換してローカルストレージに保存
        localStorage.setItem("savedElements", JSON.stringify(savearr));
        // 表示処理
        tbody_render()
        kanren_output()
      }

      //
      // 対象行をローカルストレージから削除、画面上にも表示する
      const removerow_local = (row) => {
        // これに tr 要素を入れていく
        let savearr = [];
        // ストレージにデータあれば取得
        if (localStorage.getItem("savedElements")) {
          savearr = JSON.parse(localStorage.getItem("savedElements"))
        }
        // 空の要素を削除
        savearr = savearr.filter(val => val !== "")
        // 配列要素削除
        savearr.splice(Number(row), 1)
        // 配列を文字列に変換してローカルストレージに保存
        localStorage.setItem("savedElements", JSON.stringify(savearr));
        // 表示処理
        tbody_render()
        kanren_output()
      }

      //
      // 対象行を入れ替えてローカルストレージに保存、画面上にも表示する
      const exchangerow_local = (start, end) => {
        // これに tr 要素を入れていく
        let savearr = [];
        // ストレージにデータあれば取得
        if (localStorage.getItem("savedElements")) {
          savearr = JSON.parse(localStorage.getItem("savedElements"))
        }
        // 空の要素を削除
        // savearr = savearr.filter(val => val !== "")
        // 配列要素入れ替え
        [savearr[start], savearr[end]] = [savearr[end], savearr[start]]
        // 配列を文字列に変換してローカルストレージに保存
        localStorage.setItem("savedElements", JSON.stringify(savearr));
        // 表示処理
        tbody_render()
        kanren_output()
      }

      //
      // 追加、解除ボタンをセットしなおす
      const selectrow_btn_set = () => {
        // 一旦全部ボタンを消す
        Array.from(document.getElementsByClassName("addon_select_rowbtn")).forEach((val, ind) => {
          val.parentNode.removeChild(val)
        })
        // 全行に保存ボタン追加
        const tbody_elem = document.getElementsByClassName("rms-table-data")[0].getElementsByTagName("tbody")[0]
        Array.from(tbody_elem.children).forEach((val, ind) => {
          val.children[2].insertAdjacentHTML("afterbegin", "<button data-row='" + ind + "' class='addon_select_rowbtn addon_selectsave_rowbtn uk-button uk-button-primary uk-button-small bdrd_6'>追加</button>")
        })
        // 全ての保存ボタンにイベント付与
        Array.from(document.getElementsByClassName("addon_selectsave_rowbtn")).forEach((val, ind) => {
          val.addEventListener("click", (e) => {
            saverow_local(e.target.dataset.row)
          }, false)
        })
        // 保存テーブル上の全行に解除ボタン追加
        Array.from(document.getElementById("addon_save_tbody").children).forEach((val, ind) => {
          val.children[2].insertAdjacentHTML("afterbegin", "<button data-row='" + ind + "' class='addon_select_rowbtn addon_selectremove_rowbtn uk-button uk-button-danger uk-button-small bdrd_6'>解除</button>")
        })
        // 保存テーブル上の全ての解除ボタンにイベント付与
        Array.from(document.getElementsByClassName("addon_selectremove_rowbtn")).forEach((val, ind) => {
          val.addEventListener("click", (e) => {
            removerow_local(e.target.dataset.row)
          }, false)
        })
      }




      //
      // クリアボタン ローカルストレージを初期化
      document.getElementById("addon_reset_btn").addEventListener("click", () => {
        // ローカルストレージを空にする
        localStorage.setItem("savedElements", JSON.stringify([""]));
        localStorage.removeItem("savedPops");
        // tbody 要素の削除
        document.getElementById("addon_save_tbody").innerText = ""
        // 関連リンクの初期化
        kanren_output()
      }, false)

      //
      // 拡張を閉じるボタン ローカルストレージを初期化 画面上表示削除
      document.getElementById("addon_close_btn").addEventListener("click", () => {
        // 保存テーブル上ボタン削除
        document.getElementById("addon_btn_div").parentNode.removeChild(document.getElementById("addon_btn_div"))
        // 保存テーブル削除
        document.getElementById("addon_save_table_outer").parentNode.removeChild(document.getElementById("addon_save_table_outer"))
        // 関連リンク表示も削除
        document.getElementById("addon_kanren_div").parentNode.removeChild(document.getElementById("addon_kanren_div"))
        // 拡張開始ボタンを表示
        document.getElementById("addon_btn_1").style.display = "inline-block";
        // 保存、解除ボタンを全消し
        Array.from(document.getElementsByClassName("addon_select_rowbtn")).forEach((val, ind) => {
          val.parentNode.removeChild(val)
        })
      }, false)

      // 選択開始ボタン
      document.getElementById("addon_selectstart_btn").addEventListener("click", () => {
        //
        // ボタンを切り替える
        document.getElementById("addon_selectstart_btn").style.display = "none"
        document.getElementById("addon_selectend_btn").style.display = "inline-block"
        // ボタンセットしなおし
        selectrow_btn_set()
      }, false)

      // 選択終了ボタン
      document.getElementById("addon_selectend_btn").addEventListener("click", () => {
        //
        // ボタンを切り替える
        document.getElementById("addon_selectstart_btn").style.display = "inline-block"
        document.getElementById("addon_selectend_btn").style.display = "none"
        // 全部ボタンを消す
        Array.from(document.getElementsByClassName("addon_select_rowbtn")).forEach((val, ind) => {
          val.parentNode.removeChild(val)
        })
      }, false)





      //
      // 個数変更でイベント実行
      document.getElementById("addon_kanren_input").addEventListener("change", () => {
        kanren_output()
      }, false)

      //
      // コピーボタンイベント
      document.getElementById("addon_copy_btn").addEventListener("click", () => {
        document.getElementById("addon_kanren_textarea").select()
        // テキストをクリップボードにコピー
        document.execCommand("copy");
      }, false)


      //
      // 検索、クリアボタン
      Array.from(document.getElementsByClassName("rms-search-tabs-content-footer")[0].children).forEach((val, ind) => {
        val.firstChild.addEventListener("click", (e) => {
          // 一旦全部ボタンを消す
          Array.from(document.getElementsByClassName("addon_select_rowbtn")).forEach((val, ind) => {
            val.parentNode.removeChild(val)
          })
          // ボタンを切り替える
          document.getElementById("addon_selectstart_btn").style.display = "inline-block"
          document.getElementById("addon_selectend_btn").style.display = "none"
        }, false)
      })

      //
      // キャッチボタン
      document.getElementById("addon_catch_btn_false").addEventListener("click", (e) => {
        // ボタントグル
        e.target.style.display = "none"
        document.getElementById("addon_catch_btn_true").style.display = "inline-block"
        // htmlプレビュー再表示
        kanren_output()
      }, false)
      document.getElementById("addon_catch_btn_true").addEventListener("click", (e) => {
        // ボタントグル
        e.target.style.display = "none"
        document.getElementById("addon_catch_btn_false").style.display = "inline-block"
        // htmlプレビュー再表示
        kanren_output()
      }, false)


    }



    // 拡張開始ボタンにイベントを付与
    document.getElementById("addon_btn_1").addEventListener("click", () => {
      play()
    }, false)

    // リセットボタンにイベントを付与
    document.getElementById("addon_btn_2").addEventListener("click", () => {
      // 拡張開始ボタンを表示
      document.getElementById("addon_btn_1").style.display = "inline-block";
      try {
        // 関連リンク表示も削除
        document.getElementById("addon_kanren_div").parentNode.removeChild(document.getElementById("addon_kanren_div"))
        document.getElementById("addon_save_table").parentNode.removeChild(document.getElementById("addon_save_table"))
      } catch {
      }
      try {
        document.getElementById("addon_btn_div").parentNode.removeChild(document.getElementById("addon_btn_div"))
      } catch {

      }
      try {
        // 保存テーブル削除
        document.getElementById("addon_save_table_outer").parentNode.removeChild(document.getElementById("addon_save_table_outer"))
      } catch {

      }
    }, false)



  }


  //
  // 商品編集 画面
  const addon_rms_shopsitemedit = () => {

    console.log("addon_rms_shopsitemedit")

    //
    // 画面表示後処理開始
    // 指定した時間（ミリ秒）待ってから処理を開始
    setTimeout(function () {
      // 商品名、キャッチコピー行数の拡張、画像を大きく
      const addon_textpic_style_change = () => {
        console.log(document.getElementsByTagName("body")[0].getElementsByTagName("textarea"))
        try {
          document.getElementsByTagName("body")[0].getElementsByTagName("textarea")[0].setAttribute("rows", "3")
          document.getElementsByTagName("body")[0].getElementsByTagName("textarea")[1].setAttribute("rows", "2")
        } catch {

        }
        console.log(document.getElementsByTagName("picture")[0])
        try {
          document.getElementsByTagName("picture")[0].setAttribute("style", "height: 150px !important; width: 150px !important;")
          if (document.getElementsByClassName("i-order-asuraku--1V_iL color-link").length !== 0) {
            document.getElementsByClassName("i-order-asuraku--1V_iL color-link")[0].parentNode.style.fontSize = "30px"
          }
        } catch {

        }
        try {
          // 商品ページを見る、ボタンの追加
          document.getElementsByTagName("picture")[0].parentNode.parentNode.insertAdjacentHTML("beforeend", '<button id="addon_btn_linkjump" class="rms-btn btn-default btn-width-sm bdrd_6" style="width: 136px;">商品ページを見る</button>')
          document.getElementById("addon_btn_linkjump").addEventListener("click", () => { document.getElementById("addon_btn_pagepc").click() }, false)
        } catch {

        }
      }
      if (addon_options.addon_options_status.r3_1) {
        addon_textpic_style_change()
      }

      // 非製品属性タグ アラート
      const nonProductAttributeTags_alert = () => {
        // 削除 商品はアラートださない
        if (document.getElementById("item-name").value.indexOf("削除") !== -1) return
        // タグが空欄じゃない場合アラートださない
        if (document.getElementsByName("nonProductAttributeTags")[0].value !== "") return
        // アラート
        alert("この商品は「非製品属性タグ」が空欄です。タグが不要な商品かご確認ください。※OKを押すとこの表示は閉じます。")
      }
      try {
        if (addon_options.addon_options_status.r3_2) {
          nonProductAttributeTags_alert()
        }
      } catch {

      }

    }, 600);

    // head タグの要素取得、これを起点にボタンを配置する
    // ※なぜheadなのか➤まだ読み込みされていない要素がある可能性があるので、確実そうなheadを起点にしておく
    const target_head = Array.from(document.getElementsByTagName("head"))[0]
    // UIkit(CSSライブラリ)のCDN(インポート)をheadに配置
    // ※ボタンなどのスタイルをきれいにする＋UIkitの機能を使ってNotificationを表示したりするのに使う
    // ※詳しくは公式を確認➤https://getuikit.com/docs/notification#html-message
    // 配置する文字列
    const uikit_cdn = `
      <!-- UIkit CSS -->
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/uikit@3.19.2/dist/css/uikit.min.css" />
      
      <!-- UIkit JS -->
      <script src="https://cdn.jsdelivr.net/npm/uikit@3.19.2/dist/js/uikit.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/uikit@3.19.2/dist/js/uikit-icons.min.js"></script>

      <style>
      #addon_area {
        z-index: 2147483645;
        position: fixed;
        bottom: 80px;
        left: 25px;
        cursor: pointer;
      }
      .addon_btn{
        margin-bottom: 0.5rem;
      }
      .uk-table-small td{
        padding: 2px !important;
        background: white;
      }
      .addon_rms-table-data{
        background-color: #fff;
        border: 1px solid #b2b2b2;
        border-collapse: collapse;
        margin-bottom: 16px;
      }
      .addon_rms-table-data thead tr {
        background-color: #f1f1f1;
      }
      .addon_rms-table-data tbody td,
      .addon_rms-table-data tbody th,
      .addon_rms-table-data thead td,
      .addon_rms-table-data thead th {
        padding: 4px;
        border: 1px solid #d0d0d0;
        background-clip: padding-box;
      }
      .addon_rms-table-data tbody th+td,
      .addon_rms-table-data tbody th[rowspan],
      .addon_rms-table-data thead th+td,
      .addon_rms-table-data thead th[rowspan] {
        border-left: 1px solid #b2b2b2;
      }
      #addon_save_table_outer{
        overflow: auto;
        height: 340px;
        margin-bottom: 20px;
        border-top: 1px solid #b2b2b2;
        border-bottom: 1px solid #b2b2b2;
        box-sizing: border-box;
      }
      #addon_save_table th{
        border-top: 1px solid #b2b2b2;
        position: sticky;
        top: -1px;
        left: 0;
        z-index: 999;
      }
      #addon_save_table thead tr th{
        background-color: #FFDFDF;
      }
      #addon_save_tbody tr{
        background-color: #FFF8F8;
      }
      .addon_rms-table-data tbody td{
        padding: 2px !important;
      }
      .addon_rms-table-data .ma-t-6{
        margin-top: 0 !important;
      }
      .bdrd_6{
        border-radius: 6px !important;
      }
      </style>
    `
    // headの内側に追加
    target_head.insertAdjacentHTML("afterbegin", uikit_cdn)
    // ボタンを配置
    const addon_area = `
      <div id="addon_area">
        <div id="addon_main_btn_area" class="uk-animation-slide-left" style="display: block;">
          <button id='addon_btn_function' class='addon_btn uk-button uk-button-primary uk-button-small bdrd_6'>プレビューを表示</button>
          <br>
          <button id='addon_btn_pagepc' class='addon_btn uk-button uk-button-muted uk-button-small bdrd_6'>商品ページを見る(PC)</button>
          <br>
          <button id='addon_btn_pagesp' class='addon_btn uk-button uk-button-muted uk-button-small bdrd_6'>商品ページを見る(SP)</button>
          <br>
          <button id='addon_btn_yahoolink' class='addon_btn uk-button uk-button-muted uk-button-small bdrd_6'>Yahooへ</button>
        </div>
        <button id='addon_btn_areaview' class='addon_btn uk-button uk-button-small bdrd_6' style='border: solid 1px #eee;background: white;font-size: 1.4rem;'>≪</button>
      </div>
    `
    // HTMLに挿入
    target_head.nextElementSibling.firstChild.insertAdjacentHTML('afterbegin', addon_area)
    // ボタンエリア表示非表示
    document.getElementById("addon_btn_areaview").addEventListener("click", (e) => {
      if (e.target.textContent === "≪") {
        e.target.textContent = "≫"
        document.getElementById("addon_main_btn_area").style.display = "none"
      } else {
        e.target.textContent = "≪"
        document.getElementById("addon_main_btn_area").style.display = "block"
      }
    }, false)

    //
    //
    // プレビューを表示 ボタン
    document.getElementById("addon_btn_function").addEventListener("click", () => {
      // ページデザインタブをクリック
      document.getElementsByClassName("nav-link")[4].click()
      // addon_outerdivがなければ追加
      if (document.getElementsByClassName("addon_outerdiv").length === 0) {
        // 検索ボックスまわりの要素を flex で囲って横並び可能にしておく
        const rms_content = document.getElementsByClassName("rms-content")[0]
        rms_content.insertAdjacentHTML("beforebegin", "<div id='addon_outerdiv' class='addon_outerdiv' style='display: flex;'></div>")
        document.getElementById("addon_outerdiv").appendChild(rms_content)
        // HTML表示用アウター要素挿入
        const addon_output_outer = '<div id="addon_output_outer" style="display: flex; margin-top: 600px;"></div>'
        document.getElementById("addon_outerdiv").insertAdjacentHTML("beforeend", addon_output_outer)
      }
      // 挿入用HTML
      const html = `
        <div>
          <h2>SP用商品説明文 <font id="addon_sp_font" style="color: red;"></font></h2>
          <div id="addon_output_sp" style="overflow: auto; height: 90vh; min-width: 350px; max-width: 350px; border: 1px solid #d0d0d0; margin: 10px;"></div>
        </div>
        <div>
          <h2>PC用販売説明文</h2>
          <div id="addon_output_pc" style="overflow: auto; height: 90vh; min-width: 450px; max-width: 450px; border: 1px solid #d0d0d0; margin: 10px;"></div>
        </div>
      `
      document.getElementById("addon_output_outer").insertAdjacentHTML("afterbegin", html)
      //
      // imgにドラッグドロップイベントを付与する
      const img_dragdrop_exchange = (device_str, outer_element) => {
        let sta = null
        let end = null
        let device = null
        //---------
        const dragstart = (e) => {
          sta = e.target.dataset.origin
          end = null
          device = e.target.dataset.device
        }
        //---------
        const dragover = (e) => {
          // 付与しているデバイス情報と一致しない場合はリターン
          if (device_str !== device) return
          e.preventDefault();
        }
        //---------
        const drop = (e) => {
          end = e.target.dataset.origin
          exchange_img(device_str, sta, end)
          document.getElementById("addon_tmp_div_imgexchange").parentNode.removeChild(document.getElementById("addon_tmp_div_imgexchange"))
          render()
        }
        //---------
        const dragenter = (e) => {
          // 付与しているデバイス情報と一致しない場合はリターン
          if (device_str !== device) return
          // ドラッグ元の要素と同じ場合はリターン
          if (sta === e.target.dataset.origin) return
          // 「下に挿入」を出現させてドロップイベントを付与する
          //
          // 下に挿入 の要素があれば一旦削除
          if (document.getElementsByClassName("addon_tmp_div_imgexchange").length !== 0) {
            document.getElementById("addon_tmp_div_imgexchange").parentNode.removeChild(document.getElementById("addon_tmp_div_imgexchange"))
          }
          // 下に挿入 の要素挿入
          const html = `
            <div id="addon_tmp_div_imgexchange" class="addon_tmp_div_imgexchange" style="width: 100%; height: 100px; line-height: 100px; background: #B5F0D9; color: #20c997; text-align: center; border: 1px solid #20c997;">
            下に挿入
            </div>
            `
          e.target.insertAdjacentHTML("afterend", html)
          // 下に挿入 の要素にイベント付与
          const tmp_div = document.getElementById("addon_tmp_div_imgexchange")
          // 下に挿入 の要素に 元々のHTMLを保持しておく
          tmp_div.dataset.origin = e.target.dataset.origin
          // 下に挿入 の要素に に デバイス情報を付与
          tmp_div.dataset.device = e.target.dataset.device
          // ドロップイベントのみ付与
          tmp_div.addEventListener("dragover", (e) => { e.preventDefault() }, false)
          tmp_div.addEventListener("drop", (e) => {
            end = e.target.dataset.origin
            nextinsert_img(device_str, sta, end)
            render()
          }, false)
          tmp_div.addEventListener("dragleave", (e) => {
            // 下に挿入 の要素から出たら削除
            e.target.parentNode.removeChild(e.target)
          }, false)
        }
        //---------
        const dragleave = (e) => {
          // document.getElementById("addon_tmp_div_imgexchange").parentNode.removeChild(document.getElementById("addon_tmp_div_imgexchange"))
        }
        //---------
        const imgs = outer_element.getElementsByTagName("img")
        Array.from(imgs).forEach((val, ind) => {
          val.draggable = true
          val.addEventListener("dragstart", dragstart, false)
          val.addEventListener("dragover", dragover, false)
          val.addEventListener("drop", drop, false)
          val.addEventListener("dragenter", dragenter, false)
          val.addEventListener("dragleave", dragleave, false)
        }, false)
      }
      //
      // 指定した画像ともう一つの画像の位置を入れ替える
      const exchange_img = (device_str, sta, end) => {
        // PCかSPかどっちかのテキストボックス取得
        let target_textarea
        if (device_str === "pc") {
          target_textarea = document.getElementsByName("salesDescription")[0]
        } else {
          target_textarea = document.getElementsByName("productDescription")[1]
        }
        // 一旦ダミー用文字列に変換する
        target_textarea.value = target_textarea.value.replace(sta, "{{sta}}")
        target_textarea.value = target_textarea.value.replace(end, "{{end}}")
        // それぞれを交換してもう一度変換
        target_textarea.value = target_textarea.value.replace("{{sta}}", end)
        target_textarea.value = target_textarea.value.replace("{{end}}", sta)
      }
      //
      // 指定の画像の次の要素としてもう一つの画像を挿入しなおす
      const nextinsert_img = (device_str, sta, end) => {
        // PCかSPかどっちかのテキストボックス取得
        let target_textarea
        if (device_str === "pc") {
          target_textarea = document.getElementsByName("salesDescription")[0]
        } else {
          target_textarea = document.getElementsByName("productDescription")[1]
        }
        // 先に選ばれたimg文字列を削除
        target_textarea.value = target_textarea.value.replace(sta, "")
        // 後に選ばれたimg文字列を 後に選ばれたimg文字列 + 先に選ばれたimg文字列 に変換
        target_textarea.value = target_textarea.value.replace(end, end + sta)
      }
      //
      // 一旦削除し表示しなおす
      const render = () => {
        // 一旦削除
        document.getElementById("addon_output_pc").innerText = ""
        document.getElementById("addon_output_sp").innerText = ""
        // 挿入
        document.getElementById("addon_output_pc").insertAdjacentHTML("afterbegin", document.getElementsByName("salesDescription")[0].value + document.getElementsByName("productDescription")[0].value)
        document.getElementById("addon_output_sp").insertAdjacentHTML("afterbegin", document.getElementsByName("productDescription")[1].value)
        document.getElementById("addon_sp_font").textContent = "imgタグ:" + (document.getElementsByName("productDescription")[1].value.split("<img").length - 1) + "個"
        // 反映させた PC用imgに 色々付与する
        Array.from(document.getElementById("addon_output_pc").getElementsByTagName("img")).forEach((val, ind) => {
          // img の元々のHTMLを保持しておく ★PCの場合はペアレントの div 含めて指定しておく
          val.dataset.origin = val.parentNode.outerHTML
          // img に デバイス情報を付与
          val.dataset.device = "pc"
          // img にツールチップを付与
          val.setAttribute("title", val.getAttribute("src"))
        })
        // 反映させた SP用imgに 色々付与する
        Array.from(document.getElementById("addon_output_sp").getElementsByTagName("img")).forEach((val, ind) => {
          // img の元々のHTMLを保持しておく
          val.dataset.origin = val.outerHTML
          // img に デバイス情報を付与
          val.dataset.device = "sp"
          // img にツールチップを付与
          val.setAttribute("title", val.getAttribute("src"))
        })
        // imgに交換イベント付与
        img_dragdrop_exchange("pc", document.getElementById("addon_output_pc"))
        img_dragdrop_exchange("sp", document.getElementById("addon_output_sp"))

      }
      render()


      // テキストエリアの変更時に再表示
      document.getElementsByName("salesDescription")[0].addEventListener("change", () => {
        render()
      }, false)
      document.getElementsByName("productDescription")[0].addEventListener("change", () => {
        render()
      }, false)
      document.getElementsByName("productDescription")[1].addEventListener("change", () => {
        render()
      }, false)

      // 他のタブクリックで閉じる
      Array.from(document.getElementsByClassName("nav-link")).forEach((val, ind) => {
        val.addEventListener("click", () => {
          document.getElementById("addon_output_outer").innerText = ""
        }, false)
      })


    }, false)

    //
    //
    // 商品ページを見る(PC)ボタン
    document.getElementById("addon_btn_pagepc").addEventListener("click", () => {
      const hrefarr = window.location.href.split("/")
      hrefarr[hrefarr.length - 1]
      let url = ""
      if (document.getElementById("depot-setting-item-basic-info").checked) {
        // https://item.rakuten.co.jp/passageshop/10013531/
        url = `https://item.rakuten.co.jp/${SHOP_DESC[hrefarr[hrefarr.length - 4]].imgname}/${hrefarr[hrefarr.length - 1]}/`
      } else {
        // https://soko.rms.rakuten.co.jp/passageshop/10013531/
        url = `https://soko.rms.rakuten.co.jp/${SHOP_DESC[hrefarr[hrefarr.length - 4]].imgname}/${hrefarr[hrefarr.length - 1]}/`
      }
      window.open(url, "_blank", "noopener,noreferrer");
    }, false)
    //
    //
    // 商品ページを見る(SP)ボタン
    document.getElementById("addon_btn_pagesp").addEventListener("click", () => {
      const hrefarr = window.location.href.split("/")
      hrefarr[hrefarr.length - 1]
      let url = ""
      if (document.getElementById("depot-setting-item-basic-info").checked) {
        // https://item.rakuten.co.jp/passageshop/10013531/?force-site=ipn
        url = `https://item.rakuten.co.jp/${SHOP_DESC[hrefarr[hrefarr.length - 4]].imgname}/${hrefarr[hrefarr.length - 1]}/?force-site=ipn`
      } else {
        // https://soko.rms.rakuten.co.jp/passageshop/10013531/?force-site=ipn
        url = `https://soko.rms.rakuten.co.jp/${SHOP_DESC[hrefarr[hrefarr.length - 4]].imgname}/${hrefarr[hrefarr.length - 1]}/?force-site=ipn`
      }
      window.open(url, "_blank", "noopener,noreferrer", "width=500,height=400")
    }, false)
    //
    //
    // Yahooへボタン
    document.getElementById("addon_btn_yahoolink").addEventListener("click", () => {
      const hrefarr = window.location.href.split("/")
      hrefarr[hrefarr.length - 1]
      // https://editor.store.yahoo.co.jp/RT/passageshop/PageEdit/?addonkeyword=10013102
      let url = `https://editor.store.yahoo.co.jp/RT/${SHOP_DESC[hrefarr[hrefarr.length - 4]].yahoo}/PageEdit/?addonkeyword=${hrefarr[hrefarr.length - 1]}`
      window.open(url, "_blank", "noopener,noreferrer", "width=500,height=400")
    }, false)


  }


  //
  // クーポン情報設定画面
  const addon_rms_coupon = () => {

    // 日付のデフォルト設定を選択
    document.getElementById("sHour").selectedIndex = 17;
    document.getElementById("eHour").selectedIndex = 16;
    // 日付が15日以上の場合は、次の日付が翌月であると判断し、月を＋１、日を-14する。
    if (document.getElementById("eDate").selectedIndex > 15) {
      // 月を＋1
      if (document.getElementById("sMonth").selectedIndex === 12) {
        document.getElementById("eMonth").selectedIndex = 1
      } else {
        document.getElementById("eMonth").selectedIndex = document.getElementById("eMonth").selectedIndex + 1
      }
      // 日を-14
      document.getElementById("eDate").selectedIndex = document.getElementById("eDate").selectedIndex - 14
    }

    // ストレージに日付データあればセットする
    let coupondate = null
    if (localStorage.getItem("coupondate")) {
      document.getElementById("eDate").selectedIndex = localStorage.getItem("coupondate")
    }

    // イベント付与 日付変更時にストレージに格納
    document.getElementById("eDate").addEventListener("change", (e) => {
      localStorage.setItem("coupondate", e.target.selectedIndex);
    }, false)

  }

  //
  // データ分析画面
  const addon_rms_datatool_access = () => {
    setTimeout(() => {
      const keyinput = document.getElementsByClassName("rms-search-field rms-block")[0].getElementsByTagName("input")[0]
      console.log(localStorage.getItem("addon_datatool_kanrino"))
      // 現在のURLを取得
      const url = new URL(window.location.href);
      // クエリパラメータの値を取得
      keyinput.value = url.searchParams.get("kanrino")
      keyinput.focus()
      keyinput.blur()
    }, 500);

  }

  //
  // 商品別売上高 画面
  const addon_rms_datatool_rdreport = () => {
    setTimeout(() => {

      const sum_el_arr = {
        qua: getElementByXPath("/html/body/div[1]/main/div/form/table[2]/tbody/tr/td/table/tbody/tr[4]/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]/font"),
        num: getElementByXPath("/html/body/div[1]/main/div/form/table[2]/tbody/tr/td/table/tbody/tr[4]/td/table/tbody/tr/td/table/tbody/tr[2]/td[3]/font"),
        count: getElementByXPath("/html/body/div[1]/main/div/form/table[2]/tbody/tr/td/table/tbody/tr[4]/td/table/tbody/tr/td/table/tbody/tr[2]/td[4]/font"),
      }
      const sum_arr = {
        qua: sum_el_arr.qua.textContent.split(",").join(""),
        num: sum_el_arr.num.textContent.split(",").join(""),
        count: sum_el_arr.count.textContent.split(",").join(""),
      }

      const target_tr_arr = getElementByXPath("/html/body/div[1]/main/div/form/table[2]/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr/td/table/tbody").children

      Array.from(target_tr_arr).forEach((val, ind) => {
        // 最初の2行とばす
        if (ind < 2) return;
        // スタイル調整
        if (ind % 2 === 0) {
          val.setAttribute("bgcolor", "#F7F7F7")
        }
        // 計算出力
        const tr_nums = {
          qua: val.children[4].firstChild.textContent.split(",").join(""),
          num: val.children[5].firstChild.textContent.split(",").join(""),
          count: val.children[6].firstChild.textContent.split(",").join(""),
        }
        val.children[4].insertAdjacentHTML('beforeend', '<br><span style="font-size: smaller;color: #999;">' + ((tr_nums.qua / sum_arr.qua) * 100).toFixed(1) + '%</span>')
        val.children[5].insertAdjacentHTML('beforeend', '<br><span style="font-size: smaller;color: #999;">' + ((tr_nums.num / sum_arr.num) * 100).toFixed(1) + '%</span>')
        val.children[6].insertAdjacentHTML('beforeend', '<br><span style="font-size: smaller;color: #999;">' + ((tr_nums.count / sum_arr.count) * 100).toFixed(1) + '%</span>')
      })
    }, 500);

  }


  // ----------------------------------------------------------------
  // Yahoo
  // ----------------------------------------------------------------
  //
  // クーポン設定画面
  const addon_yahoo_coupon = () => {
    // 公開中➤背景赤にする
    Array.from(document.getElementsByClassName("ycMdCouponList")[0].getElementsByTagName("tr")).forEach((val, ind) => {
      console.log(val.outerHTML)
      console.log(val.outerHTML.indexOf("公開中"))
      if (val.outerHTML.indexOf("公開中") !== -1) {
        val.style.background = "#fee8e8"
      }
    })

  }
  //
  // クーポン新規画面
  const addon_yahoo_coupon_new = () => {
    // 日付のデフォルト設定を選択
    document.getElementsByName("StartHour")[0].selectedIndex = 18
    document.getElementsByName("EndHour")[0].selectedIndex = 18
  }
  //
  // 商品検索画面
  const addon_yahoo_pageedit_search = () => {
    // getパラメータを取得
    const addon_keyword = new URL(window.location.href).searchParams.get('addonkeyword')
    // キーワードをvalueに挿入 検索ボタン押下は反応しませんでした
    document.getElementById("key_word").value = addon_keyword
  }
  //
  // ページ編集 画面
  const addon_yahoo_pageedit_item = () => {


    // head タグの要素取得、これを起点にボタンを配置する
    // ※なぜheadなのか➤まだ読み込みされていない要素がある可能性があるので、確実そうなheadを起点にしておく
    const target_head = Array.from(document.getElementsByTagName("head"))[0]
    // UIkit(CSSライブラリ)のCDN(インポート)をheadに配置
    // ※ボタンなどのスタイルをきれいにする＋UIkitの機能を使ってNotificationを表示したりするのに使う
    // ※詳しくは公式を確認➤https://getuikit.com/docs/notification#html-message
    // 配置する文字列
    const uikit_cdn = `
      <!-- UIkit CSS -->
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/uikit@3.19.2/dist/css/uikit.min.css" />
      
      <!-- UIkit JS -->
      <script src="https://cdn.jsdelivr.net/npm/uikit@3.19.2/dist/js/uikit.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/uikit@3.19.2/dist/js/uikit-icons.min.js"></script>

      <style>
      #addon_area {
        z-index: 2147483645;
        position: fixed;
        bottom: 80px;
        left: 25px;
        cursor: pointer;
      }
      .addon_btn{
        margin-bottom: 0.5rem;
      }
      .uk-table-small td{
        padding: 2px !important;
        background: white;
      }
      .addon_rms-table-data{
        background-color: #fff;
        border: 1px solid #b2b2b2;
        border-collapse: collapse;
        margin-bottom: 16px;
      }
      .addon_rms-table-data thead tr {
        background-color: #f1f1f1;
      }
      .addon_rms-table-data tbody td,
      .addon_rms-table-data tbody th,
      .addon_rms-table-data thead td,
      .addon_rms-table-data thead th {
        padding: 4px;
        border: 1px solid #d0d0d0;
        background-clip: padding-box;
      }
      .addon_rms-table-data tbody th+td,
      .addon_rms-table-data tbody th[rowspan],
      .addon_rms-table-data thead th+td,
      .addon_rms-table-data thead th[rowspan] {
        border-left: 1px solid #b2b2b2;
      }
      #addon_save_table_outer{
        overflow: auto;
        height: 340px;
        margin-bottom: 20px;
        border-top: 1px solid #b2b2b2;
        border-bottom: 1px solid #b2b2b2;
        box-sizing: border-box;
      }
      #addon_save_table th{
        border-top: 1px solid #b2b2b2;
        position: sticky;
        top: -1px;
        left: 0;
        z-index: 999;
      }
      #addon_save_table thead tr th{
        background-color: #FFDFDF;
      }
      #addon_save_tbody tr{
        background-color: #FFF8F8;
      }
      .addon_rms-table-data tbody td{
        padding: 2px !important;
      }
      .addon_rms-table-data .ma-t-6{
        margin-top: 0 !important;
      }
      .bdrd_6{
        border-radius: 6px !important;
      }
      </style>
    `
    // headの内側に追加
    target_head.insertAdjacentHTML("afterbegin", uikit_cdn)
    // ボタンを配置
    const addon_area = `
      <div id="addon_area">
        <div id="addon_main_btn_area" class="uk-animation-slide-left" style="display: none;">
          <button id='addon_btn_imgin_1_10' class='addon_btn uk-button uk-button-primary uk-button-small bdrd_6'>画像挿入1～10</button>
          <br>
          <button id='addon_btn_imgin_1_15' class='addon_btn uk-button uk-button-primary uk-button-small bdrd_6'>画像挿入1～15</button>
          <br>
          <button id='addon_btn_imgin_2_10' class='addon_btn uk-button uk-button-primary uk-button-small bdrd_6'>画像挿入2～10</button>
          <br>
          <button id='addon_btn_imgin_2_15' class='addon_btn uk-button uk-button-primary uk-button-small bdrd_6'>画像挿入2～15</button>
          <br>
        </div>
        <button id='addon_btn_areaview' class='addon_btn uk-button uk-button-small bdrd_6' style='border: solid 1px #eee;background: white;font-size: 1.4rem;'>≫</button>
      </div>
    `
    // HTMLに挿入
    target_head.insertAdjacentHTML('afterend', addon_area)
    // ボタンエリア表示非表示
    document.getElementById("addon_btn_areaview").addEventListener("click", (e) => {
      if (e.target.textContent === "≪") {
        e.target.textContent = "≫"
        document.getElementById("addon_main_btn_area").style.display = "none"
      } else {
        e.target.textContent = "≪"
        document.getElementById("addon_main_btn_area").style.display = "block"
      }
    }, false)

    //
    // 画像URLを挿入する
    const image_input = (start_int = 0, count_int = 15) => {
      // 画像ファイル名を商品コードから一部作成
      let filename = document.getElementsByClassName("formParts__itemUnit")[1].textContent
      filename = filename.split("（").join("").split("）").join("")
      filename = filename + "-0"
      // クリックして画像入力欄を表示しておく
      document.getElementsByClassName("imageListB__toggle")[0].firstChild.click()
      // フォーカス付けはずしながら再取得しつつ挿入
      for (let i = 0; i < count_int; i++) {
        let tmp = document.getElementsByClassName("imageListB__toggle")[0].nextElementSibling.getElementsByTagName("input")
        tmp[i].focus()
        tmp[i].value = `https://shopping.c.yimg.jp/lib/${window.location.href.split("/")[4]}/${filename}${String(i + start_int).padStart(2, '0')}.jpg`
        tmp[i].blur()
      }

    }

    //
    // 画像挿入ボタン各種
    document.getElementById("addon_btn_imgin_1_10").addEventListener("click", () => {
      image_input(1, 10)
    }, false)
    document.getElementById("addon_btn_imgin_1_15").addEventListener("click", () => {
      image_input(1, 15)
    }, false)
    document.getElementById("addon_btn_imgin_2_10").addEventListener("click", () => {
      image_input(2, 10)
    }, false)
    document.getElementById("addon_btn_imgin_2_15").addEventListener("click", () => {
      image_input(2, 15)
    }, false)


  }

  // ---------------------------------------------------
  //
  // オプション状態を取得
  let addon_options = null
  chrome.storage.sync.get(null, (options) => {

    addon_options = options

    // チェック状態を確認してエラーが出ればTRUEを挿入しておく
    const addon_options_list = ['r1', 'r2', 'r2_1', 'r3', 'r3_1', 'r3_2', 'r4', 'r5', 'y1', 'y2', 'y3', 'y4']
    addon_options_list.forEach((val, ind) => {
      try {
        addon_options.addon_options_status[val]
      } catch {
        addon_options.addon_options_status = { ...addon_options.addon_options_status, [val]: true }
      }
    })


    // ----------------------------------------------------------------
    // 実行 ➤ 現在のURLごとに処理を分ける
    // ----------------------------------------------------------------

    // ----------------------------------------------------------------
    // RMS
    // ----------------------------------------------------------------
    //
    // csv DL 画面の場合実行
    if (window.location.href.indexOf("item.rms.rakuten.co.jp/rms-item-download/shops") !== -1) {
      if (addon_options.addon_options_status.r1) {
        addon_rms_item_download()
      }
    }
    //
    // 商品管理
    if (window.location.href.indexOf("item.rms.rakuten.co.jp/rms-sku/shops/") !== -1) {

      //
      // 商品一覧 の場合実行
      if (window.location.href.indexOf("items") !== -1) {
        if (addon_options.addon_options_status.r2) {
          addon_rms_shopsitems()
        }
      }
      //
      // 商品編集 の場合実行
      if (window.location.href.indexOf("/item/edit/") !== -1) {
        if (addon_options.addon_options_status.r3) {
          addon_rms_shopsitemedit()
        }
      }
    }


    //
    // クーポン情報 画面の場合実行
    if (window.location.href.indexOf("coupon.rms.rakuten.co.jp/rms/mall/coupon") !== -1) {
      if (addon_options.addon_options_status.r4) {
        addon_rms_coupon()
      }
    }

    //
    // 分析 画面の場合実行
    if (window.location.href.indexOf("datatool.rms.rakuten.co.jp/access/item") !== -1) {
      if (addon_options.addon_options_status.r5) {
        addon_rms_datatool_access()
      }
    }

    //
    // 商品別売上高 画面 の場合実行
    if (window.location.href.indexOf("datatool.rms.rakuten.co.jp/rdreport") !== -1) {
      if (addon_options.addon_options_status.r5) {
        addon_rms_datatool_rdreport()
      }
    }



    // ----------------------------------------------------------------
    // Yahoo
    // ----------------------------------------------------------------
    //
    // クーポン設定 画面の場合実行
    if (window.location.href.indexOf("pro.store.yahoo.co.jp") !== -1 && window.location.href.indexOf("coupon") !== -1 && window.location.href.indexOf("new-edit") === -1) {
      if (addon_options.addon_options_status.y1) {
        addon_yahoo_coupon()
      }
    }
    //
    // クーポン新規 画面の場合実行
    if (window.location.href.indexOf("pro.store.yahoo.co.jp") !== -1 && window.location.href.indexOf("/coupon/index/new-edit") !== -1) {
      if (addon_options.addon_options_status.y2) {
        addon_yahoo_coupon_new()
      }
    }

    // ページ編集 画面の場合実行 ➤ Ajaxで取得されているためURLからの制御困難
    if (window.location.href.indexOf("editor.store.yahoo.co.jp/RT/") !== -1 && window.location.href.indexOf("PageEdit") !== -1) {
      if (addon_options.addon_options_status.y3) {
        // 検索画面で実行、実際は常に実行されている、、、
        addon_yahoo_pageedit_search()
      }
      if (addon_options.addon_options_status.y4) {
        addon_yahoo_pageedit_item()
      }

    }

  });

}






