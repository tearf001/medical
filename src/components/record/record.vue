<template>
	<div style="height:100%;">
		<Card style="height:100%;">
            <p slot="title">
                <i class="iconfont icon-jilu-copy"></i>
                医疗记录
            </p>
            <Row class='input-col'>
            	<span class="searchTitle">医疗编号</span>
                <Input v-model="searchRecord.medicalCode" placeholder="请输入医疗编号" style="width: 200px" />
                <span class="searchTitle">服务名称</span>
                <Input v-model="searchRecord.serviceName" placeholder="请输入服务名称" style="width: 200px" />
                <span class="searchTitle">投保人</span>
                <Input v-model="searchRecord.policyHolder" placeholder="请输入投保人" style="width: 200px" />
            </Row>
            <Row class='input-col'>
            	<span class="searchTitle">工作人员</span>
            	<Input v-model="searchRecord.searchConName2" placeholder="请输入工作人员" style="width: 200px" />
            	<span class="searchTitle">记录时间</span>

            	<DatePicker v-model='searchRecord.recordTime' type="date" placeholder="Select date" style="width: 200px;margin-right:15px;"></DatePicker>

            	<Button type="primary" @click="recordSearch" icon="ios-search">搜索</Button>
            </Row>
            <Row class="margin-top-10 searchable-table-con1">
                <Table height="600" size='large' border :columns="recordCol" :data="recordData"></Table>
            </Row>
            <Modal width='650' v-model="detailsPage" title="医疗记录详情">
        		<div class="detailTabs">
            		<Tabs type="card">
            		    <TabPane label="投保人信息">
							<table class="dataintable">
        						<tr>
        							<td class="info-title">投保人姓名</td>
        							<td class="info">{{policyHolder.name}}</td>	
        							<td class="info-title">投保人编号</td>
        							<td class="info">{{policyHolder.code}}</td>	
        						</tr>
        						<tr>
        							<td class="info-title">投保人医保卡号</td>
        							<td class="info">{{policyHolder.cardId}}</td>	
        						</tr>
        					</table>
            		    </TabPane>
            		    <TabPane label="服务点信息">
							<table class="dataintable">
        						<tr>
        							<td class="info-title">服务点名称</td>
        							<td class="info">{{service.name}}</td>	
        							<td class="info-title">服务点负责人</td>
        							<td class="info">{{service.chargePerson}}</td>	
        						</tr>
        						<tr>
        							<td class="info-title">服务点编号</td>
        							<td class="info">{{service.code}}</td>
        							<td class="info-title">服务点联系电话</td>
        							<td class="info">{{service.phone}}</td>		
        						</tr>
        						<tr>
        							<td class="info-title">服务点详细地址</td>
        							<td class="info">{{service.address}}</td>	
        						</tr>
        					</table>
            		    </TabPane>
            		    <TabPane label="医疗溯源记录">
							<table class="dataintable">
        						<tr>
        							<td class="info-title">溯源产品</td>
        							<td class="info">{{traceRecord.goods}}</td>	
        							<td class="info-title">溯源编号</td>
        							<td class="info">{{traceRecord.id}}</td>	
        						</tr>
        					</table>
            		    </TabPane>
            		    <TabPane label="医疗药品记录">
            		    	<Table height="400" border :columns="drugRecordCol" :data="drugRecordData"></Table>
            		    </TabPane>
            		</Tabs>
        		</div>
        		<footer slot='footer'></footer>
    		</Modal>
        </Card>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				detailsPage:false,
				recordCol:[
					{
						title:'记录单编号',
						align:'center',
						key:'labelNum'
					},
					{
						title:'服务点名称',
						align:'center',
						key:'pointName'
					},
					{
						title:'投保人编号',
						align:'center',
						key:'applicanId'
					},
					{
						title:'投保人姓名',
						align:'center',
						key:'applicanName'
					},
					{
						title:'记录人员	',
						
						align:'center',
						key:'recordPeople'
					},
					{
						title:'记录时间',
						
						align:'center',
						key:'recordTime'
					},
					{
						title:'应付金额',
						
						align:'center',
						key:'payable'
					},
					{
						title:'刷卡金额',
						align:'center',
						
						key:'cardAmount'
					},
					{
						title:'查看',
						key:'action',
						align:'center',
						render:(h,params)=>{
							return h('div',[
                                h('Button', {
                                    props: {
                                        type: 'primary'
                                    },
                                    on: {
                                        click: () => {
                                            this.details(params.row)
                                        }
                                    }
                                }, '选择')
                            ])
						}
					}
				],
				recordData:[
					{
						labelNum:'20170808180314924825',
						pointName:'成都分公司',
						applicanId:'000',
						applicanName:'王麻子',
						recordPeople:'干智勇',
						recordTime:'2017/8/8 18:07:03',
						payable:'0.00',
						cardAmount:'0.00'

					}
				],
				searchRecord:{
					medicalCode:'',
					serviceName:'',
					policyHolder:'',
					officeHolder:'',
					recordTime:''
				},
				drugRecordCol:[
					{
						title:'药品编号',
						key:'drugId',
						align:'center'
					},
					{
						title:'药品名称',
						key:'drugName',
						align:'center'
					},
					{
						title:'药品仓库',
						key:'drugDepot',
						align:'center'
					},
					{
						title:'药品价格',
						key:'drugPrice',
						align:'center'
					},
					{
						title:'购买数量',
						key:'drugNum',
						align:'center'
					},
					{
						title:'小计',
						key:'drugTotle',
						align:'center'
					}
				],
				drugRecordData:[
					{
						drugId:123,
						drugName:'阿莫西林',
						drugDepot:'成都仓',
						drugPrice:321,
						drugNum:1,
						drugTotle:321
					}
				],
				policyHolder:{
					name:'王麻子',
					code:'123',
					cardId:'20111321515'
				},
				service:{
					name:'成都分公司',
					chargePerson:'干智勇',
					code:'123456789',
					phone:'13550698834',
					address:'成都市金牛区'
				},
				traceRecord:{
					goods:'昌都犬',
					id:'1231465231'
				}

			}
		},
		methods:{
			details (data) {
                console.log(data);
                this.detailsPage=true;

            },
            recordSearch(){
            	this.$http.get('recordSearch',this.searchRecord).then(res=>{

                    this.recordData.push(res);

                	},error=>{this.$Message.error(error);})
            }
		}
	}
</script>
<style lang='less' scoped>
.input-col{
	margin-bottom: 15px;
	.searchTitle{
		color: #BC0030;
		font-size: 16px;
		margin-right:5px;
	}
	.ivu-input-type{
		margin-right: 15px;
	}
}

.detailTabs {
	
	.dataintable{
		border-collapse: collapse;
		vertical-align: middle;
		font-size:15px;
		td{
			border: 1px solid #BC0030;
	
		}
		
		.info-title{
			color:#BC0030;
			width:275px;
			height:30px;
			text-align: right;
			padding-right: 10px;
		}
		.info{
			padding-left: 10px;
			width:375px;
			height:30px;
			text-align: left;
		}
	} 	
}

</style>