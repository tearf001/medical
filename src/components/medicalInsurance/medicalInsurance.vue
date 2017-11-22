<template>
	<div class="mdin-con">
		<Row>
        	<Col span="6">
        	    <Card :bordered="false">
        	        <p slot="title">
						<Icon type="ios-medkit" size='18'></Icon>
        	        	医保信息
        	        </p>
        	        <p>
        	        	服务点名称：
						<span>成都医疗点</span>
        	        </p>
        	        <p>
        	        	单据编号：
        	        	<span>{{billNumber}}</span>
        	        </p>
        	    </Card>
                <Card class='margin-top-15 origin-con'>
                    <div>
                        <div class="margin-bottom-15 rfidInput">
                            <Col span='7'>
                                <Icon type="ios-barcode" size='18'></Icon>
                                溯源编号：
                            </Col>
                            <Col span='15'>
                                <Input v-model="rfId" placeholder="请输入溯源编号">
                                <Button @click="searchRfid" slot="append" icon="ios-search"></Button>
                                </Input>
                            </Col>
                        </div>
                        <Table height="353" :columns="rfidCol" :data="rfidData"></Table>
                    </div>
                </Card>
        	</Col>
        	<Col span='18' class-name="padding-left-15">
        		<Card>
        			<div class="cardId margin-bottom-15">
        				<Col span='5'>
        					<Icon type="card" size='18'></Icon> 
        					<span class="title">医保卡号：</span>
        				</Col>
        				<Col span='12'>
        					<Input v-model="cardId" placeholder="请输入医保卡号"></Input>
        				</Col>
        				<Col span='7' class-name="padding-left-15">
        					<Button type="primary" icon="ios-search" @click="searchCard">搜索</Button>
        				</Col>
        			</div>
					<div class="userInfo">
						<Table border size="large" :columns="userCol" :data="userData"></Table>
					</div>
        		</Card>
                <Card class='margin-top-15'>
                    <div class="cardId margin-bottom-15">
                        <Col span='5'>
                            <Icon type="android-list" size='18'></Icon> 
                            <span class="title">药品清单：</span>
                        </Col>
                        <Col span='12'>
                            <Input v-model="medicalId" placeholder="请输入药品清单"></Input>
                        </Col>
                        <Col span='7' class-name="padding-left-15">
                            <Button type="primary" icon="ios-search" @click="searchDrug">搜索</Button>
                        </Col>
                    </div>
                    <div class="userInfo">
                        <can-edit-table :height="'280'" v-model="meidicalData" :editIncell="true" :columns-list="medicalCol" :deleteRow="deleteRowInline"></can-edit-table>


                        <!-- <Table border height="280" size="large" :columns="medicalCol" :data="meidicalData"></Table> -->
                    </div>
                </Card>
        	</Col>
            <Col span='24' class-name="margin-top-15">
                <Card :bordered="false" style="height:200px;">
                    <p slot="title">
                        <Icon type="social-yen" size='18'></Icon>
                        收款信息
                    </p>
                    <div class="priceCon">
                        <div>
                            <span class="priceTitle">本次应付金额：</span>
                            ￥<span class="price">{{handlePrice}}</span>
                        </div>
                        <div>
                            <span class="priceTitle">社保卡号：</span>
                            ￥<span class="price">{{handlePrice}}</span>
                        </div>
                        <div>
                            <span class="priceTitle">刷卡金额：</span>
                            ￥<span class="price">{{handlePrice}}</span>
                        </div>
                        <div>
                            <span class="priceTitle">支付密码：</span>
                            ￥<span class="price">{{handlePrice}}</span>
                        </div>
                        <div class="btn-con">
                            <Button type="primary" @click="comfirm">确认订单</Button>
                            <Button type="success" @click="cancel">撤销订单</Button>
                        </div>
                        
                    </div>
                </Card>

            </Col>
    	</Row>
	</div>
</template>
<script>
    import canEditTable from '../table_components/canEditTable.vue';

	export default{
        components:{
            canEditTable
        },
		data(){
			return {
				cardId:'',
				userCol: [
                    {
                        title: '投保人姓名',
                        key: 'name'
                    },
                    {
                        title: '投保人编号',
                        key: 'id'
                    },
                    {
                        title: '联系电话',
                        key: 'phone'
                    }
                ],
                userData: [
                    {
                        name:'请输入医保卡号'
                    }
                ],
                rfId:'',
                rfidCol:[
                    {
                        title:'溯源编号',
                        key:'rfCode'
                    }
                ],
                rfidData:[
                    {
                        rfCode:1234564589
                    }
                ],
                medicalId:'',

                medicalCol:[
                    {
                        title:'药品编号',
                        key:'medicalId',
                        align:'center'
                    },
                    {
                        title:'药物名称',
                        key:'medicalName',
                        align:'center'
                    },
                    {
                        title:'药品仓库',
                        key:'medicalDepot',
                        align:'center'
                    },
                    {
                        title:'现有库存',
                        key:'medicalStock',
                        align:'center'
                    },
                    {
                        title:'药品价格',
                        key:'medicalPrice',
                        align:'center',
                        editable: true
                    },
                    {
                        title:'购买数量',
                        key:'medicalAmount',
                        align:'center',
                        editable: true
                    },
                    {
                        title:'小计',
                        align:'center',
                        key:'medicalTotal',
                        render:(h,params) => {
                            return h('strong',
                                params.row.medicalPrice*params.row.medicalAmount
                            )
                             
                        }
                    },
                    {
                        title: '操作',
                        align: 'center',
                        key: 'handle',
                        handle: ['delete']
                    }
                ],
                
                meidicalAllData:[
                    {
                        medicalId:12313214561,
                        medicalName:'胶囊',
                        medicalDepot:'成都仓',
                        medicalStock:2154,
                        medicalPrice:'156',
                        medicalAmount:2
                    },
                    {
                        medicalId:10000000000,
                        medicalName:'胶囊',
                        medicalDepot:'成都仓',
                        medicalStock:2154,
                        medicalPrice:'156',
                        medicalAmount:2
                    }
                ],
                
			}
            
		},
        computed:{
            billNumber(){
                return 12313214561
            },
            handlePrice(){
                let total=0;
                for(let good of this.meidicalAllData){
                    total += good.medicalPrice*good.medicalAmount
                }
                return total
            },
            meidicalData:{
                get:function(){
                    return this.meidicalAllData
                },
                set:function(newValue){
                    this.meidicalAllData=newValue;
                }
            }

        },
		methods:{
			searchCard(){
				console.log(this.cardId);
				if(this.cardId==''){
					this.$Message.error('医保卡号不能为空');
				}else{
					/*this.$http.get('User',this.cardId).then(res=>{
                    	this.userData.push(res);
                	},error=>{
                    	this.$Message.error(error);
                	})*/
               		let info=[{
               			name: '王麻子',
               		    id: 18013152156,
               		    phone: 1354724825
               		}];

               		this.userData=info;
				}
			},
            searchDrug(){
                if(this.medicalId==''){
                    this.$Message.error('药品编号不能为空');
                }else{
                    /*this.$http.get('drugs',this.medicalId).then(res=>{
                        this.meidicalAllData.push(res);
                    },error=>{
                        this.$Message.error(error);
                    })*/
                    let info={
                        medicalId:10000000000,
                        medicalName:'胶囊',
                        medicalDepot:'成都仓',
                        medicalStock:2154,
                        medicalPrice:'156',
                        medicalAmount:2
                    };
                    this.meidicalAllData.push(info);
                    
                }
            },
            searchRfid(){
                if(this.rfId==''){
                    this.$Message.error('溯源编号不能为空');
                }else{
                    /*this.$http.get('Rfid',this.rfId).then(res=>{
                        this.rfidData.push(res);
                    },error=>{
                        this.$Message.error(error);
                    })*/
                    this.rfidData.push({rfCode:123456156});
                    //console.log('aaa')
                }
            },
            deleteRowInline (index, success, fail) {
                success(() => {
                    this.$Message.success('删除数据成功~');
                });
            },
            comfirm(){

            },
            cancel(){

            }
		}
	}
</script>
<style lang="less" scoped>
	.mdin-con{
		
		.padding-left-15{
			padding-left:15px;
		}
		.margin-top-15{
			margin-top: 15px;
		} 
        .margin-bottom-15{
            margin-bottom: 15px;
        }
        .origin-con{
            .ivu-card-head{
                height:40px;
            }
        }
		.cardId{
			width: 60%;
			min-width: 440px;
			height: 40px;
			.title{
				
				line-height: 32px;
			}
		}
		.userInfo{
			font-size:16px;
		}
        .rfidInput{
            height:40px;
            line-height:40px;
            overflow: hidden;
        }
        .priceTitle{
            display: inline-block;
            width:100px;
            text-align: right;
        }
        .price{
            color: #BC0030;
            font-weight:500;
            font-size:16px;
        }
        .priceCon{
            overflow:hidden;
            .btn-con{
                float: right;
                margin-right: 15px;
            }
        }
        
	}
</style>