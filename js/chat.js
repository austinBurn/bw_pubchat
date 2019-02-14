class SimplePubChat{
    
    renderMessages(){
        console.log(this.jsonMessages);
        for(var i=0; i<this.jsonMessages.length;i++){
            this.chatContainer.innerHTML+='<div class="message"><div class="name">'+this.jsonMessages[i].u+'</div><div class="content">'+this.jsonMessages[0].data+'</div></div>';
        }
    }
    
    loadMessages(num=10){
        $.ajax({
           url: 'server.php',
           //data: {myData: "test"},
           type: 'GET',
           success: function(response) {
              response = "["+response.replace(/\n/g, ",")+"]";
              var messages_recieved=JSON.parse(response);
              //console.log(messages_recieved);
              for(var i=0; i<messages_recieved.length;i++){
                  //HACKY
                  window.pubChat.jsonMessages[i]=(messages_recieved[i]);
              }
              window.pubChat.renderMessages()
           }
        });
    }
    
    init(){
        console.log("init chat client");
        this.chatContainer = document.createElement("div");
        this.chatContainer.id = "chatZone"
        document.getElementsByTagName('body')[0].appendChild(this.chatContainer);
        
        this.entryBox = document.createElement("textarea");
        this.entryBox.setAttribute("type", "text");
        this.entryBox.id = "textInput";
        document.getElementsByTagName('body')[0].appendChild(this.entryBox);
        
        this.loadMessages();
        //this.renderMessages();
    }
    
    constructor(userName){
        this.userName = userName;
        this.chatContainer=null;
        this.entryBox = null;
        this.chatMessages=new Array();
        this.jsonMessages=new Array();
        this.init();
    }
}

window.pubChat = new SimplePubChat(/*load cookie with name info*/"");
