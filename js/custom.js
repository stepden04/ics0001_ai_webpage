
  (function ($) {
  
  "use strict";

    // Wait for document to be ready
    $(document).ready(function() {

    // MENU
    $('#sidebarMenu .nav-link').on('click',function(){
      $("#sidebarMenu").collapse('hide');
    });
    
    // CUSTOM LINK
    $('.smoothscroll').click(function(){
      var el = $(this).attr('href');
      var elWrapped = $(el);
      var header_height = $('.navbar').height();
  
      scrollToDiv(elWrapped,header_height);
      return false;
  
      function scrollToDiv(element,navheight){
        var offset = element.offset();
        var offsetTop = offset.top;
        var totalScroll = offsetTop-navheight;
  
        $('body,html').animate({
        scrollTop: totalScroll
        }, 300);
      }
    });

    // SEARCH FUNCTIONALITY
    $('.header-form').on('submit', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      var searchTerm = $(this).find('input[name="search"]').val().toLowerCase().trim();
      
      if (!searchTerm) {
        return false;
      }

      // Define page keywords mapping
      var pageKeywords = {
        'profile': ['profile', 'name', 'email', 'stepan', 'denysenko', 'personal', 'information', 'account'],
        'wallet': ['wallet', 'transaction', 'balance', 'payment', 'money', 'account', 'activity', 'transfer'],
        'contact': ['contact', 'message', 'email', 'reach', 'touch', 'tallinn', 'estonia', 'stepan@taltech'],
        'about': ['about', 'readme', 'documentation', 'read', 'info', 'project', 'github', 'repository', 'framework', 'bootstrap'],
        'overview': ['overview', 'dashboard', 'home', 'welcome', 'main']
      };

      // Check current page content first
      var pageContent = $('body').text().toLowerCase();
      if (pageContent.indexOf(searchTerm) !== -1) {
        // Search found on current page - highlight and scroll to first occurrence
        var found = false;
        $('h1, h2, h3, h4, h5, h6, p, span, a, li').each(function() {
          if (!found && $(this).text().toLowerCase().indexOf(searchTerm) !== -1) {
            $('html, body').animate({
              scrollTop: $(this).offset().top - 100
            }, 500);
            found = true;
            return false;
          }
        });
        return false;
      }

      // Navigate to appropriate page based on keywords
      var currentPage = window.location.pathname.split('/').pop() || 'index.html';
      
      for (var page in pageKeywords) {
        for (var i = 0; i < pageKeywords[page].length; i++) {
          if (searchTerm.indexOf(pageKeywords[page][i]) !== -1 || pageKeywords[page][i].indexOf(searchTerm) !== -1) {
            var targetPage = page === 'overview' ? 'index.html' : page + '.html';
            if (currentPage !== targetPage) {
              window.location.href = targetPage;
              return false;
            } else {
              // Already on the page, just scroll to top
              $('html, body').animate({
                scrollTop: 0
              }, 500);
              return false;
            }
          }
        }
      }

      // If no match found, show alert
      alert('No results found for "' + searchTerm + '". Try searching for: profile, wallet, contact, or overview.');
      return false;
    });

    }); // End document ready
  
  })(window.jQuery);



