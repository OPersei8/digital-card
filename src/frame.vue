<template>
    <div class="hello">
        <div>Hello {{line_userid}}/{{line_username}}</div>
        <div>{{msg}}</div>
    </div>
</template>
 
<script>
module.exports = {
    data: function() {
        return {
            line_userid:"",
            line_username:"",
            msg:"",
        }
    },
    created(){
        this.init();
    },
    methods:{
        async init(){
            console.log(window.liff);
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
                            //$("#line_userid").html("Line userID:" + line_userid);
                            // $("#line_username").html(line_username + "&nbsp;&nbsp;您好");					
                        })
                    .catch((err) => {
                        this.msg = err;
                        alert('getProfile error', err);
                    });
                })
            .catch((LiffError) => {
                // Error happens during initialization
                alert(LiffError.code, LiffError.message);
            });
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