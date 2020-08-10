window.addEventListener("load", function(){
  $(function(){
    $( '.input-default' ).on('click', function(){
      let name = $(this).val();
      if(name == 0){
        $('.input-default').css('border-color','red');
        $('.no-product-name').text('入力してください');
      }else{
        $('.input-default').css('border-color','');
        $('.no-product-name').text('');
      };
    });
    $( '.input-default' ).on('change',function(){
      let name = $(this).val();
      if(name == 0){
        $('.input-default').css('border-color','red');
        $('.no-product-name').text('入力してください');
      }else{
        $('.input-default').css('border-color','');
        $('.no-product-name').text('');
      };
    });
  })

  $('.textarea-default').on('click',function(){
    let description = $(this).val();
    if(description == 0){
      $('.textarea-default').css('border-color','red')
      $('.no-product2').text('入力してください')
    }else{
      $('textarea-default').css('border-color','')
      $('.no-product2').text('')
    }
  });
  $('.textarea-default').on('change',function(){
    let description = $(this).val();
    if(description == 0){
      $('.textarea-default').css('border-color','red')
      $('.no-product2').text('入力してください')
    }else{
      $('.textarea-default').css('border-color','')
      $('.no-product2').text('')
    }
  });
  $('.default02').on('click',function(){
    let status = $(this).val();
    if(status == 0){
      $('.default02').css('border-color','red')
      $('.no-product4').text('選択してください')
    }else{
      $('.default02').css('border-color','')
      $('.no-product4').text('')
    }
  });
  $('.default02').on('change',function(){
    let status = $(this).val();
    if(status == 0){
      $('.default02').css('border-color','red')
      $('.no-product4').text('選択してください')
    }else{
      $('.default02').css('border-color','')
      $('.no-product4').text('')
    }
  });

  $('.default03').on('click',function(){
    let send_price = $(this).val();
    if(send_price == 0){
      $('.default03').css('border-color','red')
      $('.no-product5').text('選択してください')
    }else{
      $('.default03').css('border-color','')
      $('.no-product5').text('')
    }
  });
  $('.default03').on('change',function(){
    let send_price = $(this).val();
    if(send_price == 0){
      $('.default03').css('border-color','red')
      $('.no-product5').text('選択してください')
    }else{
      $('.default03').css('border-color','')
      $('.no-product5').text('')
    }
  });
  $( '.tk-price' ).on('click', function(){
    let price = $(this).val();
    if( price == 0){
      $('.tk-price').css('border-color','red')
      $('.no-product2').text('300以上9999999以下で入力してください')
    }else{
      $('.tk-price').css('border-color','')
      $('.no-product2').text('')
    }
  });
  $( '.tk-price' ).on('change',function(){
    let price = $(this).val();
    if( price == 0){
      $('.tk-price').css('border-color','red')
      $('.no-product2').text('300以上9999999以下で入力してください')
    }else{
      $('.tk-price').css('border-color','')
      $('.no-product2').text('')
    }
  });
  $('.default05').on('click',function(){
    let ship_day = $(this).val();
    if(ship_day == 0){
      $('.default05').css('border-color','red')
      $('.no-product7').text('選択してください')
    }else{
      $('.default05').css('border-color','')
      $('.no-product7').text('')
    }
  });
  $('.default05').on('change',function(){
    let ship_day = $(this).val();
    if(ship_day == 0){
      $('.default05').css('border-color','red')
      $('.no-product7').text('選択してください')
    }else{
      $('.default05').css('border-color','')
      $('.no-product7').text('')
    }
  });

  $(function(){
    let buildPrompt = `<option value>---</option>`
    let buildHtmlOption = function(parent) {
      let option = `<option value ="${parent.id}">${parent.name}</option>`
      return option
    }
    $('#parent').change(function() {
      let parent_id = $(this).val();
      $.ajax({
        type: 'GET',
        url: '/products/new/mid_category',
        data: {big_category_id: parent_id},
        dataType: 'json'
      })
      .done(function(parent) {
        $('.child').css('display', 'block');
        $('#child').empty();
        $('.grand_child').css('display', 'none');
        $('#child').append(buildPrompt);

        parent.forEach(function(child) {
          var html_option = buildHtmlOption(child);
          $('#child').append(html_option);
        });
      })
      .fail(function() {
        alert('aaaa')
      });
    });

    $(this).on("change", "#child", function() {
      let parent_id = $("#parent").val();
      let child_id = $("#child").val();

      $.ajax({
          type: 'GET',
          url: '/products/new/small_category',
          data: {
            big_category_id: parent_id,
            mid_category_id: child_id
          },
          dataType: 'json'
      })
      .done(function(parent) {
        $('.grand_child').css('display', 'block');
        $('#grand_child').empty();
        $('#grand_child').append(buildPrompt);

        parent.forEach(function(child) {
          var html_option = buildHtmlOption(child);
          $('#grand_child').append(html_option);
        });
      })
    });
  })

  const buildFileField = (num)=> {
    const html = `<div data-index="${num}" class="js-file_group">
                    <input class="js-file" type="file"
                    name="product[images_attributes][${num}][image]"
                    id="product_images_attributes_${num}_src"><br>
                    <div class="js-remove">削除</div>
                  </div>`;
    return html;
  }
  // プレビュー用のimgタグを生成する関数
  const buildImg = (index, url)=> {
    const html = `<img data-index="${index}" src="${url}" width="100px" height="100px">`;
    return html;
  }

  // file_fieldのnameに動的なindexをつける為の配列
  let fileIndex = [1,2,3,4,5,6,7,8,9,10];
  // 既に使われているindexを除外
  lastIndex = $('.js-file_group:last').data('index');
  fileIndex.splice(0, lastIndex);

  $('.hidden-destroy').hide();

  $('#image-box-1').on('change', '.js-file', function(e) {
    const targetIndex = $(this).parent().data('index');
    // ファイルのブラウザ上でのURLを取得する
    const file = e.target.files[0];
    const blobUrl = window.URL.createObjectURL(file);

    // 該当indexを持つimgがあれば取得して変数imgに入れる(画像変更の処理)
    if (img = $(`img[data-index="${targetIndex}"]`)[0]) {
      img.setAttribute('image', blobUrl);
    } else {  // 新規画像追加の処理
      $('#previews').append(buildImg(targetIndex, blobUrl));
      // fileIndexの先頭の数字を使ってinputを作る
      $('#image-box-1').append(buildFileField(fileIndex[0]));
      fileIndex.shift();
      // 末尾の数に1足した数を追加する
      fileIndex.push(fileIndex[fileIndex.length - 1] + 1);
    }
  });

  $('#image-box-1').on('click', '.js-remove', function() {
    const targetIndex = $(this).parent().data('index');
    // 該当indexを振られているチェックボックスを取得する
    const hiddenCheck = $(`input[data-index="${targetIndex}"].hidden-destroy`);
    // もしチェックボックスが存在すればチェックを入れる
    if (hiddenCheck) hiddenCheck.prop('checked', true);

    $(this).parent().remove();
    $(`img[data-index="${targetIndex}"]`).remove();

    // 画像入力欄が0個にならないようにしておく
    if ($('.js-file').length == 0) $('#image-box-1').append(buildFileField(fileIndex[0]));
  });
});