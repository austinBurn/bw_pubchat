class SimplePubChat{
    
    renderMessages(){
        console.log(this.jsonMessages);
        for(var i=0; i<this.jsonMessages.length;i++){
            this.chatContainer.innerHTML+='<div class="message"><div class="name">'+this.jsonMessages[i].u+'</div><div class="content">'+this.jsonMessages[i].data+'</div></div>';
        }
    }
    
    loadMessages(){
        $.ajax({
           url: 'server.php',
           data: {getMessages: "yup"},
           type: 'GET',
           success: function(response) {
              response = "["+response.replace(/\n/g, ",")+"]";
              var messages_recieved=JSON.parse(response);
              //console.log(messages_recieved);
              for(var i=0; i<messages_recieved.length;i++){
                  //HACKY
                  window.pubChat.jsonMessages[i]=(messages_recieved[i]);
              }
              window.pubChat.renderMessages();
              window.scrollTo(0,document.body.scrollHeight);
           }
        });
    }
    
    sendMessage(){
        var user="user";
        var message=window.pubChat.entryBox.value;//"uploadtest";
        window.pubChat.entryBox.value="";
        $.ajax({
           url: 'server.php',
           type: 'POST',
           data: {u: user, m: message},
           success: function(response) {
               window.pubChat.loadMessages();
                //TODO: make sure the data was posted correctly
                //if so, get all messages and scroll to the bottom
              //window.pubChat.renderMessages()
           }
        });
    }
    
    init(){
        console.log("init chat client");
        this.chatContainer = document.createElement("div");
        this.chatContainer.id = "chatZone"
        document.getElementsByTagName('body')[0].appendChild(this.chatContainer);
        
        this.entryContainer = document.createElement("div");
        this.entryContainer.id = "entryZone"
        document.getElementsByTagName('body')[0].appendChild(this.entryContainer);
        
        this.entryBox = document.createElement("textarea");
        this.entryBox.setAttribute("type", "text");
        this.entryBox.setAttribute("rows", "1");
        this.entryBox.id = "textInput";
        this.entryContainer.appendChild(this.entryBox);
        
        this.sendBtn = document.createElement("input");
        this.sendBtn.setAttribute("type", "button");
        this.sendBtn.setAttribute("value", "↑^");
        this.sendBtn.id = "sendBtn";
        this.sendBtn.onclick = this.sendMessage;
        this.entryContainer.appendChild(this.sendBtn);
        
        
        this.entryBox.addEventListener("keyup", function(event) {
            // Number 13 is the "Enter" key on the keyboard
            if (event.keyCode === 13) {
                // Cancel the default action, if needed
                event.preventDefault();
                // Trigger the button element with a click
                window.pubChat.sendBtn.click();
            }
        });
        
        
        this.loadMessages();
        //this.renderMessages();
    }
    
    constructor(userName){
        this.userName = userName;
        this.chatContainer = null;
        this.entryContainer = null;
        this.entryBox = null;
        this.sendBtn = null;
        this.chatMessages=new Array();
        this.jsonMessages=new Array();
        this.init();
    }
}

window.pubChat = new SimplePubChat(/*load cookie with name info*/"");
