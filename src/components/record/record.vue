<template>
	<div style="height:100%;">
		<Card style="height:100%;">
            <p slot="title">
                <i class="iconfont icon-jilu-copy"></i>
                医疗记录
            </p>
            <Row class='input-col'>
            	<span class="searchTitle">医疗编号</span>
                <Input v-model="searchConName2" @on-change="handleSearch2" placeholder="请输入医疗编号" style="width: 200px" />
                <span class="searchTitle">服务名称</span>
                <Input v-model="searchConTel2" @on-change="handleSearch2" placeholder="请输入服务名称" style="width: 200px" />
                <span class="searchTitle">投保人</span>
                <Input v-model="searchConTel2" @on-change="handleSearch2" placeholder="请输入投保人" style="width: 200px" />
            </Row>
            <Row class='input-col'>
            	<span class="searchTitle">工作人员</span>
            	<Input v-model="searchConName2" @on-change="handleSearch2" placeholder="请输入工作人员" style="width: 200px" />
            	<span class="searchTitle">记录时间</span>

            	<DatePicker type="date" placeholder="Select date" style="width: 200px;margin-right:15px;"></DatePicker>

            	<Button type="primary" icon="ios-search">搜索</Button>
            </Row>
            <Row class="margin-top-10 searchable-table-con1">
                <Table height="600" size='large' border :columns="recordCol" :data="recordData"></Table>
            </Row>
            <Modal
        	v-model="detailsPage"
        	title="Common Modal dialog box title">
        		<p class="title">
        			
        		</p>
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
				searchConName2:'',
				searchConTel2:''
			}
		},
		methods:{
			details (data) {
                console.log(data);
                this.detailsPage=true
            },
            handleSearch2(){
            	console.log('aa');
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
	
</style>