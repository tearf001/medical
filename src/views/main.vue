<template>
	<div class="main">
		<div class="layout-menu-left" :class="{leftClose:hideMenuText}">
			<div class="logo-con">
				<img v-show="!hideMenuText" src="../images/logo.png" />
				<img v-show="hideMenuText" src="../images/logo_min.png" />
			</div>
			<sidebar-menu :menuList="menuList" v-if="!hideMenuText"></sidebar-menu>
			<sidebar-menu-shrink v-if="hideMenuText" :menuList="menuList"></sidebar-menu-shrink>
		</div>
		<div class="layout-menu-right" :style="{'padding-left':hideMenuText?'60px':'200px'}">
			<div class="main-header-con">
				<div class="main-header">
					<div class="navicon-con">
	                    <Button :style="{transform: 'rotateZ(' + (this.hideMenuText ? '-90' : '0') + 'deg)'}" type="text" @click="toggleClick">
	                        <Icon type="navicon" size="32"></Icon>
	                    </Button>
                	</div>
                	<div class="header-middle-con">
                    	<div class="main-breadcrumb">
                    		<Breadcrumb>
                    			<BreadcrumbItem 
            					v-for="item in currentPath" 
            					:href="item.path" 
            					:key="item.name"
        						>{{item.title}}</BreadcrumbItem>
                    		</Breadcrumb>
                    	</div>
                	</div>
                	<div class="header-avator-con">
                    	<div @click="handleFullScreen" v-if="showFullScreenBtn" class="full-screen-btn-con">
                    	    <Tooltip :content="isFullScreen ? '退出全屏' : '全屏'" placement="bottom">
                    	        <Icon :type="isFullScreen ? 'arrow-shrink' : 'arrow-expand'" :size="23"></Icon>
                    	    </Tooltip>
                    	</div>
                    	<div @click="lockScreen" class="lock-screen-btn-con">
                    	    <Tooltip content="锁屏" placement="bottom">
                    	        <Icon type="locked" :size="20"></Icon>
                    	    </Tooltip>
                    	</div>
                    	<div class="user-dropdown-menu-con">
                    	    <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                    	        <Dropdown trigger="click" @on-click="handleClickUserDropdown">
                    	            <a href="javascript:void(0)">
                    	                <span class="main-user-name">{{ userName }}</span>
                    	                <Icon type="arrow-down-b"></Icon>
                    	            </a>
                    	            <DropdownMenu slot="list">
                    	                <DropdownItem name="loginout">退出登录</DropdownItem>
                    	            </DropdownMenu>
                    	        </Dropdown>
                    	        <Avatar :src="this.$store.state.avatorImg" style="background: #619fe7;margin-left: 10px;"></Avatar>
                    	    </Row>
                    	</div>
                    </div>

				</div>
				<div class="tags-con">
                	<tags-page-opened :pageTagsList="pageOpenedList"></tags-page-opened>
            	</div>
			</div>
			<div class="single-page-con">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	
	import sidebarMenu from "@/components/sidebarMenu"
	import sidebarMenuShrink from "@/components/sidebarMenuShrink"
	import tagsPageOpened from "@/components/tagsPageOpened"
	import {mapState,mapMutations,mapActions} from 'vuex'
	import Cookies from 'js-cookie'

	export default{
		components:{
			sidebarMenu,
			sidebarMenuShrink,
			tagsPageOpened
		},
		
		data(){
			return{
				hideMenuText:false,
				showFullScreenBtn: window.navigator.userAgent.indexOf('MSIE') < 0,
				
				lockScreenSize: 0
			}
		},
		computed:{
			...mapState([
				'menuList',
				'currentPath',
				'isFullScreen',
				'pageOpenedList'
			]),
            userName(){
            	return Cookies.get('userName')
            }
		},
		methods:{
			...mapActions([
				'initMenuList',
				'handleFullScreen'
			]),
            //数据更新
			...mapMutations([
				'setCurrentPath',
                'setActiveName'
			]),

			toggleClick(){
				this.hideMenuText = !this.hideMenuText
			},
			lockScreen () {

                let lockScreenBack = document.getElementById('lock_screen_back');
                lockScreenBack.style.transition = 'all 3s';
                lockScreenBack.style.zIndex = 10000;
                lockScreenBack.style.boxShadow = '0 0 0 ' + this.lockScreenSize + 'px #667aa6 inset';
                this.showUnlock = true;
                //存贮当前路由地址
                this.$store.lastPage=this.$route.name
                // console.log(this.$route.name);
                //this.setLastPage(this.$route.name);
                setTimeout(() => {
                    lockScreenBack.style.transition = 'all 0s';
                    this.$router.push({
                        name: 'locking'
                    });
                }, 800);
            },
            handleClickUserDropdown () {
            	Cookies.remove('userName');
            	Cookies.remove('avatorPath');
                Cookies.remove('taken');
                this.$router.push({
                        name: 'login'
                });
            }
		},
		mounted () {
            // 锁屏相关
            let lockScreenBack = document.getElementById('lock_screen_back');
            let x = document.body.clientWidth;
            let y = document.body.clientHeight;
            let r = Math.sqrt(x * x + y * y);
            let size = parseInt(r);
            this.lockScreenSize = size;
            window.addEventListener('resize', () => {
                let x = document.body.clientWidth;
                let y = document.body.clientHeight;
                let r = Math.sqrt(x * x + y * y);
                let size = parseInt(r);
                this.lockScreenSize = size;
                lockScreenBack.style.transition = 'all 0s';
                lockScreenBack.style.width = lockScreenBack.style.height = size + 'px';
            });
            lockScreenBack.style.width = lockScreenBack.style.height = size + 'px';
            // 问候信息相关
            if (10) {
                let now = new Date();
                let hour = now.getHours();
                let greetingWord = {
                    title: '',
                    words: ''
                };
                let userName = 'maofan';
                if (hour > 5 && hour < 6) {
                    greetingWord = {title: '凌晨好~' + userName, words: '早起的鸟儿有虫吃~'};
                } else if (hour >= 6 && hour < 9) {
                    greetingWord = {title: '早上好~' + userName, words: '来一杯咖啡开启美好的一天~'};
                } else if (hour >= 9 && hour < 12) {
                    greetingWord = {title: '上午好~' + userName, words: '工作要加油哦~'};
                } else if (hour >= 12 && hour < 14) {
                    greetingWord = {title: '中午好~' + userName, words: '午饭要吃饱~'};
                } else if (hour >= 14 && hour < 17) {
                    greetingWord = {title: '下午好~' + userName, words: '下午也要活力满满哦~'};
                } else if (hour >= 17 && hour < 19) {
                    greetingWord = {title: '傍晚好~' + userName, words: '下班没事问候下爸妈吧~'};
                } else if (hour >= 19 && hour < 21) {
                    greetingWord = {title: '晚上好~' + userName, words: '工作之余品一品书香吧~'};
                } else {
                    greetingWord = {title: '深夜好~' + userName, words: '夜深了，注意休息哦~'};
                }
                this.$Notice.config({
                    top: 130
                });
                this.$Notice.info({
                    title: greetingWord.title,
                    desc: greetingWord.words,
                    duration: 4,
                    name: 'greeting'
                });
                
            }
        },
		created(){
            this.setActiveName(this.$route.name);
			this.initMenuList();
            this.setCurrentPath(this.$route.name);
		}
		
	}
</script>
<style lang='less'>
	@import url('../styles/main.less');
</style>