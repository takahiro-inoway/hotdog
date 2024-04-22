




// 画面読み込みが終わってから実行し始める
window.onload = function () {
  console.log("onload")

  // ----------------------------------------------------------------
  // 処理定義
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
      #addon_save_table thead tr{
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
      <button id='addon_btn_1' class='addon_btn uk-button uk-button-primary uk-button-small bdrd_6'>拡張を開始</button>
      <br>
      <button id='addon_btn_2' class='addon_btn uk-button uk-button-muted uk-button-small bdrd_6'>リセット</button>
      </div>
    `
    // HTMLに挿入
    target_head.nextElementSibling.firstChild.insertAdjacentHTML('afterbegin', addon_btn_1)


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
      <div id="addon_kanren_div" class="rms-content-fixed--1V6OD" style="padding: 10px 200px 10px 10px;">
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
                <p>関連リンク作成</p>
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
                              <button onclick="document.getElementById('addon_reset_btn').click()" class="rms-btn btn-default btn-width-sm bdrd_6">全て解除</button>
                              <button onclick="document.getElementById('addon_close_btn').click()" class="rms-btn btn-red btn-fill btn-md btn-width-md bdrd_6">拡張を閉じる</button>
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
        <button id="addon_reset_btn" class="rms-btn btn-default btn-width-sm bdrd_6">全て解除</button>
        <button id="addon_close_btn" class="rms-btn btn-red btn-fill btn-md btn-width-md bdrd_6">拡張を閉じる</button>
      </div>
      <table id="addon_save_table" class="addon_rms-table-data">
        ${document.getElementsByClassName("rms-table-data")[0].children[0].outerHTML}
        <tbody id="addon_save_tbody">
        </tbody>
      </table>
      `
      // 挿入
      document.getElementById("searchResult").insertAdjacentHTML("afterbegin", searchResult_save_html)


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

      }
      tbody_render()

      //
      // 関連リンクの文字列を表示する + HTML表示
      const kanren_output = () => {

        //
        let arr = Array.from(document.getElementById("addon_save_tbody").children).map((val, ind) => {
          let name = val.children[4].getElementsByTagName("a")[0].parentNode.getAttribute("title")

          // キーワード除去
          const jokyo = [
            "【メール便送料無料】",
            "【送料無料】",
            "【ASU】",
            "【DM】",
            "【予約】",
            "【一部予約】",
            "【送料無料 ポイント1倍】",
            "【送料無料 ポイント2倍】",
            "【送料無料 ポイント3倍】",
            "【送料無料 ポイント4倍】",
            "【送料無料 ポイント5倍】",
            "【送料無料 ポイント6倍】",
            "【送料無料 ポイント7倍】",
            "【送料無料 ポイント8倍】",
            "【送料無料 ポイント9倍】",
            "【送料無料 ポイント10倍】",
            "【送料無料 ポイント11倍】",
            "【送料無料 ポイント12倍】",
            "【送料無料 ポイント13倍】",
            "【送料無料 ポイント14倍】",
            "【送料無料 ポイント15倍】",
            "【送料無料 ポイント16倍】",
            "【送料無料 ポイント17倍】",
            "【送料無料 ポイント18倍】",
            "【送料無料 ポイント19倍】",
            "【送料無料 ポイント20倍】",
            "【メール便送料無料 ポイント1倍】",
            "【メール便送料無料 ポイント2倍】",
            "【メール便送料無料 ポイント3倍】",
            "【メール便送料無料 ポイント4倍】",
            "【メール便送料無料 ポイント5倍】",
            "【メール便送料無料 ポイント6倍】",
            "【メール便送料無料 ポイント7倍】",
            "【メール便送料無料 ポイント8倍】",
            "【メール便送料無料 ポイント9倍】",
            "【メール便送料無料 ポイント10倍】",
            "【メール便送料無料 ポイント11倍】",
            "【メール便送料無料 ポイント12倍】",
            "【メール便送料無料 ポイント13倍】",
            "【メール便送料無料 ポイント14倍】",
            "【メール便送料無料 ポイント15倍】",
            "【メール便送料無料 ポイント16倍】",
            "【メール便送料無料 ポイント17倍】",
            "【メール便送料無料 ポイント18倍】",
            "【メール便送料無料 ポイント19倍】",
            "【メール便送料無料 ポイント20倍】",
            "【5％OFFクーポン】",
            "【10％OFFクーポン】",
            "【15％OFFクーポン】",
            "【20％OFFクーポン】",
            "【25％OFFクーポン】",
            "【100円OFFクーポン】",
            "【150円OFFクーポン】",
            "【200円OFFクーポン】",
            "【250円OFFクーポン】",
            "【300円OFFクーポン】",
            "【350円OFFクーポン】",
            "【400円OFFクーポン】",
            "【450円OFFクーポン】",
            "【500円OFFクーポン】",
            "【550円OFFクーポン】",
            "【600円OFFクーポン】",
            "【650円OFFクーポン】",
            "【700円OFFクーポン】",
            "【750円OFFクーポン】",
            "【800円OFFクーポン】",
            "【850円OFFクーポン】",
            "【900円OFFクーポン】",
            "【950円OFFクーポン】",
            "【1000円OFFクーポン】",
            "【1100円OFFクーポン】",
            "【1200円OFFクーポン】",
            "【1300円OFFクーポン】",
            "【1400円OFFクーポン】",
            "【1500円OFFクーポン】",
            "【1600円OFFクーポン】",
            "【1700円OFFクーポン】",
            "【1800円OFFクーポン】",
            "【1900円OFFクーポン】",
            "【2000円OFFクーポン】",
            "【2100円OFFクーポン】",
            "【2200円OFFクーポン】",
            "【2300円OFFクーポン】",
            "【2400円OFFクーポン】",
            "【2500円OFFクーポン】",
            "【2600円OFFクーポン】",
            "【2700円OFFクーポン】",
            "【2800円OFFクーポン】",
            "【2900円OFFクーポン】",
            "【3000円OFFクーポン】",
            "【5％OFFクーポン対象】",
            "【10％OFFクーポン対象】",
            "【15％OFFクーポン対象】",
            "【20％OFFクーポン対象】",
            "【25％OFFクーポン対象】",
            "【100円OFFクーポン対象】",
            "【150円OFFクーポン対象】",
            "【200円OFFクーポン対象】",
            "【250円OFFクーポン対象】",
            "【300円OFFクーポン対象】",
            "【350円OFFクーポン対象】",
            "【400円OFFクーポン対象】",
            "【450円OFFクーポン対象】",
            "【500円OFFクーポン対象】",
            "【550円OFFクーポン対象】",
            "【600円OFFクーポン対象】",
            "【650円OFFクーポン対象】",
            "【700円OFFクーポン対象】",
            "【750円OFFクーポン対象】",
            "【800円OFFクーポン対象】",
            "【850円OFFクーポン対象】",
            "【900円OFFクーポン対象】",
            "【950円OFFクーポン対象】",
            "【1000円OFFクーポン対象】",
            "【1100円OFFクーポン対象】",
            "【1200円OFFクーポン対象】",
            "【1300円OFFクーポン対象】",
            "【1400円OFFクーポン対象】",
            "【1500円OFFクーポン対象】",
            "【1600円OFFクーポン対象】",
            "【1700円OFFクーポン対象】",
            "【1800円OFFクーポン対象】",
            "【1900円OFFクーポン対象】",
            "【2000円OFFクーポン対象】",
            "【2100円OFFクーポン対象】",
            "【2200円OFFクーポン対象】",
            "【2300円OFFクーポン対象】",
            "【2400円OFFクーポン対象】",
            "【2500円OFFクーポン対象】",
            "【2600円OFFクーポン対象】",
            "【2700円OFFクーポン対象】",
            "【2800円OFFクーポン対象】",
            "【2900円OFFクーポン対象】",
            "【3000円OFFクーポン対象】",
            "【選べる特典付】",
            "【正規販売店】",
            "【海外×】",
            "【海外✕】",
          ]
          jokyo.forEach((val, ind) => {
            name = name.split(val).join("")
          })
          jokyo.forEach((val, ind) => {
            const tmp = val.split("【").join().split("】").join()
            name = name.split(tmp).join("")
          })
          // ( or（ 以降の除去
          name = name.split("(")[0]
          name = name.split("（")[0]
          // 先頭【】の除去
          if (name.indexOf("【") === 0 && name.split("【").length === 2) {
            name = name.split("】")[1]
          }
          // 最後尾【】の除去
          if (name.indexOf("】") === name.length - 1 && name.split("【").length === 2) {
            name = name.split("【")[0]
          }
          // 【 、と、】、 の間に任意の文字が 0個以上含まれるパターンを表す正規表現で除去
          name = name.replace("/【[^】]+】/", "")

          // https://tshop.r10s.jp/passageshop/cabinet/kihon35/b10010562-001.jpg
          // URL↑から↓の形式にする
          // https://thumbnail.image.rakuten.co.jp/@0_mall/passageshop/cabinet/kihon41/p10013424-001.jpg
          // https://thumbnail.image.rakuten.co.jp/@0_mall/passageshop/cabinet/kihon41/p10013420-001.jpg

          // https://tshop.r10s.jp/passage-mens/cabinet/kihon03/p10008791-001.jpg
          // https://thumbnail.image.rakuten.co.jp/@0_mall/passage-mens/cabinet/kihon03/p10008791-001.jpg
          // 

          let imgarr = val.getElementsByTagName("img")[0].getAttribute("src").split("/")
          imgarr = {
            filename: imgarr[imgarr.length - 1],
            shopkihon: imgarr[imgarr.length - 4] + "/" + imgarr[imgarr.length - 3] + "/" + imgarr[imgarr.length - 2]
          }

          img = `https://thumbnail.image.rakuten.co.jp/@0_mall/${imgarr.shopkihon}/${imgarr.filename}`

          return {
            url: val.children[4].getElementsByTagName("a")[0].getAttribute("href"),
            img: img,
            name: name
          }
        })

        const col = Number(document.getElementById("addon_kanren_input").value)

        // widthを何％にするのか
        let width = Math.floor(100 / col)



        let htmlarr = arr.map((val, ind) => {
          if ((ind) % col === 0) {
            return `</tr><tr valign="top"><td width="${width}%"><a href="${val.url}" target="_blank"><img src="${val.img}" width="100%"><br>${val.name}</a></td>`
          }
          return `<td width="${width}%"><a href="${val.url}" target="_blank"><img src="${val.img}" width="100%"><br>${val.name}</a></td>`
        })


        const str = `<table width="100%" border="0" bgcolor="#eee" cellspacing="0" cellpadding="6">
<tr><th><font color="#000">●関連商品</font></th></tr>
</table>
<table width="100%" border="0" cellspacing="10">
<tr valign="top">${htmlarr.join("")}</tr>
</table>
`
        // テキストエリアに代入
        document.getElementById("addon_kanren_textarea").value = str
        // HTML表示を一旦削除して挿入
        document.getElementById("addon_kanren_result").innerText = ""
        document.getElementById("addon_kanren_result").insertAdjacentHTML("afterbegin", str)
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
        // 配列要素削除
        savearr.splice(Number(row), 1)
        // 配列を文字列に変換してローカルストレージに保存
        localStorage.setItem("savedElements", JSON.stringify(savearr));
        // 表示処理
        tbody_render()
        kanren_output()
      }

      //
      // 保存、解除ボタンをセットしなおす
      const selectrow_btn_set = () => {
        // 一旦全部ボタンを消す
        Array.from(document.getElementsByClassName("addon_select_rowbtn")).forEach((val, ind) => {
          val.parentNode.removeChild(val)
        })
        // 全行に保存ボタン追加
        const tbody_elem = document.getElementsByClassName("rms-table-data")[0].getElementsByTagName("tbody")[0]
        Array.from(tbody_elem.children).forEach((val, ind) => {
          val.children[2].insertAdjacentHTML("afterbegin", "<button data-row='" + ind + "' class='addon_select_rowbtn addon_selectsave_rowbtn uk-button uk-button-primary uk-button-small bdrd_6'>保存</button>")
        })
        // 全ての保存ボタンにイベント付与
        Array.from(document.getElementsByClassName("addon_selectsave_rowbtn")).forEach((val, ind) => {
          val.addEventListener("click", (e) => {
            saverow_local(e.target.dataset.row)
          }, false)
        })
        // 保存テーブル上の全行に解除ボタン追加
        Array.from(document.getElementById("addon_save_tbody").children).forEach((val, ind) => {
          val.children[2].insertAdjacentHTML("afterbegin", "<button data-row='" + ind + "' class='addon_select_rowbtn addon_selectremove_rowbtn uk-button uk-button-primary uk-button-small bdrd_6'>解除</button>")
        })
        // 保存テーブル上の全ての解除ボタンにイベント付与
        Array.from(document.getElementsByClassName("addon_selectremove_rowbtn")).forEach((val, ind) => {
          val.addEventListener("click", (e) => {
            removerow_local(e.target.dataset.row)
          }, false)
        })
      }

      //
      // 全て解除ボタン ローカルストレージを初期化
      document.getElementById("addon_reset_btn").addEventListener("click", () => {
        localStorage.setItem("savedElements", JSON.stringify([""]));
        // tbody 要素の削除
        document.getElementById("addon_save_tbody").innerText = ""
        // 関連リンクの初期化
        kanren_output()
      }, false)

      //
      // 拡張を閉じるボタン ローカルストレージを初期化 画面上表示削除
      document.getElementById("addon_close_btn").addEventListener("click", () => {
        document.getElementById("addon_btn_div").parentNode.removeChild(document.getElementById("addon_btn_div"))
        document.getElementById("addon_save_table").parentNode.removeChild(document.getElementById("addon_save_table"))
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

    }



    // 拡張開始ボタンにイベントを付与
    document.getElementById("addon_btn_1").addEventListener("click", () => {
      play()
    }, false)

    // リセットボタンにイベントを付与
    document.getElementById("addon_btn_2").addEventListener("click", () => {
      // 拡張開始ボタンを表示
      document.getElementById("addon_btn_1").style.display = "inline-block";
      // 関連リンク表示も削除
      document.getElementById("addon_kanren_div").parentNode.removeChild(document.getElementById("addon_kanren_div"))
      document.getElementById("addon_save_table").parentNode.removeChild(document.getElementById("addon_save_table"))
      document.getElementById("addon_btn_div").parentNode.removeChild(document.getElementById("addon_btn_div"))
    }, false)






  }








  // ----------------------------------------------------------------
  // 実行 ➤ 現在のURLごとに処理を分ける
  // ----------------------------------------------------------------

  //
  // csv DL 画面の場合実行
  if (window.location.href.indexOf("item.rms.rakuten.co.jp/rms-item-download/shops") !== -1) {
    addon_rms_item_download()
  }
  //
  // 商品管理
  if (window.location.href.indexOf("item.rms.rakuten.co.jp/rms-sku/shops/") !== -1) {

    //
    // 商品一覧 の場合実行
    if (window.location.href.indexOf("items")) {
      addon_rms_shopsitems()
    }
  }


}






