/**
 * Eval the middle of the string, just like Ruby.
 * Limited to not having {} inside the #{ }
 * Ex: 
 *    a = 2; c = '3';
 *    S("sim #{ 'aaa' } !#{ a+2} #{ c+'3'} nao")
 */
function S(str){
  var str_ = "", begin = 0, end = 0, last_i = 0;
  
  while( (begin = str.indexOf('#{', last_i)) != -1 && (end = str.indexOf('}', begin)) != -1 ){
    str_ += str.substring(last_i,begin) + eval(str.substring(begin+2,end))
    last_i = end+1
  }
  
  return str_ +  str.substr(last_i); // .match(/\#\{[^\}]+/g)
}


/*
Object.prototype._size3 = function() {
    var size = 0, key;
    for (key in this) {
        if (this.hasOwnProperty(key) && this[key] != null) size++;
    }
    return size;
};

Object.prototype._eachPair = function(f ){
  if (typeof f != "function") throw new TypeError();
  
  for (key in this) {
    if (this.hasOwnProperty(key) && this[key] != null){
      var r = f.call(this, key, this[key]);
      if(typeof r != 'undefined') return r;
    }
  }
}
*/

