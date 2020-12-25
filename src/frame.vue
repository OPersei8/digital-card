<template>
    <div class="hello">
        <div>Hello {{line_userid}}/{{line_username}}</div>
        <div>{{msg}}</div>
        <button v-if="ready" @click="sendCard">發送名片</button>
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
        }
    },
    created(){
        this.init();
        
    },
    methods:{
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
        sendCard(){
            var messages = JSON.parse(this.cards[0]);
            if (liff.isApiAvailable('shareTargetPicker')) {
                liff.shareTargetPicker([
                    {
                    "type": "flex",
                    "altText": "數位版名片",
                    "contents": messages
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
    background: black;
    color:white;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    position:absolute; /*css bug */
}
</style>