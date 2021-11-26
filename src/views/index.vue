<template>
    <div class="wrapper">
        <!-- 模式选择 -->
        <div class="pattern-box">
            <div :class="this.indexChange(1)" @click="patternChoice(1)">RSA加解密</div>
            <div :class="this.indexChange(2)" @click="patternChoice(2)">AES加解密ECB</div>
            <div :class="this.indexChange(3)" @click="patternChoice(3)">AES加解密CBC</div>
        </div>
        <!--加密-->
        <div class="example-box">
            <div class="title">加密示例</div>
            <p class="msg">明文：<input type="text" v-model="msg"></p>
            <button class="encrypt-btn" @click="encrypt">加密</button>
            <p class="msg">密文：{{ encryptMsg }}</p>
        </div>
        <!--解密-->
        <div class="example-box">
            <div class="title">解密示例</div>
            <p class="msg">密文：{{ encryptMsg }}</p>
            <button class="encrypt-btn" @click="decrypt">解密</button>
            <p class="msg">{{ decryptMsg }}</p>
        </div>
        <div style="width:100%;height:300px">
            <Test2></Test2>
        </div>
    </div>
</template>

<script>
    import secret from '../utils/secret'
    export default{
    	data(){
    		return {
                index: 1,
    			msg : '123456' ,
				encryptMsg : '' ,
				decryptMsg : ''
			}
        },
        components:{
            Test2
        },
        computed:{
            indexChange(){
                return (value)=>{
                    if(value==this.index){
                        return 'pattern-box-active'
                    }else{
                        return 'pattern-box-common'
                    }
                }
            }
        },
        methods: {
            // 模式切换
            patternChoice(value){
                this.index = value
                this.encryptMsg = '' 
				this.decryptMsg = ''
            },
			encrypt(){
                if(this.index == 1){
                    this.encryptMsg = secret.RSAencrypt(this.msg);
                }else if(this.index == 2){
                    this.encryptMsg = secret.aesEncryptECB(this.msg)
                }else if(this.index == 3){
                    this.encryptMsg = secret.aesEncryptCBC(this.msg)
                }
            },
			decrypt(){
                if(this.index == 1){
                    this.decryptMsg = secret.RSAdecrypt(this.encryptMsg)
                }else if(this.index == 2){
                    this.decryptMsg = secret.aesDecryptECB(this.encryptMsg)
                }else if(this.index == 3){
                    this.decryptMsg = secret.aesDecryptCBC(this.encryptMsg)
                }
            }
        }
    }
</script>

<style scoped>
    .pattern-box{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 150px;
        cursor: pointer;
    }
    .pattern-box-common {
        margin: 0 20px;
        font-size: 30px;
    }
    .pattern-box-active {
        color:aqua;
        margin: 0 20px;
        font-size: 30px;
    }
    .msg{
        color: #333;
        text-align: center;
        font-size: 24px;
        min-width: 40px;
        line-height: 40px;
        white-space:normal; 
        word-break:break-all;
        margin: 0 20%;
    }
    .encrypt-btn{
        display: block;
        margin: 15px auto;
        font-size: 14px;
        padding: 10px 15px;
        text-align: center;
        border: none;
        outline: none;
        color: #fff;
        cursor: pointer;
        background-color: #409eff;
        -webkit-appearance: none;
        border-radius: 4px;
        -webkit-user-select: none;
        min-width: 100px;
    }
    .example-box{
        margin: 50px auto 50px;
    }
    .example-box .title{
        font-size: 24px;
        color: #333;
        text-align: center;
        font-weight: bold;
    }
</style>