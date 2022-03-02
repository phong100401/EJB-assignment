var indiList;
	 $(document).ready(function(){
		 $('.delete_data').click(function(){
			 _conf("Are you sure to delete this Account? All Transactions made will be also deleted.","delete_account",[$(this).attr('data-id')])
		 })
	 })
	 function delete_account($id){
		 start_loader();
		 $.ajax({
			 url:_base_url_+"classes/Master.php?f=delete_account",
			 method:"POST",
			 data:{id: $id},
			 dataType:"json",
			 error:err=>{
				 console.log(err)
				 alert_toast("An error occured.",'error');
				 end_loader();
			 },
			 success:function(resp){
				 if(typeof resp== 'object' && resp.status == 'success'){
					 location.reload();
				 }else{
					 alert_toast("An error occured.",'error');
					 end_loader();
				 }
			 }
		 })
	 }
	 $(function(){
		 indiList = $('#indi-list').dataTable({
			 columnDefs:[{
				 targets:[6],
				 orderable:false
			 }],
		 });
	 })

     $(document).ready(function(){
        var page = 'accounts';
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