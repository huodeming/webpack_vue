<template>
    <div>
        <h1>这是登陆组件,使用.vue文件定义出来的--{{ msg }}</h1>
    </div>
</template>

<script>
export default {
    //注意:组件中的data必须是function
    data(){
        return{
            msg:"123",
        };
    },
    methods:{
        show(){
            console.log("调用了login.vue文件中的show()方法");
        }
    }
}
</script>


<style>

</style>

