<template>
	<div style="height:100%;">
		<Card style="height:100%;">
            <p slot="title">
                <Icon type="help-buoy"></Icon>
                药品管理
            </p>
            <Row class='input-col'>
            	<span class="searchTitle">商品编号</span>
                <Input v-model="searchConName2" @on-change="handleSearch2" placeholder="请输入商品编号" style="width: 200px" />
                <span class="searchTitle">商品名称</span>
                <Input v-model="searchConTel2" @on-change="handleSearch2" placeholder="请输入商品名称" style="width: 200px" />
                <span class="searchTitle">拼音简码</span>
                <Input v-model="searchConTel2" @on-change="handleSearch2" placeholder="请输入拼音简码" style="width: 200px" />
            </Row>
            <Row class='input-col'>
            	<span class="searchTitle">仓库编码</span>
            	<Input v-model="searchConName2" @on-change="handleSearch2" placeholder="请输入仓库编码" style="width: 200px" />
            	<span class="searchTitle">仓库名称</span>
            	<Input v-model="searchConName2" @on-change="handleSearch2" placeholder="请输入仓库名称" style="width: 200px" />
            	<Button type="primary" icon="ios-search">搜索</Button>
            </Row>
            <Row class="margin-top-10 searchable-table-con1">
                <Table height="600" size='large' border :columns="drugsCol" :data="drugsData"></Table>
            </Row>
        </Card>
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
						width:'100',
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
				drugsData:[
					{
						drugsName:'阿莫西林',
						drugsId:'001',
						drugsCode:'AMXL',
						drugsDepot:'成都医疗点-仓库2',
						drugsNum:'50',
						drugsNet:'0.025g'

					}
				],
				searchConName2:'',
				searchConTel2:''
			}
		},
		methods:{
			show (index) {
                this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.drugsData[index].drugsName}<br>Id：${this.drugsData[index].drugsId}<br>Address：${this.drugsData[index].drugsDepot}`
                })
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