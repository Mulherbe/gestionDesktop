

// function get pagination

function getPagination(table) {
    var lastPage = 1;
  
    $('#maxRows')
      .on('change', function(evt) {
  
       lastPage = 1;
        $('.pagination')
          .find('li')
          .slice(1, -1)
          .remove();
        var trnum = 0; // reset counter
        var maxRows = parseInt($(this).val()); 
        // Max Rows
  
        if (maxRows == 5000) {
          $('.pagination').hide();
        } else {
          $('.pagination').show();
        }
  
        var totalRows = $(table + ' tbody tr').length; // numbers of rows
        $(table + ' tr:gt(0)').each(function() {
          trnum++; // Start Counter
          if (trnum > maxRows) {
            // if tr number gt maxRows
  
            $(this).hide(); // fade it out
          }
          if (trnum <= maxRows) {
            $(this).show();
          } // else fade in Important in case if it ..
        }); //  was fade out to fade it in
        if (totalRows > maxRows) {
          // if tr total rows gt max rows option
          var pagenum = Math.ceil(totalRows / maxRows); // ceil total(rows/maxrows) to get ..
          //	numbers of pages
          for (var i = 1; i <= pagenum; ) {
            // for each page append pagination li
            $('.pagination #prev')
              .before(
                '<li class="btn btn-dark mr-2" data-page="' +
                  i +
                  '">\
                                    <span>' +
                  i++ +
                  '<span class="sr-only">(current)</span></span>\
                                  </li>'
              )
              .show();
          } // end for i
        } // end if row count > max rows
        $('.pagination [data-page="1"]').addClass('active'); // add active class to the first li
        $('.pagination li').on('click', function(evt) {
          // on click each page
          evt.stopImmediatePropagation();
          evt.preventDefault();
          var pageNum = $(this).attr('data-page'); // get it's number
  
          var maxRows = parseInt($('#maxRows').val()); // get Max Rows from select option
  
          if (pageNum == 'prev') {
            if (lastPage == 1) {
              return;
            }
            pageNum = --lastPage;
          }
          if (pageNum == 'next') {
            if (lastPage == $('.pagination li').length - 2) {
              return;
            }
            pageNum = ++lastPage;
          }
  
          lastPage = pageNum;
          var trIndex = 0; // reset tr counter
          $('.pagination li').removeClass('active'); // remove active class from all li
          $('.pagination [data-page="' + lastPage + '"]').addClass('active'); // add active class to the clicked
          // $(this).addClass('active');					// add active class to the clicked
            limitPagging();
          $(table + ' tr:gt(0)').each(function() {
            // each tr in table not the header
            trIndex++; // tr index counter
            // if tr index gt maxRows*pageNum or lt maxRows*pageNum-maxRows fade if out
            if (
              trIndex > maxRows * pageNum ||
              trIndex <= maxRows * pageNum - maxRows
            ) {
              $(this).hide();
            } else {
              $(this).show();
            } //else fade in
          }); // end of for each tr in table
        }); // end of on click pagination list
        limitPagging();
      })
      .val(0)
      .change();
  
  }
  
  function limitPagging(){
  
      if($('.pagination li').length > 7 ){
              if( $('.pagination li.active').attr('data-page') <= 3 ){
              $('.pagination li:gt(5)').hide();
              $('.pagination li:lt(5)').show();
              $('.pagination [data-page="next"]').show();
          }if ($('.pagination li.active').attr('data-page') > 3){
              $('.pagination li:gt(0)').hide();
              $('.pagination [data-page="next"]').show();
              for( let i = ( parseInt($('.pagination li.active').attr('data-page'))  -2 )  ; i <= ( parseInt($('.pagination li.active').attr('data-page'))  + 2 ) ; i++ ){
                  $('.pagination [data-page="'+i+'"]').show();
              }
          }
      }
  }
  
  $(function() {
    $('table tr:eq(0)').prepend('<th> ID </th>');
  
    var id = 0;
  
    $('table tr:gt(0)').each(function() {
      id++;
      $(this).prepend('<td>' + id + '</td>');
    });
  });
  
  function searchFunction() {

    var input, filter, table, tr, td, i, txtValue;

    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("table-id");
    tr = table.getElementsByTagName("tr");
      for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }