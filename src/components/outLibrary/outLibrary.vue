<template>
	<div style="height:100%;">
		<Card style="height:100%;">
			<p slot="title">
                <i class="iconfont icon-chuku"></i>
                药品出库
            </p>
            <div>
            	<Row class='input-col'>
            		<span class="searchTitle">仓库名称</span>
            		<input 
            		:value='choiceName' 
            		readonly="readonly" 
            		class="ivu-input"  
            		type="text" 
            		placeholder="请点击选择仓库" 
            		@click="depotModal = true" />
            		<span class="searchTitle">经手员工</span>
            		<input 
            		:value='choiceStaff' 
            		readonly="readonly" 
            		class="ivu-input"  
            		type="text" 
            		placeholder="请点击选择员工" 
            		@click="staffModal = true" />
					<span class="searchTitle">备注信息</span>
					<input v-model="remarks" class="ivu-input" />
					<Button type="primary" icon="ios-medical" @click='choiceMedical'>选择药品</Button>
        		</Row>
        		<can-edit-table refs="table2" v-model="chooseMedicalData" :height="'500'" :columns-list="chooseMedicalCol" :saveEdit="saveEditInline" :deleteRow="deleteRowInline"></can-edit-table>
        		<!-- <Table height="500" border :columns="chooseMedicalCol" :data="chooseMedicalData"></Table> -->
        		
        		<Button size='large' class='outDopt' type="info" icon="log-out" @click='outLibrary'>药品出库</Button>
        		
        		<Modal width='800' v-model="depotModal" title="选择仓库" :mask-closable="false">
        			<Row class='depot-con'>
        				<span class="searchTitle">仓库编号</span>
        				<Input v-model="depotNumber" placeholder="请输入仓库编号" class='input-con'></Input>
        				<span class="searchTitle">仓库名称</span>
        				<Input v-model="depotName" placeholder="请输入仓库名称" class='input-con'></Input>
        				<Button type="primary" @click='searchDepot' icon="ios-search">搜索</Button>
        			</Row>
        			<Table height="500" size='large' border :columns="depotCol" :data="depotData"></Table>
        			<footer slot='footer'></footer>
    			</Modal>
    			<Modal width='800' v-model="staffModal" title="员工管理" :mask-closable="false">
        			<Row class='depot-con'>
        				<span class="searchTitle">员工姓名</span>
        				<Input v-model="staffName" placeholder="请输入员工姓名" class='input-con'></Input>
        				<span class="searchTitle">所在部门</span>
        				<Input v-model="staffSection" placeholder="请输入员工所在部门" class='input-con'></Input>
        				<Button type="primary" @click='searchStaff' icon="ios-search">搜索</Button>
        			</Row>
        			<Table height="500" size='large' border :columns="staffCol" :data="staffData"></Table>
        			<footer slot='footer'></footer>
    			</Modal>
    			<Modal 
    			width='800' 
    			v-model="medicalModal" 
    			title="选择药品" 
    			:mask-closable="false"
    			ok-text='添加药品'
    			@on-ok='addMedical'>
    				<Row class='depot-con'>
        				<span class="searchTitle">药品编号</span>
        				<Input v-model="medicalId" placeholder="请输入药品编号" class='input-con'></Input>
        				<span class="searchTitle">药品名称</span>
        				<Input v-model="medicalName" placeholder="请输入药品名称" class='input-con'></Input>
        				<Button type="primary" @click='searchMedical' icon="ios-search">搜索</Button>
        			</Row>
        			<Table @on-selection-change='dataSwitch' height="500" border :columns="medicalCol" :data="medicalData"></Table>
    			</Modal>
            </div>
		</Card>
		
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
				depotModal:false,
				staffModal:false,
				medicalModal:false,
				depotNumber:'',
				depotName:'',
				staffSection:'',
				staffName:'',
				choiceStaff:'',
				choiceName:'',
				remarks:'',
				medicalId:'',
				medicalName:'',
				depotCol:[
					{
						title:'仓库编号',
						key:'depotId',
						align:'center'
					},
					{
						title:'仓库名称',
						key:'depotName',
						align:'center'
					},
					{
						title:'选择',
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
                                            this.choice(params.row)
                                        }
                                    }
                                }, '选择')
                            ])
						}
					}
				],
				depotData:[
					{
						depotId:'CK123',
						depotName:'成都医疗点-仓库2'
					}
				],
				staffCol:[
					{
						title:'员工ID',
						key:'staffId'
					},
					{
						title:'员工姓名',
						key:'staffName'
					},
					{
						title:'所属部门',
						key:'staffSection'
					},
					{
						title:'操作',
						key:'action',
						width:'100',
						align:'center',
						render:(h,params)=>{
							return h('div',[
                                h('Button', {
                                    props: {
                                        type: 'primary'
                                    },
                                    on: {
                                        click: () => {
                                            this.choose(params.row)
                                        }
                                    }
                                }, '选择')
                            ])
						}
					}
				],
				staffData:[
					{
						staffId:'5b0b9ebf-8810-4852-aecd-8402a58d2e50',
						staffName:'毛凡',
						staffSection:'成都医疗点'
					}
				],
				medicalCol:[
					{
						type: 'selection',
                        width: 60,
                        align: 'center'
					},
					{
						title:'药品编号',
						align: 'center',
						key:'medicalId'
					},
					{
						title:'药品名称',
						align: 'center',
						key:'medicalName'
					},
					{
						title:'拼音简码',
						align: 'center',
						key:'medicalCode'
					},
					{
						title:'单位',
						align:'center',
						width:80,
						key:'medicalUnit'
					},
					{
						title:'净含量',
						align: 'center',
						key:'medicalNet'
					},
					{
						title:'销售价格',
						key:'medicalPrice',
						align: 'center'
					}
				],
				medicalData:[
					{
						medicalId:'000',
						medicalName:'阿莫西林',
						medicalCode:'AMXL',
						medicalUnit:'盒',
						medicalNet:'0.025g',
						medicalPrice:'20.00',
						medicalTotal:'245',
						medicalNum:'0'
					},
					{
						medicalId:'000',
						medicalName:'阿莫西林',
						medicalCode:'AMXL',
						medicalUnit:'盒',
						medicalNet:'0.025g',
						medicalPrice:'20.00',
						medicalTotal:'245',
						medicalNum:'0'
					},
					{
						medicalId:'000',
						medicalName:'阿莫西林',
						medicalCode:'AMXL',
						medicalUnit:'盒',
						medicalNet:'0.025g',
						medicalPrice:'20.00',
						medicalTotal:'245',
						medicalNum:'0'
					}
				],
				chooseMedicalCol:[
				
					{	
						title:'药品编号',
						key:'medicalId',
						align:'center'
					},
					{	
						title:'药品名称',
						key:'medicalName',
						align:'center'
					},
					{	
						title:'拼音简码',
						key:'medicalCode',
						align:'center'
					},
					{	
						title:'单位',
						key:'medicalUnit',
						align:'center'
					},
					{	
						title:'净含量',
						align: 'center',
						key:'medicalNet'
					},
					{	
						title:'销售价格',
						key:'medicalPrice',
						align: 'center'
					},
					{	
						title:'库存数量',
						key:'medicalTotal',
						align:'center'
					},
					{	
						title:'入库数量',
						key:'medicalNum',
						align:'center',
						editable: true
					},
					{
        				title: '操作',
        				align: 'center',
        				width: 190,
        				key: 'handle',
        				handle: ['edit', 'delete']
    				}
				],
				chooseMedicalData:[
					
				],
				medicalArray:[]
			}
		},
		methods:{
			choice(data){
				this.depotModal=false;
				this.choiceName=data.depotName;
				//console.log(data.depotName);
			},
			choose(data){
				this.staffModal=false;
				this.choiceStaff=data.staffName;
			},
			searchDepot(){
				console.log('ssa')
			},
			searchStaff(){
				console.log('bja')
			},
			choiceMedical(){
				if(this.choiceName=='' || this.choiceStaff==''){
					this.$Message.error('请先选择仓库和经手员工！~');
				}else{
					this.medicalModal=true;

					//this.$http.post()
				}
			},
			searchMedical(){
				console.log('aaa')
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
        	addMedical(){
				//this.$refs.selection.selectAll(true);
				this.chooseMedicalData=this.medicalArray
			},
			
			dataSwitch(selection){
				this.medicalArray=selection;
			},
			outLibrary(){
				// this.$http.post().then()
			}
		}
	}
</script>
<style lang='less' scoped>
	.searchTitle{
		color: #BC0030;
		font-size: 16px;
		margin-right:5px;
	}
	.depot-con{
		margin-bottom: 15px;
	}
	.input-con{
		width:150px;
		margin-right:15px;
	}
	.input-col{
		margin-bottom:15px;
		input{
			width:200px;
			margin-right:15px;
		}
	}
	.outDopt{
		position: absolute;
		bottom: 40px;
		right: 40px;
	}
</style>