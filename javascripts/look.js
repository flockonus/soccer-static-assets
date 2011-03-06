function Look(){
  var instance = this;
  this.details =     ( { casca: {}, pele: {}, cabelo: {}, nariz: {}, olho: {}, boca: {} } );
  this.collections = ( { casca: [], pele: [], cabelo: [], nariz: [], olho: [], boca: [] } );
  this.parts = ({});
  
  
  function add(type, cod, ref ){
    if( instance.details[type] ){
      if( instance.details[type][cod] ){
        alert("Look:: Redefinição de:"+cod);
        return false;
      }
      
      instance.details[type][cod] = ref;
      instance.collections[type].push( cod )
    } else{
      alert("Look:: Dunno type:"+type);
      return false;
    }
    return true;
  }
  
  function add_casca(cod, ref){
    return add('casca', cod, new_image(ref));
  }
  
  function add_pele(cod, ref){
    return add('pele', cod, ref);
  }
  
  function add_cabelo(cod, ref){
    return add('cabelo', cod, new_image(ref));
  }
  
  function add_nariz(cod, ref){
    return add('nariz', cod, new_image(ref));
  }
  
  function add_olho(cod, ref){
    return add('olho', cod, new_image(ref));
  }
  
  function add_boca(cod, ref){
    return add('boca', cod, new_image(ref));
  }
  
  function set_part(type, cod){
    if( !instance.details[type][cod] )
      alert("Look:: Dunno this:"+type+":"+cod);
    instance.parts[type] = cod;
  }
  
  function get_detail(type, cod){
    return instance.details[type][cod];
  }
  
  function list(type){
    /*var arr = new Array();
    for (key in instance.details[type]) {
      if (instance.details[type].hasOwnProperty(key) && instance.details[type][key] != null){
        arr.push(key);
      }
    }
    return arr */
    return instance.collections[type];
  }
  
  function assemble(div_id, fresh_copy){
    if( typeof(fresh_copy) == "undefined" ) fresh_copy = false
    
    var char_canvas = j('#'+div_id);
    // Clear all <img>
    char_canvas.children('img').remove();
    // Append all selected
    
    
    var cabelo_ = j( instance.details['cabelo'][instance.parts['cabelo']] )
    var nariz_  = j( instance.details['nariz'][instance.parts['nariz']]   )
    var olho_   = j( instance.details['olho'][instance.parts['olho']]     )
    var boca_   = j( instance.details['boca'][instance.parts['boca']]     )
    
    if( fresh_copy ){
      cabelo_ = cabelo_.clone()
      nariz_  = nariz_.clone()
      olho_   = olho_.clone()
      boca_   = boca_.clone()
    }
    
    if( fresh_copy ){
      char_canvas.append( j( instance.details['casca']['1'] ).clone().addClass('char_shell').css('background', instance.details['pele'][instance.parts['pele']] ) );
    }else{
      char_canvas.append( j( instance.details['casca']['1'] ).addClass('char_shell').css('background', instance.details['pele'][instance.parts['pele']] ) );
    }
      
    
    char_canvas.append( cabelo_.addClass('char_parts_hair') );
    char_canvas.append( nariz_.addClass('char_parts_nose' ) );
    char_canvas.append( olho_.addClass('char_parts_eye' ) );
    char_canvas.append( boca_.addClass('char_parts_mouth' ) );
    
    return char_canvas;
  }
  
  
  // Each image is preloaded here.
  function new_image( ba ){
    var img = new Image();
    img.src = ba;
    return img;
  }
  
  this.add_pele = add_pele;
  this.add_casca = add_casca;
  this.add_nariz = add_nariz;
  this.add_olho = add_olho;
  this.add_boca = add_boca;
  this.add_cabelo = add_cabelo;
  
  this.set = set_part;
  this.get = get_detail;
  this.list = list;
  this.assemble = assemble;
}
