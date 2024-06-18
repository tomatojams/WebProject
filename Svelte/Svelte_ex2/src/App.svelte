<script>
  let message;

  fetch("http://127.0.0.1:8000/state").then((response) => {
    response.json().then((json) => {
      message = json.state;
    });
  });
</script>

<h1>{message}</h1>