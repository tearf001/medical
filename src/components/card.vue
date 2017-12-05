<template>
	<div class="login-con">
		<p class="title">欢迎登录</p>
		<div class="form-con">
			<Form ref="formInline" :model="formInline" :rules="ruleInline">
	        	<FormItem prop="Account">
	        		<p class="form-tip">登录账户：</p>
	        	    <Input type="text" v-model="formInline.Account" placeholder="Username">
	        	        <Icon type="ios-person-outline" slot="prepend"></Icon>
	        	    </Input>
	        	</FormItem>
	        	<FormItem prop="Password">
	        		<p class="form-tip">输入密码：</p>
	        	    <Input type="password" v-model="formInline.Password" placeholder="Password">
	        	        <Icon type="ios-locked-outline" slot="prepend"></Icon>
	        	    </Input>
	        	</FormItem>
	        	<FormItem>
	        	    <Button class="btn" size="large" type="error" @click="handleSubmit('formInline')" long>登 录</Button>
	        	</FormItem>
	    	</Form>
		</div>
		<div id="prop" v-show="prop">
			<div class="spinner">
  				<div class="rect1"></div>
  				<div class="rect2"></div>
  				<div class="rect3"></div>
  				<div class="rect4"></div>
  				<div class="rect5"></div>
			</div>
			<p>登录中，请稍后！</p>
		</div>
	</div>
</template>
<script type="text/javascript">
	import Cookies from 'js-cookie'
	
	export default{
		data () {
            return {
            	prop:false,
                formInline: {
                    Account: '',
                    Password: ''
                },
                ruleInline: {
                    Account: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    Password: [
                        { required: true, message: '请输入密码.', trigger: 'blur' }                   
                    ]
                }
            }
        },
        methods: {
            handleSubmit(name) {

                this.$refs[name].validate((valid) => {
                    if (valid) {

                    	this.$Message.success('登录成功!');
                    	Cookies.set('taken',true);
                    	
						this.$router.push({ path: 'main/home'});
						
                    	/*this.prop=true;

                    	this.$http.post('/Account/Login',this.formInline).then(res=>{
                    		
                    			if(res.body.Code=='1'){
                    				this.prop=false;
                    				this.$Message.success('登录成功!');

                    				this.$store.commit('setTaken',true);

                    				Cookies.set('userName',res.body.Data.Name);
                    				Cookies.set('loginTime',res.body.Data.Date);
									Cookies.set('taken',true);

                    				this.$router.push({ path: 'main/home'});

                    			}else{
                    				this.prop=false;
                    				this.$Message.error('登陆失败!');

                    			}
                    		},error=>{
                    			this.prop=false;
                    			
                    			this.$Message.error(error.body);
                    	})*/
                    } else {

                        this.$Message.error('请先填写用户名和密码!');
                    }
                })
            }
        }
	}
</script>
<style lang='less' scoped>
	.login-con{
		width:340px;
		height:320px;
		background:#fff;
		#prop{
			position: absolute;
			top:0;
			z-index: 999;
			width:100%;
			height:100%;
			background:rgba(255,255,255,.8);
			text-align: center;
			p{
				width:100%;
				position:absolute;
				top:200px;
				color:#cc0033;
				font-size:16px;
			}
			.spinner {
  				margin: 130px auto;
  				width: 50px;
  				height: 60px;
  				font-size: 10px;
  				div{
  					background-color: #cc0033;
  					height: 100%;
  					width: 6px;
  					display: inline-block;
  					animation: stretchdelay 1.2s infinite ease-in-out;
  				}
  				.rect2 {
  					animation-delay: -1.1s;
				}
				.rect3 {
  					animation-delay: -1.0s;
				}
				.rect4 {
  					animation-delay: -0.9s;
				}
				.rect5 {
  					animation-delay: -0.8s;
				}
			}
		}
		.title{
			color: #cc0033;
			font-size: 24px;
			font-weight: bold;
			text-align: center;
			padding: 18px 0;
			border-top: 4px solid #cc0033;
		}
		.form-con{
			padding: 0 20px 0 20px;
			.form-tip{
				font-size:16px;
			}
			.btn{
				background:#cc0033;
				transition: all .5s;
			}
			.btn:hover{
				background:#cc0066;
			}
		}
	}
	@keyframes stretchdelay {
		0%, 40%, 100% {
    		transform: scaleY(0.4);  
  		}  20% {
    		transform: scaleY(1.0);
  		}
	}
</style>