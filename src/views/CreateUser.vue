<!--ログイン画面のコンポーネント-->

<template>
  <!--ヘッダー部-->
  <div class="test">
    <b-jumbotron  header="Real time chat App Demo"
                  lead="Powered by Chatkit SDK and Bootstrap-Vue"
                  bg-variant="success"
                  text-variant="white">
    </b-jumbotron>
    <b-container>
      <b-row>
        <!--lg:主にデスクトップ md:主にノートパソコンや横表示のタブレット のときの表示個数-->
        <b-col lg="4" md="3"></b-col>
        <b-col lg="4" md="6">
          <!--LoginFormのコンポーネントの呼び出し-->
          <CreateUserForm />
        </b-col>
        <b-col lg="4" md="3"></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>


import CreateUserForm from '@/components/CreateUserForm.vue'


export default {
  name: 'creatuser',
  components: {
    CreateUserForm
  }
}
</script>
