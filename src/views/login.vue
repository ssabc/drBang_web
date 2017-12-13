<template>
    <div class="login-wrap">
        <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
            <FormItem prop="user">
                <Input type="text" v-model="formInline.user" placeholder="您的昵称" v-on:keyup.enter="handleSubmit('formInline')">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <!-- <FormItem prop="password">
                <Input type="password" v-model="formInline.password" placeholder="Pas sword">
                    <Icon type="ios-locked-outline" slot="prepend"></Icon>
                </Input>
            </FormItem> -->
            <FormItem>
                <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
            </FormItem>
        </Form>
    </div>
</template>
<script>
import {Cookie} from '@/script/utils'
export default {
    data () {
        return {
            formInline: {
                user: ''
                // password: ''
            },
            ruleInline: {
                user: [
                    { required: true, message: '请输入您的昵称', trigger: 'blur' }
                ]
                // password: [
                //     { required: true, message: 'Please fill in the password.', trigger: 'blur' },
                //     { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
                // ]
            }
        }
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    // 设置cookie
                    Cookie.set("userName", this.formInline.user)
                    // this.$Message.success('提交成功!');
                    this.$router.push('/')
                } else {
                    // this.$Message.error('校验失败!');
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
    .login-wrap{
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgb(151, 223, 185);
        .form-btn{
            margin: 0 auto;
        }
        .ivu-form {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
    }
</style>