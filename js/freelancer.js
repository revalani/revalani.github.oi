/* 

ler mais sobre lazy load image

https://developers.google.com/web/fundamentals/performance/lazy-loading-guidance/images-and-video*/

(function ($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 70)
        }, 1250, "easeInOutExpo");
        return false;
      }
    }
  });

  // devido a mudança pra display flex (<922px) e blox pra normal, exigil um hidden para manter o formato
  $('.scroll-to-top').hide();

  // hidden social floating 
  $(document).scroll(function () {
    var scrollDistanceBot = $(this).scrollTop(),
      elementOffset = $('#contato').offset().top,
      distance = (elementOffset - scrollDistanceBot);
    if (300 < distance) {
      $('.Social-scroll').fadeIn();
    } else {
      $('.Social-scroll').fadeOut();
    }
  });

  // Scroll to top button appear
  $(document).scroll(function () {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function () {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 80
  });

  // Collapse Navbar
  var navbarCollapse = function () {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  // ajax para os pop-ups (modal) 
  $(".list > p > a").on('click', function (event) {
    // $(".portPopup").on('click', function (event) {
    // debugger;
    // event.stopPropagation();
    // event.stopImmediatePropagation();

    /*limpa informação que estavão no campos*/
    $("#modalTitulo").empty();
    $("#modalTexto").empty();
    $("#carroseliIndicador").empty();
    $("#carroselFotos").empty();

    //pega o texto do campo clicado
    var titulo = $(this).text();
    console.log(this);


    // coloca o titulo provisório e loading enquanto carrega o conteudo 
    $("#modalTitulo").append(titulo);

    // colocar no centro +992px
    $(".modal-body").append('<div class="d-flex justify-content-center" id="modalLoad"><div class="spinner-border"  role="status"><span class="sr-only">Loading...</span></div></div>');


    $.getJSON("./img/portifolio/ajaxPortifolio.php", titulo, function (dado) {
        console.log(dado);
      })
      .done(function (dado) {
        // remove loading e titulo provisório
        $("#modalLoad").remove();
        $("#modalTitulo").empty();

        /* coloca informação*/
        $("#modalTitulo").append(dado.titulo);
        $("#modalTexto").append(dado.texto);

        for (let index = 0; index < dado.fotos.length; index++) {
          $("#carroseliIndicador").append('<li data-target="#carouselExampleIndicators" ></li>');
          $("#carroselFotos").append('<div class="carousel-item"><img src="' + dado.fotos[index] + '" class="d-block w-100" alt="' + dado.fotos[index] + '"></div>');

          if (index == 0) {
            $(".carousel-item").addClass("active");
          }
        }
      })
      .fail(function () {
        // mensagem quanto acontece erro: 
        $("#modalTitulo").empty().append("Erro");
        $("#modalTexto").empty().append("Não foi possível carregar o conteúdo desejado. Por favor, tente novamente.");
        $("#modalLoad").remove();
      });
  });


})(jQuery); // End of use strict