function getEventTag(tag,eventType){

  if(eventType=="wishlist"){
    if(location.href.indexOf("search.html") > -1 || location.href.indexOf("categories.html") > -1 ){
      const eventTag = tag.closest(".outer-product-container").querySelector("[data-eventtype='wishlisteventadd']")
      if(eventTag===null || eventTag===undefined || eventTag=="")
        return tag.closest(".outer-product-container").querySelector("[data-eventtype='wishlisteventremove']");
  
      return eventTag;
    }  

    else if(location.href.indexOf("product.html") > -1){
      return document.getElementById("addtowishlist");
    }

    else if(location.href.indexOf("cart.html") > -1){
      return tag.closest(".item").querySelector("[data-eventtype='wishlistAdd']")
    }  
  
    else if(location.href.indexOf("wishlist.html") > -1){
      return tag.closest(".item").querySelector("[data-eventtype='wishlistremove']")
    }
  
  }
  else if(location.href.indexOf("cart.html") > -1 && eventType=="cartRemove"){
    return tag.closest(".item").querySelector("[data-eventtype='cartRemove']")
  }
  else if(location.href.indexOf("product.html") > -1 && eventType=="add to cart"){
    return document.getElementById("addtocart");
  }
}

function getTag(word){
  var parentTag = [document.body]
  var tag = "";
  
  do
  {
    tag = parentTag.pop()
    if (tag.textContent.toLowerCase().match(word)) {
      var i=0;
      while (i<tag.childNodes.length){
        if (tag.childNodes[i].nodeName !== 'SCRIPT'){
          switch (tag.childNodes[i].nodeType)
          {
            case Node.TEXT_NODE:
              if (tag.childNodes[i].textContent.toLowerCase().match(word)) 
                return tag;
            break;
            case Node.ELEMENT_NODE:
              parentTag.push(tag.childNodes[i]);
              break;
          }
        }
        i++;
      }
   }
  }while(tag)
  return undefined;
}   

// var tag = getTag("redmi 9");
// console.log(tag)
// tag =  getEventTag(tag,"deleteCartItem"); 
// console.log(tag)
// tag.click();



var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;

var grammar = '#JSGF V1.0;'

var recognition = new SpeechRecognition();
recognition.continuous = true;
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.lang = 'en-US';
recognition.interimResults = false;

recognition.onstart = function (){
    console.log("speech begins!!")
}

recognition.onend = function(){
    console.log("speech end!!")
    if(voiceBtn.dataset.status==="on"){
      recognition.start();
    }
}

recognition.onresult = function(event) {
    var last = event.results.length - 1;
    var text = event.results[last][0].transcript;
    
    text = text.trim().toLowerCase();
    const searchRegex = RegExp('^search');
    const openRegex  = RegExp('^open');
    const addRemoveWishlistRegex  = RegExp('^(favourite|favorite)');
    const deleteCartItemRegex = RegExp('^delete');
    const addtocartRegex = RegExp('^add to cart');
    const backRegex = RegExp('^back');
    const forwardRegex = RegExp('^forward');
    const scrollDownRegex  = RegExp('^(down|scroll down)');
    const scrollUpRegex  = RegExp('^(up|scroll up)');

    console.log("Text : "+text);
    if(searchRegex.test(text)){
        text = text.replace('search','').trim().toLowerCase();
        window.location.href = `${window.location.origin}/search/search.html?q=${text}`;
    }
    else if(openRegex.test(text)){
        text = text.replace('open','').trim().toLowerCase()

        if(text.includes("wishlist") || text.includes("wish") ||text.includes("list")){
          const tag = document.getElementById("wishlist");
          tag.click();
        }
        else if(text.includes("cart") || text.includes("bag")){
          const tag = document.getElementById("cart");
          tag.click();
        }
        else{
          const tag = getTag(text)
          if(tag===undefined){
            alert("Sentence not matched,Try Either open cart,open wishlist,open bag...!!")
            return;
          }
          tag.click();          
        }
    }
    else if(addRemoveWishlistRegex.test(text) && location.href.indexOf("product.html") > -1 ){
      text = text.replace('favourite','').trim().toLowerCase();
      text = text.replace('favorite','').trim().toLowerCase();

      const tag = getEventTag(undefined,'wishlist');
      tag.click();
    }
    else if(addRemoveWishlistRegex.test(text)){
      text = text.replace('favourite','').trim().toLowerCase();
      text = text.replace('favorite','').trim().toLowerCase();

        let tag = getTag(text);
        if(tag===undefined){
          alert("Sentence not matched,Try again!")
          return;
        }
        tag = getEventTag(tag,'wishlist');
        tag.click();
    }
    else if(deleteCartItemRegex.test(text)){
      text = text.replace('delete','').trim().toLowerCase()
      let tag = getTag(text);
      if(tag===undefined){
        alert("Sentence not matched,Try again!")
        return;
      }
      tag = getEventTag(tag,"cartRemove");
      tag.click();
    }
    else if(addtocartRegex.test(text)){
      text = text.replace('add to cart','').trim().toLowerCase()
      const tag = getEventTag(undefined,"add to cart");
      tag.click();
    }
    else if(backRegex.test(text)){
      window.history.back();
    }
    else if(forwardRegex.test(text)){
      window.history.forward();
    }
    else if(scrollDownRegex.test(text)){
      if(window.scrollbars.visible)
        window.scrollBy(0,250);
    }
    else if(scrollUpRegex.test(text)){
      if(window.scrollbars.visible)
        window.scrollBy(0,-250);
    }
}

// recognition.onerror = function(event) {
// }        

const voiceBtn = document.getElementById('microphone');

voiceBtn.addEventListener('click',function(){

    if(voiceBtn.dataset.status==="off"){
        recognition.start();
        voiceBtn.dataset.status="on";
    }
    else{
        recognition.stop();
        voiceBtn.dataset.status="off";
    }
})

// voiceBtn.click();
