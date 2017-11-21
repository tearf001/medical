<template>
	<div class="home-main">
		<div class="head-con animated bounce">
			<Row>
                <Card>
                    <Row type="flex" class="user-infor">
                        <Col span="8">
                            <Row class-name="made-child-con-middle" type="flex" align="middle">
                                <img class="avator-img" :src="this.$store.state.avatorImg" />
                            </Row>
                        </Col>
                        <Col span="16" style="padding-left:6px;">
                            <Row class-name="made-child-con-middle" type="flex" align="middle">
                                <div>
                                    <b class="card-user-infor-name">{{userName}}</b>
                                    <p>super admin</p>
                                </div>
                            </Row>
                        </Col>
                    </Row>
                    <div class="line-gray"></div>
                    <Row class="margin-top-8">
                        <Col span="8"><p class="notwrap">当前登录时间:</p></Col>
                        <Col span="16" class="padding-left-8">{{loginTime}}</Col>
                    </Row>
                    <Row class="margin-top-8">
                        <Col span="8"><p class="notwrap">当前登录地点:</p></Col>
                        <Col span="16" class="padding-left-8">成都</Col>
                    </Row>
                </Card>
            </Row>
		</div>
		<div class="card-con">
			<Row>
            	<Col span="12" class-name='margin-bottom-25'>
            	    <info-card
            	        id-name="visit_count"
            	        :end-val="count.visit"
            	        iconType="ios-eye"
            	        color="#2d8cf0"
                        :iconSize="60"
            	        intro-text="今日浏览量"
            	    ></info-card>
            	</Col>
            	<Col span="12" class-name="padding-left-5 margin-bottom-25">
            	    <info-card
            	        id-name="insurance_count"
            	        :end-val="count.insurance"
            	        iconType="medkit"
            	        color="#64d572"
            	        :iconSize="50"
            	        intro-text="今日医保次数"
            	    ></info-card>
            	</Col>
            	<Col span="12">
            	    <info-card
            	        id-name="indepot_count"
            	        :end-val="count.indepot"
            	        iconType="ios-download-outline"
            	        color="#ffd572"
                        :iconSize="60"
            	        intro-text="今日入库次数"
            	    ></info-card>
            	</Col>
            	<Col span="12" class-name="padding-left-5">
            	    <info-card
            	        id-name="outdepot_count"
            	        :end-val="count.outdepot"
            	        iconType="ios-upload-outline"
            	        color="#f25e43"
                        :iconSize="60"
            	        intro-text="今日出库次数"
            	    ></info-card>
            	</Col>
        	</Row>
		</div>
		
	</div>
</template>
<script>
	import infoCard from "../main_components/infoCard"
    import Cookies from 'js-cookie'

	export default{
		components:{
			infoCard
		},
		computed:{
            userName(){
                return Cookies.get('userName')
            },
            loginTime(){
                return Cookies.get('loginTime')
            },
            count(){
                //return Cookies.get('count')
                /*this.$http.get('handle').then(res=>{
                    return res.count
                },error=>{this.$Message.error(error);});*/

                return {visit: 496,insurance: 326,indepot: 243,outdepot: 395}
            }
        },
        created(){
            this.$store.commit('initCurrentPath')
        }
	}
</script>
<style lang='less' scoped>
	.home-main{
		width:100%;
		height:100%;
		position: relative;
		.head-con{
			width:400px;
            padding:16px;
            .user-infor{
                height:110px;
                text-align: center;
                .avator-img{
                    width:80%;
                }
                .card-user-infor-name {
                    font-size: 2em;
                    color: #2d8cf0;
                }
                .made-child-con-middle{
                    height:100%;
                }
            }
            .line-gray {
                height: 0;
                border-bottom: 2px solid #dcdcdc;
                margin-bottom: 8px;
            }
			
		}
		.card-con{
			position:absolute;
			top: 28%;
			left: 15%;
			width: 70%;
			height: 330px;
			
			.padding-left-5 {
    			padding-left: 25px;
			}

            .margin-bottom-25{
                margin-bottom:25px;
            }
		}
	}
</style>