<template>
	<Menu width="auto" :active-name="activeName" @on-select="changeMenu">
        <template v-for='item in menuList'>
            <MenuItem :name="item.path" :key="item.path">
                <i class="iconfont" :class='item.icon'></i>
                {{item.title}}
            </MenuItem>
        </template>
    </Menu>
</template>
<script type="text/javascript">
	export default{
        name:"sidebarMenu",
        props:['menuList'],
        data(){
            return {
               
            }
        },
        computed:{
            activeName(){
                return this.$store.state.activeName
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
                /*this.$router.push({

                })*/
            }
            
        },
        created(){
            //console.log(this.menuList)
        }
	}
</script>
<style>
	
</style>