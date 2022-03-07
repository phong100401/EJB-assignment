$(document).ready(function(){
    var page = 'accounts/manage_account';
    var s = '';
    page = page.split('/');
     page2 = 'index';
    if(Object.keys(page).length > 1)
     page2 = page[1];
    page = page[0];

    if($('.nav-link.nav-'+page).length > 0){
           $('.nav-link.nav-'+page).addClass('active')
          if($('.nav-link.nav-'+page).siblings('.nav-treeview').length > 0){
              $('.nav-link.nav-'+page).parent().addClass('menu-open')
              $('.nav-link.nav-'+page2).addClass('active')
          }

    }
   
  })

  $(function(){
    $('#generate_pass').click(function(){
        var randomstring = Math.random().toString(36).slice(-8);
        $('[name="generated_password"]').val(randomstring)
    })
    $('[name="account_number"]').on('input',function(){
        if($('._checks').length > 0)
            $('._checks').remove()
        $('button[form="account-form"]').attr('disabled',true)
        $(this).removeClass('border-danger')
        $(this).removeClass('border-success')
        var checks = $('<small class="_checks">')
        checks.text("Checking availablity") 
        $('[name="account_number"]').after(checks)
        $.ajax({
            url:_base_url_+'classes/Master.php?f=check_account',
            method:'POST',
            data:{id:$('[name="id"]').val(),account_number: $(this).val()},
            dataType:'json',
            error:err=>{
                console.log(err)
                alert_toast("An error occured","error")
                end_loader()
            },
            success:function(resp){
                if(resp.status == 'available'){
                    checks.addClass('text-success')
                    checks.text('Available')
                    $('[name="account_number"]').addClass('border-success')
                    $('button[form="account-form"]').attr('disabled',false)
                }else if(resp.status == 'taken'){
                    checks.addClass('text-danger')
                    checks.text('Account already exist')
                    $('[name="account_number"]').addClass('border-danger')
                    $('button[form="account-form"]').attr('disabled',true)
                }else{
                    alert_toast('An error occured',"error")
                    $('[name="account_number"]').addClass('border-danger')
                    console.log(resp)
                }
                end_loader()
            }
        })
    })
    $('#account-form').submit(function(e){
        e.preventDefault()
        start_loader()
        if($('.err_msg').length > 0)
            $('.err_msg').remove()
        $.ajax({
            url:_base_url_+'classes/Master.php?f=save_account',
            method:'POST',
            data:$(this).serialize(),
            dataType:'json',
            error:err=>{
                console.log(err)
                alert_toast("An error occured","error")
                end_loader()
            },
            success:function(resp){
                if(resp.status == 'success'){
                    location.href="./?page=accounts"
                }else if(!!resp.msg){
                     var msg = $('<div class="err_msg"><div class="alert alert-danger">'+resp.msg+'</div></div>')
                     $('#account-form').prepend(msg) 
                     msg.show('slow')
                }else{
                    alert_toast('An error occured',"error")
                    console.log(resp)
                }
                end_loader()
            }
        })
    })
})
$(document).ready(function(){
    window.viewer_modal = function($src = ''){
     start_loader()
     var t = $src.split('.')
     t = t[1]
     if(t =='mp4'){
       var view = $("<video src='"+$src+"' controls autoplay></video>")
     }else{
       var view = $("<img src='"+$src+"' />")
     }
     $('#viewer_modal .modal-content video,#viewer_modal .modal-content img').remove()
     $('#viewer_modal .modal-content').append(view)
     $('#viewer_modal').modal({
             show:true,
             backdrop:'static',
             keyboard:false,
             focus:true
           })
           end_loader()  

 }
   window.uni_modal = function($title = '' , $url='',$size=""){
       start_loader()
       $.ajax({
           url:$url,
           error:err=>{
               console.log()
               alert("An error occured")
           },
           success:function(resp){
               if(resp){
                   $('#uni_modal .modal-title').html($title)
                   $('#uni_modal .modal-body').html(resp)
                   if($size != ''){
                       $('#uni_modal .modal-dialog').addClass($size+'  modal-dialog-centered')
                   }else{
                       $('#uni_modal .modal-dialog').removeAttr("class").addClass("modal-dialog modal-md modal-dialog-centered")
                   }
                   $('#uni_modal').modal({
                     show:true,
                     backdrop:'static',
                     keyboard:false,
                     focus:true
                   })
                   end_loader()
               }
           }
       })
   }
   window._conf = function($msg='',$func='',$params = []){
      $('#confirm_modal #confirm').attr('onclick',$func+"("+$params.join(',')+")")
      $('#confirm_modal .modal-body').html($msg)
      $('#confirm_modal').modal('show')
   }
 })