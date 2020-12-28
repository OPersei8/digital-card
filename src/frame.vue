<template>
    <div class="hello">
        <div class="welcome">
            <div class="welcome-header">數位名片<br>{{line_username}} ，您好</div>
            <div class="welcome-body">
            <div v-if="hasCard" class="h100"><button class="h100" @click="sendCard(myCard)">發送自己名片</button></div><br>
            </div>
        </div>
        <div>發送同事名片:</div>
        <div v-if="ready" class="card-container">
            <div v-for="card in cards" :key="card.index" class="card">
                <div class="card-info">
                    <div>{{card.name}}</div>
                    <div>職稱:{{card.data.body.contents[3].text}}</div>
                </div>
                <button class="card-send" @click="sendCard(card.data)">發送名片</button>
            </div>
        </div>
        <!-- <div>{{msg}}</div>
        <button v-if="ready" @click="sendCard">發送名片</button> -->
    </div>
</template>
 
<script>
module.exports = {
    data: function() {
        return {
            line_userid:"",
            line_username:"",
            ready:false,
            cards:undefined,
            hasCard:false,
            myCard:undefined
        }
    },
    mounted(){
        if(confirm("是否為Line畫面"))
            this.init();        
        else
            this.styleTest();
    },
    methods:{
        styleTest(){
            fetch('./cards.json')
            .then(res=>res.json())
            .then(data=>{
                this.cards=data.data;
                this.ready=true;
                this.checkHasCard();
            })    
            this.line_username = "于凡";	
            
        },
        async init(){
             window.liff
                .init({
                    liffId: "1655456623-oxjPwXjM"
                })
                .then(() => {
                    const accessToken = window.liff.getAccessToken();
                    // Start to use liff's api
                    window.liff.getProfile()
                        .then(profile => {
                            this.line_userid = profile.userId;
                            this.line_username = profile.displayName;	
                            this.checkHasCard();
                            this.ready=true;				
                        })
                    .catch((err) => {
                        this.msg = err;
                        alert(err.code, err.message);
                    });
                })
            .catch((LiffError) => {
                // Error happens during initialization
                alert(LiffError.code, LiffError.message);
            });
            fetch('./cards.json')
            .then(res=>res.json())
            .then(data=>this.cards=data.data)
        },
        checkHasCard(){
            if(this.cards.some(emt=>emt.name == this.line_username)){
                this.cards.find(emt => this.myCard = emt.data);
                this.hasCard = true;
            }
        },
        sendCard(val){
            // var messages = JSON.parse(this.cards[0]);
            if (liff.isApiAvailable('shareTargetPicker')) {
                liff.shareTargetPicker([
                    {
                    "type": "flex",
                    "altText": "數位版名片",
                    "contents": val
                    }
                ]);
            } else {
                alert("尚未開啟分享權限");
            }
        }
    }
}
</script>
 
<style>
.hello {
    background: #333;
    color:white;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    height: 100%;
    width: 100%;
    position:absolute; /*css bug */
}
.welcome{
    display: flex;
    width:100%;
    padding:10px 30px;
    background: #5555;
    box-shadow: 10px 2px 10px 10px #fff2;
}
.welcome-header{
    font-size: 20px;
    flex:1;
}
.card-container{
    width:100%;
    background: #fff3;
    overflow-y: auto;
}

.h100{
    height: 100%;
}

.card{
    box-shadow: 2px 2px 2px 2px #0002;
    display: flex;    
    align-items: center;
    height:40px;
}
.card-info{
    flex:1;
}
.card-send{
    height: 100%;
}
</style>