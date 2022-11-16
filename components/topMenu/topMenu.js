// css 样式依赖common.css
const topMenu = {
    template: ` 
    <el-header height="80px" id="header">
        <img id="logo" src="./img/common/logo.png" alt="" @click="toHome">
        <span class="regist-btn">
            注册
        </span>
    </el-header>
`,

    data() {
        return {

        };
    },
    mounted() { },
    created() {

    },
    methods: {
        toHome(){
            location.href = 'index.html'
        }

    },
};
