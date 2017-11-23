<template>
	<div style="height:100%;">
		<Card style="height:100%;">
			<p slot="title">
                <i class="iconfont icon-cangku"></i>
                仓库管理
            </p>
            <div>
            	<Row class='input-col'>
            		<span class="searchTitle">仓库编码</span>
            		<Input v-model="searchDepot.depotNumber" placeholder="请输入药品编号" style="width: 200px" />
                	<span class="searchTitle">仓库名称</span>
                	<Input v-model="searchDepot.depotName" placeholder="请输入药品名称" style="width: 200px" />
                	<span class="searchTitle">添加时间</span>
                	<DatePicker v-model='searchDepot.createdTime' type="date" placeholder="选择记录时间" style="width: 200px;margin-right:15px;"></DatePicker>
        		</Row>
        		<Row>
					<Button type="primary" icon="ios-search" @click="search">搜索</Button>
            		<Button type="success" icon="plus" @click="add=true">添加</Button>
        		</Row>
        		<Row class="margin-top-10">
                	<can-edit-table v-model="depotData" :height="'500'" :columns-list="depotCol" :saveEdit="saveEditInline" :deleteRow="deleteRowInline"></can-edit-table>
            	</Row>
            </div>
		</Card>
		<Modal width='600' v-model="add" title="添加药品" :mask-closable="false" @on-cancel="cancelAdd" @on-ok="addDrug">
        	<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
    		    <FormItem label="仓库编号" prop="depotNumber">
    		        <Input v-model="formValidate.depotNumber" placeholder="请输入仓库编号"></Input>
    		    </FormItem>
    		    <FormItem label="仓库名称" prop="depotName">
    		        <Input v-model="formValidate.depotName" placeholder="请输入仓库名称"></Input>
    		    </FormItem>
        		<FormItem label="备注" prop="desc">
            		<Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
        		</FormItem>
    		</Form>
        	
        	
    	</Modal>
	</div>
</template>
<script>
	import canEditTable from '../table_components/canEditTable.vue';

	export default{
		components:{
			canEditTable
		},
		data(){
			return{
				add:false,
				searchDepot:{
					depotNumber:'',
					depotName:'',
					createdTime:''
				},
				formValidate:{
					depotName:'',
					depotNumber:'',
					desc:''
				},
				ruleValidate:{
					depotNumber:[
						{required:true,message:'药品编号不能为空',trigger:'blur'},
						{ type: 'string', message: '请输入数字', trigger: 'blur',pattern:/^[0-9]*$/ }
					],
					depotName:[
						{required:true,message:'药品名称不能为空',trigger:'blur'}
					]
				},
				depotCol:[
					{
						title:'仓库编码',
						key:'depotNumber',
						align:'center',
						editable: true
					},
					{
						title:'仓库名称',
						key:'depotName',
						align:'center',
						editable: true
					},
					{
						title:'添加时间',
						key:'createdTime',
						align:'center'
					},
					{
						title:'添加用户',
						key:'createdUser',
						align:'center',
						editable: true
					},
					{	
						title: '操作',
        				align: 'center',
        				key: 'handle',
        				handle: ['edit', 'delete']
					}
				],
				depotData:[
					{
						depotNumber:'123',
						depotName:'123',
						createdTime:'213',
						createdUser:'123156'
					}
				]
			}
		},
		methods:{
			search(){
				this.$http.get('searchDepot',this.searchDepot).then(res=>{
        			this.depotData=res
        		},error=>{this.$Message.error(error);})
			},
			deleteRowInline (index, success, fail) {
            	success(() => {
                   	this.$Message.success('删除数据成功~');
                });
        	},
        	saveEditInline (index, success, fail) {
        	    success(() => {
                    this.$Message.success('保存成功');
        	    });
        	},
        	cancelAdd(){
        		this.formValidate={
					depotName:'',
					depotNumber:'',
					desc:''
				}
        	},
        	addDrug(){
        		this.$http.post('addDepot',this.formValidate).then(res=>{
        			
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
	.margin-top-10{
		margin-top: 10px;
	}
</style>