<template>
	<div style="height:100%;">
		<Card style="height:100%;">
            <p slot="title">
                <Icon type="help-buoy"></Icon>
                药品管理
            </p>
            <Row class='input-col'>
            	<span class="searchTitle">药品编号</span>
                <Input v-model="searchCriteria.drugsId" placeholder="请输入商品编号" style="width: 200px" />
                <span class="searchTitle">药品名称</span>
                <Input v-model="searchCriteria.drugsName" placeholder="请输入商品名称" style="width: 200px" />
                <span class="searchTitle">拼音简码</span>
                <Input v-model="searchCriteria.drugsCode" placeholder="请输入拼音简码" style="width: 200px" />
            </Row>
            <Row class='input-col'>
            	<span class="searchTitle">仓库编码</span>
            	<Input v-model="searchCriteria.drugsDepotCode" placeholder="请输入仓库编码" style="width: 200px" />
            	<span class="searchTitle">仓库名称</span>
            	<Input v-model="searchCriteria.drugsDepot" placeholder="请输入仓库名称" style="width: 200px" />
            	<Button type="primary" icon="ios-search" @click="searchDrug">搜索</Button>
            </Row>
            <Row class="margin-top-10 searchable-table-con1">
                <Table height="600" size='large' border :columns="drugsCol" :data="drugsData"></Table>
            </Row>
        </Card>
        <Modal width='600' v-model="details" title="药品详情" :mask-closable="false">
        	<div class="detailTabs">
            	<Tabs type="card">
            	    <TabPane label="基本信息">
						<table class="dataintable">
        					<tr>
        						<td class="info-title">药品名称</td>
        						<td class="info">{{drug.drugsName}}</td>	
        						<td class="info-title">药品编号</td>
        						<td class="info">{{drug.drugsId}}</td>	
        					</tr>
        					<tr>
        						<td class="info-title">拼音简码</td>
        						<td class="info">{{drug.drugsCode}}</td>	
        						<td class="info-title">规格</td>
        						<td class="info">{{drug.drugsSpec}}</td>	
        					</tr>
        					<tr>
        						<td class="info-title">成本价格</td>
        						<td class="info">￥{{drug.drugsCost}}</td>	
        						<td class="info-title">销售价格</td>
        						<td class="info">￥{{drug.drugsPrice}}</td>	
        					</tr>
        					<tr>
        						<td class="info-title">所属仓库</td>
        						<td class="info">{{drug.drugsDepot}}</td>	
        						<td class="info-title">型号</td>
        						<td class="info">{{drug.drugsModel}}</td>	
        					</tr>
        					<tr>
        						<td class="info-title">单位</td>
        						<td class="info">{{drug.drugsUnit}}</td>	
        						<td class="info-title">净含量</td>
        						<td class="info">{{drug.drugsNet}}</td>	
        					</tr>
        				</table>
            	    </TabPane>
            	</Tabs>
        	</div>
        	

        	<footer slot='footer'></footer>
    	</Modal>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				drugsCol:[
					{
						title:'药物名称',
						align:'center',
						key:'drugsName'
					},
					{
						title:'药品编号',
						align:'center',
						key:'drugsId'
					},
					{
						title:'拼音简码',
						align:'center',
						key:'drugsCode'
					},
					{
						title:'所属仓库',
						align:'center',
						key:'drugsDepot'
					},
					{
						title:'库存数量',
						
						align:'center',
						key:'drugsNum'
					},
					{
						title:'净含量',
						
						align:'center',
						key:'drugsNet'
					},
					{
						title:'规格',
						
						align:'center',
						key:'drugsSpec'
					},
					{
						title:'型号',
						align:'center',
						
						key:'drugsModel'
					},
					{
						title:'单位',
						
						align:'center',
						key:'drugsUnit'
					},
					{
						title:'操作列',
						align:'center',
						key:'action',
						render:(h,params)=>{
							return h('div',[
                                h('Button', {
                                    props: {
                                        type: 'primary'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '详情')
                            ])
						}
					}
				],
				details:false,
				drug:{},
				drugsData:[
					{
						drugsName:'阿莫西林',
						drugsId:'001',
						drugsCode:'AMXL',
						drugsDepot:'成都医疗点-仓库2',
						drugsNum:'50',
						drugsNet:'0.025g',
						drugsUnit:'瓶',
						drugsModel:'',
						drugsSpec:'',
						drugsCost:'123',
						drugsPrice:'321'

					}
				],
				searchCriteria:{
					drugsId:'',
					drugsName:'',
					drugsCode:'',
					drugsDepotCode:'',
					drugsDepot:''
				}
			}
		},
		methods:{
			show (index) {
				this.details=true;
				this.drug=this.drugsData[index];

                /*this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.drugsData[index].drugsName}<br>Id：${this.drugsData[index].drugsId}<br>Address：${this.drugsData[index].drugsDepot}`
                })*/

            },
            searchDrug(){

            	this.$http.post('DrugSearch',this.searchCriteria).then(res=>{
                    return res.count
                },error=>{this.$Message.error(error);});

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
.detailTabs .dataintable{
	border-collapse: collapse;
	vertical-align: middle;
	font-size:15px;
	td{
		border: 1px solid #BC0030;

	}
	
	.info-title{
		color:#BC0030;
		width:100px;
		height:30px;
		text-align: right;
		padding-right: 10px;
	}
	.info{
		padding-left: 10px;
		width:200px;
		height:30px;
		text-align: left;
	}
} 
</style>