// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults

function goodbye(e) {
  if(!e) e = window.event;
  //e.cancelBubble is supported by IE - this will kill the bubbling process.
  e.cancelBubble = true;
  e.returnValue = 'Deseja sair do jogo?'; //This is displayed on the dialog

  //e.stopPropagation works in Firefox.
  if (e.stopPropagation) {
    e.stopPropagation();
    e.preventDefault();
  }
  return ('Deseja sair do jogo?');
}
// RELEASE window.onbeforeunload=goodbye;


j = $;

j("#log").ajaxError(function(event, request, settings){
  // TODO Mostrar um modal falando que houve erro, tentar minimizar merdas
  debug( "Error requesting page ["+settings.type+"]" + settings.url )
});

function debug( msg ){
  $("#log").append( "<li>"+msg+"</li>" );
}

views = {
  champ_selection: {url: '/game/champs/' },
  champ_creation: {url: '/game/champs/new'},
  profile: {url: '/game/champs/'},
  agenda: {url: '/game/agenda/'},
  partida: {url: '/game/agenda/show'},
  //city1: {url: '/game/city/1'},
  //  casa1:{ url: '/game/place/casa1'},
  city: {url: '/game/city/'},
  place: {url: '/game/place/'},
  team: {url: '/game/team/'}
}


j(document).ready( bootstrap );

function bootstrap(){
  console.log("BootStrapping");
  /* Fazer os pre-loads
   * //document.styleSheets[1].disable = true // useless = true xD
document.styleSheets[0].cssRules[2].style.cssText // useless = true xD
img = new Image()
img.src = '../images/HI_BG.png' //'../images/bt/bt_apartamentos_over.png'
img.onload = function(){ alert(1)}
   */
  
  //j('#loading-base').hide();
  load_view('champ_selection');
  //load_view('champ_creation')
}


/*
 * Determina o que carregar no palco principal, mais que uma função.. um conceito ;D
 * Recursiva caso a view não esteja carregada;
 * 2xRecursiva caso um 'refresh' seja passado;
 */
function load_view( name, param, refresh ){
  
  if( name == "profile" ){
    j(".view[id^=profile]").remove()
  }
  
  if( typeof(refresh) != 'undefined' && refresh ){ // case we get a param to refresh, destroy the DIV and recursive
    j('#'+name+param).remove();
    load_view(name, param);
    //return true; this return was bugging FireFox
  } else{
    
    //if( !j ){ //setTimeout(load_view, 12, name ); }
    var param = param || ""
    if( j('#'+name+param).size() > 0 ){
      j('.view:visible').hide();
      j('#'+name+param).fadeIn();
      console.log("Loading: '"+name+param+"'");
    } else {
      if(views[name]){
        var new_view = j("<div/>", {
          "class" : "view",
          "id" : name+param,
          text : "LOADING",
          click: function(){
            //$(this).toggleClass("test");
          }
        }).appendTo("#stage") ;//.load(views[name].url, function(){        load_view( name );      });
        j.get(views[name].url+param, ({}), function(data, status){
          new_view.html( S(data) ); // avalia o conteúdo substituindo #{var} pela var em JS
          load_view( new_view.attr('id') );
        });
      } else{
        debug( "view: '"+name+","+param+"' NOT FOUND" );
      }
    }
  }
}
/* // Entender data, como dados é papel de um Smart Client, não deve ser o caso por enquanto.
function default_response_handler( data ){
  if( data && data.answer == 'win' ){
    show_cool_msg( data.text );
  }else{
    show_fail_msg( data.text );
  }
  //if(data.champ) return update_champ_status( data.champ );
  return (data.champ) ? update_champ_status( data.champ ) : false;
}
*/

function show_cool_msg( str ){
  alert('SUCESSO: '+str);
}

function show_fail_msg( str ){
  alert('Noooooo: '+str);
}

function update_champ_status( new_champ ){
  var ok = $champ.update( new_champ );
  // Eu estava pensando em updatear as barras brilhando com um .animate, mas acho melhor deixar para depois
  set_bars( );
  return ok;
}


      // Logica usada para quando o player clica para fazer um treino.
      // Tracker: campinho1.html.erb > place_helper.rb
      function start_training( training_id ){
        
        // pre-validate the champ energy and low-stress to do training //or is this too smart?
        
        j.get('/game/training/start/' + training_id, {},
          function(data, textStatus, xmlHttpRequest ){
            show_modal_response( data );
            
            //debugger;
            //var diff = default_response_handler( data );
            //show_changed_attributes( diff );
          },
          'html'
        )
      }
      
function show_contract_offer(){
  j.get('/game/champ_team_contracts/new/', {},
    function(data, textStatus, xmlHttpRequest ){
      show_modal_response( data );
    },
    'html'
);
}
function respond_contract_offer( answer ) {
  load_modal_spinner();
  j.get('/game/champ_team_contracts/respond_proposal/'+( answer ? 'yes' : 'no'), {},
    function(data, textStatus, xmlHttpRequest ){
      show_modal_response( data );
      load_view('agenda', '', true);
    },
    'html'
  )
}

      // Loads and show the modal box with a given HTML
      function show_modal_response( data ){
        //debugger
        if(data){
          j('#response').html( S(data) );
          j('#fancybox_trigger').trigger('click');
        }
      }
      
function load_modal_spinner(){
  j('#response').html( "<img src='/images/game/base/spinner.gif' />" );
  //show_modal_response("<img src='/images/game/base/spinner.gif' />");
}

/*
function show_changed_attributes( diff ){
  // Mostra o resultado do treino
  j.each(diff, function(i,e){
    alert( $champ.attribute(i) + ((e >= 0) ? ' +' : ' ')  + e); // Not a smart client...
  })
}
*/

function select_champ( id ){
  //champ_id = id;
  j.get('/game/champs/select/' + id, {},
      function(data, textStatus, xmlHttpRequest ){
        if( data && data.champ ){
          $champ = new Champ( data.champ );
          // data.champ.team.team.name #=> "Cachorrão"
          load_view('city', $champ.location);
          load_gui();
        }
      }, 'json' );
}

function load_gui(){
  // TODO Tem que fazer uma forma de carregar o avatarzinho! 
  //j('#champ_pic').html("<img src='http://www.gravatar.com/avatar/922c9fdc02ec0531cd152ca7cadb33bf?s=128&d=retro&f=y' />");
  j('#champ_name').html( $champ.name );
  j('#gui').slideDown('fast');
  set_bars();
  $champ.set_portrait();
}

function set_bars(){
  // Set bars
  j('#energia_fill').css('width', $champ.energy+"%"); // attr1
  j('#stress_fill').css('width', $champ.stress+"%" ); // attr2
  
  // Set overall e team.name if there's any
  j("#overall_n_team_sy").find(".overall_number" ).html($champ.overall)
  if( $champ.team.id ){
    j("#overall_n_team_sy").find(".champ_team_name").html("<a href='javascript: load_view(\"team\", "+$champ.team.id+", true) '>"+$champ.team.name+"</a>")
  }else{
    j("#overall_n_team_sy").find(".champ_team_name").html("--")
  }
  
}


/*
function load_buttons() {
  j("<div/>", {
    "class" : "view hidden",
      "id" : "create_champ",
      text : "LOADING",
      click: function(){
         // hide all, show tela de criação de champ
      }
    }).appendTo("#stage")
}
*/

function set_champ_effort(){
  j.get('/game/agenda/save_champ_effort/' + j('#amount_effort').val(), {},
    function(data, textStatus, xmlHttpRequest ){
      show_modal_response(data);
    }, 'html' );
}





// Utils: https://github.com/flockonus/javascriptinmotion/raw/master/lib/misc/flockonus_utils.js
if( typeof console == 'undefined'){
  console = {
    log : function(){},
    group : function(){},
    groupEnd : function(){}
  };
}



