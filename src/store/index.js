import Vue from 'vue'
import Vuex from 'vuex'
const list=[
        {path:'medicalInsurance',title:'医保登记',children:[],icon:'icon-yiliaomedical55'},
        {path:'drugs',title:'药品管理',children:[],icon:'icon-yaopinguanli'},
        {path:'inLibrary',title:'药品入库',children:[],icon:'icon-ruku'},
        {path:'outLibrary',title:'药品出库',children:[],icon:'icon-chuku'},
        {path:'record',title:'医疗记录',children:[],icon:'icon-jilu-copy'},
        {path:'wareHouse',title:'仓库管理',children:[],icon:'icon-cangku'}
]

Vue.use(Vuex)

export default new Vuex.Store({
	state:{
        activeName:'',
        token:false,
        avatorImg:'../../static/head.png',
		menuList:[],
        // 面包屑数组
		currentPath: [
            {
                title: '首页',
                path: 'home',
                name:'home'
            }
        ],
        accesstest_index:'' ,
        isFullScreen: false ,
        lastPage:'',
        //标签栏数组
        pageOpenedList: [{
            title: '首页',
            path: 'home',
            name: 'home'
        }]
	},
	mutations:{
        setTaken(state,boo){
            state.token=boo;
        },
        setActiveName(state,actName){
            state.activeName=actName;
        },
		setMenuList (state,list) {
            state.menuList = list;
        },
        handleFullScreen (state) {
            let main = document.body;
            if (state.isFullScreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else {
                if (main.requestFullscreen) {
                    main.requestFullscreen();
                } else if (main.mozRequestFullScreen) {
                    main.mozRequestFullScreen();
                } else if (main.webkitRequestFullScreen) {
                    main.webkitRequestFullScreen();
                } else if (main.msRequestFullscreen) {
                    main.msRequestFullscreen();
                }
            }
        },
        changeFullScreenState (state) {
            state.isFullScreen = !state.isFullScreen;
        },
        setCurrentPath(state,pathArr){
            let currentPathChild={};
            list.forEach((item) => {
              if(item.path==pathArr){
                currentPathChild={
                    title:item.title,
                    path:pathArr,
                    name:pathArr
                }
              }
            })
            if(state.currentPath.length>1){
                state.currentPath.pop();
            } 
            state.currentPath.push(currentPathChild);
            //待定
            let add=true;
            for(let i of state.pageOpenedList){
              if(i.path == pathArr){
                add=false;
                break
              }
            }
            if(add){state.pageOpenedList.push(currentPathChild)};
            
        	
        },  // 面包屑数组
        setLastPage(state,pageName){
        	state.lastPage = pageName;
        },
        closePage(state,name){
            state.pageOpenedList.forEach((item,index) => {
              if(item.path==name){
                state.pageOpenedList.splice(index,1)
              }
            })
        },
        clearAllTags(state){
            state.pageOpenedList.splice(1);
        },
        clearOtherTags(state,vm){
            for(let [index,elem] of state.pageOpenedList.entries()){
                if(elem.name==vm.$route.name){
                    state.pageOpenedList.splice(index + 1);
                    state.pageOpenedList.splice(1, index - 1);
                }
            }
        },
        initCurrentPath(state){
            state.currentPath=[
                {
                    title: '首页',
                    path: 'home',
                    name:'home'
                }
            ]
        }
	},
	actions:{
		initMenuList({commit}){
			commit('setMenuList',list);
		},
		handleFullScreen({commit}){
			commit('handleFullScreen');
			commit('changeFullScreenState')
		}
	}
})