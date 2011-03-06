function cheat( action ){
  //champ_id = id;
  j.get('/game/cheat/' + action + '/sudo', {},
      function(data, textStatus, xmlHttpRequest ){
        update_champ_status( data.champ.champ );
        debug('Cheater! ;D');
        //default_response_handler( data );
      }, 'json' );
}