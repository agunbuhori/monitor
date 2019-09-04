<template>
	<div class="container">
    <div class="content-login">
  		<h1>Login</h1>
      <form method="post" @submit.prevent="login($event)">
        <label>Username:</label>
        <input type="text" class="form-login" name="email">
        <label>Password:</label>
        <input type="password" class="form-login" name="password">
        <input type="submit" class="button-login" name="" value="Login">
      </form>
    </div>
	</div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    login(event) {
      let data = new FormData(event.target);
      this.$axios.$post('login', data).then(response => {
        if (response.authentication) {
          localStorage.setItem('authentication', response.authentication);
          window.location.href = '/';
        }
      });
    }
  }
}
</script>

<style lang="scss">
	.container {
	  max-width: 3072px;
	}
  .content-login {
    margin: 7em auto;
    padding: 30px 20px;
    width: 350px;

    .form-login{
      box-sizing: border-box;
      width: 100%;
      padding: 0.3em;
      font-size: 11pt;
      margin-bottom: 20px;
    }
  }
</style>