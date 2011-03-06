function Champ(champ ){
  var instance = this;
  this.id = champ.id;
  // a hash like: { 'energy': 'energia', pass: 'passe' }  // this is bad \/
  // instance.attributes_dict = $attributes_locale        // this is becoming smart client, lets not mix!! 
  
  // PERSONAL
  this.name = champ.name;
  this.look = champ.look;
  this.overall = champ.overall;
  
  // TEAM
  this.team = champ.team ? champ.team.team : ({});
  
  
  // BARS
  this.energy = champ.energy;
  this.stress = champ.stress;
  
  function update( new_champ ){
    
    //if(typeof(new_champ) == 'undefined' ) return alert('recebi undefined! ^^\'')
    
    j.each( new_champ, function(i,e){
      if( typeof( instance[i] ) != 'undefined'  ){
        instance[i] = e;
      }
    });
    
    if(new_champ.team){
      instance.team = new_champ.team.team;
    };
    
  }
  
  function set_portrait(){
    // casca: {}, pele: {}, cabelo: {}, nariz: {}, olho: {}, boca: {}
    $looks.set( 'casca', instance.look.casca );
    $looks.set( 'pele', instance.look.pele );
    $looks.set( 'cabelo', instance.look.cabelo );
    $looks.set( 'nariz', instance.look.nariz );
    $looks.set( 'olho', instance.look.olho );
    $looks.set( 'boca', instance.look.boca );
    return $looks.assemble('champ_pic_offset', true);
  }
  
  function attribute( attr ){
    return '?!?'; //instance.attributes_dict[attr] || "???";
  }
  
  this.location = "1";
  
  this.update = update;
  this.attribute = attribute;
  this.set_portrait = set_portrait
}
