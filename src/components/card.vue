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
	</div>
</template>
<script type="text/javascript">
	import Cookies from 'js-cookie'
	
	export default{
		data () {
            return {
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
                    	Cookies.set("userName","maofan");
                    	Cookies.set('loginTime','2016.09.12-13:32:20');

                    	this.$router.push({ path: 'main/home'});
                    	
                    	/*this.$http.post('login',this.formInline).then(res=>{
                    			if(res.Code=='1'){
                    				Cookies.set('userName',res.name);
                    				Cookies.set('loginTime',res.Date);
                    				
                    				this.$router.push({ path: 'main/home'});
                    			}
                    		},error=>{
                    			this.$Message.error(error);
                    	})*/
                    } else {
                        this.$Message.error('登录失败!');
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
</style>