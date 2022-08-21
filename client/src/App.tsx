import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./App.css";
import { BsTelephoneFill } from "react-icons/bs";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { Fade, Box, Modal, Backdrop } from "@mui/material";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { Items } from "./components/Items";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import {
  getUser,
  getUserStatusError,
  LoginUser,
  LogOutUser,
  RegisterUser,
} from "./features/user/userSlice";

const googleplay = require("./imgs/googleplay.png");
const appstore = require("./imgs/appstore.png");
const twitter = require("./imgs/twitter.png");
const instagram = require("./imgs/instagram.png");
const youtube = require("./imgs/youtube.png");
const facebook = require("./imgs/facebook.png");
const whatsapp = require("./imgs/whatsapp.png");
const google = require("./imgs/google.png");

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const user = useAppSelector(getUser);
  const userStatusError = useAppSelector(getUserStatusError);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setTimeout(() => {
      if (
        !userStatusError ||
        (userStatusError.email === "" &&
          userStatusError.password === "" &&
          userStatusError.name === "")
      ) {
        setOpen(false);
      }
    }, 2000);
  }, [userStatusError]);

  const [openLogin, setOpenLogin] = useState(false);
  const handleOpenLogin = () => {
    setOpenLogin(true);
  };
  const handleCloseLogin = () => {
    setOpenLogin(false);
  };

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState({ email: "", password: "" });

  const onHandleSignUp = async () => {
    dispatch(RegisterUser({ name, email, password }));
    // navigate("/");
    // window.location.reload();
  };

  const onHandleLogOut = () => {
    dispatch(LogOutUser());
    // navigate("/");
    // window.location.reload();
  };

  const onHandleLoginUser = () => {
    if (loginEmail === "" && loginPassword === "") {
      return setErrorMessage({
        email: "The email address you entered isn't connected to an account",
        password: "Please enter your password",
      });
    } else if (loginEmail === "" && loginPassword !== "") {
      return setErrorMessage({
        email: "The email address you entered isn't connected to an account",
        password: "",
      });
    } else if (loginEmail !== "" && loginPassword === "") {
      return setErrorMessage({
        email: "",
        password: "Please enter your password",
      });
    }
    setErrorMessage({ email: "", password: "" });
    dispatch(LoginUser({ loginEmail, loginPassword }));
    if (!userStatusError) {
      setOpen(false);
    }
    // navigate("/");
    // window.location.reload();
  };

  return (
    <div className="App">
      <motion.div
        className="progress-bar"
        style={{
          scaleX: scrollYProgress,
        }}
      />
      <div className="navbar-container">
        <div className="navbar-container-mid">
          <Link to="#" className="navbar-item-special">
            Book a service
          </Link>
          <Link to="#" className="navbar-item">
            Refer a Patient
          </Link>
          <Link to="#" className="navbar-item">
            Services
          </Link>
          <Link to="/about" className="navbar-item">
            About Us
          </Link>
        </div>
        <div className="navbar-container-right">
          {user._id === "" ? (
            <Link
              to="#"
              className="navbar-item-getStarted"
              onClick={handleOpen}
            >
              Get Started
            </Link>
          ) : (
            <div className="navbar-item-userInfo">
              <h4 className="navbar-item-userName">
                Welcome back,{" "}
                <span className="userName-Color">{user.name}</span>
              </h4>
              <Link
                to="#"
                className="navbar-item-logOut"
                onClick={onHandleLogOut}
              >
                Logout
              </Link>
            </div>
          )}
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box className="modal-style">
              <div className="register-container">
                <motion.div
                  animate={
                    openLogin
                      ? { x: "150%", transition: { duration: 1 } }
                      : { x: "0%", transition: { duration: 1 } }
                  }
                  className="login-container"
                  style={openLogin ? { display: "flex" } : { display: "none" }}
                >
                  <h1>Hello!</h1>
                  <h3>Enter your personal details and start journy with us</h3>
                  <button onClick={handleCloseLogin}>Sign Up</button>
                </motion.div>
                <motion.div
                  animate={
                    openLogin
                      ? { x: "150%", transition: { duration: 1 } }
                      : { x: "0%", transition: { duration: 1 } }
                  }
                  className="register-container-login"
                  style={openLogin ? { display: "none" } : { display: "flex" }}
                >
                  <h1>Welcome Back!</h1>
                  <h3>
                    To keep connected with us please login with your personal
                    info
                  </h3>
                  <button onClick={handleOpenLogin}>Sign In</button>
                </motion.div>
                <motion.div
                  animate={
                    openLogin
                      ? { x: "-70%", transition: { duration: 1 } }
                      : { x: "0%", transition: { duration: 1 } }
                  }
                  className="register-container-main"
                  style={openLogin ? { display: "none" } : { display: "flex" }}
                >
                  <h1>Create Account</h1>
                  <div className="register-container-icons">
                    <img src={facebook} alt="" />
                    <img src={google} alt="" />
                  </div>
                  <p>or use your email for registeration:</p>
                  <div className="register-container-inputholder">
                    {userStatusError && (
                      <motion.p
                        className="register-error"
                        animate={{ x: [10, 0, 0, 10] }}
                        transition={{ repeat: Infinity, repeatDelay: 3 }}
                      >
                        {userStatusError.name}
                      </motion.p>
                    )}
                    <input
                      className="register-container-input"
                      type="text"
                      placeholder="Name"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    {userStatusError &&
                      userStatusError.email !== "Incorrect email" && (
                        <motion.p
                          className="register-error"
                          animate={{ x: [10, 0, 0, 10] }}
                          transition={{ repeat: Infinity, repeatDelay: 3 }}
                        >
                          {userStatusError.email}
                        </motion.p>
                      )}
                    <input
                      className="register-container-input"
                      type="email"
                      placeholder="Email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {userStatusError &&
                      userStatusError.password !== "Incorrect password" && (
                        <motion.p
                          className="register-error"
                          animate={{ x: [10, 0, 0, 10] }}
                          transition={{ repeat: Infinity, repeatDelay: 3 }}
                        >
                          {userStatusError.password}
                        </motion.p>
                      )}
                    <input
                      className="register-container-input"
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      className="login-container-btn"
                      onClick={onHandleSignUp}
                    >
                      Sign Up
                    </button>
                  </div>
                </motion.div>
                <motion.div
                  animate={
                    openLogin
                      ? { x: "-65%", transition: { duration: 1 } }
                      : { x: "0%", transition: { duration: 1 } }
                  }
                  className="register-container-main"
                  style={openLogin ? { display: "flex" } : { display: "none" }}
                >
                  <h1>Login Account</h1>
                  <div className="register-container-icons">
                    <img src={facebook} alt="" />
                    <img src={google} alt="" />
                  </div>
                  <p>or use your email account:</p>
                  <div className="register-container-inputholder">
                    {userStatusError &&
                      userStatusError.email === "Incorrect email" && (
                        <motion.p
                          className="register-error"
                          animate={{ x: [10, 0, 0, 10] }}
                          transition={{ repeat: Infinity, repeatDelay: 3 }}
                        >
                          {userStatusError.email}
                        </motion.p>
                      )}
                    {errorMessage &&
                      userStatusError?.email !== "Incorrect email" && (
                        <motion.p
                          className="register-error"
                          animate={{ x: [10, 0, 0, 10] }}
                          transition={{ repeat: Infinity, repeatDelay: 3 }}
                        >
                          {errorMessage.email}
                        </motion.p>
                      )}
                    <input
                      className="register-container-input"
                      type="text"
                      placeholder="Email"
                      name="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                    />
                    {userStatusError &&
                      userStatusError.password === "Incorrect password" && (
                        <motion.p
                          className="register-error"
                          animate={{ x: [10, 0, 0, 10] }}
                          transition={{ repeat: Infinity, repeatDelay: 3 }}
                        >
                          {userStatusError.password}
                        </motion.p>
                      )}
                    {errorMessage &&
                      userStatusError?.password !== "Incorrect password" && (
                        <motion.p
                          className="register-error"
                          animate={{ x: [10, 0, 0, 10] }}
                          transition={{ repeat: Infinity, repeatDelay: 3 }}
                        >
                          {errorMessage.password}
                        </motion.p>
                      )}
                    <input
                      className="register-container-input"
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                    />
                  </div>
                  <Link to="#" className="register-container-link">
                    Forgot your password?
                  </Link>
                  <button
                    className="register-container-btn"
                    onClick={onHandleLoginUser}
                  >
                    Sign In
                  </button>
                </motion.div>
              </div>
            </Box>
          </Fade>
        </Modal>
      </div>
      <div className="main-container">
        <div className="main-container-top">
          <div className="card">
            <h1>Want to book any service?</h1>
            <h2>Request a quick Call-back.</h2>
            <hr className="hrline" />
            <form action="" className="card-form">
              <input
                type="text"
                name=""
                id="name"
                placeholder="Name"
                className="card-form-text"
              />
              <select name="" id="" className="card-form-select">
                <option>Select Serivce</option>
                <option value="covid-care">Quick services</option>
                <option value="nurse">Nurse</option>
                <option value="cg">Care giver</option>
                <option value="nb-cg">New-born baby caregiver</option>
                <option value="covid-care">Covid care</option>
              </select>
              <input
                type="tel"
                name=""
                id=""
                placeholder="Mobile Number"
                className="card-form-text"
              />
              <button className="card-form-btn">Submit</button>
            </form>
            <hr className="hrline" />
            <div className="card-footer">
              <h3>or Directly Call us at</h3>
              <h4>
                <BsTelephoneFill /> xxxxx xxxxx
              </h4>
            </div>
          </div>
        </div>
        <div className="main-container-mid">
          <div className="main-container-mid-top">
            <div className="main-container-mid-image"></div>
            <div className="main-container-mid-nursing-care">
              <h1>Nursing Care</h1>
              <hr className="hrline2" />
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Officia dolore ipsum vero totam laborum laboriosam expedita
                incidunt illo aperiam sint assumenda provident hic voluptates
                quisquam, fugit magni. Vitae molestiae facere vel ullam quam
                expedita autem accusamus facilis veritatis doloribus voluptatem
                quo incidunt tenetur et qui blanditiis veniam aperiam provident
                dolore, eveniet, ab sit hic repellendus ratione. Dicta, porro?
                Iste distinctio nihil ea possimus, aliquam, similique incidunt
                repellendus rerum corrupti esse expedita sapiente dignissimos
                natus aperiam quae dicta soluta laboriosam doloribus. Quis amet
                dolores architecto odio ipsum, explicabo vitae voluptatem
                commodi velit. Expedita debitis dignissimos velit quibusdam
                nihil perspiciatis soluta laborum quidem distinctio ab aliquid
                doloremque atque ipsum laboriosam quis eius, id, blanditiis
                corporis ipsam quia voluptatem magnam alias. Tempora officiis,
                at mollitia ex amet nemo beatae incidunt eos unde quibusdam quae
                suscipit facere obcaecati quisquam deserunt minus ad quis.
                Consectetur aspernatur odio repellat similique provident tempora
                sed nobis saepe quasi. Natus sit fugiat velit laborum
                laudantium, dolorem aut fugit tempore. Aspernatur aliquam
                pariatur porro provident ducimus nihil voluptatibus quas quo,
                iusto voluptatum, et blanditiis eos molestiae iste, earum
                corrupti debitis quam inventore ipsum? Alias deserunt sunt
                quidem ullam, a tenetur qui fugiat reiciendis illum commodi
                error eum? Ut velit et cum eveniet aspernatur itaque ipsa
                perferendis. Inventore deserunt eum iure molestiae tempore
                repudiandae saepe maxime ad deleniti tempora, aut repellat atque
                labore voluptas quae quo numquam dolorem, vel voluptatem
                recusandae consequatur distinctio. Excepturi sit expedita minus
                et placeat suscipit, perferendis repellat quidem tempore aut
                omnis est. Accusamus nisi cum, hic sint eligendi quae eius
                velit, commodi deserunt inventore, aliquam a aut corporis modi
                nobis eaque voluptatum fugiat numquam obcaecati magnam
                consequuntur nam id sapiente! Vero ratione reiciendis nam
                repudiandae quam corrupti harum amet, dolores dolorem a animi,
                esse quia unde nemo quas inventore dolor quos exercitationem
                obcaecati beatae delectus. Sed!
              </p>
            </div>
          </div>
          <div className="main-container-mid-inner">
            <h1>
              <AiFillSafetyCertificate size={50} color={"green"} /> Best Quality
              & affordable Healthcare Services at your Home!
            </h1>
            <p>
              At Blue Glove Care, we put ourselves in the position of a person
              whose family member is witnessing a health issue or undergoing a
              curative treatment. In-depth understanding & empathising with the
              entire pain & effort which goes into coordinating with multiple
              healthcare providers at different stages of recuperation.
            </p>
          </div>
          <div className="main-container-bottom">
            <div className="main-container-bottom-cardholder">
              {Items.map((item, index) => {
                return (
                  <motion.div
                    key={index}
                    layoutId={item.Id}
                    onClick={() => setSelectedId(item.Id)}
                    whileHover={{
                      scale: 1.2,
                      transition: { duration: 1 },
                      backgroundColor: "#e4dede",
                    }}
                    whileTap={{ scale: 0.9 }}
                    className="main-container-bottom-card"
                  >
                    <img
                      src={item.Img}
                      alt={`number ${index}`}
                      className="main-container-bottom-card-img"
                    />
                    <h1>{item.H1}</h1>
                    <p>{item.Desc}</p>
                  </motion.div>
                );
              })}
            </div>
            {Items.map((item, index) => {
              return (
                <AnimatePresence key={index}>
                  {selectedId === item.Id && (
                    <motion.div
                      layoutId={item.Id}
                      onClick={() => setSelectedId(null)}
                      whileTap={{ scale: 0.9 }}
                      className="main-container-bottom-card-float"
                    >
                      <img
                        key={index}
                        src={item.Img}
                        alt={`number ${index}`}
                        className="main-container-bottom-card-img"
                      />
                      <h1>{item.H1}</h1>
                      <p>{item.Desc}</p>
                      <h4>{item.More}</h4>
                    </motion.div>
                  )}
                </AnimatePresence>
              );
            })}
          </div>
        </div>
      </div>
      <footer className="footer-container">
        <div className="footer-container-services">
          <h1>Services</h1>
          <hr className="hrline2" />
          <Link to="#" className="footer-links">
            Medical & Support Care
          </Link>
          <Link to="#" className="footer-links">
            Covid Care
          </Link>
          <Link to="#" className="footer-links">
            Home Care
          </Link>
          <Link to="#" className="footer-links">
            Therapeutic Massage
          </Link>
          <Link to="#" className="footer-links">
            Quick Services
          </Link>
          <Link to="#" className="footer-links">
            Monitoring
          </Link>
        </div>
        <div className="footer-container-organisation">
          <h1>Organisation</h1>
          <hr className="hrline2" />
          <Link to="#" className="footer-links">
            About Us
          </Link>
          <Link to="#" className="footer-links">
            Team
          </Link>
          <Link to="#" className="footer-links">
            Promotions
          </Link>
          <Link to="#" className="footer-links">
            FAQ's
          </Link>
          <Link to="#" className="footer-links">
            Contact Us
          </Link>
          <Link to="#" className="footer-links">
            Work with Us
          </Link>
        </div>
        <div className="footer-container-connectus">
          <h1>Connect with us</h1>
          <hr className="hrline2" />
          <div className="footer-container-connectus-icons">
            <Link to="#" className="connectus-links">
              <img src={facebook} alt="IconImg" />
            </Link>
            <Link to="#" className="connectus-links">
              <img src={twitter} alt="IconImg" />
            </Link>
            <Link to="#" className="connectus-links">
              <img src={instagram} alt="IconImg" />
            </Link>
            <Link to="#" className="connectus-links">
              <img src={youtube} alt="IconImg" />
            </Link>
            <Link to="#" className="connectus-links">
              <img src={whatsapp} alt="IconImg" />
            </Link>
          </div>
          <h2>Download App</h2>
          <hr className="hrline2" />
          <div className="footer-container-download-icons">
            <Link to="#">
              <img src={googleplay} alt="IconImg" className="connectus-links" />
            </Link>
            <Link to="#">
              <img src={appstore} alt="IconImg" className="connectus-links" />
            </Link>
          </div>
        </div>
      </footer>
      <Outlet />
    </div>
  );
}

export default App;
