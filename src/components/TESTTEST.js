const Auth = (props) => {
    const { setIsLoggedIn } = props;
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loginData, setLoginData] = useState({
      username: "",
      password: "",
    });
    const { username, password } = loginData;
    const classes = useStyles();
    const onChange = (event) => {
      setLoginData({
        ...loginData,
        [event.target.name]: event.target.value,
      });
    };
  
    const submitForm = async (e) => {
      e.preventDefault();
      try {
        setLoginData({ username: "", password: "" });
  
        const data = await loginUser({ username, password });
  
        if (!data.success) {
          setErrorMessage(data.message);
          return;
        }
        if (data.success) {
          setSuccessMessage(data.message);
        }
        setIsLoggedIn(true);
      } catch (error) {
        console.error(error);
        setErrorMessage(error.response);
      }
    };
  
    const isGuestClick = async () => {
      if ((setIsLoggedIn = false)) {
        submitForm();
      }
    };
  
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {errorMessage ? <h5 style={{ color: "red" }}>{errorMessage}</h5> : null}
          {successMessage ? (
            <h5 style={{ color: "green" }}>{successMessage}</h5>
          ) : null}
          <form className={classes.form} noValidate onSubmit={submitForm}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={onChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={onChange}
            />
  
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container className={classes.paper}>
              <Grid item className={classes.paper}>
                <Link to="/register" variant="body2">
                  Don't have an account? Sign Up
                </Link>
                <Checkbox onClick={isGuestClick}>Continue as Guest</Checkbox>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  };