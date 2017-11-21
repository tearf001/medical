<template>
	<div class="login">
		<div class="logo">
			<img src="../images/logo.png">
		</div>
		<div class="content">
			<card></card>
		</div>
		
	</div>
</template>
<script type="text/javascript">
	import card from '@/components/card'

	export default{
		
		components:{
			card
		}
	}
</script>
<style lang='less' scoped>
	.login{
	    width: 100%;
	    height: 100%;
	    position: relative;
	    &-con{
	        position: absolute;
	        right: 160px;
	        top: 50%;
	        transform: translateY(-60%);
	    }
	    .logo{
	    	padding: 10px 0;
			height:70px;
			width: 100%;
			img{
				height:50px;
				margin-left: 20%;
			}
		}
		.content{
			height:100%;
			background: url('../images/login_bg.png') no-repeat;
		    background-size: cover;
		    background-position: center;
		}
	}
	
</style>
