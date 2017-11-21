<template>
	<div c>
		<template v-for="(item,index) in menuList">
			<Dropdown transfer placement="right-start" :key="index" @on-click="changeMenu">
                <Button 
                :class="[getActiveName === item.path? 'active' : '']" 
                @click="changeMenu(item.path)" 
                style="width: 70px;margin-left: -5px;padding:10px 0;" 
                type="text">
                    <i :style="{'font-size':'24px'}" class="iconfont" :class="item.icon"></i>
                </Button>
                <DropdownMenu style="width: 200px;" slot="list">
                	<DropdownItem :name="item.path" :key="'d' + index">
                		<i class="iconfont" :class="item.icon"></i>
                		<span style="padding-left:10px;">{{ item.title }}</span>
                	</DropdownItem>
                </DropdownMenu>
            </Dropdown>
		</template>
	</div>
</template>
<script type="text/javascript">
    
	export default{
		name:"sidebarMenuShrink",
		props:['menuList'],
        computed:{
            getActiveName(){
                return this.$store.state.activeName;
            }
        },
		methods:{
			changeMenu(active){
                this.$store.commit('setActiveName',active);
                if(active !== this.$store.state.accesstest_index){
                    
                    this.$store.commit('setCurrentPath',active);
                    this.$router.push({
                        name: active
                    });
                }
                this.$store.state.accesstest_index=active;

                
            },
            activeName(){
                return this.$store.activeName;
            }
		}
	}
</script>
<style lang='less'>
	.active{
        color:#cd3756
    }
</style>