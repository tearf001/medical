<template>
	<div style="height:100%;">
		<Card style="height:100%;">
            <p slot="title">
                <Icon type="help-buoy"></Icon>
                药品管理
            </p>
            <Row class='input-col'>
            	<span class="searchTitle">药品编号</span>
                <Input v-model="searchCriteria.drugsId" placeholder="请输入药品编号" style="width: 200px" />
                <span class="searchTitle">药品名称</span>
                <Input v-model="searchCriteria.drugsName" placeholder="请输入药品名称" style="width: 200px" />
                <span class="searchTitle">拼音简码</span>
                <Input v-model="searchCriteria.drugsCode" placeholder="请输入拼音简码" style="width: 200px" />
            </Row>
            <Row class='input-col'>
            	<span class="searchTitle">仓库编码</span>
            	<Input v-model="searchCriteria.drugsDepotCode" placeholder="请输入仓库编码" style="width: 200px" />
            	<span class="searchTitle">仓库名称</span>
            	<Input v-model="searchCriteria.drugsDepot" placeholder="请输入仓库名称" style="width: 200px" />
            	<Button type="primary" icon="ios-search" @click="searchDrug">搜索</Button>
            	<Button type="success" icon="plus" @click="add=true">添加</Button>
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
    	<Modal width='600' v-model="add" title="添加药品" :mask-closable="false" @on-cancel="cancelAdd" @on-ok="addDrug">
        	<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
    		    <FormItem label="药品编号" prop="drugsId">
    		        <Input v-model="formValidate.drugsId" placeholder="请输入药品编号"></Input>
    		    </FormItem>
    		    <FormItem label="药品名称" prop="drugsName">
    		        <Input v-model="formValidate.drugsName" placeholder="请输入药品名称"></Input>
    		    </FormItem>
    		    <FormItem label="拼音简码" prop="drugsCode">
    		        <Input v-model="formValidate.drugsCode" placeholder="请输入拼音简码"></Input>
    		    </FormItem>
    		    <FormItem label="净含量">
            		<Input v-model="formValidate.drugsNet"></Input>
        		</FormItem>
        		<FormItem label="药品规格">
            		<Input v-model="formValidate.drugsSpec"></Input>
        		</FormItem>
        		<FormItem label="药品型号">
            		<Input v-model="formValidate.drugsModel"></Input>
        		</FormItem>
        		<FormItem label="药品单位">
            		<Input v-model="formValidate.drugsUnit"></Input>
        		</FormItem>
        		<FormItem label="出售价格">
            		<Input v-model="formValidate.drugsPrice"></Input>
        		</FormItem>
        		<FormItem label="备注" prop="desc">
            		<Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
        		</FormItem>
    		</Form>
        	
        	
    	</Modal>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				formValidate:{
					drugsId:'',
					drugsName:'',
					drugsCode:'',
					drugsNet:'',
					drugsSpec:'',
					drugsModel:'',
					drugsUnit:'',
					drugsPrice:'',
					desc:''
				},
				ruleValidate:{
					drugsId:[
						{required:true,message:'药品编号不能为空',trigger:'blur'},
						{ type: 'string', message: '请输入数字', trigger: 'blur',pattern:/^[0-9]*$/ }
					],
					drugsName:[
						{required:true,message:'药品名称不能为空',trigger:'blur'}
					],
					drugsCode:[
						{required:true,message:'拼音简码不能为空',trigger:'blur'},
						{type: 'string',message:'请输入字母',required: true, pattern: /^[A-Za-z]+$/}
					]
				},
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
				add:false,
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
			cancelAdd(){
				this.formValidate={
					drugsId:'',
					drugsName:'',
					drugsCode:'',
					drugsNet:'',
					drugsSpec:'',
					drugsModel:'',
					drugsUnit:'',
					drugsPrice:'',
					desc:''
				}
			},
			addDrug(){
				this.$http.post('addDrug',this.formValidate).then(res=>{
					
				},error=>{this.$Message.error(error);});
			},
			show (index) {
				this.details=true;
				this.drug=this.drugsData[index];

            },
            searchDrug(){

            	this.$http.get('DrugSearch',this.searchCriteria).then(res=>{
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